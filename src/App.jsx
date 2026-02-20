import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCircle,
  LayoutDashboard,
  ShoppingBag,
  History,
  Users,
  Briefcase,
  TrendingUp,
  Map as MapIcon,
  LogOut,
  ChevronRight,
  ArrowRight,
  CloudRain,
  Sprout,
  Activity,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  CheckCircle2,
  X,
  Loader2,
  Phone,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiometricOnboarding, FarmRegistration } from './components/Onboarding';
import { GovernmentDashboard, AgentInterface, AgroDealerInterface } from './components/AdminInterfaces';
import { USSDSimulator } from './components/USSDSimulator';

// --- MOCK DATA ---
const INITIAL_WALLET = { subsidy: 154200, credit: 500000, repaymentProgress: 18 };
const TRANSACTIONS = [
  { id: 1, type: 'REDEMPTION', amount: 45000, title: 'Fertilizer Purchase', date: '2026-02-15', supplyDetail: '3 Bags NPK 15-15-15' },
  { id: 2, type: 'SUBSIDY', amount: 150000, title: 'Dry Season Support', date: '2026-02-10' },
  { id: 3, type: 'REDEMPTION', amount: 12500, title: 'Certified Rice Seeds', date: '2026-02-01', supplyDetail: '5kg Faro 44 Hybrid' },
];

const ADVISORIES = [
  { id: 1, icon: <CloudRain className="text-blue-500" />, title: 'Weather Alert', text: 'Heavy rainfall expected in FCT. Protect seedlings from runoff.' },
  { id: 2, icon: <Sprout className="text-gov-green" />, title: 'Soil Tip', text: 'Increase potash for cassava planting in Sector G series.' },
];

// --- COMPONENTS ---

const SoilAnalysisModal = ({ isOpen, onClose }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const startAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        precise: "pH Level: 6.5 | Nitrogen: High | Phosphorus: Medium",
        general: "Your soil is ideal for root crops. Add 20kg of Potash per hectare for optimal yield."
      });
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="bg-slate-900 h-48 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-4 border-2 border-white/20 rounded-2xl border-dashed" />
              {analyzing ? (
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-white text-center">
                  <Activity size={48} className="mx-auto mb-2 text-blue-400" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Deep Sample Analysis...</p>
                </motion.div>
              ) : result ? (
                <div className="w-full h-full bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800)' }}>
                  <div className="absolute inset-0 bg-gov-blue/40" />
                  <CheckCircle2 className="text-white relative z-10" size={48} />
                </div>
              ) : (
                <Camera className="text-white/20" size={64} />
              )}
            </div>

            <div className="p-8">
              {!result ? (
                <>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">Soil Insight AI</h3>
                  <p className="text-xs text-slate-500 mb-8 leading-relaxed font-medium">Capture a high-res photo of your soil. Our real-time lab integration analyzes mineral composition instantly.</p>
                  <button onClick={startAnalysis} disabled={analyzing} className="w-full btn-primary py-4 flex items-center justify-center gap-2">
                    {analyzing ? <Loader2 className="animate-spin" size={20} /> : <Camera size={20} />}
                    {analyzing ? 'Analyzing Lab Data...' : 'Start Real-time Analysis'}
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-slate-50 p-4 rounded-2xl mb-4 border border-slate-100">
                    <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Precise Data</p>
                    <p className="text-xs font-bold text-slate-800">{result.precise}</p>
                  </div>
                  <div className="bg-gov-green/5 p-4 rounded-2xl mb-8 border border-gov-green/10">
                    <p className="text-[10px] font-bold text-gov-green uppercase mb-1">General Recommendation</p>
                    <p className="text-xs font-medium text-slate-600 leading-relaxed">{result.general}</p>
                  </div>
                  <button onClick={onClose} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm">Close Analysis</button>
                </>
              )}
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"><X size={16} /></button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
const WeatherAlertModal = ({ isOpen, onClose }) => {
  const forecast = [
    { day: 'Friday', condition: 'Heavy Rain', temp: '24°C', risk: 'High Runoff' },
    { day: 'Saturday', condition: 'Thunderstorms', temp: '23°C', risk: 'Flash Flood' },
    { day: 'Sunday', condition: 'Cloudy', temp: '28°C', risk: 'Low' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-end sm:items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
          >
            <div className="bg-blue-600 h-40 shrink-0 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center" />
              <div className="relative z-10 text-white text-center">
                <CloudRain size={48} className="mx-auto mb-2 animate-bounce" />
                <h3 className="text-xl font-bold uppercase tracking-widest">Severe Weather Alert</h3>
              </div>
            </div>

            <div className="p-8 overflow-y-auto scrollbar-hide flex-1">
              <div className="mb-6">
                <p className="text-[10px] font-bold text-red-500 uppercase mb-2 flex items-center gap-1">
                  <Activity size={12} /> Emergency Advisory: FCT Area
                </p>
                <p className="text-sm font-bold text-slate-800 leading-tight mb-2">Heavy rainfall expected within the next 48 hours. Risk of seedling washout in FCT, Gwagwalada, and Kuje zones.</p>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">3-Day Forecast</p>
                {forecast.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{f.day}</p>
                      <p className="text-[10px] text-slate-500">{f.condition}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-blue-600">{f.temp}</p>
                      <p className="text-[10px] font-bold text-red-500 uppercase">{f.risk}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-2xl mb-8 border border-blue-100">
                <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Protective Action</p>
                <p className="text-xs font-medium text-slate-600 leading-relaxed">Ensure drainage channels are clear. Use mulching or temporary silt fences to protect young seedlings from topsoil runoff.</p>
              </div>

              <button onClick={onClose} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-transform">Acknowledge Alert</button>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors z-20"
            >
              <X size={16} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Header = ({ userRole, onLogout }) => (
  <header className="fixed top-0 left-0 right-0 bg-[#001F3F] text-white p-4 flex justify-between items-center z-50 shadow-lg shadow-blue-900/10">
    <div className="flex items-center gap-2">
      <div className="bg-white p-1 rounded-lg">
        <ShieldCheck className="text-[#001F3F]" size={24} />
      </div>
      <div>
        <h1 className="text-sm font-bold tracking-tighter leading-none uppercase">Agri-Smart</h1>
        <p className="text-[10px] font-medium opacity-70 uppercase">Connect</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="text-right hidden sm:block">
        <p className="text-[10px] opacity-70 uppercase font-bold leading-none">{userRole}</p>
        <p className="text-sm font-bold">Bala Ahmed</p>
      </div>
      <button onClick={onLogout} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors flex items-center gap-2 px-3">
        <LogOut size={18} />
        <span className="text-xs font-bold sm:hidden">EXIT</span>
      </button>
    </div>
  </header>
);

const FarmerDashboard = () => {
  const [isSoilModalOpen, setIsSoilModalOpen] = useState(false);
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-24 pb-24 px-4 max-w-md mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tighter">My Wallet</h2>
        <p className="text-sm text-slate-500">Government ID: NG-FARM-9021</p>
      </div>

      {/* Wallet Cards */}
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4">
        <div className="bg-gradient-to-br from-[#001F3F] to-[#003366] p-6 rounded-[2.5rem] text-white shadow-2xl min-w-[280px] relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <p className="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Subsidy Balance</p>
          <h3 className="text-3xl font-bold italic">₦{INITIAL_WALLET.subsidy.toLocaleString()}</h3>
          <div className="mt-8 flex justify-between items-center">
            <div className="bg-white/20 p-2 rounded-xl"><Wallet size={20} /></div>
            <span className="text-[10px] font-bold bg-white/20 px-3 py-1 rounded-full uppercase">Verified Credit</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gov-blue to-slate-800 p-6 rounded-[2.5rem] text-white shadow-2xl min-w-[280px] relative overflow-hidden">
          <p className="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Input Credit line</p>
          <h3 className="text-3xl font-bold italic">₦{INITIAL_WALLET.credit.toLocaleString()}</h3>
          <div className="mt-8 flex justify-between items-center">
            <div className="bg-white/20 p-2 rounded-xl"><Briefcase size={20} /></div>
            <span className="text-[10px] font-bold bg-white/20 px-3 py-1 rounded-full uppercase">Revolving Fund</span>
          </div>
        </div>
      </div>

      {/* Repayment Progress */}
      <div className="glass-card p-6 mb-8 mt-4 border-slate-50">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Credit Recovery</span>
          <span className="text-xs font-bold text-blue-900">{INITIAL_WALLET.repaymentProgress}%</span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-2">
          <div className="bg-[#001F3F] h-full rounded-full w-[18%] shadow-[0_0_10px_rgba(0,31,63,0.3)]" />
        </div>
        <p className="text-[10px] text-slate-400 font-medium text-center uppercase tracking-tighter">Automatic harvest deduction active</p>
      </div>

      {/* Advisory */}
      <div className="mb-8">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Pulse Insights</h3>
        {ADVISORIES.map(a => (
          <div key={a.id} className={`glass-card p-4 flex flex-col sm:flex-row gap-4 items-start mb-3 border-transparent group overflow-hidden relative ${a.title === 'Weather Alert' ? 'bg-blue-50/30' : ''}`}>
            {a.title === 'Weather Alert' && (
              <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-blue-500 pointer-events-none"
              />
            )}
            <div className="flex gap-4 items-start w-full relative z-10">
              <div className="bg-white p-3 rounded-2xl shrink-0 shadow-sm">{a.icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-slate-800">{a.title}</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium break-words">{a.text}</p>
              </div>
              {a.title === 'Soil Tip' && (
                <button
                  onClick={() => setIsSoilModalOpen(true)}
                  className="bg-[#001F3F] text-white p-2 rounded-xl hover:scale-110 transition-transform shadow-md"
                >
                  <Camera size={16} />
                </button>
              )}
              {a.title === 'Weather Alert' && (
                <button
                  onClick={() => setIsWeatherModalOpen(true)}
                  className="bg-blue-500 text-white p-2 rounded-xl hover:scale-110 transition-transform shadow-md"
                >
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
        <SoilAnalysisModal isOpen={isSoilModalOpen} onClose={() => setIsSoilModalOpen(false)} />
        <WeatherAlertModal isOpen={isWeatherModalOpen} onClose={() => setIsWeatherModalOpen(false)} />
      </div>

      {/* Transactions */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Transaction History</h3>
        <div className="space-y-3">
          {TRANSACTIONS.map(tx => (
            <div key={tx.id} className="flex flex-col p-4 bg-white rounded-[2rem] border border-slate-100 shadow-sm gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${tx.type === 'REDEMPTION' ? 'bg-orange-50 text-orange-500' : 'bg-[#001F3F]/10 text-[#001F3F]'}`}>
                    {tx.type === 'REDEMPTION' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{tx.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{tx.date}</p>
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-900">₦{tx.amount.toLocaleString()}</p>
              </div>
              {tx.supplyDetail && (
                <div className="ml-11 px-3 py-1 bg-slate-50 rounded-lg inline-block self-start">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    Supply: <span className="text-slate-600">{tx.supplyDetail}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const RoleSelector = ({ onSelect }) => (
  <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]">
    <div className="mb-12 text-center">
      <div className="w-20 h-20 bg-[#001F3F] text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl relative">
        <ShieldCheck size={40} />
        <div className="absolute -inset-2 bg-blue-900/10 rounded-full animate-ping opacity-20" />
      </div>
      <h1 className="text-5xl font-extrabold text-slate-900 tracking-tighter mb-2">AGRI-SMART</h1>
      <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] opacity-70">National Infrastructure v1.0</p>
    </div>

    <div className="w-full max-w-sm space-y-3">
      {[
        { id: 'farmer', label: 'Farmer Portal', icon: <UserCircle />, desc: 'Biometric wallet & subsidies', color: 'bg-[#001F3F]/10 text-[#001F3F]' },
        { id: 'agent', label: 'Field Agent', icon: <Users />, desc: 'Register farmers offline', color: 'bg-gov-blue/10 text-gov-blue' },
        { id: 'dealer', label: 'Input Supplier', icon: <ShoppingBag />, desc: 'Verify input redemptions', color: 'bg-orange-500/10 text-orange-500' },
        { id: 'ussd', label: 'Offline / USSD', icon: <Phone />, desc: 'For non-smartphone users', color: 'bg-[#8fa189]/20 text-slate-700' },
        { id: 'admin', label: 'Government Admin', icon: <Activity />, desc: 'National monitoring', color: 'bg-purple-600/10 text-purple-600' }
      ].map(role => (
        <button
          key={role.id}
          onClick={() => onSelect(role.id)}
          className="w-full bg-white p-5 rounded-[2.5rem] flex items-center gap-4 border border-slate-100 hover:border-[#001F3F] hover:shadow-2xl transition-all group outline-none"
        >
          <div className={`${role.color} p-3 rounded-2xl transition-transform group-hover:scale-110`}>
            {role.icon}
          </div>
          <div className="text-left flex-1">
            <h3 className="font-extrabold text-slate-800 tracking-tight">{role.label}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">{role.desc}</p>
          </div>
          <ArrowRight className="text-slate-200 group-hover:text-[#001F3F] group-hover:translate-x-1 transition-all" size={20} />
        </button>
      ))}
    </div>
  </div>
);

const App = () => {
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [setupStep, setSetupStep] = useState('biometric'); // biometric, farm, dashboard

  if (!role) return <RoleSelector onSelect={setRole} />;

  if (role === 'ussd') return <USSDSimulator onClose={() => setRole(null)} />;

  // --- FARMER ROLE LOGIC ---
  if (role === 'farmer') {
    if (setupStep === 'biometric') {
      return <BiometricOnboarding onComplete={() => setSetupStep('farm')} />;
    }
    if (setupStep === 'farm') {
      return <FarmRegistration onComplete={() => setSetupStep('dashboard')} />;
    }

    return (
      <div className="min-h-screen bg-slate-50">
        <Header userRole={role} onLogout={() => setRole(null)} />
        <main>
          {activeTab === 'dashboard' && <FarmerDashboard />}
          {activeTab === 'redeem' && <AgroDealerInterface />} {/* Re-using Dealer logic for redemption view */}
          {activeTab === 'history' && (
            <div className="pt-24 px-4 max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-6 tracking-tighter">History</h2>
              <div className="space-y-3">
                {TRANSACTIONS.map(tx => (
                  <div key={tx.id} className="p-4 bg-white rounded-3xl border border-slate-100 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-xs">{tx.title}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{tx.date}</p>
                    </div>
                    <p className="font-bold text-[#001F3F] text-xs">₦{tx.amount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t p-4 flex justify-around items-center z-50">
          <button onClick={() => setActiveTab('dashboard')} className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <LayoutDashboard size={24} />
          </button>
          <button onClick={() => setActiveTab('redeem')} className={`nav-link ${activeTab === 'redeem' ? 'active' : ''}`}>
            <div className="bg-[#001F3F] text-white p-3 rounded-2xl shadow-lg -mt-8 border-4 border-white">
              <ShoppingBag size={24} />
            </div>
          </button>
          <button onClick={() => setActiveTab('history')} className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}>
            <History size={24} />
          </button>
        </nav>
      </div>
    );
  }

  // --- OTHER ROLES ---
  return (
    <div className="min-h-screen bg-slate-50">
      <Header userRole={role} onLogout={() => setRole(null)} />
      {role === 'admin' && <GovernmentDashboard />}
      {role === 'agent' && <AgentInterface />}
      {role === 'dealer' && <AgroDealerInterface />}
    </div>
  );
}

export default App;
