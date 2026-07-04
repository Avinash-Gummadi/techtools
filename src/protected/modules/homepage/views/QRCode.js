import React, { Component } from 'react'
import Header from './Header';
import Footer from './Footer';
import SEO from '../../../../components/SEO';
import QRCodeGenerator from 'qrcode.react';

export default class QRCode extends Component {
    constructor(props) {
        super(props);
        this.onTextChange = this.onTextChange.bind(this);
        this.dowloadUrl = this.dowloadUrl.bind(this);
        this.state = {
            inputValue: '',
            qrUrl: ''
        }
    }
    onTextChange(e) {
        if (!(/^\s/.test(e.target.value))) {
            this.setState({
                inputValue: e.target.value,
            });
        }
    }
    dowloadUrl() {
        const qrCodeURL = document.getElementById('qrCodeEl').toDataURL("image/png");
        this.setState({
            qrUrl: qrCodeURL
        });
    }
    render() {
        return (
            <>
                <SEO
                    title="QR Code Generator | Create Free Scanable QR Codes"
                    description="Create high-quality, scanable QR codes for any URL or text instantly. Free, secure, and customizable QR code generator for your business or personal use."
                    keywords="QR Code Generator, create qr code, free qr generator, techtools, scanable qr"
                    canonical="https://techtools.gummadii.com/qrcode"
                />
                <Header />
                <div className="container">
                    <div style={{ marginTop: "100px" }}>
                        <div className="unit-5 text-center">
                            <div className="unit-4-icon mr-4">
                                <span className="bi bi-qr-code text-primary" style={{ fontSize: '2rem' }}></span>
                            </div>
                            <div>
                                <h3>Generate QR code</h3>
                                <p>Convert any URL or text into a professional QR code in seconds.</p>
                            </div>
                        </div>
                        {this.state.inputValue ?
                            <div className="d-flex flex-column align-items-center mb-4">
                                <div className="p-3 bg-white shadow-sm rounded border">
                                    <QRCodeGenerator
                                        id="qrCodeEl"
                                        size={200}
                                        level='H'
                                        renderAs='canvas'
                                        includeMargin={true}
                                        value={this.state.inputValue}
                                    />
                                </div>
                            </div>
                            :
                            <div className="text-center p-4 bg-light rounded border mb-4">
                                <h6 className='text-muted mb-0'>Type in the box below to generate your QR code</h6>
                            </div>
                        }
                        <form onSubmit={e => { e.preventDefault(); }}>
                            <div className="form-group text-center">
                                <input type="text" className="form-control form-control-lg text-center" placeholder='Enter URL or Text here...' value={this.state.inputValue} id="qrUploadBtn" maxLength="256" required onChange={this.onTextChange} />
                                <small className="text-muted d-block mt-1">Maximum 256 characters</small>

                                {this.state.inputValue && (
                                    <div className="mt-3 d-flex flex-column align-items-center gap-2">
                                        <a onClick={this.dowloadUrl} href={this.state.qrUrl} download={`${encodeURI(this.state.inputValue).replace(/[^a-zA-Z0-9 ]/g, 'SA')}_Techtools.png`} className="btn btn-primary px-4">
                                            <i className="bi bi-download mr-1"></i> Download PNG
                                        </a>
                                        <button className="btn btn-link text-muted small mt-2" onClick={() => this.setState({ inputValue: '' })}>Clear & Restart</button>
                                    </div>
                                )}
                            </div>
                        </form>

                        {/* SEO Content Section */}
                        <div className="mt-5 pt-4 border-top">
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <h6 className="font-weight-bold text-dark mb-2">What is a QR Code?</h6>
                                    <p className="text-muted small">
                                        Quick Response (QR) codes are two-dimensional barcodes that can store information such as website URLs, plain text, or contact details. They are easily readable by smartphones and cameras.
                                    </p>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <h6 className="font-weight-bold text-dark mb-2">High-Resolution Output</h6>
                                    <p className="text-muted small">
                                        Our generator produces clean, high-resolution QR codes that are suitable for printing on business cards, posters, and digital displays without losing quality.
                                    </p>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <h6 className="font-weight-bold text-dark mb-2">Private & Offline</h6>
                                    <p className="text-muted small">
                                        Like all Techtools, the QR generator works locally in your browser. Your typed data is never sent to our servers, keeping your information private.
                                    </p>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <h6 className="font-weight-bold text-dark mb-2">Universal Compatibility</h6>
                                    <p className="text-muted small">
                                        The QR codes generated here follow international standards and can be scanned by any standard QR reader on iOS, Android, and desktop devices.
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
