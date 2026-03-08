import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import SEO from '../../../../components/SEO';
import lamejs from '@breezystack/lamejs';

export default class AudioCompress extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            audioUrl: '',
            originalAudio: [],
            compressedAudio: [],
            isCompressing: false,
            errorMsg: ''
        };
    }

    async onFileChange(e) {
        if (!e.target.files.length) return;
        const file = e.target.files[0];

        // Convert to AudioBuffer to get accurate sizes and format
        this.setState({
            originalAudio: [file.type || 'audio/*', Math.round(file.size / 1024), URL.createObjectURL(file)],
            isCompressing: true,
            errorMsg: ''
        });

        // Let React re-render before freezing the main thread
        setTimeout(async () => {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

                const channels = audioBuffer.numberOfChannels;
                const sampleRate = audioBuffer.sampleRate;
                const kbps = channels === 2 ? 128 : 64; // Default to 128kbps stereo or 64kbps mono

                const mp3encoder = new lamejs.Mp3Encoder(channels, sampleRate, kbps);
                const mp3Data = [];
                const sampleBlockSize = 1152;

                const left = audioBuffer.getChannelData(0);
                let right;
                if (channels === 2) {
                    right = audioBuffer.getChannelData(1);
                }

                const floatTo16BitPCM = (input, output) => {
                    for (let i = 0; i < input.length; i++) {
                        const s = Math.max(-1, Math.min(1, input[i]));
                        output[i] = (s < 0 ? s * 0x8000 : s * 0x7FFF);
                    }
                };

                const left16 = new Int16Array(left.length);
                floatTo16BitPCM(left, left16);

                let right16;
                if (channels === 2) {
                    right16 = new Int16Array(right.length);
                    floatTo16BitPCM(right, right16);
                }

                // Chunked encoding to avoid freezing the browser on very large files
                const encodeChunk = (offset) => {
                    if (offset >= left16.length) {
                        const mp3buf = mp3encoder.flush();
                        if (mp3buf.length > 0) {
                            mp3Data.push(new Int8Array(mp3buf));
                        }

                        const blob = new Blob(mp3Data, { type: 'audio/mp3' });
                        const compressPercent = Math.round(100 - ((blob.size / 1024) / (file.size / 1024)) * 100);
                        const compressedUrl = URL.createObjectURL(blob);

                        this.setState({
                            audioUrl: compressedUrl,
                            compressedAudio: ['audio/mp3', Math.round(blob.size / 1024), compressedUrl, compressPercent, file.name.replace(/\.[^/.]+$/, "") + '_compressed.mp3'],
                            isCompressing: false
                        });
                        return;
                    }

                    // Process up to 100 chunks per frame
                    for (let k = 0; k < 100 && offset < left16.length; k++, offset += sampleBlockSize) {
                        const leftChunk = left16.subarray(offset, offset + sampleBlockSize);
                        let mp3buf;
                        if (channels === 2) {
                            const rightChunk = right16.subarray(offset, offset + sampleBlockSize);
                            mp3buf = mp3encoder.encodeBuffer(leftChunk, rightChunk);
                        } else {
                            mp3buf = mp3encoder.encodeBuffer(leftChunk);
                        }
                        if (mp3buf.length > 0) {
                            mp3Data.push(new Int8Array(mp3buf));
                        }
                    }

                    setTimeout(() => encodeChunk(offset), 0);
                };

                encodeChunk(0);

            } catch (err) {
                console.error('Error compressing audio:', err);
                this.setState({
                    errorMsg: 'err',
                    isCompressing: false
                });
            }
        }, 100);
    }

    render() {
        return (
            <>
                <SEO
                    title="Techtools Store Audio Compressor"
                    description="Upload any Audio to Compress"
                    canonical="https://techtools.gummadii.com/audioCompress"
                    keywords="Audio Compressor, Compress, Compressor"
                />
                <Header />
                <div className="container" style={{ marginTop: "100px" }}>
                    <div className="unit-5 text-center">
                        <div className="unit-4-icon mr-4">
                            <span className="feather-mic"></span>
                        </div>
                        <div>
                            <h3>Audio Compressor</h3>
                            <p>You can Upload any Audio to Compress</p>
                        </div>
                    </div>

                    {this.state.isCompressing ? (
                        <div className="text-center" style={{ margin: "55px" }}>
                            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                                <span className="sr-only">Loading...</span>
                            </div>
                            <h5 className="mt-3">Compressing audio... Please wait.</h5>
                        </div>
                    ) : (this.state.audioUrl ? (
                        this.state.errorMsg === 'err' ?
                            <span style={{ color: "red", display: "block" }} className="text-center">Something Went Wrong...Please try again</span>
                            :
                            <div style={{ margin: "55px" }} className="text-center">
                                <div style={{ display: "flex", justifyContent: "center", gap: "80px", margin: "10px", flexWrap: "wrap" }}>
                                    <div>
                                        <div style={{ padding: "20px", background: "#f8f9fa", borderRadius: "8px", display: "inline-block" }}>
                                            <span className="feather-music" style={{ fontSize: "60px", color: "#6c757d" }}></span>
                                        </div>
                                        <br />
                                        <span>Type: {this.state.originalAudio[0]}</span><br />
                                        <span>Size: {this.state.originalAudio[1]} KB</span><br />
                                        <audio controls src={this.state.originalAudio[2]} style={{ marginTop: "10px", width: "250px" }} />
                                    </div>
                                    <div className="unit-5" style={{ display: "flex", alignItems: "center" }}>
                                        <div className="unit-4-icon mb-5">
                                            <span className="feather-fast-forward"></span>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ padding: "20px", background: "#f8f9fa", borderRadius: "8px", display: "inline-block" }}>
                                            <span className="feather-music" style={{ fontSize: "60px", color: "#28a745" }}></span>
                                        </div>
                                        <br />
                                        <span>Type: {this.state.compressedAudio[0]}</span><br />
                                        <span>Size: {this.state.compressedAudio[1]} KB</span><br />
                                        <audio controls src={this.state.compressedAudio[2]} style={{ marginTop: "10px", width: "250px" }} />
                                    </div>
                                </div>
                                <a href={this.state.audioUrl} className="btn btn-primary mt-4" download={this.state.compressedAudio[4]}>Download Audio</a>
                                {this.state.compressedAudio[3] > 0 ? (
                                    <h6 style={{ textCenter: "center", margin: "15px" }}>Audio Compressed up to {this.state.compressedAudio[3]}%</h6>
                                ) : (
                                    <h6 style={{ textCenter: "center", margin: "15px" }}>Audio Compressed (Size increased by {Math.abs(this.state.compressedAudio[3])}%)</h6>
                                )}
                                <a href="/audioCompress" className='text-center d-block text-decoration-underline' style={{ fontWeight: "700", textDecoration: "underline", fontSize: "17px", marginTop: "15px" }}>Start Over</a>
                            </div>
                    ) : (
                        <form onSubmit={e => e.preventDefault()}>
                            <div className="form-group text-center">
                                <span>
                                    <label htmlFor="audioUploadBtn" className="btn btn-primary"><span className="feather-upload"></span> Upload Audio</label><br />
                                </span>
                                <input type="file" name="audioCollection" id="audioUploadBtn" accept="audio/*" onChange={this.onFileChange} style={{ display: "none" }} />
                            </div>
                        </form>
                    )
                    )}
                </div>
                <Footer />
            </>
        )
    }
}
