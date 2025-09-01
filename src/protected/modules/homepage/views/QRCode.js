import React, { Component } from 'react'
import Header from './Header';
import Footer from './Footer';
import DocumentMeta from 'react-document-meta';
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
        const meta = {
            title: 'QR Generator WebLaunch Store',
            description: 'Generate or Download any URL or Text into Scanable QR Code',
            canonical: 'https://techtools.gummadii.com/qrcode',
            meta: {
                name: {
                    keywords: 'QR Code, Generate QR, Free Tools, Business Tools, allinone'
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
                                <h3>Generate QR code</h3>
                                <p>Generate any URL or Text into High Quality Scanable QR Code. You can also Download it</p>
                            </div>
                        </div>
                        {this.state.inputValue ?
                            <div style={{ height: "auto", margin: "0 auto", maxWidth: 200, width: "100%" }}>
                                <QRCodeGenerator
                                    id="qrCodeEl"
                                    size={256}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    level='H'
                                    renderAs='canvas'
                                    includeMargin='true'
                                    value={this.state.inputValue}
                                />

                            </div>
                            :
                            <h6 className='text-center m-3'>Waiting for input...</h6>
                        }
                        <form onSubmit={e => { e.preventDefault(); }}>
                            <div className="form-group text-center">
                                <input type="text" className="form-control" placeholder='Type anything...' value={this.state.inputValue} id="qrUploadBtn" maxLength="256" size="256" required onChange={this.onTextChange} />
                                <i style={{ textAlign: "left", display: "block", color: "#fb7575", fontSize: "10px" }}>Max Limit for input is 256 characters</i><br />
                                {this.state.inputValue ?
                                    <>
                                        <a onClick={this.dowloadUrl} href={this.state.qrUrl} download={`${encodeURI(this.state.inputValue).replace(/[^a-zA-Z0-9 ]/g, 'SA')}_WLStore`} className="btn btn-primary">Download QR</a>
                                        <a href="/qrcode" className='text-center d-block text-decoration-underline' style={{ fontWeight: "700", textDecoration: "underline", fontSize: "17px" }}>Start Over</a>
                                    </>
                                    : <span></span>}
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </DocumentMeta>
        )
    }
}
