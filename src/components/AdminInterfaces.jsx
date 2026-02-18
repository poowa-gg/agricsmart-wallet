import React, { useState } from 'react';
import {
    Users,
    Wallet,
    Map as MapIcon,
    TrendingUp,
    Activity,
    Download,
    Filter,
    ArrowUpRight,
    ArrowDownLeft,
    X,
    Check,
    ScanLine,
    CreditCard,
    Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StatCard = ({ label, value, color, icon: Icon }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
        <div className={`p-4 rounded-2xl ${color} text-white`}>
            <Icon size={28} />
        </div>
        <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        </div>
    </div>
);

// --- GOVERNMENT DASHBOARD ---
export const GovernmentDashboard = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [region, setRegion] = useState('All Regions');

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => setIsExporting(false), 2000);
    };

    return (
        <div className="pt-24 px-4 sm:px-8 pb-12 transition-all">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4 sm:gap-0">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tighter">National Monitor</h2>
                        <p className="text-slate-500 font-medium">Real-time agricultural financial liquidity and redemption</p>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <div className="relative">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="flex items-center justify-center gap-2 bg-slate-100 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 w-full sm:w-auto"
                            >
                                <Filter size={18} />
                                {region}
                            </button>
                            {isFilterOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-20">
                                    {['All Regions', 'North Central', 'North East', 'North West', 'South East', 'South South', 'South West'].map((r) => (
                                        <button
                                            key={r}
                                            onClick={() => { setRegion(r); setIsFilterOpen(false); }}
                                            className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#001F3F]"
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleExport}
                            disabled={isExporting}
                            className="flex items-center justify-center gap-2 bg-[#001F3F] px-4 py-3 rounded-xl text-sm font-bold text-white shadow-lg shadow-blue-900/10 w-full sm:w-auto"
                        >
                            {isExporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                            {isExporting ? 'Exporting...' : 'Export Ledger'}
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard label="Registered Farmers" value="8,492" color="bg-gov-blue" icon={Users} />
                    <StatCard label="Total Disbursed" value="₦4.2B" color="bg-gov-green" icon={Wallet} />
                    <StatCard label="Redemption Rate" value="78.4%" color="bg-orange-500" icon={Activity} />
                    <StatCard label="Credit Recovery" value="₦1.1B" color="bg-purple-600" icon={TrendingUp} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Map View Placeholder */}
                    <div className="min-h-[400px] lg:col-span-2 bg-slate-900 rounded-[3rem] relative overflow-hidden shadow-2xl border border-slate-800 flex flex-col items-center justify-center">
                        <div className="absolute inset-0 opacity-20">
                            <div className="w-full h-full bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:32px_32px]" />
                        </div>
                        <div className="text-center z-10 p-6">
                            <MapIcon className="text-[#001F3F] mb-4 mx-auto opacity-50" size={64} />
                            <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-sm">Geospatial Distribution Active</p>
                            <div className="flex flex-wrap gap-4 mt-8 justify-center">
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#001F3F]" /><span className="text-white/60 text-[10px] font-bold">HIGH DENSITY</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500" /><span className="text-white/60 text-[10px] font-bold">LOW REDEMPTION</span></div>
                            </div>
                        </div>
                        {/* Mock Data Points */}
                        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-[#001F3F] rounded-full shadow-[0_0_20px_#001F3F] animate-pulse" />
                        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_20px_#f97316] animate-pulse" />
                        <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-[#001F3F] rounded-full shadow-[0_0_20px_#001F3F] animate-pulse" />
                    </div>

                    {/* Real-time Ledger */}
                    <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl overflow-hidden flex flex-col h-[500px]">
                        <h3 className="text-xl font-bold text-slate-800 mb-6 flex justify-between items-center">
                            Recent Activity
                            <Activity className="text-[#001F3F]" size={20} />
                        </h3>
                        <div className="space-y-6 overflow-y-auto pr-2 scrollbar-hide flex-1">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-slate-50 p-3 rounded-2xl shrink-0">
                                            {i % 2 === 0 ? <ArrowUpRight className="text-gov-green" size={18} /> : <ArrowDownLeft className="text-orange-500" size={18} />}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-slate-800 truncate">TXN-{9028 + i}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter truncate">Farmer ID: NG-SC-0{i}2</p>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-bold text-slate-800">₦{(15000 * i).toLocaleString()}</p>
                                        <p className="text-[10px] text-[#001F3F] font-bold">SUCCESS</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- AGENT INTERFACE ---
export const AgentInterface = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', nin: '', phone: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate submission
        setIsRegistering(false);
        setFormData({ firstName: '', lastName: '', nin: '', phone: '' });
    };

    return (
        <div className="pt-24 px-6 max-w-lg mx-auto pb-12">
            <div className="mb-12">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tighter">Agent Terminal</h2>
                <p className="text-slate-500">Offline-ready farmer registration and verification</p>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-8">
                <div className="bg-gradient-to-br from-[#001F3F] to-slate-800 text-white p-6 rounded-[2rem] shadow-xl flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold uppercase opacity-70 mb-1">Total Registrations</p>
                        <h3 className="text-2xl font-bold italic">124 Farmers</h3>
                    </div>
                    <Users className="opacity-20" size={40} />
                </div>
            </div>

            <button
                onClick={() => setIsRegistering(true)}
                className="w-full bg-white border-2 border-dashed border-blue-900/20 p-8 rounded-[2rem] flex flex-col items-center gap-3 text-[#001F3F] hover:bg-blue-900/5 transition-all mb-8 shadow-sm hover:shadow-md"
            >
                <div className="bg-blue-900/10 p-4 rounded-full">
                    <Users size={32} />
                </div>
                <span className="font-bold text-lg">New Farmer Registration</span>
                <span className="text-xs text-slate-400 font-medium">Auto-syncs when online</span>
            </button>

            {/* Registration Modal Overlay */}
            <AnimatePresence>
                {isRegistering && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
                    >
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsRegistering(false)}
                                className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                            >
                                <X size={20} className="text-slate-600" />
                            </button>

                            <h3 className="text-2xl font-bold text-slate-800 mb-6">New Farmer</h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-4">
                                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <ShieldCheck className="text-[#001F3F]" size={20} />
                                            <div>
                                                <p className="text-[10px] font-bold text-[#001F3F] uppercase">Biometric NIN Match</p>
                                                <p className="text-xs font-bold text-slate-700">Awaiting scan...</p>
                                            </div>
                                        </div>
                                        <button type="button" className="text-[10px] font-bold bg-[#001F3F] text-white px-3 py-1 rounded-lg">VERIFY</button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#001F3F] outline-none text-sm"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#001F3F] outline-none text-sm"
                                            required
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="NIN Number"
                                        className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#001F3F] outline-none text-sm"
                                        required
                                    />
                                    <select className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#001F3F] outline-none text-sm appearance-none">
                                        <option value="">Select Cooperative</option>
                                        <option>Unity Farmers Coop</option>
                                        <option>North-Central Maize Association</option>
                                        <option>Green Growth Collective</option>
                                    </select>
                                    <select className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#001F3F] outline-none text-sm appearance-none">
                                        <option value="">Select Dealer Point</option>
                                        <option>Gwagwalada Central Hub</option>
                                        <option>Kuje Agro-Service</option>
                                        <option>Bwari Input Center</option>
                                    </select>
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#001F3F] outline-none text-sm"
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full btn-primary py-4 mt-4">
                                    Save to Queue
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Recently Registered</h3>
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-2xl shrink-0" />
                            <div>
                                <p className="font-bold text-slate-800">Usman Garba {i}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: NG-SC-10{i}</p>
                            </div>
                        </div>
                        <div className="bg-blue-100 text-[#001F3F] p-1 px-3 rounded-full text-[10px] font-bold uppercase tracking-tighter shrink-0">VERIFIED</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- AGRO DEALER INTERFACE ---
export const AgroDealerInterface = () => {
    const [scanning, setScanning] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleScan = () => {
        setScanning(true);
        setTimeout(() => {
            setScanning(false);
            setProcessing(true);
            setTimeout(() => {
                setProcessing(false);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            }, 2000);
        }, 2000);
    };

    return (
        <div className="pt-24 px-6 max-w-lg mx-auto pb-24">
            <div className="mb-12">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tighter">Dealer Point</h2>
                <p className="text-slate-500">Authorize input redemptions securely</p>
            </div>

            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-2xl mb-8 relative overflow-hidden group">
                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-blue-900/5 text-[#001F3F] rounded-3xl flex items-center justify-center mb-6 py-auto">
                        {scanning ? (
                            <ScanLine className="animate-pulse" size={32} />
                        ) : processing ? (
                            <Loader2 className="animate-spin" size={32} />
                        ) : showSuccess ? (
                            <Check size={32} />
                        ) : (
                            <Wallet size={32} />
                        )}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                        {scanning ? 'Scanning...' : processing ? 'Processing...' : showSuccess ? 'Payment Confirmed' : 'Scan Farmer Wallet'}
                    </h3>

                    <p className="text-sm text-slate-400 mb-8 max-w-[200px] mx-auto">
                        {scanning ? 'Align QR code within frame' : processing ? 'Verifying funds and subsidy eligibility' : showSuccess ? 'Transaction ID: 8X99-22CA' : 'Use QR scan or Biometric link to verify funds'}
                    </p>

                    <button
                        onClick={handleScan}
                        disabled={scanning || processing}
                        className={`w-full py-5 text-lg font-bold rounded-2xl transition-all ${showSuccess
                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                            : 'btn-primary'
                            }`}
                    >
                        {showSuccess ? 'Print Receipt' : 'Capture Payment'}
                    </button>
                </div>

                {scanning && (
                    <div className="absolute inset-0 bg-slate-900/5 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-[#001F3F] rounded-3xl opacity-50" />
                        <motion.div
                            initial={{ top: '25%' }}
                            animate={{ top: '75%' }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="absolute left-[15%] right-[15%] h-1 bg-[#ff0000] shadow-[0_0_10px_red]"
                        />
                    </div>
                )}

                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-900/5 rounded-full blur-3xl transition-transform group-hover:scale-110" />
            </div>

            <div className="glass-card p-8 mb-8">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Authorize New Purchase</h4>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setPurchaseType('Fertilizer')}
                        className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-[#001F3F] transition-all flex flex-col items-center gap-3 group"
                    >
                        <div className="bg-[#001F3F]/10 p-3 rounded-2xl text-[#001F3F] group-hover:bg-[#001F3F] group-hover:text-white transition-colors">
                            <TrendingUp size={24} />
                        </div>
                        <span className="font-bold text-slate-800 text-sm">Fertilizer</span>
                    </button>
                    <button
                        onClick={() => setPurchaseType('Seeds')}
                        className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-[#001F3F] transition-all flex flex-col items-center gap-3 group"
                    >
                        <div className="bg-orange-500/10 p-3 rounded-2xl text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <MapIcon size={24} />
                        </div>
                        <span className="font-bold text-slate-800 text-sm">Seeds</span>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {purchaseType && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
                        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative">
                            <button onClick={() => setPurchaseType(null)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full"><X size={20} /></button>
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">{purchaseType} Purchase</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Type</label>
                                    <select className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-800 outline-none">
                                        {purchaseType === 'Fertilizer' ? (
                                            <>
                                                <option>NPK 15-15-15</option>
                                                <option>Urea (46-0-0)</option>
                                                <option>SSP (Single Super Phosphate)</option>
                                            </>
                                        ) : (
                                            <>
                                                <option>Maize (Faro 44)</option>
                                                <option>Rice (Hybrid)</option>
                                                <option>Soybeans (TGX)</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quantity ({purchaseType === 'Fertilizer' ? 'Bags' : 'KG'})</label>
                                    <input type="number" defaultValue="1" className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-800 outline-none" />
                                </div>
                                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-[#001F3F] uppercase tracking-widest">Real-time Price</span>
                                    <span className="text-lg font-extrabold text-[#001F3F]">₦{purchaseType === 'Fertilizer' ? '18,500' : '4,200'} <span className="text-[10px] opacity-60">per unit</span></span>
                                </div>
                                <button onClick={() => setPurchaseType(null)} className="w-full btn-primary py-5 mt-4">Confirm Redemption</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="glass-card p-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Stock Overview</h4>
                <div className="space-y-4">
                    {['NPK Fertilizer', 'Seedlings', 'Agro-Chemicals'].map(item => (
                        <div key={item} className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                            <span className="text-sm font-bold text-slate-700">{item}</span>
                            <span className="text-xs font-bold text-[#001F3F] bg-blue-50 px-2 py-1 rounded-lg">IN STOCK</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
