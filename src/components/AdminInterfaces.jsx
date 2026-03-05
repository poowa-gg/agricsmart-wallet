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
    CheckCircle2,
    ScanLine,
    CreditCard,
    Loader2,
    ShieldCheck,
    ChevronRight,
    ChevronLeft,
    ChevronDown,
    Building2,
    Fingerprint,
    Info,
    Calendar,
    MapPin,
    BarChart3,
    Phone,
    Star,
    Briefcase,
    UserCheck,
    PlusCircle,
    Lock,
    Send,
    AlertCircle,
    BadgeCheck,
    LayoutDashboard,
    BookOpen,
    Landmark,
    Shield
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

// ─── WALLET DASHBOARD ─────────────────────────────────────────────────────
export const WalletDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [viewLevel, setViewLevel] = useState('region');
    const [selection, setSelection] = useState({ region: 'All Regions', state: '', lga: '', locality: '' });
    const [pendingTxns, setPendingTxns] = useState([
        { id: 'TXN-A001', purpose: 'Fertilizer Subsidy – North Central', amount: 850000, initiator: 'Bala Ahmed', date: '2026-03-01', status: 'pending', signatories: [{ name: 'Dr Eze', role: 'CFO', signed: false }, { name: 'Aisha M.', role: 'Director', signed: false }, { name: 'James O.', role: 'Accountant', signed: true }] },
        { id: 'TXN-A002', purpose: 'Seed Credit Disbursement', amount: 1200000, initiator: 'Grace Ade', date: '2026-02-28', status: 'pending', signatories: [{ name: 'Dr Eze', role: 'CFO', signed: true }, { name: 'Aisha M.', role: 'Director', signed: false }, { name: 'James O.', role: 'Accountant', signed: true }] },
        { id: 'TXN-A003', purpose: 'Irrigation Equipment – South West', amount: 420000, initiator: 'Chinedu O.', date: '2026-02-25', status: 'cleared', signatories: [{ name: 'Dr Eze', role: 'CFO', signed: true }, { name: 'Aisha M.', role: 'Director', signed: true }, { name: 'James O.', role: 'Accountant', signed: true }] },
    ]);
    const [signingTxnId, setSigningTxnId] = useState(null);
    const [signatoryName, setSignatoryName] = useState('');
    const [signAction, setSignAction] = useState(null);
    const [isPinning, setIsPinning] = useState(false);

    const hierarchyData = {
        'North Central': { 'Federal Capital Territory': { 'Gwagwalada': ['Central Hub', 'University Farm'], 'Kuje': ['Gaube', 'Kujekwa'], 'Abuja Municipal': ['Garki', 'Wuse', 'Maitama'] }, 'Nasarawa': { 'Lafia': ['Bakin Rijiya', 'Shabu'], 'Keffi': ['Sha', 'Naharata'] }, 'Benue': { 'Makurdi': ['Wadata', 'North Bank'] }, 'Kogi': { 'Lokoja': ['Adankolo', 'Ganaja'] }, 'Niger': { 'Minna': ['Bosso', 'Chanchaga'] }, 'Plateau': { 'Jos North': ['Gangare', 'Kabong'] }, 'Kwara': { 'Ilorin West': ['Oja-Oba', 'Pakata'] } },
        'North West': { 'Kano': { 'Kano Municipal': ['Gwale', 'Fagge'] }, 'Kaduna': { 'Kaduna North': ['Ungwan Rimi', 'Kawo'], 'Zaria': ['Samaru', 'Kwarbai'] }, 'Katsina': { 'Katsina': ['Mashi Road'] }, 'Zamfara': { 'Gusau': ['Gusau Town'] }, 'Sokoto': { 'Sokoto North': ['Gawon Nama'] }, 'Kebbi': { 'Birnin Kebbi': ['Birnin Kebbi Town'] }, 'Jigawa': { 'Dutse': ['Dutse Town'] } },
        'North East': { 'Borno': { 'Maiduguri': ['Gwange', 'Bolori'] }, 'Yobe': { 'Damaturu': ['Damaturu Town'] }, 'Gombe': { 'Gombe': ['Gombe Abba'] }, 'Adamawa': { 'Yola North': ['Doubeli', 'Jambutu'] }, 'Bauchi': { 'Bauchi': ['Wunti', 'Yelwa'] }, 'Taraba': { 'Jalingo': ['Jalingo South'] } },
        'South West': { 'Lagos': { 'Epe': ['Agosasa', 'Ibeju-Lekki'], 'Ikorodu': ['Igbogbo', 'Imota'], 'Badagry': ['Badagry Town'] }, 'Ogun': { 'Abeokuta South': ['Adatan'] }, 'Oyo': { 'Ibadan North': ['Agodi', 'Bodija'] }, 'Osun': { 'Osogbo': ['Osogbo Town'] }, 'Ekiti': { 'Ado-Ekiti': ['Odo-Ado'] }, 'Ondo': { 'Akure South': ['Akure Proper'] } },
        'South South': { 'Rivers': { 'Port Harcourt': ['GRA', 'Mile 1'], 'Obio-Akpor': ['Choba'] }, 'Cross River': { 'Calabar South': ['Calabar South Town'] }, 'Bayelsa': { 'Yenagoa': ['Amarata'] }, 'Delta': { 'Warri South': ['Warri Town'] }, 'Akwa Ibom': { 'Uyo': ['Uyo Town'] }, 'Edo': { 'Oredo': ['Ring Road'] } },
        'South East': { 'Anambra': { 'Awka South': ['Awka Town'] }, 'Enugu': { 'Enugu North': ['Ogui', 'Asata'] }, 'Imo': { 'Owerri North': ['Owerri Town'] }, 'Abia': { 'Umuahia North': ['Umuahia Town'] }, 'Ebonyi': { 'Abakaliki': ['Abakaliki Town'] } },
    };

    const handleLevelSelect = (level, value) => {
        const newSelection = { ...selection, [level]: value };
        setSelection(newSelection);
        if (level === 'region' && value !== 'All Regions') setViewLevel('state');
        else if (level === 'state') setViewLevel('lga');
        else if (level === 'lga') setViewLevel('locality');
        else if (level === 'locality' || value === 'All Regions') { setIsFilterOpen(false); if (value === 'All Regions') setViewLevel('region'); }
    };
    const resetFilter = () => { setSelection({ region: 'All Regions', state: '', lga: '', locality: '' }); setViewLevel('region'); setIsFilterOpen(false); };
    const getOptions = () => {
        if (viewLevel === 'region') return ['All Regions', ...Object.keys(hierarchyData)];
        if (viewLevel === 'state') return Object.keys(hierarchyData[selection.region] || {});
        if (viewLevel === 'lga') return Object.keys((hierarchyData[selection.region] || {})[selection.state] || {});
        if (viewLevel === 'locality') return ((hierarchyData[selection.region] || {})[selection.state] || {})[selection.lga] || [];
        return [];
    };
    const handleExport = () => { setIsExporting(true); setTimeout(() => setIsExporting(false), 2000); };
    const currentLabel = selection.locality || selection.lga || selection.state || selection.region;

    const openSignModal = (txnId, name, action) => { setSigningTxnId(txnId); setSignatoryName(name); setSignAction(action); };
    const confirmSign = () => {
        setIsPinning(true);
        setTimeout(() => {
            setPendingTxns(prev => prev.map(t => {
                if (t.id !== signingTxnId) return t;
                const updatedSigs = t.signatories.map(s => s.name === signatoryName ? { ...s, signed: signAction === 'approve' } : s);
                const allSigned = updatedSigs.every(s => s.signed);
                return { ...t, signatories: updatedSigs, status: signAction === 'reject' ? 'rejected' : allSigned ? 'cleared' : 'pending' };
            }));
            setIsPinning(false); setSigningTxnId(null); setSignatoryName(''); setSignAction(null);
        }, 1800);
    };

    const TABS = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'accountant', label: 'Accountant', icon: BookOpen },
        { id: 'bank', label: 'Bank', icon: Landmark },
        { id: 'signatories', label: 'Signatories', icon: Shield },
    ];

    const renderOverview = () => (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tighter">National Monitor</h3>
                    <p className="text-slate-500 text-sm font-medium">Real-time agricultural financial liquidity</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 bg-slate-100 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600">
                            <Filter size={16} /><span className="truncate max-w-[120px]">{currentLabel}</span>
                            {viewLevel !== 'region' && <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-md uppercase">{viewLevel}</span>}
                        </button>
                        {isFilterOpen && (
                            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-20">
                                <div className="p-2 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase px-2">Select {viewLevel}</p>
                                    {viewLevel !== 'region' && <button onClick={resetFilter} className="text-[10px] font-bold text-red-500 px-2">RESET</button>}
                                </div>
                                {getOptions().map(opt => (
                                    <button key={opt} onClick={() => handleLevelSelect(viewLevel, opt)} className="w-full text-left px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#001F3F] flex justify-between items-center group">
                                        {opt}<ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button onClick={handleExport} disabled={isExporting} className="flex items-center gap-2 bg-[#001F3F] px-4 py-2.5 rounded-xl text-sm font-bold text-white">
                        {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                        {isExporting ? 'Exporting...' : 'Export'}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard label="Registered Farmers" value="8,492" color="bg-gov-blue" icon={Users} />
                <StatCard label="Total Disbursed" value="₦4.2B" color="bg-gov-green" icon={Wallet} />
                <StatCard label="Redemption Rate" value="78.4%" color="bg-orange-500" icon={Activity} />
                <StatCard label="Credit Recovery" value="₦1.1B" color="bg-purple-600" icon={TrendingUp} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="min-h-[360px] lg:col-span-2 bg-slate-900 rounded-[2.5rem] relative overflow-hidden shadow-2xl border border-slate-800 flex flex-col items-center justify-center">
                    <div className="absolute inset-0 opacity-20"><div className="w-full h-full bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:32px_32px]" /></div>
                    <div className="text-center z-10 p-6">
                        <MapIcon className="text-[#001F3F] mb-4 mx-auto opacity-50" size={56} />
                        <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-xs">Geospatial Distribution Active</p>
                        <div className="flex flex-wrap gap-4 mt-6 justify-center">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#001F3F]" /><span className="text-white/60 text-[10px] font-bold">HIGH DENSITY</span></div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500" /><span className="text-white/60 text-[10px] font-bold">LOW REDEMPTION</span></div>
                        </div>
                    </div>
                    <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-[#001F3F] rounded-full shadow-[0_0_20px_#001F3F] animate-pulse" />
                    <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_20px_#f97316] animate-pulse" />
                    <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-[#001F3F] rounded-full shadow-[0_0_20px_#001F3F] animate-pulse" />
                </div>
                <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-xl overflow-hidden flex flex-col h-[360px]">
                    <h3 className="text-base font-bold text-slate-800 mb-4 flex justify-between items-center">Recent Activity<Activity className="text-[#001F3F]" size={18} /></h3>
                    <div className="space-y-4 overflow-y-auto pr-1 scrollbar-hide flex-1">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="bg-slate-50 p-2 rounded-xl shrink-0">{i % 2 === 0 ? <ArrowUpRight className="text-gov-green" size={16} /> : <ArrowDownLeft className="text-orange-500" size={16} />}</div>
                                    <div><p className="text-xs font-bold text-slate-800">TXN-{9028 + i}</p><p className="text-[10px] text-slate-400 font-bold uppercase">Farmer ID: NG-SC-0{i}2</p></div>
                                </div>
                                <div className="text-right"><p className="text-xs font-bold text-slate-800">₦{(15000 * i).toLocaleString()}</p><p className="text-[10px] text-[#001F3F] font-bold">SUCCESS</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderAccountant = () => (
        <div>
            <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start">
                <div className="bg-gradient-to-br from-[#001F3F] to-slate-700 text-white p-6 rounded-[2rem] flex-1">
                    <p className="text-[10px] font-bold uppercase opacity-60 tracking-widest mb-1">Accountant on Duty</p>
                    <h3 className="text-xl font-bold">James Okonkwo</h3>
                    <p className="text-xs opacity-70 mt-1">Chief Accountant • Last login: Today 07:42</p>
                    <div className="flex gap-3 mt-4">
                        <div className="bg-white/10 rounded-xl px-3 py-1 text-xs font-bold">₦4.2B Disbursed</div>
                        <div className="bg-white/10 rounded-xl px-3 py-1 text-xs font-bold">₦1.1B Recovered</div>
                    </div>
                </div>
                <div className="bg-white border border-slate-100 rounded-[2rem] p-6 flex-1 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Available Balance</p>
                    <h3 className="text-2xl font-bold text-slate-900 italic">₦890,500,000</h3>
                    <p className="text-xs text-slate-400 mt-1">Linked: First Bank • ****4821</p>
                    <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                        <div className="bg-[#001F3F] h-full rounded-full w-[62%]" />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">62% of quarterly allocation used</p>
                </div>
            </div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Pending Transactions for Review</h4>
            <div className="space-y-4">
                {pendingTxns.map(txn => {
                    const signedCount = txn.signatories.filter(s => s.signed).length;
                    const totalSigs = txn.signatories.length;
                    return (
                        <div key={txn.id} className={`bg-white border rounded-[2rem] p-6 shadow-sm transition-all ${txn.status === 'cleared' ? 'border-green-200 bg-green-50/30' : txn.status === 'rejected' ? 'border-red-200 bg-red-50/20' : 'border-slate-100'}`}>
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-xs font-bold text-[#001F3F] uppercase tracking-tight">{txn.id}</p>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${txn.status === 'cleared' ? 'bg-green-100 text-green-700' : txn.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                                            {txn.status}
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-slate-800 mb-1">{txn.purpose}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">By {txn.initiator} • {txn.date}</p>
                                    <p className="text-[10px] text-slate-500 mt-1">Signatures: {signedCount}/{totalSigs}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-extrabold text-slate-900 italic">₦{txn.amount.toLocaleString()}</p>
                                    {txn.status === 'pending' && (
                                        <button onClick={() => setActiveTab('signatories')} className="mt-3 flex items-center gap-2 bg-[#001F3F] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-opacity-90 transition-all">
                                            <Send size={14} /> Send for Approval
                                        </button>
                                    )}
                                    {txn.status === 'cleared' && <div className="mt-3 flex items-center gap-1 text-green-600 font-bold text-xs justify-end"><BadgeCheck size={16} />Cleared</div>}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const renderBank = () => (
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#001F3F] via-[#003366] to-slate-800 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full" />
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <p className="text-[10px] font-bold uppercase opacity-60 tracking-widest mb-1">Linked Institution</p>
                            <h3 className="text-xl font-bold">First Bank of Nigeria</h3>
                        </div>
                        <div className="bg-white/20 p-3 rounded-2xl"><Landmark size={24} /></div>
                    </div>
                    <p className="text-[10px] font-bold uppercase opacity-60 tracking-widest mb-1">Account Number</p>
                    <h2 className="text-3xl font-bold tracking-widest italic mb-6">•••• •••• 4821</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div><p className="text-[10px] opacity-60 uppercase font-bold mb-0.5">Account Name</p><p className="text-sm font-bold">AgriSmart Wallet Ltd</p></div>
                        <div><p className="text-[10px] opacity-60 uppercase font-bold mb-0.5">Account Type</p><p className="text-sm font-bold">Corporate Current</p></div>
                        <div><p className="text-[10px] opacity-60 uppercase font-bold mb-0.5">Branch</p><p className="text-sm font-bold">Abuja FCT Main</p></div>
                        <div><p className="text-[10px] opacity-60 uppercase font-bold mb-0.5">Sort Code</p><p className="text-sm font-bold">011-152-038</p></div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">BVN Verification</p>
                    <div className="flex items-center gap-3 mt-2">
                        <div className="bg-green-100 p-2 rounded-xl"><ShieldCheck className="text-green-600" size={20} /></div>
                        <div><p className="text-sm font-bold text-slate-800">BVN Verified</p><p className="text-[10px] text-slate-400">222 •••• •••• 81</p></div>
                        <span className="ml-auto text-[10px] bg-green-100 text-green-700 font-bold px-2 py-1 rounded-lg">ACTIVE</span>
                    </div>
                </div>
                <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Live Balance</p>
                    <h3 className="text-2xl font-bold text-slate-900 italic mt-1">₦890,500,000</h3>
                    <p className="text-[10px] text-green-600 font-bold mt-1">↑ ₦12.3M inflow today</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 bg-[#001F3F] text-white font-bold text-sm py-4 rounded-2xl hover:bg-opacity-90 transition-all shadow-lg">
                    <BarChart3 size={18} />Reconcile Ledger
                </button>
                <button onClick={() => { setIsExporting(true); setTimeout(() => setIsExporting(false), 2000); }} className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-bold text-sm py-4 rounded-2xl hover:bg-slate-200 transition-all">
                    {isExporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                    {isExporting ? 'Generating...' : 'Bank Statement'}
                </button>
            </div>
            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recent Bank Transactions</h4>
                <div className="space-y-3">
                    {[{ label: 'Subsidy Inflow', amt: '₦850,000', dir: 'in' }, { label: 'Recoveries Posted', amt: '₦220,000', dir: 'in' }, { label: 'Fertilizer Redemption', amt: '₦450,000', dir: 'out' }, { label: 'Seed Disbursement', amt: '₦300,000', dir: 'out' }].map((tx, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl ${tx.dir === 'in' ? 'bg-green-50' : 'bg-orange-50'}`}>{tx.dir === 'in' ? <ArrowDownLeft className="text-green-500" size={16} /> : <ArrowUpRight className="text-orange-500" size={16} />}</div>
                                <p className="text-sm font-bold text-slate-700">{tx.label}</p>
                            </div>
                            <p className={`text-sm font-bold ${tx.dir === 'in' ? 'text-green-600' : 'text-orange-500'}`}>{tx.dir === 'in' ? '+' : '-'}{tx.amt}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderSignatories = () => (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-700 to-[#001F3F] text-white p-6 rounded-[2rem] flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-2xl"><Shield size={28} /></div>
                <div>
                    <h3 className="text-lg font-bold">Back-Channel Approval</h3>
                    <p className="text-xs opacity-70">Company account signatories must approve all disbursements</p>
                </div>
            </div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Registered Signatories</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[{ name: 'Dr Eze', role: 'CFO', level: 'Primary', color: 'bg-purple-600' }, { name: 'Aisha Musa', role: 'Director', level: 'Secondary', color: 'bg-[#001F3F]' }, { name: 'James Okonkwo', role: 'Accountant', level: 'Reviewer', color: 'bg-gov-green' }].map(s => (
                    <div key={s.name} className="bg-white border border-slate-100 rounded-[2rem] p-5 shadow-sm text-center">
                        <div className={`${s.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3`}><UserCheck size={24} /></div>
                        <p className="font-bold text-slate-800 text-sm">{s.name}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">{s.role}</p>
                        <span className="mt-2 inline-block text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg font-bold">{s.level}</span>
                    </div>
                ))}
            </div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending Approvals</h4>
            <div className="space-y-4">
                {pendingTxns.map(txn => {
                    const signedCount = txn.signatories.filter(s => s.signed).length;
                    return (
                        <div key={txn.id} className={`bg-white border rounded-[2rem] p-6 shadow-sm ${txn.status === 'cleared' ? 'border-green-200' : txn.status === 'rejected' ? 'border-red-200' : 'border-slate-100'}`}>
                            <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                                <div>
                                    <p className="text-xs font-bold text-[#001F3F] uppercase">{txn.id} • ₦{txn.amount.toLocaleString()}</p>
                                    <p className="text-sm font-bold text-slate-800 mt-0.5">{txn.purpose}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">{txn.initiator} • {txn.date}</p>
                                </div>
                                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${txn.status === 'cleared' ? 'bg-green-100 text-green-700' : txn.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-amber-50 text-amber-600'}`}>{txn.status}</span>
                            </div>
                            <div className="space-y-2">
                                {txn.signatories.map(sig => (
                                    <div key={sig.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-1.5 rounded-xl ${sig.signed ? 'bg-green-100' : 'bg-slate-200'}`}>{sig.signed ? <Check className="text-green-600" size={14} /> : <Lock className="text-slate-400" size={14} />}</div>
                                            <div><p className="text-xs font-bold text-slate-800">{sig.name}</p><p className="text-[10px] text-slate-400 uppercase">{sig.role}</p></div>
                                        </div>
                                        {txn.status === 'pending' && !sig.signed && (
                                            <div className="flex gap-2">
                                                <button onClick={() => openSignModal(txn.id, sig.name, 'approve')} className="text-[10px] font-bold px-3 py-1.5 bg-[#001F3F] text-white rounded-xl hover:bg-opacity-90 transition-all flex items-center gap-1"><Check size={12} />Approve</button>
                                                <button onClick={() => openSignModal(txn.id, sig.name, 'reject')} className="text-[10px] font-bold px-3 py-1.5 bg-red-500 text-white rounded-xl hover:bg-opacity-90 transition-all flex items-center gap-1"><X size={12} />Reject</button>
                                            </div>
                                        )}
                                        {sig.signed && <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">SIGNED</span>}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-1"><span>Approval Progress</span><span>{signedCount}/{txn.signatories.length} Signed</span></div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <motion.div className={`h-full rounded-full ${txn.status === 'cleared' ? 'bg-green-500' : 'bg-[#001F3F]'}`} animate={{ width: `${(signedCount / txn.signatories.length) * 100}%` }} transition={{ duration: 0.5 }} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <AnimatePresence>
                {signingTxnId && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${signAction === 'approve' ? 'bg-[#001F3F]' : 'bg-red-500'}`}>
                                {signAction === 'approve' ? <BadgeCheck className="text-white" size={32} /> : <AlertCircle className="text-white" size={32} />}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 text-center mb-1">{signAction === 'approve' ? 'Approve Transaction' : 'Reject Transaction'}</h3>
                            <p className="text-xs text-slate-400 text-center mb-6">Signatory: <strong>{signatoryName}</strong> — Biometric confirmation required</p>
                            {isPinning ? (
                                <div className="text-center">
                                    <Loader2 className="animate-spin mx-auto text-[#001F3F] mb-2" size={32} />
                                    <p className="text-sm font-bold text-slate-600">Verifying biometric...</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <button onClick={confirmSign} className={`w-full py-4 rounded-2xl font-bold text-sm text-white ${signAction === 'approve' ? 'bg-[#001F3F]' : 'bg-red-500'}`}>
                                        <Fingerprint size={18} className="inline mr-2" />Confirm with Biometric
                                    </button>
                                    <button onClick={() => { setSigningTxnId(null); setSignatoryName(''); setSignAction(null); }} className="w-full py-4 rounded-2xl font-bold text-sm bg-slate-100 text-slate-600">Cancel</button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <div className="pt-24 px-4 sm:px-8 pb-16 transition-all">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tighter">Wallet</h2>
                    <p className="text-slate-500 font-medium text-sm">Accountant · Bank · Signatory Approvals</p>
                </div>
                <div className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto overflow-x-auto">
                    {TABS.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white shadow-md text-[#001F3F]' : 'text-slate-500 hover:text-slate-700'}`}>
                            <tab.icon size={16} />{tab.label}
                        </button>
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                        {activeTab === 'overview' && renderOverview()}
                        {activeTab === 'accountant' && renderAccountant()}
                        {activeTab === 'bank' && renderBank()}
                        {activeTab === 'signatories' && renderSignatories()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- AGENT INTERFACE ---
export const AgentInterface = () => {
    const [view, setView] = useState('overview'); // overview, agentList, agentDetail, companyDetail, farmerDetail, newAgentRegistration
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedFarmer, setSelectedFarmer] = useState(null);
    const [isRegisteringNewAgent, setIsRegisteringNewAgent] = useState(false);
    const [ninVerified, setNinVerified] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Mock Data
    const agents = [
        {
            id: 'AGT-001',
            name: 'John Doe',
            state: 'FCT Abuja',
            companies: [
                { id: 'COMP-001', name: 'AgroCorp Ltd.', farmers: ['FARM-001', 'FARM-002'], location: 'Gwagwalada, FCT', contact: '08012345678' },
                { id: 'COMP-002', name: 'GreenHarvest Inc.', farmers: ['FARM-003'], location: 'Kuje, FCT', contact: '08087654321' },
            ],
            farmers: ['FARM-004', 'FARM-005'], // Farmers directly managed by agent, not through a company
        },
        {
            id: 'AGT-002',
            name: 'Jane Smith',
            state: 'Kano',
            companies: [],
            farmers: ['FARM-006'],
        },
    ];

    const allFarmers = [
        { id: 'FARM-001', name: 'Usman Garba', location: 'Gwagwalada, FCT', facilities: ['NPK Fertilizer', 'Rice Seeds'], repayment: 'June 2026', status: 'Harvesting', creditWorthiness: 'A+', insurance: 'Active', membership: 'Gold Member' },
        { id: 'FARM-002', name: 'Amina Bello', location: 'Kuje, FCT', facilities: ['Maize Seeds', 'Irrigation Pump'], repayment: 'August 2026', status: 'Seeding', creditWorthiness: 'B', insurance: 'Pending', membership: 'Silver Member' },
        { id: 'FARM-003', name: 'Chinedu Okoro', location: 'Lafia, Nasarawa', facilities: ['Rice Seeds'], repayment: 'July 2026', status: 'Growing', creditWorthiness: 'A', insurance: 'Active', membership: 'Gold Member' },
        { id: 'FARM-004', name: 'Fatima Musa', location: 'Minna, Niger', facilities: ['Irrigation Pump'], repayment: 'September 2026', status: 'Planting', creditWorthiness: 'B+', insurance: 'Active', membership: 'Silver Member' },
        { id: 'FARM-005', name: 'David Obi', location: 'Lokoja, Kogi', facilities: ['Yam Seeds'], repayment: 'October 2026', status: 'Harvesting', creditWorthiness: 'A-', insurance: 'Pending', membership: 'Bronze Member' },
        { id: 'FARM-006', name: 'Grace Ade', location: 'Kano, Kano', facilities: ['Fertilizer'], repayment: 'May 2026', status: 'Seeding', creditWorthiness: 'C', insurance: 'Active', membership: 'Bronze Member' },
    ];

    const getFarmerById = (id) => allFarmers.find(f => f.id === id);

    const handleVerifyNin = () => {
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            setNinVerified(true);
        }, 2000);
    };

    const DetailItem = ({ icon, label, value }) => (
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
            <div className="text-[#001F3F]">{icon}</div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
                <p className="text-sm font-bold text-slate-800">{value}</p>
            </div>
        </div>
    );

    const renderOverview = () => (
        <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-[#001F3F] to-slate-800 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between col-span-2">
                    <div>
                        <p className="text-[10px] font-bold uppercase opacity-70 mb-1">Total Registered Agents</p>
                        <h3 className="text-xl font-bold italic">{agents.length} Agents</h3>
                    </div>
                    <Users className="opacity-20" size={32} />
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Companies Managed</p>
                    <h3 className="text-lg font-bold text-slate-800">{agents.reduce((acc, agent) => acc + agent.companies.length, 0)}</h3>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Farmers Managed</p>
                    <h3 className="text-lg font-bold text-slate-800">{allFarmers.length}</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-[#001F3F] transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 p-3 rounded-2xl text-[#001F3F]">
                                <UserCheck size={24} />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-slate-800">Manage Agents</p>
                                <p className="text-xs text-slate-400">View, edit, or register new agents</p>
                            </div>
                        </div>
                        <ChevronDown size={20} className="text-slate-300 group-hover:text-[#001F3F]" />
                    </button>
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-10"
                            >
                                <button
                                    onClick={() => { setView('agentList'); setIsDropdownOpen(false); }}
                                    className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#001F3F] flex items-center gap-2"
                                >
                                    <Users size={18} /> View All Agents
                                </button>
                                <button
                                    onClick={() => { setIsRegisteringNewAgent(true); setIsDropdownOpen(false); }}
                                    className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#001F3F] flex items-center gap-2"
                                >
                                    <PlusCircle size={18} /> Register New Agent
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );

    const renderAgentList = () => (
        <div className="space-y-4">
            <button onClick={() => setView('overview')} className="flex items-center gap-2 text-[#001F3F] font-bold text-sm mb-6">
                <ChevronLeft size={18} /> Back to Overview
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6">Registered Agents</h3>
            {agents.map(agent => (
                <button
                    key={agent.id}
                    onClick={() => { setSelectedAgent(agent); setView('agentDetail'); }}
                    className="w-full bg-white p-5 rounded-3xl border border-slate-100 flex justify-between items-center hover:border-[#001F3F] transition-all"
                >
                    <div>
                        <p className="font-bold text-slate-800">{agent.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{agent.state} • {agent.id}</p>
                    </div>
                    <ChevronRight size={20} className="text-slate-300" />
                </button>
            ))}
        </div>
    );

    const renderAgentDetail = () => (
        <div className="space-y-6">
            <button onClick={() => setView('agentList')} className="flex items-center gap-2 text-[#001F3F] font-bold text-sm mb-4">
                <ChevronLeft size={18} /> Back to Agents
            </button>

            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl">
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-24 h-24 bg-slate-100 rounded-3xl mb-4 flex items-center justify-center text-[#001F3F]">
                        <UserCheck size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">{selectedAgent?.name}</h3>
                    <p className="text-xs font-bold text-[#001F3F] uppercase tracking-widest">{selectedAgent?.id}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-8">
                    <DetailItem icon={<MapPin size={18} />} label="State of Operation" value={selectedAgent?.state} />
                    <DetailItem icon={<Briefcase size={18} />} label="Companies Managed" value={selectedAgent?.companies.length} />
                    <DetailItem icon={<Users size={18} />} label="Direct Farmers" value={selectedAgent?.farmers.length} />
                </div>

                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Companies</h4>
                <div className="space-y-3 mb-8">
                    {selectedAgent?.companies.length > 0 ? selectedAgent.companies.map(company => (
                        <button
                            key={company.id}
                            onClick={() => { setSelectedCompany(company); setView('companyDetail'); }}
                            className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center hover:border-[#001F3F] transition-all"
                        >
                            <div>
                                <p className="font-bold text-slate-800">{company.name}</p>
                                <p className="text-[10px] text-slate-400 uppercase">{company.farmers.length} Farmers</p>
                            </div>
                            <ChevronRight size={18} className="text-slate-300" />
                        </button>
                    )) : <p className="text-sm text-slate-500">No companies managed.</p>}
                </div>

                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Direct Farmers</h4>
                <div className="space-y-3">
                    {selectedAgent?.farmers.length > 0 ? selectedAgent.farmers.map(farmerId => {
                        const farmer = getFarmerById(farmerId);
                        return farmer ? (
                            <button
                                key={farmer.id}
                                onClick={() => { setSelectedFarmer(farmer); setView('farmerDetail'); }}
                                className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center hover:border-[#001F3F] transition-all"
                            >
                                <div>
                                    <p className="font-bold text-slate-800">{farmer.name}</p>
                                    <p className="text-[10px] text-slate-400 uppercase">ID: {farmer.id}</p>
                                </div>
                                <ChevronRight size={18} className="text-slate-300" />
                            </button>
                        ) : null;
                    }) : <p className="text-sm text-slate-500">No direct farmers managed.</p>}
                </div>
            </div>
        </div>
    );

    const renderCompanyDetail = () => (
        <div className="space-y-6">
            <button onClick={() => setView('agentDetail')} className="flex items-center gap-2 text-[#001F3F] font-bold text-sm mb-4">
                <ChevronLeft size={18} /> Back to Agent
            </button>

            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl">
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-24 h-24 bg-slate-100 rounded-3xl mb-4 flex items-center justify-center text-[#001F3F]">
                        <Building2 size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">{selectedCompany?.name}</h3>
                    <p className="text-xs font-bold text-[#001F3F] uppercase tracking-widest">{selectedCompany?.id}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-8">
                    <DetailItem icon={<MapPin size={18} />} label="Location" value={selectedCompany?.location} />
                    <DetailItem icon={<Phone size={18} />} label="Contact" value={selectedCompany?.contact} />
                    <DetailItem icon={<Users size={18} />} label="Farmers" value={selectedCompany?.farmers.length} />
                </div>

                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Farmers in this Company</h4>
                <div className="space-y-3">
                    {selectedCompany?.farmers.length > 0 ? selectedCompany.farmers.map(farmerId => {
                        const farmer = getFarmerById(farmerId);
                        return farmer ? (
                            <button
                                key={farmer.id}
                                onClick={() => { setSelectedFarmer(farmer); setView('farmerDetail'); }}
                                className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center hover:border-[#001F3F] transition-all"
                            >
                                <div>
                                    <p className="font-bold text-slate-800">{farmer.name}</p>
                                    <p className="text-[10px] text-slate-400 uppercase">ID: {farmer.id}</p>
                                </div>
                                <ChevronRight size={18} className="text-slate-300" />
                            </button>
                        ) : null;
                    }) : <p className="text-sm text-slate-500">No farmers in this company.</p>}
                </div>
            </div>
        </div>
    );

    const renderFarmerDetail = () => (
        <div className="space-y-6">
            <button onClick={() => selectedCompany ? setView('companyDetail') : setView('agentDetail')} className="flex items-center gap-2 text-[#001F3F] font-bold text-sm mb-4">
                <ChevronLeft size={18} /> Back to {selectedCompany ? 'Company' : 'Agent'}
            </button>

            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl">
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-24 h-24 bg-slate-100 rounded-3xl mb-4 flex items-center justify-center text-[#001F3F]">
                        <Users size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">{selectedFarmer?.name}</h3>
                    <p className="text-xs font-bold text-[#001F3F] uppercase tracking-widest">{selectedFarmer?.id}</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <DetailItem icon={<MapPin size={18} />} label="Location" value={selectedFarmer?.location} />
                    <DetailItem icon={<Wallet size={18} />} label="Facilities Collected" value={selectedFarmer?.facilities.join(', ')} />
                    <DetailItem icon={<Calendar size={18} />} label="Repayment Time" value={selectedFarmer?.repayment} />
                    <DetailItem icon={<Activity size={18} />} label="Farm Status" value={selectedFarmer?.status} />
                    <DetailItem icon={<ShieldCheck size={18} />} label="Credit Worthiness" value={selectedFarmer?.creditWorthiness} />
                    <DetailItem icon={<Info size={18} />} label="Insurance Status" value={selectedFarmer?.insurance} />
                    <DetailItem icon={<Fingerprint size={18} />} label="Membership Level" value={selectedFarmer?.membership} />
                </div>

                <button className="w-full btn-primary py-4 mt-8 flex items-center justify-center gap-2">
                    <Fingerprint size={20} />
                    Re-verify Biometrics
                </button>
            </div>
        </div>
    );

    return (
        <div className="pt-24 px-6 max-w-lg mx-auto pb-12">
            <div className="mb-12">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tighter">Agent Terminal</h2>
                <p className="text-slate-500">Offline-ready agent and farmer management</p>
            </div>

            {view === 'overview' && renderOverview()}
            {view === 'agentList' && renderAgentList()}
            {view === 'agentDetail' && renderAgentDetail()}
            {view === 'companyDetail' && renderCompanyDetail()}
            {view === 'farmerDetail' && renderFarmerDetail()}

            {/* New Agent Registration Modal Overlay */}
            <AnimatePresence>
                {isRegisteringNewAgent && (
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
                                onClick={() => { setIsRegisteringNewAgent(false); setNinVerified(false); setIsVerifying(false); }}
                                className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                            >
                                <X size={20} className="text-slate-600" />
                            </button>

                            <h3 className="text-2xl font-bold text-slate-800 mb-6">New Agent Registration</h3>

                            <div className="space-y-4">
                                <div className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${ninVerified ? 'bg-green-50 border-green-100' : 'bg-blue-50 border-blue-100'}`}>
                                    <div className="flex items-center gap-3">
                                        {ninVerified ? (
                                            <CheckCircle2 className="text-green-500" size={20} />
                                        ) : (
                                            <ShieldCheck className={isVerifying ? 'text-[#001F3F] animate-pulse' : 'text-[#001F3F]'} size={20} />
                                        )}
                                        <div>
                                            <p className={`text-[10px] font-bold uppercase ${ninVerified ? 'text-green-600' : 'text-[#001F3F]'}`}>Biometric NIN Match</p>
                                            <p className="text-xs font-bold text-slate-700">
                                                {isVerifying ? 'Scanning Fingerprint...' : ninVerified ? 'Identity Match Confirmed' : 'Awaiting scan...'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleVerifyNin}
                                        disabled={isVerifying || ninVerified}
                                        className={`text-[10px] font-bold px-3 py-1 rounded-lg transition-all ${ninVerified ? 'bg-green-500 text-white' :
                                            isVerifying ? 'bg-slate-200 text-slate-400' : 'bg-[#001F3F] text-white hover:bg-opacity-90'
                                            }`}
                                    >
                                        {isVerifying ? 'PROCESSING' : ninVerified ? 'VERIFIED ✓' : 'VERIFY'}
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="First Name" className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#001F3F] outline-none text-sm" required />
                                    <input type="text" placeholder="Last Name" className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#001F3F] outline-none text-sm" required />
                                </div>
                                <input type="text" placeholder="NIN Number" className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#001F3F] outline-none text-sm" required />
                                <select className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#001F3F] outline-none text-sm appearance-none">
                                    <option value="">Select State of Operation</option>
                                    <option>FCT Abuja</option>
                                    <option>Kano</option>
                                    <option>Lagos</option>
                                    <option>Kaduna</option>
                                </select>
                                <input type="tel" placeholder="Phone Number" className="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#001F3F] outline-none text-sm" required />

                                <button onClick={() => setIsRegisteringNewAgent(false)} className="w-full btn-primary py-4 mt-4">
                                    Register Agent
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- AGRO DEALER INTERFACE ---
export const AgroDealerInterface = () => {
    const [purchaseType, setPurchaseType] = useState(null);
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
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tighter">Input Supplier</h2>
                <p className="text-slate-500">Verify input redemptions securely</p>
            </div>

            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-2xl mb-8 relative overflow-hidden group">
                <div
                    className={`relative z-10 flex flex-col items-center text-center cursor-pointer group ${scanning || processing ? 'pointer-events-none' : ''}`}
                    onClick={handleScan}
                >
                    <div className="w-20 h-20 bg-blue-900/5 text-[#001F3F] rounded-3xl flex items-center justify-center mb-6 py-auto group-hover:bg-blue-900/10 transition-colors">
                        {scanning ? (
                            <ScanLine className="animate-pulse" size={32} />
                        ) : processing ? (
                            <Loader2 className="animate-spin" size={32} />
                        ) : showSuccess ? (
                            <Check size={32} />
                        ) : (
                            <Fingerprint size={32} className="group-hover:scale-110 transition-transform" />
                        )}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                        {scanning ? 'Scanning...' : processing ? 'Processing...' : showSuccess ? 'Payment Confirmed' : 'Scan Thumbnail'}
                    </h3>

                    <p className="text-sm text-slate-400 mb-8 max-w-[200px] mx-auto">
                        {scanning ? 'Analyzing biometric hash...' : processing ? 'Verifying funds eligibility' : showSuccess ? 'Transaction ID: 8X99-22CA' : 'Place thumb on scanner to authorize payment'}
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
                                                <option>Maize (SAMMAZ 51)</option>
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
