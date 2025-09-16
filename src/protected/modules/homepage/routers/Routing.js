import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Home from '../views/Home';
import About from '../views/About';
import Contact from '../views/Contact';
import Elements from '../views/Elements';
import Portfolio from '../views/Portfolio';
import Single from '../views/Single';
import Authuser from '../views/Authuser';
import UploadPdf from '../views/UploadPdf';
import ImageConverter from '../views/ImageConverter';
import TestFile from '../views/TestFile'; //Remove finally
import QRCode from '../views/QRCode';
import ImageCompress from '../views/ImageCompress'
import ToDo from '../views/ToDo';
import TypingSkill from '../views/TypingSkill';
import PieChartCode from '../views/PieChartCode';
import TypingTips from '../views/TypingTips';
import BarChart from '../views/BarChart';
import RegularChecks from '../views/RegularChecks';

const ErrorPage = () => <div><h1>Page Not Found, contact administrator. Later design page for this</h1></div>

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route exact={true} path="/" element={<Home />}></Route>
                <Route exact={true} path="about" element={<About />}></Route>
                <Route exact={true} path="contact" element={<Contact />}></Route>
                <Route exact={true} path="elements" element={<Elements />}></Route>
                <Route exact={true} path="portfolio" element={<Portfolio />}></Route>
                <Route exact={true} path="single" element={<Single />}></Route>
                <Route exact={true} path="pdfMerge" element={<UploadPdf />}></Route>
                <Route exact={true} path="imgConverter" element={<ImageConverter />}></Route>
                <Route exact={true} path="testlink" element={<TestFile />}></Route> {/*Remove Finally*/}
                <Route exact={true} path="qrcode" element={<QRCode />}></Route>
                <Route exact={true} path="todo" element={<ToDo />}></Route>
                <Route exact={true} path="learn-typing" element={<TypingSkill />}></Route>
                <Route exact={true} path="typing-tips" element={<TypingTips />}></Route>
                <Route exact={true} path="piechart" element={<PieChartCode />}></Route>
                <Route exact={true} path="barchart" element={<BarChart />}></Route>
                <Route exact={true} path="imageCompress" element={<ImageCompress />}></Route>
                <Route exact={true} path="regularchecks" element={<RegularChecks />}></Route>
                <Route exact={true} path="auth" element={<Authuser />}></Route>
                <Route exact={true} path='*' element={<ErrorPage />}></Route>
            </Routes>
        </Router>
    )
}

export default Routing
