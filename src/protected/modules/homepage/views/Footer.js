import React from 'react';
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <>
            {/* Footer */}
            <div className="site-footer">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-4">
                            <div className="widget">
                                <h3>About</h3>
                                <p>We create simple yet powerful digital solutions that help people work smarter, save time, and manage everyday tasks with ease and efficiency.</p>
                            </div>

                            {/* <div className="widget">
                                <h3>Connect with us</h3>
                                <ul className="social list-unstyled">
                                    <li><a href="https://facebook.com" target="_blank" rel="noreferrer"><span className="icon-facebook"></span></a></li>
                                    <li><a href="https://twitter.com" target="_blank" rel="noreferrer"><span className="icon-twitter"></span></a></li>
                                    <li><a href="https://instagram.com" target="_blank" rel="noreferrer"><span className="icon-instagram"></span></a></li>
                                    <li><a href="https://dribble.com" target="_blank" rel="noreferrer"><span className="icon-dribbble"></span></a></li>
                                    <li><a href="https://linkedin.com" target="_blank" rel="noreferrer"><span className="icon-linkedin"></span></a></li>
                                </ul>
                            </div> */}
                        </div>

                        {/* <div className="col-lg-6">
                            <div className="row">
                                <div className="col-12">
                                    <div className="widget">
                                        <h3>Navigations</h3>
                                    </div>
                                </div>
                                <div className="col-6 col-sm-6 col-md-4">
                                    <div className="widget">
                                        <ul className="links list-unstyled">
                                            <li><Link to="/">Home</Link></li>
                                            <li><Link to="#">Services</Link></li>
                                            <li><Link to="#">Work</Link></li>
                                            <li><Link to="#">Process</Link></li>
                                            <li><Link to="about">About Us</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-6 col-sm-6 col-md-4">
                                    <div className="widget">
                                        <ul className="links list-unstyled">
                                            <li><Link to="#">Press</Link></li>
                                            <li><Link to="#">Blog</Link></li>
                                            <li><Link to="contact">Contact</Link></li>
                                            <li><Link to="#">Support</Link></li>
                                            <li><Link to="#">Privacy</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-6 col-sm-6 col-md-4">
                                    <div className="widget">
                                        <ul className="links list-unstyled">
                                            <li><Link to="#">Privacy</Link></li>
                                            <li><Link to="#">FAQ</Link></li>
                                            <li><Link to="#">Careers</Link></li>
                                            <li><Link to="#">Process</Link></li>
                                            <li><Link to="about">About Us</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    <div className="row justify-content-center text-center copyright">
                        <div className="col-md-8">
                            <p>Copyright &copy;{(new Date().getFullYear())}. All Rights Reserved. 
                                {/* &mdash; Designed with love by <a href="https://untree.co" target="_blank" rel="nofollow noopener noreferrer">Untree.co</a> &bullet; <a href="https://untree.co/license" target="_blank" rel="nofollow noopener noreferrer">License</a> */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div id="overlayer"></div>
            <div className="loader">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div> */}
        </>
    )
}
