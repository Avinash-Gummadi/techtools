import React, { Component } from 'react';
import gifshot from 'gifshot';
import JSZip from 'jszip';
import Header from './Header';
import Footer from './Footer';
import SEO from '../../../../components/SEO';

export default class VideoToGlimpse extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.convertVideoToGlimpse = this.convertVideoToGlimpse.bind(this);
        this.onModeChange = this.onModeChange.bind(this);
        this.downloadAll = this.downloadAll.bind(this);
        this.state = {
            videoUrl: '',
            glimpses: [], // Renamed from gifs
            videoWidth: 0,
            videoHeight: 0,
            isProcessing: false,
            error: '',
            progress: 0,
            conversionMode: 'single', // 'single' or 'multiple'
            duration: 0,
            currentSegment: 0,
            totalSegments: 0,
            segmentDuration: 5 // Default split duration in seconds
        };
    }

    onFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            // Standard size restriction: 50MB
            if (file.size > 50 * 1024 * 1024) {
                this.setState({ error: 'File size too large. Please upload a video smaller than 50MB.' });
                return;
            }

            const videoUrl = URL.createObjectURL(file);
            const videoElement = document.createElement('video');
            videoElement.src = videoUrl;
            videoElement.onloadedmetadata = () => {
                this.setState({
                    videoUrl: videoUrl,
                    glimpses: [],
                    error: '',
                    progress: 0,
                    duration: videoElement.duration,
                    videoWidth: videoElement.videoWidth,
                    videoHeight: videoElement.videoHeight
                });
            };
        }
    }

    onModeChange(e) {
        this.setState({ conversionMode: e.target.value });
    }

    async convertVideoToGlimpse() {
        if (!this.state.videoUrl) return;

        this.setState({ isProcessing: true, error: '', progress: 0, glimpses: [] });

        if (this.state.conversionMode === 'single') {
            this.processSegment(0, this.state.duration);
        } else {
            const totalSegments = Math.ceil(this.state.duration / this.state.segmentDuration);
            this.setState({ totalSegments, currentSegment: 0 });
            this.processSegmentsSequentially(totalSegments);
        }
    }

    async processSegmentsSequentially(totalSegments) {
        for (let i = 0; i < totalSegments; i++) {
            this.setState({ currentSegment: i + 1, progress: 0 });
            const startTime = i * this.state.segmentDuration;
            const duration = Math.min(this.state.segmentDuration, this.state.duration - startTime);

            // Fix blinking: Sync numFrames with duration and interval
            // 10 frames per second (interval 0.1)
            const numFrames = Math.max(10, Math.floor(duration * 10));

            await new Promise((resolve, reject) => {
                gifshot.createGIF({
                    video: [this.state.videoUrl],
                    offset: startTime,
                    // Fix cropping: use aspect-ratio aware sizing
                    gifWidth: this.state.videoWidth > 800 ? 800 : this.state.videoWidth,
                    gifHeight: this.state.videoWidth > 800 ? Math.round((800 / this.state.videoWidth) * this.state.videoHeight) : this.state.videoHeight,
                    interval: 0.1,
                    numFrames: numFrames,
                    sampleInterval: 5, // Improved quality
                    progressCallback: (progress) => {
                        this.setState({ progress: Math.round(progress * 100) });
                    }
                }, (obj) => {
                    if (!obj.error) {
                        this.setState(prevState => ({
                            glimpses: [...prevState.glimpses, obj.image]
                        }));
                        resolve();
                    } else {
                        reject(new Error('Failed to create glimpse ' + (i + 1)));
                    }
                });
            }).catch(err => {
                this.setState({ error: err.message, isProcessing: false });
                return;
            });
        }
        this.setState({ isProcessing: false });
    }

    processSegment(offset, duration) {
        // Fix blinking for single mode too
        const numFrames = Math.min(100, Math.floor(duration * 10)); // Max 100 frames for single clip

        gifshot.createGIF({
            video: [this.state.videoUrl],
            offset: offset,
            // Fix cropping: use aspect-ratio aware sizing
            gifWidth: this.state.videoWidth > 800 ? 800 : this.state.videoWidth,
            gifHeight: this.state.videoWidth > 800 ? Math.round((800 / this.state.videoWidth) * this.state.videoHeight) : this.state.videoHeight,
            interval: 0.1,
            numFrames: numFrames,
            sampleInterval: 5, // Improved quality
            progressCallback: (progress) => {
                this.setState({ progress: Math.round(progress * 100) });
            }
        }, (obj) => {
            if (!obj.error) {
                this.setState({
                    glimpses: [obj.image],
                    isProcessing: false
                });
            } else {
                this.setState({
                    error: 'Error processing video. Please try a different file.',
                    isProcessing: false
                });
            }
        });
    }

    async downloadAll() {
        if (this.state.glimpses.length === 0) return;

        this.setState({ isProcessing: true, progress: 0 });
        const zip = new JSZip();

        this.state.glimpses.forEach((glimpse, index) => {
            const base64Data = glimpse.replace(/^data:image\/gif;base64,/, "");
            zip.file(`techtools_glimpse_${index + 1}.gif`, base64Data, { base64: true });
        });

        const content = await zip.generateAsync({ type: "blob" }, (metadata) => {
            this.setState({ progress: Math.round(metadata.percent) });
        });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = "techtools_glimpses_bundle.zip";
        link.click();

        this.setState({ isProcessing: false });
    }

    render() {
        return (
            <>
                <SEO
                    title="Video Glimpse Creator | High-Quality Video Loops & Highlights"
                    description="Convert your videos into high-quality short glimpses or highlights. Split long videos into equal segments automatically. Fast, free, and secure."
                    keywords="Video Glimpses, video highlights, video segments, video loops, techtools"
                    canonical="https://techtools.gummadii.com/video-to-glimpse"
                />
                <Header />
                <div className="container">
                    <div style={{ marginTop: "100px", minHeight: "75vh", paddingBottom: "50px" }}>
                        <div className="unit-5 text-center">
                            <div className="unit-4-icon mr-4">
                                <span className="feather-video bi bi-stars"></span>
                            </div>
                            <div>
                                <h3>Advanced Video Glimpse Creator</h3>
                                <p>Create high-quality glimpses from your videos automatically</p>
                            </div>
                        </div>

                        <div className="row justify-content-center mt-5">
                            <div className="col-md-8">
                                {this.state.error && <div className="alert alert-danger text-center">{this.state.error}</div>}

                                <div className="card shadow-sm p-4 mb-4">
                                    <div className="text-center">
                                        {!this.state.videoUrl ? (
                                            <div className="mb-3">
                                                <label htmlFor="videoUpload" className="btn btn-primary btn-lg">
                                                    <span className="feather-upload"></span> Upload Video
                                                </label>
                                                <input
                                                    type="file"
                                                    id="videoUpload"
                                                    accept="video/*"
                                                    onChange={this.onFileChange}
                                                    style={{ display: "none" }}
                                                />
                                                <p className="small text-muted mt-2">Max size: 50MB | Unlimited Duration</p>
                                            </div>
                                        ) : (
                                            <div className="mb-4">
                                                <video src={this.state.videoUrl} width="100%" controls style={{ maxWidth: '400px', borderRadius: '8px', border: '1px solid #eee' }}></video>
                                                <div className="mt-2">
                                                    <button onClick={() => this.setState({ videoUrl: '', glimpses: [], error: '' })} className="btn btn-sm btn-outline-secondary">
                                                        Change Video
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {this.state.videoUrl && !this.state.isProcessing && this.state.glimpses.length === 0 && (
                                            <div className="mt-4 border-top pt-4">
                                                <h5 className="mb-3">Glimpse Options</h5>
                                                <div className="d-flex justify-content-center mb-4" style={{ gap: '20px' }}>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="mode" id="singleMode" value="single" checked={this.state.conversionMode === 'single'} onChange={this.onModeChange} />
                                                        <label className="form-check-label" htmlFor="singleMode">Full Glimpse (1 Clip)</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="mode" id="multipleMode" value="multiple" checked={this.state.conversionMode === 'multiple'} onChange={this.onModeChange} />
                                                        <label className="form-check-label" htmlFor="multipleMode">Split Glimpses (Multiple Clips)</label>
                                                    </div>
                                                </div>

                                                {this.state.conversionMode === 'multiple' && (
                                                    <div className="mb-4">
                                                        <label className="small font-weight-bold">Split every {this.state.segmentDuration} seconds</label>
                                                        <input type="range" className="custom-range" min="3" max="15" step="1" value={this.state.segmentDuration} onChange={(e) => this.setState({ segmentDuration: parseInt(e.target.value) })} />
                                                        <div className="d-flex justify-content-between small text-muted">
                                                            <span>3s</span>
                                                            <span>15s</span>
                                                        </div>
                                                    </div>
                                                )}

                                                <button onClick={this.convertVideoToGlimpse} className="btn btn-success btn-lg px-5">
                                                    Create Glimpses
                                                </button>
                                            </div>
                                        )}

                                        {this.state.isProcessing && (
                                            <div className="py-4">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="sr-only">Creating...</span>
                                                </div>
                                                <p className="mt-3 font-weight-bold">
                                                    {this.state.conversionMode === 'multiple'
                                                        ? `Creating Glimpse ${this.state.currentSegment} of ${this.state.totalSegments}...`
                                                        : 'Creating your glimpses...'}
                                                </p>
                                                <div className="progress mt-2" style={{ height: '20px', borderRadius: '10px' }}>
                                                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${this.state.progress}%` }} aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="100">{this.state.progress}%</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {this.state.glimpses.length > 0 && !this.state.isProcessing && (
                                    <div className="mt-5 text-center">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h4>Glimpses Ready ({this.state.glimpses.length} Clip{this.state.glimpses.length > 1 ? 's' : ''})</h4>
                                            {this.state.glimpses.length > 1 && (
                                                <button onClick={this.downloadAll} className="btn btn-primary">
                                                    <span className="feather-download-cloud bi bi-file-earmark-zip"></span> Download All (Zip)
                                                </button>
                                            )}
                                        </div>
                                        <div className="row mt-4">
                                            {this.state.glimpses.map((glimpse, index) => (
                                                <div key={index} className="col-md-6 mb-4">
                                                    <div className="card h-100 shadow-sm">
                                                        <div className="card-body p-2 d-flex flex-column">
                                                            <img src={glimpse} alt={`Glimpse ${index + 1}`} className="img-fluid rounded mb-2" style={{ maxHeight: '250px', objectFit: 'contain' }} />
                                                            <div className="mt-auto">
                                                                <p className="small text-muted mb-2">Glimpse {index + 1}</p>
                                                                <a href={glimpse} download={`techtools_glimpse_${index + 1}.gif`} className="btn btn-sm btn-primary btn-block">
                                                                    Download
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4">
                                            <button onClick={() => this.setState({ glimpses: [], videoUrl: '', error: '' })} className="btn btn-link py-0">
                                                <span className="feather-refresh-cw"></span> Create Another Glimpse
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}
