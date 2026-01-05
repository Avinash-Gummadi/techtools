import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib/dist/pdf-lib.esm.js';
import { encryptPDF } from './pdf-encrypt';
import Header from './Header';
import Footer from './Footer';
import SEO from '../../../../components/SEO';

const LockPdf = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [password, setPassword] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const lockPdf = async () => {
        if (!pdfFile || !password) {
            alert('Please select a PDF file and enter a password.');
            return;
        }

        setProcessing(true);

        try {
            const fileBuffer = await pdfFile.arrayBuffer();


            // Use encryptPDF from the library
            // encryptPDF(pdfBytes, userPassword, ownerPassword)
            const pdfBytes = await encryptPDF(new Uint8Array(fileBuffer), password, password);

            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `locked_${pdfFile.name}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setProcessing(false);
        } catch (error) {
            console.error('Error locking PDF:', error);
            alert('An error occurred while locking the PDF.');
            setProcessing(false);
        }
    };

    return (
        <>
            <SEO
                title="Techtools Store Lock PDF File"
                description="Protect your PDF file with a password"
                canonical="https://techtools.gummadii.com/lock-pdf"
                keywords="Lock PDF, password protect pdf, secure pdf"
            />
            <Header />
            <div className="site-section">
                <div className="container" style={{ marginTop: "100px" }}>
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <h2 className="heading font-weight-bold text-center mb-4">Lock PDF</h2>
                            <div className="row mb-4">
                                <div className="col-md-12 mb-3">
                                    <label className="text-black">Select PDF File</label>
                                    <input type="file" className="form-control" accept=".pdf" onChange={handleFileChange} />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className="text-black">Password</label>
                                    <input type="password" className="form-control" value={password} onChange={handlePasswordChange} placeholder="Enter password to protect PDF" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <button className="btn btn-primary" onClick={lockPdf} disabled={processing}>
                                        {processing ? 'Processing...' : 'Lock PDF'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LockPdf;
