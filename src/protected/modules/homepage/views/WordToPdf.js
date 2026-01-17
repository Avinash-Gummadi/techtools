import React, { Component } from 'react';
import { renderAsync } from 'docx-preview';
import html2pdf from 'html2pdf.js';
import PDFMerger from 'pdf-merger-js/browser';
import Header from './Header';
import Footer from './Footer';
import SEO from '../../../../components/SEO';
import JSZip from 'jszip';
import './ViewStyles.css';

class WordToPdf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFiles: [],
            convertedFiles: [], // { name, blob, url, status: 'pending' | 'converting' | 'done' | 'error' }
            processingMessage: '',
            mergeStatus: 'idle',
            mergedPdfUrl: null,
            error: null
        };
        this.fileInputRef = React.createRef();
        this.hiddenContainerRef = React.createRef();
    }

    handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter(file => file.name.endsWith('.docx') || file.name.endsWith('.doc'));

        if (validFiles.length !== files.length) {
            this.setState({ error: "Some files were skipped. Only .docx and .doc files are supported." });
        } else {
            this.setState({ error: null });
        }

        const newFiles = validFiles.map(file => ({
            file,
            name: file.name,
            status: 'pending',
            blob: null,
            url: null
        }));

        this.setState(prevState => ({
            selectedFiles: [...prevState.selectedFiles, ...newFiles],
            convertedFiles: [...prevState.convertedFiles, ...newFiles] // Initialize convertedFiles with pending state
        }));
    };

    convertFile = async (fileObj, index) => {
        try {
            // Update status to converting
            this.updateFileStatus(index, { status: 'converting' });
            this.setState({ processingMessage: `Analyzing ${fileObj.name}...`, error: null });

            const arrayBuffer = await fileObj.file.arrayBuffer();
            if (this.hiddenContainerRef.current) {
                this.hiddenContainerRef.current.innerHTML = '';
            }

            // 1. Render DOCX to HTML
            console.log("Decoding DOCX...");
            await renderAsync(arrayBuffer, this.hiddenContainerRef.current, null, {
                inWrapper: true,
                ignoreWidth: false,
                ignoreHeight: false,
                padding: "0",
                breakPages: true
            });

            // Small delay to allow CSS and images to settle in the hidden container
            await new Promise(resolve => setTimeout(resolve, 500));

            // 2. Prepare for PDF conversion
            const element = this.hiddenContainerRef.current;
            const pages = element.querySelectorAll('.docx-wrapper > section, .docx-wrapper > article, .docx');

            console.log("Pages detected:", pages.length);
            this.setState({ processingMessage: `Converting ${pages.length || 1} pages...` });

            // Create a dedicated container that strictly follows A4 dimensions
            const pdfContainer = document.createElement('div');
            pdfContainer.style.width = '210mm';
            pdfContainer.style.margin = '0';
            pdfContainer.style.padding = '0';
            pdfContainer.style.backgroundColor = 'white';

            if (pages.length > 0) {
                pages.forEach((page, i) => {
                    const pageClone = page.cloneNode(true);
                    pageClone.style.display = 'block';
                    pageClone.style.width = '210mm';
                    pageClone.style.margin = '0 auto'; // Centering the content
                    pageClone.style.boxSizing = 'border-box';
                    pageClone.style.pageBreakAfter = 'always';
                    pdfContainer.appendChild(pageClone);
                });
            } else {
                pdfContainer.appendChild(element.cloneNode(true));
            }

            const opt = {
                margin: 5, // Provide a small gutter to prevent "extreme left" look
                filename: fileObj.name.replace(/\.(docx|doc)$/, '.pdf'),
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    letterRendering: true,
                    width: 794, // Approx 210mm at 96 DPI
                    windowWidth: 794
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak: { mode: ['css', 'legacy'] }
            };

            console.log("Starting PDF generation...");
            const pdfBlob = await html2pdf().set(opt).from(pdfContainer).output('blob');
            console.log("PDF generated successfully.");

            const pdfUrl = URL.createObjectURL(pdfBlob);

            this.updateFileStatus(index, {
                status: 'done',
                blob: pdfBlob,
                url: pdfUrl,
                pdfName: opt.filename
            });
            this.setState({ processingMessage: '' });

        } catch (err) {
            console.error("Conversion error:", err);
            this.setState({ processingMessage: `Error: ${err.message}`, error: `Conversion failed: ${err.message}` });
            this.updateFileStatus(index, { status: 'error', error: err.message });
        }
    };

    updateFileStatus = (index, updates) => {
        this.setState(prevState => {
            const newConvertedFiles = [...prevState.convertedFiles];
            newConvertedFiles[index] = { ...newConvertedFiles[index], ...updates };
            return { convertedFiles: newConvertedFiles };
        });
    };

    convertAll = async () => {
        const { convertedFiles } = this.state;
        for (let i = 0; i < convertedFiles.length; i++) {
            if (convertedFiles[i].status === 'pending') {
                await this.convertFile(convertedFiles[i], i);
            }
        }
    };

    mergePdfs = async () => {
        const { convertedFiles } = this.state;
        const filesToMerge = convertedFiles.filter(f => f.status === 'done' && f.blob);

        if (filesToMerge.length < 2) {
            this.setState({ error: "Need at least 2 converted PDF files to merge." });
            return;
        }

        this.setState({ mergeStatus: 'merging' });

        try {
            const merger = new PDFMerger();
            for (const file of filesToMerge) {
                await merger.add(file.blob);
            }
            const mergedPdfBlob = await merger.saveAsBlob();
            const url = URL.createObjectURL(mergedPdfBlob);

            this.setState({
                mergeStatus: 'done',
                mergedPdfUrl: url,
                error: null
            });
        } catch (err) {
            console.error("Merge error:", err);
            this.setState({ mergeStatus: 'error', error: "Failed to merge PDFs." });
        }
    };

    downloadAll = async () => {
        const { convertedFiles } = this.state;
        const zippedFiles = convertedFiles.filter(f => f.status === 'done' && f.blob);

        if (zippedFiles.length === 0) return;

        try {
            const zip = new JSZip();
            zippedFiles.forEach(file => {
                zip.file(file.pdfName, file.blob);
            });
            const content = await zip.generateAsync({ type: "blob" });
            const url = URL.createObjectURL(content);
            const link = document.createElement('a');
            link.href = url;
            link.download = "techtools_converted_pdfs.zip";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error("Zip error:", err);
            this.setState({ error: "Failed to create ZIP file." });
        }
    };

    reset = () => {
        this.setState({
            selectedFiles: [],
            convertedFiles: [],
            mergeStatus: 'idle',
            mergedPdfUrl: null,
            error: null
        });
        if (this.fileInputRef.current) {
            this.fileInputRef.current.value = '';
        }
    };

    removeFile = (index) => {
        this.setState(prevState => {
            const newSelected = [...prevState.selectedFiles];
            const newConverted = [...prevState.convertedFiles];
            newSelected.splice(index, 1);
            newConverted.splice(index, 1);
            return { loading: false, selectedFiles: newSelected, convertedFiles: newConverted };
        });
    };

    render() {
        const { convertedFiles, mergeStatus, mergedPdfUrl, error } = this.state;
        const hasPending = convertedFiles.some(f => f.status === 'pending');
        const allDone = convertedFiles.length > 0 && convertedFiles.every(f => f.status === 'done');
        const canMerge = convertedFiles.filter(f => f.status === 'done').length >= 2;

        return (
            <>
                <SEO
                    title="Word to PDF Converter | Convert DOCX to PDF Online"
                    description="Convert multiple Word documents (DOCX/DOC) to high-quality PDF files instantly. Fast, secure, and preserves layout perfectly."
                    keywords="word to pdf, docx to pdf, merge pdf, document converter, techtools"
                    canonical="https://techtools.gummadii.com/word-to-pdf"
                />
                <Header />
                <div className="view-container">
                    <div className="text-center mb-2">
                        <h4 className="font-weight-bold mb-0">Word to PDF Converter</h4>
                        <p className="text-muted small mb-0">Convert multiple Word documents to PDF and merge easily.</p>
                        {this.state.processingMessage && (
                            <div className="mt-1 animate__animated animate__pulse animate__infinite">
                                <span className="badge badge-info py-0 px-2" style={{ fontSize: '0.7rem' }}>
                                    <i className="bi bi-gear-fill spin-icon mr-1"></i> {this.state.processingMessage}
                                </span>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="alert alert-danger py-2 mb-3" role="alert">
                            {error}
                            <button type="button" className="close" onClick={() => this.setState({ error: null })}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    )}

                    <div className="card shadow-sm p-1 ml-auto mr-auto mb-2 bg-white rounded text-center" style={{ border: '2px dashed #e9ecef', maxWidth: '500px' }}>
                        <input
                            type="file"
                            accept=".docx,.doc"
                            multiple
                            onChange={this.handleFileChange}
                            ref={this.fileInputRef}
                            id="file-upload"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="file-upload" className="premium-btn premium-btn-primary mb-0 mx-auto py-1 px-3 shadow-sm" style={{ width: 'fit-content', fontSize: '0.8rem' }}>
                            <i className="bi bi-cloud-upload mr-1"></i> Select Documents
                        </label>
                        <div className="mt-1 smaller text-muted" style={{ fontSize: '0.7rem' }}>DOCX/DOC supported</div>
                    </div>

                    {convertedFiles.length > 0 && (
                        <div className="animate__animated animate__fadeIn">
                            <div className="d-flex justify-content-between align-items-center mb-1 px-1">
                                <h6 className="mb-0 font-weight-bold" style={{ fontSize: '0.8rem' }}>Queue ({convertedFiles.length})</h6>
                                <div className="d-flex gap-1" style={{ gap: '4px' }}>
                                    {hasPending && (
                                        <button className="btn btn-sm btn-primary btn-compact-tool" onClick={this.convertAll}>
                                            Convert All
                                        </button>
                                    )}
                                    {allDone && (
                                        <button className="btn btn-sm btn-outline-success btn-compact-tool" onClick={this.downloadAll}>
                                            <i className="bi bi-file-zip mr-1"></i> Download All
                                        </button>
                                    )}
                                    <button className="btn btn-sm btn-outline-secondary btn-compact-tool" onClick={this.reset}>
                                        Reset
                                    </button>
                                </div>
                            </div>

                            <div className="mb-2">
                                {convertedFiles.map((file, idx) => (
                                    <div key={idx} className="list-card d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center overflow-hidden">
                                            <div className="mr-2 text-primary flex-shrink-0">
                                                <i className="bi bi-file-earmark-word" style={{ fontSize: '1.1rem' }}></i>
                                            </div>
                                            <div className="text-truncate">
                                                <div className="list-text font-weight-bold text-truncate" style={{ fontSize: '0.9rem' }}>{file.name}</div>
                                                <div className="smaller" style={{ fontSize: '0.65rem', lineHeight: '1.1' }}>
                                                    {file.status === 'pending' && <span className="text-muted">Pending</span>}
                                                    {file.status === 'converting' && <span className="text-warning">Converting...</span>}
                                                    {file.status === 'done' && <span className="text-success font-weight-bold">Ready</span>}
                                                    {file.status === 'error' && <span className="text-danger">Error</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-2 flex-shrink-0">
                                            {file.status === 'pending' && (
                                                <div className="d-flex align-items-center" style={{ gap: '3px' }}>
                                                    <button className="btn btn-ultra-compact btn-outline-primary" onClick={() => this.convertFile(file, idx)}>Start</button>
                                                    <button className="btn btn-sm text-danger py-0 px-1" onClick={() => this.removeFile(idx)} style={{ fontSize: '1rem', lineHeight: '1' }}>&times;</button>
                                                </div>
                                            )}
                                            {file.status === 'done' && (
                                                <a href={file.url} download={file.pdfName} className="btn btn-sm btn-success py-0 px-2">
                                                    <i className="bi bi-download"></i>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {canMerge && (
                                <div className="text-center bg-light p-2 rounded border">
                                    {mergeStatus === 'merging' && <p className="text-info mb-0">Merging PDFs...</p>}
                                    {mergedPdfUrl ? (
                                        <div className="animate__animated animate__fadeIn">
                                            <div className="text-success smaller font-weight-bold mb-1" style={{ fontSize: '0.75rem' }}>Success! Combined into one PDF.</div>
                                            <a href={mergedPdfUrl} download="merged-document.pdf" className="premium-btn premium-btn-primary py-1 px-3 btn-block text-center" style={{ fontSize: '0.8rem' }}>
                                                <i className="bi bi-file-earmark-pdf mr-2"></i> Download Merged PDF
                                            </a>
                                        </div>
                                    ) : (
                                        <button className="btn btn-dark btn-sm btn-block py-1 btn-compact shadow-sm" onClick={this.mergePdfs} disabled={mergeStatus === 'merging'}>
                                            <i className="bi bi-collection mr-1"></i> Merge All to Single PDF
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Hidden Container - essential for high-fidelity rendering */}
                    <div style={{ position: 'absolute', top: '-10000px', left: '-5000px', width: '100vw', display: 'flex', justifyContent: 'center' }}>
                        <div ref={this.hiddenContainerRef} className="word-render-container" style={{ width: '800px' }}></div>
                    </div>

                    {/* SEO Content Section - Helps Google index the page */}
                    <div className="mt-5 pt-4 border-top">
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <h6 className="font-weight-bold text-dark mb-2">High-Fidelity DOCX to PDF</h6>
                                <p className="text-muted small">
                                    Our converter uses a high-fidelity rendering engine to ensure that your Word documents look exactly the same in PDF format. We preserve layouts, fonts, and images with pixel-perfect accuracy.
                                </p>
                            </div>
                            <div className="col-md-6 mb-4">
                                <h6 className="font-weight-bold text-dark mb-2">Secure & Private</h6>
                                <p className="text-muted small">
                                    Your documents are processed entirely in your browser. We never upload your files to any server, ensuring 100% privacy and security for your sensitive data.
                                </p>
                            </div>
                            <div className="col-md-6 mb-4">
                                <h6 className="font-weight-bold text-dark mb-2">Merge Multiple Files</h6>
                                <p className="text-muted small">
                                    Easily convert multiple Word files at once and choose to merge them into a single, organized PDF document with just one click.
                                </p>
                            </div>
                            <div className="col-md-6 mb-4">
                                <h6 className="font-weight-bold text-dark mb-2">Free & Fast</h6>
                                <p className="text-muted small">
                                    Techtools provides professional-grade document conversion tools for free. No registration is required, and there are no limits on file sizes or daily usage.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default WordToPdf;
