import React, { Component } from 'react';
import imageCompression from 'browser-image-compression';
import Header from './Header';
import Footer from './Footer';
import DocumentMeta from 'react-document-meta';

export default class UploadPdf extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            imgUrl: '',
            originalImg: [],
            compressedImg: []
        }
    }
    async onFileChange(e) {
        try {
            const imageFile = e.target.files[0];
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            }
            const compressedFile = await imageCompression(imageFile, options);
            this.state.originalImg.push(imageFile.type.replace('image/', ''), Math.round(imageFile.size / 1024), URL.createObjectURL(imageFile));
            const compressPercent = Math.round(100 - ((compressedFile.size / 1024) / (imageFile.size / 1024)) * 100);
            this.state.compressedImg.push(compressedFile.type.replace('image/', ''), Math.round(compressedFile.size / 1024), URL.createObjectURL(compressedFile), compressPercent, compressedFile.name.replace('.png/.jpg/.jpeg/.gif', '_'));
            this.setState({
                imgUrl: URL.createObjectURL(compressedFile),
            })
        } catch (err) {
            console.log(err);
            this.setState({
                imgUrl: 'err'
            })
        }
    }

    render() {
        const meta = {
            title: 'WebLaunch Store Image Compressor',
            description: 'Upload any Image to Compress',
            canonical: 'https://techtools.gummadii.com/imageCompress',
            meta: {
                name: {
                    keywords: 'Image Compressor, Compress, Compressor'
                }
            }
        };
        return (
            <DocumentMeta {...meta}>
                <Header />
                <div className="container" style={{ marginTop: "100px" }}>
                    <div className="unit-5 text-center">
                        <div className="unit-4-icon mr-4">
                            <span className="feather-scissors"></span>
                        </div>
                        <div>
                            <h3>Image Compressor</h3>
                            <p>You can Upload any Image to Compress</p>
                        </div>
                    </div>
                    {this.state.imgUrl ?
                        this.state.imgUrl === 'Err' ?
                            <span style={{ color: "red", display: "block" }} className="text-center">Something Went Wrong...Please try again</span>
                            :
                            <div style={{ margin: "55px" }} className="text-center">
                                <div style={{ display: "flex", justifyContent: "center", gap: "80px", margin: "10px" }}>
                                    <div>
                                        <img src={this.state.originalImg[2]} width="200px" height="200px" alt="" /><br />
                                        <span>Type: {this.state.originalImg[0]}</span><br />
                                        <span>Size: {this.state.originalImg[1]} KB</span><br />

                                    </div>
                                    <div className="unit-5" style={{ display: "flex", alignItems: "center" }}>
                                        <div className="unit-4-icon mb-5">
                                            <span className="feather-fast-forward"></span>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={this.state.imgUrl} width="200px" height="200px" style={{ transform: "rotate(45deg)" }} alt="" /><br />
                                        <span>Type: {this.state.compressedImg[0]}</span><br />
                                        <span>Size: {this.state.compressedImg[1]} KB</span><br />
                                    </div>
                                </div>
                                <a href={this.state.imgUrl} className="btn btn-primary" download={`wlstore_${this.state.compressedImg[4]}`}>Download Image</a>
                                <h6 style={{ textCenter: "center", margin: "15px" }}>Image Compressed upto {this.state.compressedImg[3]}%</h6>
                                <a href="/imageCompress" className='text-center d-block text-decoration-underline' style={{ fontWeight: "700", textDecoration: "underline", fontSize: "17px" }}>Start Over</a>
                            </div>

                        :
                        <>
                            <form onSubmit={e => e.preventDefault()}>
                                <div className="form-group text-center">
                                    <span>
                                        <label htmlFor="pdfUploadBtn" className="btn btn-primary"><span className="feather-upload"></span> Upload Image</label><br />
                                    </span>
                                    <input type="file" name="pdfCollection" id="pdfUploadBtn" accept="image/*" onChange={this.onFileChange} style={{ display: "none" }} />
                                </div>
                            </form>
                        </>}
                </div>
                <Footer />
            </DocumentMeta>
        )
    }
}
