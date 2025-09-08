import React, { Component } from 'react';
import PDFMerger from 'pdf-merger-js/browser';
import Header from './Header';
import Footer from './Footer';
import DocumentMeta from 'react-document-meta';

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
                return this.setState({pdfUrl: 'Err' });
            });
        };
        MergePdf(this.state.pdfArray);
    }

    render() {
        const meta = {
            title: 'Techtools Store Merge PDF Files',
            description: 'Upload 2 or more PDF files to Merge into a single PDF file',
            canonical: 'https://techtools.gummadii.com/pdfMerge',
            meta: {
                name: {
                    keywords: 'Merge PDF Files, pdf merge'
                }
            }
        };
        return (
            <DocumentMeta {...meta}>
                <Header />
                <div className="container">
                    <div style={{ marginTop: "100px" }}>
                        <div className="unit-5 text-center">
                            <div className="unit-4-icon mr-4">
                                <span className="feather-git-merge"></span>
                            </div>
                            <div>
                                <h3>Merge PDF Files</h3>
                                <p>You can Upload 2 or more PDF files to Merge into a single PDF file</p>
                            </div>
                        </div>
                        {this.state.pdfUrl ?
                            this.state.pdfUrl === 'Err' ?
                                <span style={{ color: "red", display: "block" }} className="text-center">Something Went Wrong...Please try again</span>
                                :
                                <div style={{ margin: "55px" }} className="text-center">
                                    <h1 style={{ textCenter: "center", marginBottom: "30px" }}>File is Ready</h1>
                                    <a href={this.state.pdfUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Download Merged PDF</a>
                                </div>

                            :
                            <>
                                {this.state.pdfArray.length !== 0 ?
                                    <div style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "space-around",
                                        margin: "40px",
                                        padding: "25px",
                                        border: "1px solid #EFEFEF",
                                        background: "#6b2626",
                                        borderRadius: "10px"
                                    }}>
                                        {
                                            this.state.pdfArray.map((eachPdfUrl, idx) => (
                                                <iframe src={eachPdfUrl[0]} frameBorder="0" title={eachPdfUrl[1].name} width="200" height="200" key={idx} className="mr-3 mt-3" style={{ textAlign: "center", borderRadius: '12px' }}></iframe>
                                            ))

                                        }
                                    </div>
                                    :
                                    <h6 className='text-center m-3'>Waiting for files...</h6>
                                }
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group text-center">
                                        {!this.state.preview &&
                                            <span>
                                                <label htmlFor="pdfUploadBtn" className="btn btn-primary"><span className="feather-upload"></span> Upload Files</label><br />
                                            </span>
                                        }
                                        <input type="file" name="pdfCollection" id="pdfUploadBtn" accept="application/pdf" onChange={this.onFileChange} multiple style={{ display: "none" }} />
                                    </div>
                                    <div className="form-group" style={{ display: "flex", justifyContent: "center", gap: "17px" }}>
                                        {this.state.preview &&
                                            <>
                                                <label htmlFor="pdfUploadBtn" className="btn btn-primary" style={{ marginBottom: 0 }}><span className="feather-upload"></span> Add More</label>
                                                <button className="btn btn-primary" type="submit">Merge</button>
                                            </>
                                        }
                                    </div>
                                </form>
                            </>}
                            {this.state.preview && <a href="/pdfMerge" className='text-center d-block text-decoration-underline' style={{fontWeight: "700",textDecoration: "underline",fontSize: "17px"}}>Start Over</a>}
                    </div>
                </div>
                <Footer />
            </DocumentMeta>
        )
    }
}
