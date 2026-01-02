import React from 'react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'caesar', label: 'Caesar' },
    { id: 'affine', label: 'Affine' },
    { id: 'playfair', label: 'Playfair' },
    { id: 'hill', label: 'Hill' },
    { id: 'cracker', label: 'Hill Cracker', special: true },
  ];

  return (
    <nav className="flex justify-center mb-10 sticky top-4 z-50">
      <div className="flex bg-black/60 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap ${
              activeTab === tab.id
                ? (tab.special 
                    ? 'text-white shadow-lg shadow-rose-900/40 bg-gradient-to-r from-rose-600 to-pink-600' 
                    : 'text-white shadow-lg shadow-indigo-900/40 bg-gradient-to-r from-indigo-600 to-violet-600')
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;