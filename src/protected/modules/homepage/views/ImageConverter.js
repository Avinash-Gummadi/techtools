import React, { Component } from 'react';
import ConvertImage from "react-convert-image";
import Header from './Header';
import Footer from './Footer';
import DocumentMeta from 'react-document-meta';

export default class ImageConverter extends Component {
    constructor(props) {
        super(props);
        this.handleConvertedImage = this.handleConvertedImage.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.state = {
            imgArray: [],
            preview: false,
            imgUrl: '',
            imgExt: 'png'
        }
    }
    handleConvertedImage(url) {
        this.setState({
            imgUrl: url
        })
    }
    onSelectChange(e) {
        this.setState({
            imgExt: e.target.value
        })
    }
    onFileChange(e) {
        const AddToArray = async (imgDetails) => {
            for (const key of Object.keys(imgDetails)) {
                await this.state.imgArray.push([URL.createObjectURL(imgDetails[key]), imgDetails[key]]);
            };
            this.setState({
                preview: true
            });
        }
        AddToArray(e.target.files);
    }
    render() {
        const meta = {
            title: 'WebLaunch Store Image Converter',
            description: 'Upload any image to Convert into jpg or png or webp',
            canonical: 'https://techtools.gummadii.com/imgConverter',
            meta: {
                name: {
                    keywords: 'Image Converter, png, jpg, webp'
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
                                <span className="feather-image"></span>
                            </div>
                            <div>
                                <h3>Image Converter</h3>
                                {this.state.preview ?
                                    <p>Preview your image before downloading</p>
                                    :
                                    <p>Upload any image to Convert into jpg or png or webp with high quality</p>
                                }
                            </div>
                        </div>
                        {this.state.imgUrl ?
                            <>
                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    padding: "25px",
                                }}>
                                    {
                                        <div>
                                            <img src={this.state.imgUrl} alt="" width="200px" height="200px" />
                                        </div>

                                    }
                                </div>

                                <div style={{ margin: "15px" }} className="text-center">
                                    <h4 style={{ textAlign: "center" }}>File Ready</h4>
                                    <a href={this.state.imgUrl} download={`WLStore_${this.state.imgArray[0][1].size}`} className="btn btn-primary">Download Image</a>
                                </div>
                                {this.state.preview && <a href="/imgConverter" className='text-center d-block text-decoration-underline' style={{ fontWeight: "700", textDecoration: "underline", fontSize: "17px" }}>Start Over</a>}
                            </>
                            :
                            <>
                                {this.state.imgArray.length !== 0 ?
                                    this.state.imgArray.map((eachimgUrl, idx) => (
                                        <div key={idx} className="imgHolder">
                                            <ConvertImage
                                                image={eachimgUrl[0]}
                                                format={this.state.imgExt}
                                                quality={0.99}
                                                onConversion={this.handleConvertedImage}
                                            />
                                            <span style={{ color: "red", display: "block" }} className="text-center">Processing the image...please wait...</span>

                                        </div>
                                    ))
                                    :
                                    <h6 className='text-center m-3'>Waiting for image...</h6>
                                }
                                <form>
                                    <div className="form-group text-center">
                                        {!this.state.preview &&
                                            <>
                                                <span style={{ fontWeight: "bold", fontSize: "25px" }}>Convert to: </span>
                                                <select className="form-select select_class" aria-label="Formats" onChange={this.onSelectChange}>
                                                    <option defaultValue="png">PNG</option>
                                                    <option value="jpeg">JPG</option>
                                                    <option value="webp">WEBP</option>
                                                </select>
                                                <span>
                                                    <label htmlFor="imgUploadBtn" className="btn btn-primary"><span className="feather-upload"></span> Upload Image</label><br />
                                                </span>
                                            </>
                                        }
                                        <input type="file" name="imgCollection" id="imgUploadBtn" accept="image/*" onChange={this.onFileChange} style={{ display: "none" }} />
                                    </div>
                                </form>
                            </>}
                    </div>
                </div>
                <Footer />
            </DocumentMeta>
        );
    }
}