import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowLeft, Delete, CornerDownLeft } from 'lucide-react';

const MENUS = {
    MAIN: {
        title: 'AgriSmart USSD',
        options: [
            '1. Check Balance',
            '2. Farmer Registration',
            '3. Input Redemption',
            '4. Support'
        ]
    },
    BALANCE: {
        title: 'Wallet Balance',
        content: 'Subsidy: ₦154,200\nCredit: ₦500,000\nRecovery: 18%\n\n0. Back',
    },
    REGISTER: {
        title: 'Farmer Registration',
        content: 'Enter NIN Number to begin biometric link via SMS.\n\n0. Back',
    },
    REDEEM: {
        title: 'Input Redemption',
        content: 'Enter Voucher Code provided by Dealer.\n\n0. Back',
    },
    SUPPORT: {
        title: 'AgriSmart Help',
        content: 'Call 0800-AGRI-SAFE for assistance.\n\n0. Back',
    }
};

export const USSDSimulator = ({ onClose }) => {
    const [currentMenu, setCurrentMenu] = useState('MAIN');
    const [input, setInput] = useState('');

    const handleKey = (key) => {
        if (key === 'Enter') {
            if (input === '1') setCurrentMenu('BALANCE');
            else if (input === '2') setCurrentMenu('REGISTER');
            else if (input === '3') setCurrentMenu('REDEEM');
            else if (input === '4') setCurrentMenu('SUPPORT');
            else if (input === '0') setCurrentMenu('MAIN');
            setInput('');
        } else if (key === 'Clear') {
            setInput('');
        } else {
            setInput(prev => prev + key);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900 z-[200] flex flex-col items-center justify-center p-6 text-white font-mono">
            <button
                onClick={onClose}
                className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
                <ArrowLeft size={20} />
                <span>Exit Offline Mode</span>
            </button>

            {/* Feature Phone UI */}
            <div className="w-80 h-[600px] bg-slate-800 rounded-[3rem] border-[8px] border-slate-700 shadow-2xl relative overflow-hidden flex flex-col p-4 shadow-blue-500/20">
                {/* Screen */}
                <div className="bg-[#8fa189] h-1/2 rounded-2xl p-4 text-slate-900 flex flex-col shadow-inner border-2 border-slate-600/20">
                    <div className="flex justify-between items-center mb-4 border-b border-slate-900/10 pb-1">
                        <span className="text-[10px] font-bold">AGRI-SMART v1.0</span>
                        <Phone size={12} fill="currentColor" />
                    </div>

                    <div className="flex-1">
                        <h4 className="font-bold text-sm mb-2">{MENUS[currentMenu].title}</h4>
                        {currentMenu === 'MAIN' ? (
                            <div className="space-y-1">
                                {MENUS.MAIN.options.map(opt => (
                                    <p key={opt} className="text-xs">{opt}</p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs whitespace-pre-line">{MENUS[currentMenu].content}</p>
                        )}
                    </div>

                    <div className="mt-auto pt-2 border-t border-slate-900/10 flex justify-between items-center h-8">
                        <span className="text-xs font-bold leading-none">{input}</span>
                        {input && (
                            <div className="flex gap-1">
                                <Delete size={14} className="opacity-50" />
                                <CornerDownLeft size={14} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Keypad */}
                <div className="flex-1 grid grid-cols-3 gap-2 p-4 pt-8">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(key => (
                        <button
                            key={key}
                            onClick={() => handleKey(key)}
                            className="h-12 bg-slate-700 rounded-xl flex items-center justify-center font-bold text-lg active:bg-slate-600 active:scale-95 transition-all shadow-md"
                        >
                            {key}
                        </button>
                    ))}
                    <button onClick={() => handleKey('Clear')} className="bg-red-500/20 text-red-400 h-10 rounded-xl text-[10px] font-bold">CLEAR</button>
                    <button onClick={() => handleKey('Enter')} className="bg-green-500 text-slate-900 h-10 rounded-xl text-[10px] font-bold col-span-2">SEND</button>
                </div>
            </div>

            <p className="mt-8 text-slate-500 text-xs text-center max-w-xs">
                SIMULATING OFFLINE PROTOCOL:<br />
                Encrypted SMS Layer Active
            </p>
        </div>
    );
};
