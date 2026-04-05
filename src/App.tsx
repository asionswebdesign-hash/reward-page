/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Coins, 
  StarHalf, 
  Gamepad2, 
  Gamepad, 
  Puzzle, 
  Stars, 
  Cookie, 
  Medal, 
  Gift, 
  CheckCircle2, 
  Zap, 
  ShoppingBag, 
  Trophy, 
  User,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface Reward {
  id: string;
  title: string;
  points: number;
  icon: React.ReactNode;
  category: 'kecil' | 'sedang' | 'besar';
  description?: string;
  isLimited?: boolean;
  colorClass?: string;
}

// --- Mock Data ---

const REWARDS: Reward[] = [
  {
    id: '1',
    title: 'Main game 1 jam',
    points: 50,
    icon: <Gamepad2 className="w-16 h-16 text-primary/40" />,
    category: 'kecil',
  },
  {
    id: '2',
    title: 'Main game 2 jam',
    points: 100,
    icon: <Gamepad className="w-16 h-16 text-primary/40" />,
    category: 'kecil',
  },
  {
    id: '3',
    title: 'Test Reward QA',
    points: 100,
    icon: <Puzzle className="w-16 h-16 text-primary/40" />,
    category: 'kecil',
  },
  {
    id: '4',
    title: 'Camilan Spesial',
    points: 300,
    icon: <Cookie className="w-16 h-16 text-tertiary/40" />,
    category: 'sedang',
    colorClass: 'bg-tertiary-container',
  },
  {
    id: '5',
    title: 'Mainan Baru',
    points: 1000,
    icon: <Gift className="w-24 h-24 text-tertiary/60" />,
    category: 'besar',
    description: 'Pilih mainan favoritmu di toko fisik dengan voucher ini!',
    isLimited: true,
  },
];

// --- Components ---

const Header = ({ points }: { points: number }) => (
  <header className="sticky top-0 z-50 glass-effect">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-black text-primary tracking-tight">MathPlayground</span>
      </div>
      
      <div className="flex items-center gap-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-bold shadow-sm cursor-pointer"
        >
          <Coins className="w-5 h-5 text-secondary" />
          <span className="text-lg">{points.toLocaleString()} Points</span>
        </motion.div>
        
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary ring-4 ring-primary/10">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv239zMUr3ZuNPJ87Mv-KxtLSWcUfYXhXWio2HHb25Wizsep6cCi2rFJIK5FrrshmJWcmMVM93AvbKv04Tf00JMVtp38OAVRZLrDPLmk7wTS7jD8Eo7_LkliOCaaHyM6V5NRxLcElYqCrO0D9458KXPvTTszFtU-wx1t8pnsmcNSGFaVla9eaQenoyINNh36YUHGPX6ONK7DXdB3oE85IoatT_5yaLQ4B30uHM420Zzk631zuLl29crn_s31K-g3Na7QO-H5_s1-6u" 
            alt="User avatar"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  </header>
);

const RewardCard = ({ reward, onExchange }: { reward: Reward, onExchange: (r: Reward) => void }) => {
  if (reward.category === 'besar') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-surface-container-lowest p-8 rounded-lg card-shadow border-2 border-tertiary-container reward-card-hover flex flex-col md:flex-row gap-8 col-span-full lg:col-span-2"
      >
        <div className="w-full md:w-1/2 h-64 rounded-lg bg-gradient-to-br from-tertiary-container to-primary-container flex items-center justify-center relative overflow-hidden">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {reward.icon}
          </motion.div>
        </div>
        <div className="flex flex-col justify-center flex-1">
          {reward.isLimited && (
            <div className="inline-flex bg-tertiary text-white text-xs px-3 py-1 rounded-full w-fit mb-3 uppercase tracking-wider font-bold">
              Limited
            </div>
          )}
          <h3 className="text-3xl font-black mb-2 text-on-surface">{reward.title}</h3>
          <p className="text-on-surface-variant mb-6">{reward.description}</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-secondary-container px-6 py-2 rounded-full text-lg font-bold flex items-center gap-2">
              <Coins className="w-6 h-6 text-secondary" />
              <span>{reward.points} Points</span>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onExchange(reward)}
              className="bg-tertiary text-white px-8 py-3 rounded-full font-black shadow-lg hover:bg-tertiary/90 transition-colors"
            >
              TUKAR SEKARANG
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-surface-container-lowest p-6 rounded-lg card-shadow reward-card-hover group"
    >
      <div className={`w-full h-40 rounded-lg ${reward.colorClass || 'bg-surface-container'} mb-4 flex items-center justify-center relative overflow-hidden`}>
        <motion.div className="group-hover:scale-110 transition-transform duration-500">
          {reward.icon}
        </motion.div>
      </div>
      <h3 className="text-xl font-bold mb-1">{reward.title}</h3>
      <div className="flex justify-between items-center mt-4">
        <div className="bg-secondary-container px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
          <Coins className="w-4 h-4 text-secondary" />
          <span>{reward.points} Points</span>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onExchange(reward)}
          className="bg-primary text-white px-6 py-2 rounded-full font-bold shadow-sm hover:bg-primary/90 transition-colors"
        >
          Tukar
        </motion.button>
      </div>
    </motion.div>
  );
};

const CategoryHeader = ({ title, range, icon: Icon, colorClass }: { title: string, range: string, icon: any, colorClass?: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`w-12 h-12 ${colorClass || 'bg-surface-container-highest'} rounded-full flex items-center justify-center`}>
      <Icon className={`w-6 h-6 ${colorClass ? 'text-tertiary' : 'text-primary'}`} />
    </div>
    <h2 className="text-2xl font-bold text-on-surface">
      {title} <span className="text-sm font-normal opacity-60 ml-2">{range}</span>
    </h2>
  </div>
);

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState('store');

  const tabs = [
    { id: 'play', label: 'Play', icon: Gamepad2 },
    { id: 'store', label: 'Store', icon: ShoppingBag },
    { id: 'awards', label: 'Awards', icon: Medal },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-[0_-8px_40px_rgba(0,96,169,0.08)] rounded-t-[2.5rem]">
      <div className="max-w-md mx-auto flex justify-around items-center px-4 pt-3 pb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center px-6 py-2 transition-all duration-300 relative ${
              activeTab === tab.id ? 'text-primary' : 'text-on-surface-variant/40'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div 
                layoutId="nav-pill"
                className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

// --- Main App ---

export default function App() {
  const [userPoints, setUserPoints] = useState(1250);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  const handleExchange = (reward: Reward) => {
    if (userPoints >= reward.points) {
      setUserPoints(prev => prev - reward.points);
      setShowSuccess(reward.title);
      setTimeout(() => setShowSuccess(null), 3000);
    } else {
      alert("Points tidak cukup!");
    }
  };

  return (
    <div className="min-h-screen bg-surface pb-32">
      <Header points={userPoints} />
      
      <main className="max-w-7xl mx-auto px-6 pt-12">
        {/* Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Berhasil menukar {showSuccess}!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary-container p-8 rounded-lg mb-16 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h1 className="text-4xl font-black text-on-primary-container mb-2">Reward Store</h1>
            <p className="text-on-primary-container opacity-80 text-lg">Tukarkan point hasil belajarmu dengan hadiah seru!</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        </motion.div>

        {/* Reward Categories */}
        <div className="space-y-20">
          {/* Category: Reward Kecil */}
          <section>
            <CategoryHeader title="Reward Kecil" range="100 - 150 coins" icon={StarHalf} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {REWARDS.filter(r => r.category === 'kecil').map(reward => (
                <RewardCard key={reward.id} reward={reward} onExchange={handleExchange} />
              ))}
            </div>
          </section>

          {/* Category: Reward Sedang */}
          <section>
            <CategoryHeader title="Reward Sedang" range="200 - 500 coins" icon={Stars} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {REWARDS.filter(r => r.category === 'sedang').map(reward => (
                <RewardCard key={reward.id} reward={reward} onExchange={handleExchange} />
              ))}
            </div>
          </section>

          {/* Category: Reward Besar */}
          <section>
            <CategoryHeader title="Reward Besar" range="800+ coins" icon={Medal} colorClass="bg-tertiary-container" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {REWARDS.filter(r => r.category === 'besar').map(reward => (
                <RewardCard key={reward.id} reward={reward} onExchange={handleExchange} />
              ))}
            </div>
          </section>
        </div>

        {/* How to Get Coins Section */}
        <section className="mt-24 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-container-low rounded-lg p-10 relative overflow-hidden"
          >
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-tertiary/5 rounded-full" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-center mb-10 text-on-surface">Cara Dapat Koin</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                <div className="bg-surface-container-lowest p-6 rounded-lg flex items-center gap-4 shadow-sm border border-blue-100/20">
                  <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Jawab benar</h4>
                    <p className="text-green-600 font-black">+10 XP</p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-lg flex items-center gap-4 shadow-sm border border-blue-100/20">
                  <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-tight">Jawab cepat (&lt;5 detik)</h4>
                    <p className="text-blue-600 font-black">+5 XP</p>
                  </div>
                </div>

                <motion.div 
                  whileHover={{ rotate: 0 }}
                  className="bg-primary text-white p-6 rounded-lg flex flex-col items-center justify-center text-center shadow-lg transform rotate-2"
                >
                  <p className="text-sm opacity-80 uppercase font-bold mb-1">Konversi XP</p>
                  <h4 className="text-3xl font-black">50 XP = 1 Coin</h4>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
