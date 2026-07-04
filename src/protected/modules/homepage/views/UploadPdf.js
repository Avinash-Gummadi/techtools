import React, { Component } from 'react';
import PDFMerger from 'pdf-merger-js/browser';
import Header from './Header';
import Footer from './Footer';
import SEO from '../../../../components/SEO';

export default class UploadPdf extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            preview: false,
            pdfArray: [],
            pdfUrl: ''
        }
    }
    onFileChange(e) {
        const AddToArray = async (pdfDetails) => {
            for (const key of Object.keys(pdfDetails)) {
                await this.state.pdfArray.push([URL.createObjectURL(pdfDetails[key]), pdfDetails[key]]);
            };
            this.setState({ preview: true });
        }
        AddToArray(e.target.files);
    }
    onSubmit(e) {
        e.preventDefault();
        const MergePdf = (files) => {
            const render = async () => {
                const merger = new PDFMerger();

                for (const file of files) {
                    await merger.add(file[1]);
                }

                const mergedPdf = await merger.saveAsBlob();
                const url = URL.createObjectURL(mergedPdf);
                return this.setState({ pdfUrl: url });
            };

            render().catch((err) => {
                return this.setState({ pdfUrl: 'Err' });
            });
        };
        MergePdf(this.state.pdfArray);
    }

    render() {
        return (
            <>
                <SEO
                    title="Merge PDF Online | Combine Multiple PDF Files for Free"
                    description="Upload two or more PDF files and merge them into a single document instantly. Fast, secure, and preserves original file quality without any watermarks."
                    keywords="merge pdf, combine pdf, join pdf files, free pdf tools, techtools"
                    canonical="https://techtools.gummadii.com/pdfMerge"
                />
                <Header />
                <div className="container">
                    <div style={{ marginTop: "100px" }}>
                        <div className="unit-5 text-center">
                            <div className="unit-4-icon mr-4">
                                <span className="feather-git-merge text-primary" style={{ fontSize: '2rem' }}></span>
                            </div>
                            <div>
                                <h3>Merge PDF Files</h3>
                                <p>Combine multiple PDF documents into a single, organized file.</p>
                            </div>
                        </div>
                        {this.state.pdfUrl ?
                            this.state.pdfUrl === 'Err' ?
                                <div className="alert alert-danger m-4">Something went wrong... Please try again.</div>
                                :
                                <div className="text-center p-5 bg-white shadow-sm rounded border m-4 animate__animated animate__fadeIn">
                                    <div className="bi bi-file-earmark-check text-success mb-3" style={{ fontSize: '3rem' }}></div>
                                    <h3 className="mb-4">Your PDF is Ready!</h3>
                                    <a href={this.state.pdfUrl} download="merged_techtools.pdf" className="btn btn-success btn-lg px-5 shadow-sm">
                                        <i className="bi bi-download mr-2"></i> Download Now
                                    </a>
                                    <div className="mt-4">
                                        <button className="btn btn-link text-muted" onClick={() => window.location.reload()}>Merge More Files</button>
                                    </div>
                                </div>

                            :
                            <>
                                {this.state.pdfArray.length !== 0 ?
                                    <div style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "center",
                                        margin: "20px auto",
                                        padding: "20px",
                                        background: "#f8f9fa",
                                        borderRadius: "12px",
                                        border: "2px dashed #dee2e6",
                                        maxWidth: '800px'
                                    }}>
                                        {
                                            this.state.pdfArray.map((eachPdfUrl, idx) => (
                                                <div key={idx} className="m-2 position-relative">
                                                    <iframe src={eachPdfUrl[0]} frameBorder="0" title={eachPdfUrl[1].name} width="160" height="200" style={{ borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}></iframe>
                                                    <div className="small text-truncate mt-1" style={{ maxWidth: '160px' }}>{eachPdfUrl[1].name}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    :
                                    <div className="text-center p-4 bg-light rounded border mb-4">
                                        <p className='text-muted mb-0 italic'>No files selected yet</p>
                                    </div>
                                }
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group text-center">
                                        <input type="file" name="pdfCollection" id="pdfUploadBtn" accept="application/pdf" onChange={this.onFileChange} multiple style={{ display: "none" }} />

                                        {!this.state.preview ? (
                                            <label htmlFor="pdfUploadBtn" className="btn btn-primary btn-lg px-4 shadow-sm">
                                                <i className="bi bi-plus-circle mr-2"></i> Select PDF Files
                                            </label>
                                        ) : (
                                            <div className="d-flex justify-content-center align-items-center">
                                                <label htmlFor="pdfUploadBtn" className="btn btn-outline-primary shadow-sm mr-3" style={{ marginBottom: 0 }}>
                                                    <i className="bi bi-file-earmark-plus mr-1"></i> Add More
                                                </label>
                                                <button className="btn btn-primary btn-lg px-5 shadow-sm" type="submit">
                                                    <i className="bi bi-intersect mr-2"></i> Merge PDFs
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </>}

                        {/* SEO Content Section */}
                        <div className="mt-5 pt-4 border-top">
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <h6 className="font-weight-bold text-dark mb-2">Why Merge PDF Files?</h6>
                                    <p className="text-muted small">
                                        Merging PDFs allows you to combine separate documents—such as reports, receipts, or certificates—into a single file for easier sharing and better organization.
                                    </p>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <h6 className="font-weight-bold text-dark mb-2">Maintain Original Quality</h6>
                                    <p className="text-muted small">
                                        Our merging tool preserves the original resolution, formatting, and hyperlinks of your documents. The resulting PDF will look exactly like the source files, just in one continuous document.
                                    </p>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <h6 className="font-weight-bold text-dark mb-2">100% Browser-Based Security</h6>
                                    <p className="text-muted small">
                                        Unlike other online tools, Techtools processes your PDFs locally in your browser. Your private documents are never uploaded to a cloud server, ensuring complete data sovereignty.
                                    </p>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <h6 className="font-weight-bold text-dark mb-2">Organize with Ease</h6>
                                    <p className="text-muted small">
                                        Simply select your files in the order you want them to appear, or add more as you go. Our tool handles the complexity of PDF structures so you don't have to.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}
