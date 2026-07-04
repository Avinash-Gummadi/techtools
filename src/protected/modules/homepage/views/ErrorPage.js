import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from "react-router-dom";
import SEO from '../../../../components/SEO';

const ErrorPage = () => {
    return (
        <>
            <SEO
                title="404 Page Not Found | Techtools Store"
                description="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Back to Techtools Store homepage."
                canonical="https://techtools.gummadii.com/404"
                keywords="404, Page Not Found, Techtools Store, Error Page"
            />
            <div className="site-wrap">
                <Header />

                <div className="site-section bg-dark" style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('images/hero-min.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    paddingTop: '180px',
                    paddingBottom: '100px',
                    position: 'relative',
                    marginTop: '0'
                }}>
                    <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                        <div className="row align-items-center justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="text-white font-weight-bold mb-4" data-aos="fade-up" style={{ fontSize: '80px', lineHeight: '1' }}>404</h1>
                                <h2 className="text-white h3 mb-4" data-aos="fade-up" data-aos-delay="100">Oops! Page disappeared.</h2>
                                <p className="text-white mb-5" data-aos="fade-up" data-aos-delay="200" style={{ fontSize: '1.2rem', opacity: '0.9' }}>
                                    We can't seem to find the page you're looking for. It might have been moved or deleted.
                                    Don't worry, our productivity tools are still here to help you!
                                </p>
                                <div data-aos="fade-up" data-aos-delay="300">
                                    <Link to="/" className="btn btn-primary btn-lg px-5 py-3 font-weight-bold shadow-lg">
                                        <span className="bi bi-house-door mr-2"></span> Back to Homepage
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="site-section bg-light" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="container">
                        <div className="row mb-5 justify-content-center">
                            <div className="col-md-7 text-center" data-aos="fade-up">
                                <h2 className="heading font-weight-bold mb-3">Popular Services</h2>
                                <p className="text-muted">Explore some of our most used tools to get back on track.</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="100">
                                <Link to="/video-to-glimpse">
                                    <div className="unit-4 d-flex">
                                        <div className="unit-4-icon mr-4">
                                            <span className="feather-video bi bi-stars text-primary"></span>
                                        </div>
                                        <div>
                                            <h3>Video Glimpse Creator</h3>
                                            <p>Create high-quality short glimpses from your videos.</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="200">
                                <Link to="/pdfMerge">
                                    <div className="unit-4 d-flex">
                                        <div className="unit-4-icon mr-4">
                                            <span className="feather-git-merge text-primary"></span>
                                        </div>
                                        <div>
                                            <h3>Merge PDF Files</h3>
                                            <p>Combine multiple PDF files into one easily.</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="300">
                                <Link to="/word-to-pdf">
                                    <div className="unit-4 d-flex">
                                        <div className="unit-4-icon mr-4">
                                            <span className="feather-file-text text-primary"></span>
                                        </div>
                                        <div>
                                            <h3>Word to PDF</h3>
                                            <p>Convert your Word documents to PDF format.</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="row mt-5 justify-content-center" data-aos="fade-up" data-aos-delay="400">
                            <div className="col-md-8 text-center">
                                <div className="p-4 bg-white shadow-sm rounded">
                                    <h4 className="mb-3">Need help?</h4>
                                    <p className="mb-4">If you think this is a mistake, please reach out to our support or search on Google.</p>
                                    <form action="https://www.google.com/search" className="searchform d-flex" method="get" name="searchform" target="_blank">
                                        <input autoComplete="on" className="form-control mr-2" name="q" placeholder="Search for tools..." required="required" type="text" />
                                        <button type="submit" className="btn btn-primary px-4">Search</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default ErrorPage;
