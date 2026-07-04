import React, { useState, useRef, useEffect, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import SEO from '../../../../components/SEO';
import './ViewStyles.css';

const ResizeImage = () => {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [resizeMode, setResizeMode] = useState('stretch'); // stretch, fit, crop
    const [format, setFormat] = useState('image/png');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [aspectRatioLocked, setAspectRatioLocked] = useState(true);
    const canvasRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                setOriginalDimensions({ width: img.width, height: img.height });
                setWidth(img.width);
                setHeight(img.height);
                setImagePreview(img);
                setImageFile(file);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            processFile(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDimensionChange = (e, type) => {
        const val = parseInt(e.target.value) || 0;
        if (type === 'width') {
            setWidth(val);
            if (aspectRatioLocked && originalDimensions.width > 0) {
                setHeight(Math.round(val * (originalDimensions.height / originalDimensions.width)));
            }
        } else {
            setHeight(val);
            if (aspectRatioLocked && originalDimensions.height > 0) {
                setWidth(Math.round(val * (originalDimensions.width / originalDimensions.height)));
            }
        }
    };

    const drawCanvas = useCallback(() => {
        if (!imagePreview || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const targetWidth = parseInt(width) || originalDimensions.width;
        const targetHeight = parseInt(height) || originalDimensions.height;

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // Clear canvas with background color (important for 'fit' mode or transparent PNGs converted to JPG)
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        if (resizeMode === 'stretch') {
            ctx.drawImage(imagePreview, 0, 0, targetWidth, targetHeight);
        } else if (resizeMode === 'fit') {
            const scale = Math.min(targetWidth / imagePreview.width, targetHeight / imagePreview.height);
            const w = imagePreview.width * scale;
            const h = imagePreview.height * scale;
            const x = (targetWidth - w) / 2;
            const y = (targetHeight - h) / 2;
            ctx.drawImage(imagePreview, x, y, w, h);
        } else if (resizeMode === 'crop') {
            const scale = Math.max(targetWidth / imagePreview.width, targetHeight / imagePreview.height);
            const w = imagePreview.width * scale;
            const h = imagePreview.height * scale;
            const x = (targetWidth - w) / 2;
            const y = (targetHeight - h) / 2;
            ctx.drawImage(imagePreview, x, y, w, h);
        }
    }, [imagePreview, width, height, resizeMode, bgColor, originalDimensions]);

    useEffect(() => {
        drawCanvas();
    }, [drawCanvas]);

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ext = format === 'image/jpeg' ? 'jpg' : 'png';
        const link = document.createElement('a');
        link.download = `resized_image.${ext}`;
        link.href = canvas.toDataURL(format, 0.9); // 0.9 quality for jpg
        link.click();
    };

    return (
        <div>
            <SEO
                title="Online Image Resizer | Techtools Store"
                description="Upload, resize, crop, and convert your images instantly online for free."
                canonical="https://techtools.gummadii.com/resize-image"
                keywords="resize image, crop image, image converter, online photo editor"
            />
            <Header />
            <div className="container">
                <div className="view-container">
                    <div className="text-center mb-5">
                        <div className="mb-3">
                            <span className="bi bi-aspect-ratio text-primary" style={{ fontSize: '2.5rem' }}></span>
                        </div>
                        <h3 className="font-weight-bold">Resize an Image</h3>
                        <p className="text-muted">Upload, resize, crop, and convert your images instantly.</p>
                    </div>

                    {!imageFile ? (
                        <div
                            className="upload-area p-5 text-center bg-light rounded border border-secondary border-dashed mb-5"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            style={{ borderStyle: 'dashed', cursor: 'pointer' }}
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            <span className="bi bi-cloud-upload text-muted h1 d-block mb-3"></span>
                            <h5 className="text-muted">Drop your images here or browse</h5>
                            <button className="premium-btn premium-btn-primary mt-3">Select Image</button>
                            <input
                                type="file"
                                id="fileInput"
                                hidden
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <div className="card border-0 shadow-sm p-4">
                                    <h5 className="font-weight-bold mb-4">Resize Options</h5>

                                    <div className="form-group mb-3">
                                        <label className="text-muted small font-weight-bold">Dimensions (px) &nbsp;
                                            <span
                                                className={`bi ${aspectRatioLocked ? 'bi-lock-fill text-primary' : 'bi-unlock text-muted'}`}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setAspectRatioLocked(!aspectRatioLocked)}
                                                title="Lock Aspect Ratio"
                                            ></span>
                                        </label>
                                        <div className="d-flex align-items-center">
                                            <input
                                                type="number"
                                                className="form-control premium-input mr-2"
                                                placeholder="Width"
                                                value={width}
                                                onChange={(e) => handleDimensionChange(e, 'width')}
                                            />
                                            <span className="text-muted mx-2">x</span>
                                            <input
                                                type="number"
                                                className="form-control premium-input ml-2"
                                                placeholder="Height"
                                                value={height}
                                                onChange={(e) => handleDimensionChange(e, 'height')}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="text-muted small font-weight-bold">Resize Mode</label>
                                        <div className="btn-group w-100" role="group">
                                            {['stretch', 'fit', 'crop'].map(mode => (
                                                <button
                                                    key={mode}
                                                    type="button"
                                                    className={`btn ${resizeMode === mode ? 'btn-primary' : 'btn-light text-secondary'}`}
                                                    onClick={() => setResizeMode(mode)}
                                                    style={{ textTransform: 'capitalize' }}
                                                >
                                                    {mode}
                                                </button>
                                            ))}
                                        </div>
                                        <small className="text-muted mt-1 d-block">
                                            {resizeMode === 'stretch' && "Distort image to fill strictly."}
                                            {resizeMode === 'fit' && "Preserve aspect ratio, showing background."}
                                            {resizeMode === 'crop' && "Center and zoom to fill area."}
                                        </small>
                                    </div>

                                    <div className="row">
                                        <div className="col-6 form-group mb-3">
                                            <label className="text-muted small font-weight-bold">Format</label>
                                            <select
                                                className="form-control premium-input"
                                                value={format}
                                                onChange={(e) => setFormat(e.target.value)}
                                            >
                                                <option value="image/png">PNG</option>
                                                <option value="image/jpeg">JPG</option>
                                            </select>
                                        </div>
                                        <div className="col-6 form-group mb-3">
                                            <label className="text-muted small font-weight-bold">Background</label>
                                            <div className="d-flex align-items-center">
                                                <input
                                                    type="color"
                                                    className="form-control p-1 mr-2"
                                                    style={{ height: '38px', width: '50px' }}
                                                    value={bgColor}
                                                    onChange={(e) => setBgColor(e.target.value)}
                                                />
                                                <span className="small text-muted">{bgColor}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="premium-btn premium-btn-primary w-100 mt-3" onClick={downloadImage}>
                                        <span className="bi bi-download mr-2"></span> Download Image
                                    </button>

                                    <button
                                        className="btn btn-link text-muted mt-2 w-100"
                                        onClick={() => { setImageFile(null); setImagePreview(null); }}
                                    >
                                        Resize Another Image
                                    </button>
                                </div>
                            </div>

                            <div className="col-lg-6 text-center">
                                <label className="text-muted small font-weight-bold d-block text-left mb-3">Preview</label>
                                <div className="p-3 bg-light rounded border border-light shadow-inner d-inline-block" style={{ maxWidth: '100%', overflow: 'hidden' }}>
                                    <canvas
                                        ref={canvasRef}
                                        style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ddd' }}
                                    />
                                </div>
                                <p className="small text-muted mt-2">
                                    Original: {originalDimensions.width} x {originalDimensions.height} px <br />
                                    New: {width || 0} x {height || 0} px
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ResizeImage;
