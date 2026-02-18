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
  Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiometricOnboarding, FarmRegistration } from './components/Onboarding';
import { GovernmentDashboard, AgentInterface, AgroDealerInterface } from './components/AdminInterfaces';

// --- MOCK DATA ---
const INITIAL_WALLET = { subsidy: 154200, credit: 500000, repaymentProgress: 18 };
const TRANSACTIONS = [
  { id: 1, type: 'REDEMPTION', amount: 45000, title: 'Fertilizer Purchase', date: '2026-02-15' },
  { id: 2, type: 'SUBSIDY', amount: 150000, title: 'Dry Season Support', date: '2026-02-10' },
  { id: 3, type: 'REDEMPTION', amount: 12500, title: 'Certified Rice Seeds', date: '2026-02-01' },
];

const ADVISORIES = [
  { id: 1, icon: <CloudRain className="text-blue-500" />, title: 'Weather Alert', text: 'Heavy rainfall expected in FCT. Protect seedlings from runoff.' },
  { id: 2, icon: <Sprout className="text-gov-green" />, title: 'Soil Tip', text: 'Increase potash for cassava planting in Sector G series.' },
];

// --- COMPONENTS ---

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

const FarmerDashboard = () => (
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
        <div key={a.id} className="glass-card p-4 flex gap-4 items-start mb-3 border-transparent">
          <div className="bg-slate-50 p-3 rounded-2xl">{a.icon}</div>
          <div>
            <h4 className="font-bold text-xs text-slate-800">{a.title}</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{a.text}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Transactions */}
    <div>
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Transaction History</h3>
      <div className="space-y-3">
        {TRANSACTIONS.map(tx => (
          <div key={tx.id} className="flex items-center justify-between p-4 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
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
        ))}
      </div>
    </div>
  </motion.div>
);

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
        { id: 'dealer', label: 'Agro-Dealer', icon: <ShoppingBag />, desc: 'Authorize redemptions', color: 'bg-orange-500/10 text-orange-500' },
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
