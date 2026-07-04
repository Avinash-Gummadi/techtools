import React from 'react';
import { Link } from "react-router-dom";
import './header.css'
export default function Header() {
    return (
        <div>
            {/* Mobile Hamburger */}
            <div className="site-mobile-menu site-navbar-target">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close">
                        <span className="icofont-close js-menu-toggle"></span>
                    </div>
                </div>
                <div className="site-mobile-menu-body"></div>
            </div>
            {/* Header */}
            <div className="container">
                <nav className="site-nav">
                    <Link to="/" className="text-white cmpyname">TECHTOOLS<span className="text-black">.</span></Link>
                    <div className="logo">
                        <Link to="/" className="text-white">
                            <img width={95} height={95} src="images/logo.png" alt="Techtools Store" />
                        </Link>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-12 col-sm-12 col-lg-12 site-navigation text-center">
                            <ul className="js-clone-nav d-none d-lg-inline-block text-left site-menu">
                                {/* <li className="active"><Link to="/">Home</Link></li>
                                <li className="has-children">
                                    <Link to="#">Services</Link>
                                    <ul className="dropdown">
                                        <li><Link to="/todo">ToDo</Link></li>
                                        <li><Link to="/portfolio">Portfolio</Link></li>
                                        <li><Link to="/single">Single</Link></li>
                                        <li><Link to="/about">About</Link></li>
                                        <li><Link to="/contact">Contact</Link></li>

                                        <li className="has-children">
                                            <Link to="#">Menu Two</Link>
                                            <ul className="dropdown">
                                                <li><Link to="#">Sub Menu One</Link></li>
                                                <li><Link to="#">Sub Menu Two</Link></li>
                                                <li><Link to="#">Sub Menu Three</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link to="#">Menu Three</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/elements">Elements</Link></li>
                                <li><Link to="/contact">Contact us</Link></li> */}
                            </ul>

                            <ul className="js-clone-nav d-none d-lg-inline-block text-left site-menu float-right menu-absolute">
                                <li className="cta-button tmp-hide"><a href="/" target="_blank" rel="noreferrer">Login</a></li>
                            </ul>

                            {/* <Link to="#" className="burger light ml-auto site-menu-toggle js-menu-toggle d-block d-lg-none" data-toggle="collapse" data-target="#main-navbar">
                                <span></span>
                            </Link> */}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
