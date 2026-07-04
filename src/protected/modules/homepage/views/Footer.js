import React from 'react';
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="site-footer py-5 border-top bg-dark text-white shadow-lg">
            <div className="container">
                <div className="row mb-5">
                    {/* Brand Column */}
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <div className="widget pe-lg-5">
                            <h3 className="h5 font-weight-bold text-white mb-3">Techtools Store</h3>
                            <p className="text-muted small lh-lg">
                                Your all-in-one suite for digital efficiency. We provide professional-grade, browser-based tools that handle your documents, images, and daily tasks with 100% privacy and no cost.
                            </p>
                            {/* <div className="social-links mt-4 d-flex gap-3">
                                <a href="https://github.com" className="text-white-50 hover-white"><i className="bi bi-github h5"></i></a>
                                <a href="https://linkedin.com" className="text-white-50 hover-white"><i className="bi bi-linkedin h5"></i></a>
                                <a href="https://twitter.com" className="text-white-50 hover-white"><i className="bi bi-twitter-x h5"></i></a>
                            </div> */}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="col-lg-8">
                        <div className="row">
                            {/* PDF Tools */}
                            <div className="col-6 col-md-3 mb-4 mb-md-0">
                                <div className="widget">
                                    <h3 className="h6 font-weight-bold text-white text-uppercase mb-3">PDF Tools</h3>
                                    <ul className="list-unstyled footer-links small">
                                        <li className="mb-2"><Link to="/pdfMerge" className="text-muted text-decoration-none hover-primary">Merge PDF Files</Link></li>
                                        <li className="mb-2"><Link to="/word-to-pdf" className="text-muted text-decoration-none hover-primary">Word to PDF</Link></li>
                                        <li className="mb-2"><Link to="/unlock-pdf" className="text-muted text-decoration-none hover-primary">Unlock PDF</Link></li>
                                        <li className="mb-2"><Link to="/lock-pdf" className="text-muted text-decoration-none hover-primary">Lock PDF</Link></li>
                                    </ul>
                                </div>
                            </div>

                            {/* Image Tools */}
                            <div className="col-6 col-md-3 mb-4 mb-md-0">
                                <div className="widget">
                                    <h3 className="h6 font-weight-bold text-white text-uppercase mb-3">Image Tools</h3>
                                    <ul className="list-unstyled footer-links small">
                                        <li className="mb-2"><Link to="/imgConverter" className="text-muted text-decoration-none hover-primary">Image Converter</Link></li>
                                        <li className="mb-2"><Link to="/imageCompress" className="text-muted text-decoration-none hover-primary">Image Compressor</Link></li>
                                        <li className="mb-2"><Link to="/resize-image" className="text-muted text-decoration-none hover-primary">Resize & Crop</Link></li>
                                        <li className="mb-2"><Link to="/qrcode" className="text-muted text-decoration-none hover-primary">QR Code Generator</Link></li>
                                    </ul>
                                </div>
                            </div>

                            {/* Productivity */}
                            <div className="col-6 col-md-3 mb-4 mb-md-0">
                                <div className="widget">
                                    <h3 className="h6 font-weight-bold text-white text-uppercase mb-3">Productivity</h3>
                                    <ul className="list-unstyled footer-links small">
                                        <li className="mb-2"><Link to="/unit-converter" className="text-muted text-decoration-none hover-primary">Unit Converter</Link></li>
                                        <li className="mb-2"><Link to="/expense-tracker" className="text-muted text-decoration-none hover-primary">Expense Tracker</Link></li>
                                        <li className="mb-2"><Link to="/todo" className="text-muted text-decoration-none hover-primary">To-Do List</Link></li>
                                        <li className="mb-2"><Link to="/regularchecks" className="text-muted text-decoration-none hover-primary">Daily Checklist</Link></li>
                                    </ul>
                                </div>
                            </div>

                            {/* Company */}
                            <div className="col-6 col-md-3">
                                <div className="widget">
                                    <h3 className="h6 font-weight-bold text-white text-uppercase mb-3">Resources</h3>
                                    <ul className="list-unstyled footer-links small">
                                        <li className="mb-2"><Link to="/learn-typing" className="text-muted text-decoration-none hover-primary">Practice Typing</Link></li>
                                        <li className="mb-2"><Link to="/typing-tips" className="text-muted text-decoration-none hover-primary">Typing Tips</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="bg-white-50 border-white-50 opacity-25" />

                <div className="row align-items-center pt-4">
                    <div className="col-12 text-center">
                        <p className="text-muted small mb-0">
                            &copy; {new Date().getFullYear()} <span className="text-white font-weight-bold">Techtools Store</span>. Made with ❤️ in India.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
