import React, { useState } from 'react';
import { decryptPDF } from './pdf-encrypt';
import Header from './Header';
import Footer from './Footer';
import SEO from '../../../../components/SEO';

const UnlockPdf = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [password, setPassword] = useState('');
    const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
        setErrorMessage('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrorMessage('');
    };

    const unlockPdf = async () => {
        if (!pdfFile || !password) {
            setErrorMessage('Please select a PDF file and enter the password.');
            return;
        }

        setProcessing(true);
        setErrorMessage('');

        try {
            const fileBuffer = await pdfFile.arrayBuffer();

            // Use decryptPDF from our local library
            const pdfBytes = await decryptPDF(new Uint8Array(fileBuffer), password);

            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `unlocked_${pdfFile.name}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setProcessing(false);
        } catch (error) {
            console.error('Error unlocking PDF:', error);
            if (error.message === 'Incorrect password') {
                setErrorMessage('Incorrect password. Please try again.');
            } else {
                setErrorMessage('Failed to unlock PDF. The file might be corrupted or the password is wrong.');
            }
            setProcessing(false);
        }
    };

    return (
        <>
            <SEO
                title="Techtools Store Unlock PDF File"
                description="Remove password protection from your PDF file"
                canonical="https://techtools.gummadii.com/unlock-pdf"
                keywords="Unlock PDF, remove pdf password, decrypt pdf"
            />
            <Header />
            <div className="site-section">
                <div className="container" style={{ marginTop: "100px" }}>
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <h2 className="heading font-weight-bold text-center mb-4">Unlock PDF</h2>
                            <div className="row mb-4">
                                <div className="col-md-12 mb-3">
                                    <label className="text-black">Select Locked PDF File</label>
                                    <input type="file" className="form-control" accept=".pdf" onChange={handleFileChange} />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className="text-black">Password</label>
                                    <input type="password" className="form-control" value={password} onChange={handlePasswordChange} placeholder="Enter password to unlock" />
                                </div>
                            </div>
                            {errorMessage && (
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <div className="alert alert-danger" role="alert">
                                            {errorMessage}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <button className="btn btn-primary" onClick={unlockPdf} disabled={processing}>
                                        {processing ? 'Processing...' : 'Unlock PDF'}
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

export default UnlockPdf;
