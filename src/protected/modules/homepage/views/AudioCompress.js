import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import SEO from '../../../../components/SEO';
import lamejs from '@breezystack/lamejs';

// Format a size given in KB into a human-readable string
const formatSize = (kb) => {
    if (kb < 1024) return `${kb} KB`;
    if (kb < 1024 * 1024) return `${(kb / 1024).toFixed(1)} MB`;
    return `${(kb / (1024 * 1024)).toFixed(2)} GB`;
};

// Quality presets: [label, stereo kbps, mono kbps, description]
const QUALITY_PRESETS = {
    low:    { label: 'Low', desc: 'Low quality, high compression' },
    medium: { label: 'Medium', desc: 'Good balance of size and quality' },
    high:   { label: 'High', desc: 'Best quality, least compression' },
};

export default class AudioCompress extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            audioUrl: '',
            originalAudio: [],
            compressedAudio: [],
            isCompressing: false,
            progress: 0,
            quality: 'medium',   // default preset
            errorMsg: ''
        };
    }

    async onFileChange(e) {
        if (!e.target.files.length) return;
        const file = e.target.files[0];
        const { quality } = this.state;

        this.setState({
            originalAudio: [file.type || 'audio/*', Math.round(file.size / 1024), URL.createObjectURL(file)],
            isCompressing: true,
            progress: 0,
            errorMsg: ''
        });

        // Let React re-render before starting heavy work
        setTimeout(async () => {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

                const channels = audioBuffer.numberOfChannels;
                const sampleRate = audioBuffer.sampleRate;

                // Pick bitrate from selected quality preset
                const preset = QUALITY_PRESETS[quality] || QUALITY_PRESETS.medium;
                const kbps = channels === 2 ? preset.stereo : preset.mono;

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

                // Scale blocks-per-frame by file size: more blocks = faster for large files
                const fileMB = file.size / (1024 * 1024);
                const blocksPerFrame = Math.min(800, Math.max(100, Math.round(fileMB * 12)));

                // Only push a progress update every ~2% of total samples
                const progressStep = Math.max(1, Math.floor(left16.length * 0.02));
                let lastReportedOffset = 0;

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
                            compressedAudio: [
                                'audio/mp3',
                                Math.round(blob.size / 1024),
                                compressedUrl,
                                compressPercent,
                                file.name.replace(/\.[^/.]+$/, '') + '_compressed.mp3'
                            ],
                            isCompressing: false,
                            progress: 100
                        });
                        return;
                    }

                    for (let k = 0; k < blocksPerFrame && offset < left16.length; k++, offset += sampleBlockSize) {
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

                    // Throttle state updates to every ~2%
                    if (offset - lastReportedOffset >= progressStep) {
                        lastReportedOffset = offset;
                        const pct = Math.min(99, Math.round((offset / left16.length) * 100));
                        this.setState({ progress: pct });
                    }

                    setTimeout(() => encodeChunk(offset), 0);
                };

                encodeChunk(0);

            } catch (err) {
                console.error('Error compressing audio:', err);
                this.setState({
                    errorMsg: 'Something went wrong. The audio format may not be supported. Please try a different file.',
                    isCompressing: false,
                    audioUrl: 'error'
                });
            }
        }, 100);
    }

    render() {
        const { quality, isCompressing, progress, audioUrl, originalAudio, compressedAudio, errorMsg } = this.state;

        return (
            <>
                <SEO
                    title="Techtools Store Audio Compressor"
                    description="Upload any Audio to Compress"
                    canonical="https://techtools.gummadii.com/audioCompress"
                    keywords="Audio Compressor, Compress, Compressor"
                />
                <Header />
                <div className="container" style={{ marginTop: '100px' }}>
                    <div className="unit-5 text-center">
                        <div className="unit-4-icon mr-4">
                            <span className="feather-mic"></span>
                        </div>
                        <div>
                            <h3>Audio Compressor</h3>
                            <p>You can Upload any Audio to Compress</p>
                        </div>
                    </div>

                    {isCompressing ? (
                        <div className="text-center" style={{ margin: '55px' }}>
                            <p className="mb-1" style={{ fontWeight: 600 }}>
                                Compressing audio... {progress}%
                            </p>
                            <div className="progress" style={{ height: '18px', borderRadius: '9px', maxWidth: '420px', margin: '0 auto' }}>
                                <div
                                    className="progress-bar progress-bar-striped progress-bar-animated"
                                    role="progressbar"
                                    style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
                                    aria-valuenow={progress}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    {progress > 8 ? `${progress}%` : ''}
                                </div>
                            </div>
                            <p className="text-muted mt-2" style={{ fontSize: '13px' }}>
                                {originalAudio[1] ? `File size: ${formatSize(originalAudio[1])}` : ''}
                                {originalAudio[1] > 20480 ? ' — Large file, this may take a minute.' : ''}
                            </p>
                        </div>
                    ) : (audioUrl ? (
                        audioUrl === 'error' ? (
                            <div className="text-center" style={{ margin: '55px' }}>
                                <span style={{ color: 'red', display: 'block', marginBottom: '12px', fontSize: '16px' }}>
                                    ⚠️ {errorMsg}
                                </span>
                                <a href="/audioCompress" className="btn btn-outline-primary mt-2">Try Again</a>
                            </div>
                        ) : (
                            <div style={{ margin: '55px' }} className="text-center">
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', margin: '10px', flexWrap: 'wrap' }}>
                                    <div>
                                        <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', display: 'inline-block' }}>
                                            <span className="feather-music" style={{ fontSize: '60px', color: '#6c757d' }}></span>
                                        </div>
                                        <br />
                                        <span>Type: {originalAudio[0]}</span><br />
                                        <span>Size: {formatSize(originalAudio[1])}</span><br />
                                        <audio controls src={originalAudio[2]} style={{ marginTop: '10px', width: '250px' }} />
                                    </div>
                                    <div className="unit-5" style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="unit-4-icon mb-5">
                                            <span className="feather-fast-forward"></span>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', display: 'inline-block' }}>
                                            <span className="feather-music" style={{ fontSize: '60px', color: '#28a745' }}></span>
                                        </div>
                                        <br />
                                        <span>Type: {compressedAudio[0]}</span><br />
                                        <span>Size: {formatSize(compressedAudio[1])}</span><br />
                                        <audio controls src={compressedAudio[2]} style={{ marginTop: '10px', width: '250px' }} />
                                    </div>
                                </div>
                                <a href={audioUrl} className="btn btn-primary mt-4" download={compressedAudio[4]}>Download Audio</a>
                                {compressedAudio[3] > 0 ? (
                                    <h6 style={{ textAlign: 'center', margin: '15px' }}>Audio Compressed up to {compressedAudio[3]}%</h6>
                                ) : (
                                    <h6 style={{ textAlign: 'center', margin: '15px' }}>Size changed by {Math.abs(compressedAudio[3])}%</h6>
                                )}
                                <a href="/audioCompress" className="text-center d-block" style={{ fontWeight: '700', textDecoration: 'underline', fontSize: '17px', marginTop: '15px' }}>Start Over</a>
                            </div>
                        )
                    ) : (
                        <form onSubmit={e => e.preventDefault()}>
                            {/* Quality selector */}
                            <div className="text-center mb-3">
                                <p className="mb-2" style={{ fontWeight: 600 }}>Select Compression Quality</p>
                                <div style={{ display: 'inline-flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {Object.entries(QUALITY_PRESETS).map(([key, p]) => (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => this.setState({ quality: key })}
                                            style={{
                                                padding: '10px 20px',
                                                borderRadius: '8px',
                                                border: quality === key ? '2px solid #007bff' : '2px solid #dee2e6',
                                                background: quality === key ? '#e8f0fe' : '#fff',
                                                cursor: 'pointer',
                                                fontWeight: quality === key ? 700 : 400,
                                                color: quality === key ? '#007bff' : '#495057',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <div style={{ fontSize: '14px' }}>{p.label}</div>
                                            <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{p.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group text-center">
                                <span>
                                    <label htmlFor="audioUploadBtn" className="btn btn-primary">
                                        <span className="feather-upload"></span> Upload Audio
                                    </label><br />
                                </span>
                                <input
                                    type="file"
                                    name="audioCollection"
                                    id="audioUploadBtn"
                                    accept="audio/*"
                                    onChange={this.onFileChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </form>
                    )
                    )}
                </div>
                <Footer />
            </>
        );
    }
}
