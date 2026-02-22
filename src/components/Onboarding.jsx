import React, { useState } from 'react';
import {
    Fingerprint,
    Scan,
    ShieldCheck,
    ChevronRight,
    Camera,
    MapPin,
    Maximize,
    CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const BiometricOnboarding = ({ onComplete }) => {
    const [step, setStep] = useState(1); // 1: Fingerprint, 2: Face, 3: Success
    const [thumbState, setThumbState] = useState('idle'); // idle, pressing, analyzing, done
    const [faceState, setFaceState] = useState('idle'); // idle, scanning, detected, done
    const [thumbProgress, setThumbProgress] = useState(0);
    const [faceProgress, setFaceProgress] = useState(0);

    // --- Thumb Logic ---
    const handleThumbPress = () => {
        if (thumbState !== 'idle') return;
        setThumbState('pressing');

        // Fill progress while "pressing"
        let prog = 0;
        const fill = setInterval(() => {
            prog += 4;
            setThumbProgress(prog);
            if (prog >= 100) {
                clearInterval(fill);
                setThumbState('analyzing');
                setTimeout(() => {
                    setThumbState('done');
                    setTimeout(() => setStep(2), 800);
                }, 1200);
            }
        }, 40);
    };

    // --- Face Logic ---
    const handleFaceScan = () => {
        if (faceState !== 'idle') return;
        setFaceState('scanning');

        let prog = 0;
        const fill = setInterval(() => {
            prog += 3;
            setFaceProgress(prog);
            if (prog >= 100) {
                clearInterval(fill);
                setFaceState('detected');
                setTimeout(() => {
                    setFaceState('done');
                    setTimeout(() => setStep(3), 800);
                }, 1000);
            }
        }, 50);
    };

    const renderFingerprint = () => (
        <div className="flex flex-col items-center">
            <p className="text-xs font-bold text-[#001F3F] uppercase tracking-widest mb-6 opacity-70">
                Step 1 of 2 · Thumbprint
            </p>

            {/* Interactive Thumb Scanner */}
            <div
                className="relative mb-8 select-none"
                onMouseDown={handleThumbPress}
                onTouchStart={handleThumbPress}
                style={{ cursor: thumbState === 'idle' ? 'pointer' : 'default' }}
            >
                {/* Outer ring */}
                <motion.div
                    animate={
                        thumbState === 'pressing' ? { scale: [1, 1.06, 1], borderColor: ['rgba(0,31,63,0.2)', 'rgba(0,31,63,0.6)', 'rgba(0,31,63,0.2)'] } :
                            thumbState === 'analyzing' ? { borderColor: 'rgba(0,31,63,0.8)' } :
                                thumbState === 'done' ? { borderColor: '#22c55e', scale: 1.05 } : {}
                    }
                    transition={{ repeat: thumbState === 'pressing' ? Infinity : 0, duration: 1 }}
                    className="w-56 h-56 rounded-full border-4 border-dashed border-slate-200 flex items-center justify-center"
                >
                    {/* Inner scanner circle */}
                    <motion.div
                        animate={
                            thumbState === 'pressing' ? { scale: [1, 1.05, 1], backgroundColor: ['rgba(0,31,63,0.05)', 'rgba(0,31,63,0.15)', 'rgba(0,31,63,0.05)'] } :
                                thumbState === 'analyzing' ? { backgroundColor: 'rgba(0,31,63,0.1)' } :
                                    thumbState === 'done' ? { backgroundColor: 'rgba(34,197,94,0.1)' } : {}
                        }
                        transition={{ repeat: thumbState === 'pressing' ? Infinity : 0, duration: 1 }}
                        className="w-44 h-44 rounded-full bg-slate-50 flex items-center justify-center relative overflow-hidden"
                    >
                        {/* Scan line */}
                        {(thumbState === 'pressing' || thumbState === 'analyzing') && (
                            <motion.div
                                initial={{ top: '5%' }}
                                animate={{ top: '95%' }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#001F3F] to-transparent opacity-70 z-10"
                            />
                        )}
                        <motion.div
                            animate={
                                thumbState === 'pressing' ? { color: '#001F3F', scale: 1.15 } :
                                    thumbState === 'analyzing' ? { color: '#001F3F', scale: [1, 1.05, 1], opacity: [1, 0.6, 1] } :
                                        thumbState === 'done' ? { color: '#22c55e', scale: 1.2 } :
                                            { color: '#94a3b8', scale: 1 }
                            }
                            transition={thumbState === 'analyzing' ? { repeat: Infinity, duration: 0.8 } : { duration: 0.3 }}
                        >
                            <Fingerprint size={80} strokeWidth={1.2} />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Progress ring (SVG) */}
                <svg className="absolute inset-0 w-56 h-56 -rotate-90" viewBox="0 0 224 224">
                    <circle cx="112" cy="112" r="108" fill="none" stroke={thumbState === 'done' ? '#22c55e' : '#001F3F'} strokeWidth="4"
                        strokeDasharray={`${2 * Math.PI * 108}`}
                        strokeDashoffset={`${2 * Math.PI * 108 * (1 - thumbProgress / 100)}`}
                        strokeLinecap="round"
                        className="transition-all duration-75"
                    />
                </svg>
            </div>

            <p className="text-center text-sm font-medium mb-2 text-slate-700">
                {thumbState === 'idle' && 'Place thumb to scan'}
                {thumbState === 'pressing' && (
                    <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                    >
                        Reading biometric data... {thumbProgress}%
                    </motion.span>
                )}
                {thumbState === 'analyzing' && 'Authenticating identity...'}
                {thumbState === 'done' && '✓ Biometric Verified'}
            </p>
            <p className="text-center text-xs text-slate-400 mb-8">Maintain steady contact with the sensor</p>

            <button
                onClick={handleThumbPress}
                disabled={thumbState !== 'idle'}
                className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all ${thumbState === 'done' ? 'bg-green-500 text-white' : thumbState === 'idle' ? 'btn-primary' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
            >
                <Fingerprint size={20} />
                {thumbState === 'idle' && 'Tap to Begin Thumb Scan'}
                {thumbState === 'pressing' && `Reading... ${thumbProgress}%`}
                {thumbState === 'analyzing' && 'Please wait...'}
                {thumbState === 'done' && 'Verified — Proceeding...'}
            </button>
        </div>
    );

    const renderFaceID = () => (
        <motion.div
            key="face"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center"
        >
            <p className="text-xs font-bold text-[#001F3F] uppercase tracking-widest mb-6 opacity-70">
                Step 2 of 2 · Facial ID
            </p>

            {/* Camera View - Clean Geometric, No Photo */}
            <div
                className="relative mb-8 w-64 h-64 bg-slate-900 rounded-[2rem] overflow-hidden flex items-center justify-center cursor-pointer shadow-2xl border border-slate-700"
                onClick={handleFaceScan}
            >
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                {/* Face oval outline */}
                <div className="relative z-10 flex items-center justify-center w-full h-full">
                    <div className="relative">
                        {/* Oval face guide */}
                        <motion.div
                            animate={
                                faceState === 'scanning' ? { borderColor: ['rgba(255,255,255,0.3)', 'rgba(0,31,63,0.9)', 'rgba(255,255,255,0.3)'] } :
                                    faceState === 'detected' || faceState === 'done' ? { borderColor: '#22c55e' } :
                                        { borderColor: 'rgba(255,255,255,0.25)' }
                            }
                            transition={{ repeat: faceState === 'scanning' ? Infinity : 0, duration: 1.5 }}
                            className="w-36 h-44 rounded-[50%] border-2  flex items-center justify-center"
                        >
                            <Camera
                                size={36}
                                className={`transition-all duration-300 ${faceState === 'scanning' ? 'text-[#4499ff] animate-pulse' : faceState === 'detected' || faceState === 'done' ? 'text-green-400' : 'text-white/30'}`}
                            />
                        </motion.div>

                        {/* Corner brackets */}
                        {['top-0 left-0 border-t-2 border-l-2 rounded-tl-lg', 'top-0 right-0 border-t-2 border-r-2 rounded-tr-lg', '-bottom-2 left-0 border-b-2 border-l-2 rounded-bl-lg', '-bottom-2 right-0 border-b-2 border-r-2 rounded-br-lg'].map((cls, i) => (
                            <motion.div
                                key={i}
                                animate={{ borderColor: faceState === 'scanning' ? '#4499ff' : faceState === 'detected' ? '#22c55e' : 'white' }}
                                transition={{ duration: 0.4 }}
                                className={`absolute w-5 h-5 ${cls}`}
                            />
                        ))}
                    </div>

                    {/* Scan beam */}
                    {faceState === 'scanning' && (
                        <motion.div
                            initial={{ top: '5%' }}
                            animate={{ top: '95%' }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                            className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_8px_#4499ff] z-20"
                        />
                    )}

                    {/* Progress bar */}
                    {faceState === 'scanning' && (
                        <div className="absolute bottom-3 left-6 right-6 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ width: `${faceProgress}%` }}
                                className="h-full bg-blue-400 rounded-full"
                                transition={{ duration: 0.05 }}
                            />
                        </div>
                    )}
                </div>

                {/* Success overlay */}
                {(faceState === 'detected' || faceState === 'done') && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-green-500/10 flex items-end justify-center pb-4"
                    >
                        <p className="text-green-400 text-xs font-bold uppercase tracking-widest">Face Detected ✓</p>
                    </motion.div>
                )}

                {faceState === 'idle' && (
                    <div className="absolute inset-0 flex items-end justify-center pb-3">
                        <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Tap to Start Scan</p>
                    </div>
                )}
            </div>

            <p className="text-center text-sm font-medium mb-2 text-slate-700">
                {faceState === 'idle' && 'Align face within the oval frame'}
                {faceState === 'scanning' && `Scanning features... ${faceProgress}%`}
                {faceState === 'detected' && 'Face detected — confirming...'}
                {faceState === 'done' && '✓ Facial ID captured!'}
            </p>
            <p className="text-center text-xs text-slate-400 mb-8">Ensure good lighting and look directly at the camera</p>

            <button
                onClick={handleFaceScan}
                disabled={faceState !== 'idle'}
                className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all ${faceState === 'done' || faceState === 'detected' ? 'bg-green-500 text-white' : faceState === 'idle' ? 'btn-primary' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
            >
                <Camera size={20} />
                {faceState === 'idle' && 'Begin Facial Scan'}
                {faceState === 'scanning' && `Scanning... ${faceProgress}%`}
                {faceState === 'detected' && 'Confirming...'}
                {faceState === 'done' && 'Verified — Proceeding...'}
            </button>
        </motion.div>
    );

    return (
        <div className="pt-24 px-6 min-h-screen">
            <div className="max-w-md mx-auto">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-slate-800">Biometric Setup</h2>
                    <p className="text-slate-500">Secure your agricultural wallet with your identity.</p>
                </div>

                <div className="flex gap-2 mb-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-[#001F3F]' : 'bg-slate-100'}`} />
                    ))}
                </div>

                {step === 1 && renderFingerprint()}
                {step === 2 && renderFaceID()}
                {step === 3 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 12 }}
                            className="w-28 h-28 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg"
                        >
                            <CheckCircle2 size={56} />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Dual-Auth Verified</h3>
                        <p className="text-slate-500 mb-12">Thumbprint and Facial ID have been cryptographically linked to your profile.</p>

                        <button onClick={onComplete} className="w-full btn-primary flex items-center justify-center gap-2">
                            Continue to Registration
                            <ChevronRight size={20} />
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export const FarmRegistration = ({ onComplete }) => {
    const [submitting, setSubmitting] = useState(false);
    const [gpsCaptured, setGpsCaptured] = useState(false);
    const [capturingGps, setCapturingGps] = useState(false);
    const [gpsProgress, setGpsProgress] = useState(0);

    const handleGpsCapture = () => {
        setCapturingGps(true);
        setGpsProgress(0);
        const interval = setInterval(() => {
            setGpsProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setCapturingGps(false);
                    setGpsCaptured(true);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!gpsCaptured) return;
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            onComplete();
        }, 2000);
    };

    return (
        <div className="pt-24 px-6 min-h-screen">
            <div className="max-w-md mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">Farm Mapping</h2>
                    <p className="text-slate-500">Geo-tag your farm for precise subsidy allocation.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Major Crop</label>
                            <select className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-[#001F3F] text-slate-800 font-medium appearance-none">
                                <option>Maize (Corn)</option>
                                <option>Rice</option>
                                <option>Cassava</option>
                                <option>Sorghum</option>
                                <option>Cocoa</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Minor Crop</label>
                            <select className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-[#001F3F] text-slate-800 font-medium appearance-none">
                                <option>None</option>
                                <option>Cowpea</option>
                                <option>Soybeans</option>
                                <option>Groundnut</option>
                                <option>Vegetables</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Farm Size (Hectares)</label>
                        <input
                            type="number"
                            placeholder="e.g. 2.5"
                            className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-[#001F3F] text-slate-800 font-medium"
                        />
                    </div>

                    <div className="p-4 bg-slate-900 rounded-3xl relative overflow-hidden h-48 mb-4 border border-slate-800 shadow-2xl">
                        <div className="absolute inset-0 opacity-40">
                            <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className={`p-1 px-2 rounded-lg text-[10px] font-bold border ${gpsCaptured ? 'bg-green-500/20 text-green-500 border-green-500/30' : 'bg-[#001F3F]/20 text-[#001F3F] border-[#001F3F]/30'}`}>
                                    {gpsCaptured ? 'GPS VERIFIED' : capturingGps ? 'CAPTURING...' : 'GPS ACTIVE'}
                                </div>
                                <Maximize size={16} className="text-slate-500" />
                            </div>

                            {capturingGps ? (
                                <div className="w-full space-y-2">
                                    <div className="flex justify-between text-[10px] text-white font-bold uppercase tracking-widest">
                                        <span>Capturing real-time coordinates...</span>
                                        <span>{gpsProgress}%</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${gpsProgress}%` }}
                                            className="bg-[#001F3F] h-full"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-white">
                                    <MapPin className={gpsCaptured ? 'text-green-500' : 'text-[#001F3F]'} size={20} />
                                    <div>
                                        <p className="text-xs font-bold leading-none">{gpsCaptured ? 'Coordinate Locked' : 'Sector G-12'}</p>
                                        <p className="text-[10px] opacity-60">9.0820° N, 7.4913° E</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {!gpsCaptured && !capturingGps && (
                        <button
                            type="button"
                            onClick={handleGpsCapture}
                            className="w-full py-4 bg-[#001F3F]/10 text-[#001F3F] rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border border-[#001F3F]/20 hover:bg-[#001F3F]/20 transition-all mb-4"
                        >
                            <MapPin size={18} />
                            Capture Current Location (GPS)
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={submitting || !gpsCaptured}
                        className={`w-full py-5 rounded-2xl font-bold text-white transition-all ${gpsCaptured ? 'bg-[#001F3F] shadow-lg shadow-blue-900/20' : 'bg-slate-300 cursor-not-allowed'}`}
                    >
                        {submitting ? 'Registering Farm...' : 'Finalize Registration'}
                    </button>
                </form>
            </div>
        </div>
    );
};
