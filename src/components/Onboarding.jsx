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
    const [step, setStep] = useState(1);
    const [analyzing, setAnalyzing] = useState(false);

    const startScan = () => {
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            setStep(2);
        }, 3000);
    };

    return (
        <div className="pt-24 px-6 min-h-screen">
            <div className="max-w-md mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">Biometric Setup</h2>
                    <p className="text-slate-500">Secure your agricultural wallet with your identity.</p>
                </div>

                {step === 1 ? (
                    <div className="flex flex-col items-center">
                        <div className="relative mb-12">
                            <div className="w-64 h-64 border-2 border-dashed border-blue-900/30 rounded-full flex items-center justify-center p-8">
                                <motion.div
                                    animate={analyzing ? { scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] } : {}}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="w-full h-full bg-blue-900/5 rounded-full flex items-center justify-center text-[#001F3F]"
                                >
                                    <Fingerprint size={80} strokeWidth={1} />
                                </motion.div>
                            </div>
                            {analyzing && (
                                <motion.div
                                    initial={{ top: '0%' }}
                                    animate={{ top: '100%' }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                    className="absolute left-0 right-0 h-1 bg-[#001F3F] shadow-[0_0_15px_rgba(0,31,63,0.5)] z-10"
                                />
                            )}
                        </div>

                        <p className="text-center text-sm text-slate-500 mb-8 font-medium">
                            {analyzing ? 'Analyzing biometric markers...' : 'Place your thumb on the scanner or use face capture.'}
                        </p>

                        <button
                            onClick={startScan}
                            disabled={analyzing}
                            className="w-full btn-primary flex items-center justify-center gap-2"
                        >
                            <Scan size={20} />
                            {analyzing ? 'Capturing...' : 'Verify Biometrics'}
                        </button>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-24 h-24 bg-blue-50 text-[#001F3F] rounded-full flex items-center justify-center mb-6">
                            <CheckCircle2 size={48} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Identity Verified</h3>
                        <p className="text-slate-500 mb-12">Your profile has been cryptographically linked to your biometric data.</p>

                        <button
                            onClick={onComplete}
                            className="w-full btn-primary flex items-center justify-center gap-2"
                        >
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
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Main Crop Type</label>
                        <select className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-[#001F3F] text-slate-800 font-medium appearance-none">
                            <option>Maize (Corn)</option>
                            <option>Rice</option>
                            <option>Cassava</option>
                            <option>Sorghum</option>
                            <option>Cocoa</option>
                        </select>
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
                                    {gpsCaptured ? 'GPS VERIFIED' : capturingGps ? 'WALKING...' : 'GPS ACTIVE'}
                                </div>
                                <Maximize size={16} className="text-slate-500" />
                            </div>

                            {capturingGps ? (
                                <div className="w-full space-y-2">
                                    <div className="flex justify-between text-[10px] text-white font-bold uppercase tracking-widest">
                                        <span>Capturing boundary points...</span>
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
                            Walk to capture accurate location
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
