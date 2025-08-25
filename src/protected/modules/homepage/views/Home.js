import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from "react-router-dom";
import DocumentMeta from 'react-document-meta';
import "bootstrap-icons/font/bootstrap-icons.css"

export default function Home() {
  const meta = {
    title: 'WebLaunch Store',
    description: 'Our WebLaunch Store have all the market rich tools',
    canonical: 'http://localhost:3000/',
    meta: {
      name: {
        keywords: 'Free Tools, Business Tools, allinone'
      }
    }
  };
  const env_val = process.env.NODE_ENV;
  console.log("env_val: ", env_val);
  console.log("window url: ", window.location);
  return (
    <DocumentMeta {...meta}>
      <div>
        <Header />
        <div className="hero-slant overlay" data-stellar-background-ratio="0.5" style={{ backgroundImage: `url('images/hero-min.jpg')` }}>
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-7 intro">
                <h1 className="text-white font-weight-bold mb-4" data-aos="fade-up" data-aos-delay="0">We turn ideas into extraordinary digital products</h1>
                <p className="text-white mb-4" data-aos="fade-up" data-aos-delay="100">Powerful online tools for everyday tasks—generate QR codes, merge PDFs, convert images, and more—simple, fast, and reliable to streamline your digital workflow.</p>
                {/* <form action="https://google.com" className="sign-up-form d-flex" data-aos="fade-up" data-aos-delay="200">
                  <input type="email" className="form-control" placeholder="Enter email address"></input>
                  <input type="submit" className="btn btn-primary" value="Sign up"></input>
                </form> */}

              </div>


            </div>


          </div>

          <div className="slant" style={{ backgroundImage: `url('images/slant.svg')` }}></div>
        </div>

        {/* <div className="py-3">
          <div className="container">
            <div className="owl-logos owl-carousel">
              <div className="item">
                <img src="images/logo-puma.png" alt="" className="img-fluid"></img>
              </div>
              <div className="item">
                <img src="images/logo-adobe.png" alt="" className="img-fluid"></img>
              </div>
              <div className="item">
                <img src="images/logo-google.png" alt="" className="img-fluid"></img>
              </div>
              <div className="item">
                <img src="images/logo-paypal.png" alt="" className="img-fluid"></img>
              </div>
              <div className="item">
                <img src="images/logo-adobe.png" alt="" className="img-fluid"></img>
              </div>
              <div className="item">
                <img src="images/logo-google.png" alt="" className="img-fluid"></img>
              </div>
            </div>
          </div>
        </div> */}

        <div className="site-section">
          <div className="container">
            <form action="https://www.google.com/search" className="searchform" method="get" name="searchform" target="_blank" style={{ marginBottom: "10px" }}>
              <input autoComplete="on" className="form-control search" name="q" placeholder="Google Search..." required="required" type="text" />
            </form>
            <div className="row mb-5">
              <div className="col-12 text-center" data-aos="fade-up">
                <h2 className="heading font-weight-bold mb-3">Our Services</h2>
              </div>
            </div>
            <div className="row align-items-stretch">
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up">
                <Link to="pdfMerge">
                  <div className="unit-4 d-flex">
                    <div className="unit-4-icon mr-4">
                      <span className="feather-git-merge"></span>
                    </div>
                    <div>
                      <h3>Merge PDF Files</h3>
                      <p>You can Upload 2 or more PDF files to Merge into a single PDF file</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100">
                <Link to="imgConverter">
                  <div className="unit-4 d-flex">
                    <div className="unit-4-icon mr-4">
                      <span className="feather-image"></span>
                    </div>
                    <div>
                      <h3>Image Converter</h3>
                      <p>Upload any image to Convert into jpg or png or webp</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="200">
                <Link to="qrcode">
                  <div className="unit-4 d-flex">
                    <div className="unit-4-icon mr-4">
                      <span className="feather-bootstrap bi bi-qr-code"></span>
                    </div>
                    <div>
                      <h3>Generate QR code</h3>
                      <p>Generate or Download any URL or Text into Scanable QR Code</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="300">
                <Link to="imageCompress">
                  <div className="unit-4 d-flex">
                    <div className="unit-4-icon mr-4">
                      <span className="feather-scissors"></span>
                    </div>
                    <div>
                      <h3>Image Compressor</h3>
                      <p>You can Upload any Image to Compress</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="400">
                <Link to="todo">
                  <div className="unit-4 d-flex">
                    <div className="unit-4-icon mr-4">
                      <span className="feather-list"></span>
                    </div>
                    <div>
                      <h3>ToDo List</h3>
                      <p>List your Bucket of Works. You can edit, complete, delete the list</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="500">
                <Link to="learn-typing">
                <div className="unit-4 d-flex">
                  <div className="unit-4-icon mr-4">
                    <span className="feather-bootstrap bi bi-keyboard"></span>
                  </div>
                  <div>
                    <h3>Typing Skills</h3>
                    <p>You can practice typing with unlimited levels</p>
                  </div>
                </div>
                </Link>
              </div>
              {/* <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="500">
                <h2 style={{textAlign: 'center'}}>Remaining Links</h2>
                <Link to="about">About</Link><br />
                <Link to="contact">Contact</Link><br />
                <Link to="elements">Elements</Link><br />
                <Link to="portfolio">Portfolio</Link><br />
                <Link to="single">Single</Link><br />
                <Link to="testlink">testlink</Link><br />
                <Link to="auth">auth</Link><br />
                <Link to="bjkjjknkj">any unknown links</Link>
              </div> */}
            </div>
          </div>
        </div>
        <div className="site-section overlay site-cover-2" style={{ backgroundImage: `url('images/img_v_3-min.jpg')` }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-7 mx-auto text-center">
                <h2 className="text-white mb-4">Make Your Business Easy</h2>
                <div className='d-flex justify-content-center' style={{gap: '10px'}}>
                <p className="mb-0"><Link to="piechart" rel="noopener" className="btn btn-primary">
                    <span className="feather-pie-chart"></span> Pie Chart</Link></p>
                <p className="mb-0"><Link to="barchart" rel="noopener" className="btn btn-primary">
                    <span className="feather-bar-chart-2"></span> Bar Chart</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="features-lg ">
          <div className="container">
            <div className="row feature align-items-center justify-content-between">
              <div className="col-lg-7 section-stack order-lg-2 mb-4 mb-lg-0 position-relative" data-aos="fade-up" data-aos-delay="0">

                <div className="image-stack">
                  <div className="image-stack__item image-stack__item--top">
                    <img src="images/img_h_2-min.jpg" alt=""></img>
                  </div>
                  <div className="image-stack__item image-stack__item--bottom">
                    <img src="images/img_h_3-min.jpg" alt=""></img>
                  </div>
                </div>

              </div>
              <div className="col-lg-4 section-title" data-aos="fade-up" data-aos-delay="100">

                <h2 className="font-weight-bold mb-4 heading">Far far away, behind the word mountains</h2>
                <p className="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live.</p>
                <p><a href="https://google.com" className="btn btn-primary">Get Started</a></p>

              </div>

            </div>
          </div>
        </div> */}

        {/* <div className="features-lg">
          <div className="container">

            <div className="row feature align-items-center justify-content-between">
              <div className="col-lg-7 mb-4 mb-lg-0 section-stack" data-aos="fade-up" data-aos-delay="0">
                <img src="images/img_h_5-min.jpg" alt="" className="img-fluid"></img>
              </div>
              <div className="col-lg-4 section-title" data-aos="fade-up" data-aos-delay="100">

                <h2 className="font-weight-bold mb-4">Far far away, behind the word mountains</h2>
                <p className="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live.</p>
                <p><a href="https://google.com" className="btn btn-primary">Get Started</a></p>

              </div>

            </div>

          </div>
        </div> */}

        {/* <div className="pricing-section">
          <div className="container">
            <div className="section-title text-center mb-5" data-aos="fade-up" data-aos-delay="0">
              <h2 className="heading font-weight-bold mb-5">Plans</h2>

              <div className="switch-plan">

                <div className="d-inline-flex align-items-center">
                  <div className="period">Monthly</div>
                  <a href="https://google.com" className="period-toggle js-period-toggle"></a>
                  <div className="period"><span className="mr-2">Yearly</span><span className="save-percent">Save 25%</span></div>
                </div>

              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="0">
                <div className="pricing-item ">
                  <h3>Basic</h3>
                  <div className="description">
                    <p>Far far away, behind the word mountains</p>
                  </div>
                  <div className="period-change mb-4 d-block">
                    <div className="price-wrap">
                      <div className="price">
                        <div>
                          <div>$29</div>
                          <div>$299</div>
                        </div>
                      </div>
                    </div>
                    <div className="d-inline-flex align-items-center text-center period-wrap">
                      <div className="d-inline-block mr-1">Per</div>
                      <div className="d-block text-left period">
                        <div>
                          <div>Month</div>
                          <div>Year</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="d-flex"><span className="feather-check-square mr-2 mt-1"></span><span>Far far away, behind the word mountains</span></li>
                    <li className="d-flex"><span className="feather-check-square mr-2 mt-1"></span><span>Far far away, behind the word mountains</span></li>
                  </ul>
                  <div>
                    <a href="https://google.com" className="btn btn-primary">Get Started</a>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
                <div className="pricing-item active">
                  <h3>Advanced</h3>
                  <div className="description">
                    <p>Far far away, behind the word mountains</p>
                  </div>
                  <div className="period-change mb-4 d-block">
                    <div className="price-wrap">
                      <div className="price">
                        <div>
                          <div>$49</div>
                          <div>$599</div>
                        </div>
                      </div>
                    </div>
                    <div className="d-inline-flex align-items-center text-center period-wrap">
                      <div className="d-inline-block mr-1">Per</div>
                      <div className="d-block text-left period">
                        <div>
                          <div>Month</div>
                          <div>Year</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="d-flex"><span className="feather-check-square mr-2 mt-1"></span><span>Far far away, behind the word mountains</span></li>
                    <li className="d-flex"><span className="feather-check-square mr-2 mt-1"></span><span>Far far away, behind the word mountains</span></li>
                  </ul>
                  <div>
                    <a href="https://google.com" className="btn btn-primary">Get Started</a>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
                <div className="pricing-item ">
                  <h3>Premium</h3>
                  <div className="description">
                    <p>Far far away, behind the word mountains</p>
                  </div>
                  <div className="period-change mb-4 d-block">
                    <div className="price-wrap">
                      <div className="price">
                        <div>
                          <div>$99</div>
                          <div>$1,999</div>
                        </div>
                      </div>
                    </div>
                    <div className="d-inline-flex align-items-center text-center period-wrap">
                      <div className="d-inline-block mr-1">Per</div>
                      <div className="d-block text-left period">
                        <div>
                          <div>Month</div>
                          <div>Year</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="d-flex"><span className="feather-check-square mr-2 mt-1"></span><span>Far far away, behind the word mountains</span></li>
                    <li className="d-flex"><span className="feather-check-square mr-2 mt-1"></span><span>Far far away, behind the word mountains</span></li>
                  </ul>
                  <div>
                    <a href="https://google.com" className="btn btn-primary">Get Started</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="testimonial-section">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-4 mb-5 section-title" data-aos="fade-up" data-aos-delay="0">

                <h2 className="mb-4 font-weight-bold heading">Testimonials</h2>
                <p className="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>
                <p><a href="https://google.com" className="btn btn-primary">Product Tour</a></p>
              </div>
              <div className="col-lg-7" data-aos="fade-up" data-aos-delay="100">

                <div className="testimonial--wrap">
                  <div className="owl-single owl-carousel no-dots no-nav">
                    <div className="testimonial-item">
                      <div className="d-flex align-items-center mb-4">
                        <div className="photo mr-3">
                          <img src="images/person_4-min.jpg" alt="" className="img-fluid"></img>
                        </div>
                        <div className="author">
                          <cite className="d-block mb-0">Kaila Woodland</cite>
                          <span>Owner, Greenland, Inc.</span>
                        </div>
                      </div>
                      <blockquote>
                        <p>&ldquo;Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live.&rdquo;</p>
                      </blockquote>
                    </div>

                    <div className="testimonial-item">
                      <div className="d-flex align-items-center mb-4">
                        <div className="photo mr-3">
                          <img src="images/person_1-min.jpg" alt="" className="img-fluid"></img>
                        </div>
                        <div className="author">
                          <cite className="d-block mb-0">Kaila Woodland</cite>
                          <span>Owner, Greenland, Inc.</span>
                        </div>
                      </div>
                      <blockquote>
                        <p>&ldquo;Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live.&rdquo;</p>
                      </blockquote>
                    </div>

                    <div className="testimonial-item">
                      <div className="d-flex align-items-center mb-4">
                        <div className="photo mr-3">
                          <img src="images/person_2-min.jpg" alt="" className="img-fluid"></img>
                        </div>
                        <div className="author">
                          <cite className="d-block mb-0">Kaila Woodland</cite>
                          <span>Owner, Greenland, Inc.</span>
                        </div>
                      </div>
                      <blockquote>
                        <p>&ldquo;Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live.&rdquo;</p>
                      </blockquote>
                    </div>
                  </div>
                  <div className="custom-nav-wrap">
                    <a href="https://google.com" className="custom-owl-prev"><span className="icon-keyboard_backspace"></span></a>
                    <a href="https://google.com" className="custom-owl-next"><span className="icon-keyboard_backspace"></span></a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="site-section bg-light" id="blog-section">
          <div className="container">
            <div className="row">
              <div className="col-7 mb-4 position-relative text-center mx-auto">
                <h2 className="font-weight-bold text-center">Our Blog Posts</h2>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              </div>

            </div>
            <div className="row">


              <div className="col-md-6 mb-5 mb-lg-0 col-lg-4">
                <div className="blog_entry">
                  <a href="https://google.com"><img src="images/img_h_3-min.jpg" alt="Free Website Template by Free-Template.co" className="img-fluid"></img></a>
                  <div className="p-4 bg-white">
                    <h3><a href="https://google.com">Far far away, behind the word mountains</a></h3>
                    <span className="date">April 25, 2019</span>
                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                    <p className="more"><a href="https://google.com">Continue reading...</a></p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-5 mb-lg-0 col-lg-4">
                <div className="blog_entry">
                  <a href="https://google.com"><img src="images/img_h_5-min.jpg" alt="Free Website Template by Free-Template.co" className="img-fluid"></img></a>
                  <div className="p-4 bg-white">
                    <h3><a href="https://google.com">Far far away, behind the word mountains</a></h3>
                    <span className="date">April 25, 2019</span>
                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                    <p className="more"><a href="https://google.com">Continue reading...</a></p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-5 mb-lg-0 col-lg-4">
                <div className="blog_entry">
                  <a href="https://google.com"><img src="images/img_h_7-min.jpg" alt="Free Website Template by Free-Template.co" className="img-fluid"></img></a>
                  <div className="p-4 bg-white">
                    <h3><a href="https://google.com">Far far away, behind the word mountains</a></h3>
                    <span className="date">April 25, 2019</span>
                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                    <p className="more"><a href="https://google.com">Continue reading...</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-4 mx-auto">
                <a href="https://google.com" className="btn btn-primary btn-block">See All Posts</a>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="site-section overlay site-cover-2" style={{ backgroundImage: `url('images/img_v_4-min.jpg')` }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-7 mx-auto text-center">
                <h2 className="text-white mb-4">Get this template for free! :)</h2>
                <p className="mb-0"><a href="https://untree.co/" rel="noopener" className="btn btn-primary">Get it for free!</a></p>
              </div>
            </div>
          </div>
        </div> */}

        <Footer />
      </div>
    </DocumentMeta>
  )
}