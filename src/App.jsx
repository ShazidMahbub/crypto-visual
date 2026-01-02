import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CaesarCipher from './components/ciphers/caesar/index';
import HillCipher from './components/ciphers/hill/index';
import AffineCipher from './components/ciphers/affine/index';
import PlayfairCipher from './components/ciphers/playfair/index';
import HillCracker from './components/ciphers/cracker/index';
import { PageTitle } from './components/layout/Layout';

const App = () => {
  const [activeTab, setActiveTab] = useState('caesar');

  return (
    <div className="relative min-h-screen w-full bg-black text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <header className="py-12 md:py-16 text-center">
          <PageTitle 
            title="Crypto Visual" 
            subtitle="Classic Encryption & Cryptanalysis Suite" 
          />
        </header>

        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="transition-all duration-500 ease-in-out">
          {activeTab === 'caesar' && <div className="animate-fade-in"><CaesarCipher /></div>}
          {activeTab === 'affine' && <div className="animate-fade-in"><AffineCipher /></div>}
          {activeTab === 'playfair' && <div className="animate-fade-in"><PlayfairCipher /></div>}
          {activeTab === 'hill' && <div className="animate-fade-in"><HillCipher /></div>}
          {activeTab === 'cracker' && <div className="animate-fade-in"><HillCracker /></div>}
        </main>

        <footer className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold hover:text-slate-300 transition-colors">
            CSE721 • Introduction to Cryptography
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;