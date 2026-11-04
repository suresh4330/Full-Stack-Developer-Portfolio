import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Layout, Smartphone, Sparkles, Check, ShoppingCart, Calendar, MapPin, Eye, Code2, Copy } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';
import { RevealWrapper } from '../ui/RevealWrapper';

const cartSnippet = `// Strict TypeScript Shopping Cart Context Hook
export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export const useOptimisticCart = (initialItems: CartItem[]) => {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const totalPrice = items.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

  return { items, updateQty, totalPrice };
};`;

const bookingSnippet = `// Doctor Appointment Slot Reservation Hook
export interface SlotState {
  selectedSlot: string;
  isConfirmed: boolean;
  doctorId: string;
}

export const useSlotPicker = (initialSlot: string = '10:30 AM') => {
  const [slot, setSlot] = useState<string>(initialSlot);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const selectSlot = (newSlot: string) => {
    setSlot(newSlot);
    setConfirmed(false);
  };

  const confirmReservation = () => {
    setConfirmed(true);
    // Optimistic reservation client dispatch
  };

  return { slot, confirmed, selectSlot, confirmReservation };
};`;

export const FrontendSection: React.FC = () => {
  // Live interactive UI simulation state demonstrating React component capabilities
  const [activeTab, setActiveTab] = useState<'cart' | 'booking'>('cart');
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [copiedCode, setCopiedCode] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Margherita Pizza', price: 12.99, qty: 1 },
    { id: 2, name: 'Fresh Basil Salad', price: 8.50, qty: 2 },
  ]);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30 AM');
  const [bookedStatus, setBookedStatus] = useState(false);

  const updateQty = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

  const handleCopyCode = () => {
    const code = activeTab === 'cart' ? cartSnippet : bookingSnippet;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="frontend" className="py-24 bg-dark-950/40 backdrop-blur-[2px] border-b border-dark-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          pill="Frontend Engineering"
          title="Modern User Interfaces & Interactive Architecture"
          description="Engineering fast, accessible, and responsive user experiences using React, TypeScript, and modern component systems."
        />

        {/* 2-Column Showcase: Pillars on Left, Live Interactive UI Component on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Frontend Engineering Pillars with Staggered Direction */}
          <div className="lg:col-span-6 space-y-4">
            
            <RevealWrapper direction="right" delay={0.05}>
              <motion.div 
                className="p-5 rounded-2xl bg-dark-900 border border-dark-750 hover:border-sky-500/40 transition-all duration-300 shadow-lg"
                whileHover={{ y: -3, scale: 1.01 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    <Layout className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Component-Driven React & TypeScript
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Structuring scalable, reusable component hierarchies with strict TypeScript props interfaces, avoiding prop drilling through cleanly scoped custom hooks and typed state models.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {['React 18', 'TypeScript', 'Reusable Components', 'Vite'].map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-dark-850 text-sky-400 border border-dark-700">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </RevealWrapper>

            <RevealWrapper direction="right" delay={0.15}>
              <motion.div 
                className="p-5 rounded-2xl bg-dark-900 border border-dark-750 hover:border-brand-500/40 transition-all duration-300 shadow-lg"
                whileHover={{ y: -3, scale: 1.01 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Mobile-First Responsive Layouts
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Designing fluid interfaces engineered with semantic HTML5 and CSS3 Grid/Flexbox layouts that automatically adjust across phone, tablet, and desktop viewports without visual jumps.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {['Tailwind CSS', 'CSS Grid', 'Flexbox', 'Responsive Viewports'].map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-dark-850 text-brand-400 border border-dark-700">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </RevealWrapper>

            <RevealWrapper direction="right" delay={0.25}>
              <motion.div 
                className="p-5 rounded-2xl bg-dark-900 border border-dark-750 hover:border-indigo-500/40 transition-all duration-300 shadow-lg"
                whileHover={{ y: -3, scale: 1.01 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Client State & API Integration
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Integrating asynchronous REST APIs with optimistic client state updates via React Context API, combined with geospatial mapping (Leaflet.js) and third-party data services (TMDB).
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {['React Context API', 'REST API Client', 'Leaflet Maps', 'Async Hydration'].map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-dark-850 text-indigo-400 border border-dark-700">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </RevealWrapper>

          </div>

          {/* Right Column: Live Interactive UI Component Sandbox with 3D Tilt */}
          <RevealWrapper direction="left" delay={0.15} className="lg:col-span-6">
            <TiltCard
              className="bg-dark-900 border border-dark-750 rounded-3xl p-6 shadow-2xl backdrop-blur-xl"
              tiltIntensity={6}
              glareOpacity={0.06}
              glowColor="sky"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-dark-800 gap-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-white block">
                      Interactive Frontend Sandbox
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Toggle live UI preview or typed component architecture
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mode Selector: Preview vs Code */}
                  <div className="flex items-center bg-dark-950 p-1 rounded-xl border border-dark-800 text-xs font-mono">
                    <motion.button
                      onClick={() => setViewMode('preview')}
                      whileTap={{ scale: 0.95 }}
                      className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                        viewMode === 'preview'
                          ? 'bg-sky-500 text-dark-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      data-interactive="true"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Preview</span>
                    </motion.button>
                    <motion.button
                      onClick={() => setViewMode('code')}
                      whileTap={{ scale: 0.95 }}
                      className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                        viewMode === 'code'
                          ? 'bg-sky-500 text-dark-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      data-interactive="true"
                    >
                      <Code2 className="w-3 h-3" />
                      <span>Code</span>
                    </motion.button>
                  </div>

                  {/* Component Selector */}
                  <div className="flex items-center gap-1 bg-dark-950 p-1 rounded-xl border border-dark-800">
                    <motion.button
                      onClick={() => setActiveTab('cart')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.94 }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                        activeTab === 'cart'
                          ? 'bg-brand-500 text-dark-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      data-interactive="true"
                    >
                      Cart
                    </motion.button>
                    <motion.button
                      onClick={() => setActiveTab('booking')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.94 }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                        activeTab === 'booking'
                          ? 'bg-brand-500 text-dark-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      data-interactive="true"
                    >
                      Doctor
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* View Mode Content: Preview vs Code */}
              {viewMode === 'code' ? (
                <motion.div
                  key="code-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  <div className="bg-dark-950 rounded-2xl border border-dark-800 overflow-hidden shadow-inner">
                    <div className="px-3.5 py-2 bg-dark-850/90 border-b border-dark-800 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-3.5 h-3.5 text-sky-400" />
                        <span className="text-slate-300 text-[11px]">
                          {activeTab === 'cart' ? 'useOptimisticCart.ts' : 'useSlotPicker.ts'}
                        </span>
                      </div>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                        data-interactive="true"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-3.5 overflow-x-auto text-[11px] sm:text-xs font-mono leading-relaxed text-slate-300 max-h-[260px] select-text">
                      <pre>
                        <code>{activeTab === 'cart' ? cartSnippet : bookingSnippet}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 bg-dark-850/60 p-2.5 rounded-xl border border-dark-800">
                    💡 Strict TypeScript typing guarantees state integrity and prevents runtime mutation errors in production builds.
                  </div>
                </motion.div>
              ) : (
                /* Sandbox Simulation Views with AnimatePresence */
                <AnimatePresence mode="wait">
                {activeTab === 'cart' ? (
                  <motion.div
                    key="cart"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="p-3.5 rounded-2xl bg-dark-950 border border-dark-800">
                      <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <ShoppingCart className="w-3.5 h-3.5 text-brand-400" />
                          <span>Optimistic React Context Cart</span>
                        </span>
                        <span className="text-brand-400 font-bold">${totalPrice.toFixed(2)}</span>
                      </div>

                      <div className="space-y-2">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-dark-900 border border-dark-800/80 text-xs"
                          >
                            <div>
                              <div className="font-medium text-white">{item.name}</div>
                              <div className="text-[11px] font-mono text-slate-400">${item.price.toFixed(2)} each</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <motion.button
                                onClick={() => updateQty(item.id, -1)}
                                className="w-7 h-7 rounded-lg bg-dark-800 hover:bg-dark-750 text-white font-mono flex items-center justify-center transition-colors"
                                whileTap={{ scale: 0.88 }}
                                data-interactive="true"
                              >
                                -
                              </motion.button>
                              <span className="font-mono text-white text-xs w-4 text-center">{item.qty}</span>
                              <motion.button
                                onClick={() => updateQty(item.id, 1)}
                                className="w-7 h-7 rounded-lg bg-dark-800 hover:bg-dark-750 text-white font-mono flex items-center justify-center transition-colors"
                                whileTap={{ scale: 0.88 }}
                                data-interactive="true"
                              >
                                +
                              </motion.button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-dark-850/80 border border-dark-800 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-300 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-sky-400" />
                        <span>Leaflet Pin: 31.2536° N, 75.7037° E</span>
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Live Validated
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="booking"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="p-3.5 rounded-2xl bg-dark-950 border border-dark-800">
                      <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-sky-400" />
                          <span>Doctor Consultation Slot Picker</span>
                        </span>
                        <span className="text-xs text-brand-400 font-mono">Available Today</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM', '04:45 PM', '06:00 PM'].map((slot) => (
                          <motion.button
                            key={slot}
                            onClick={() => {
                              setSelectedSlot(slot);
                              setBookedStatus(false);
                            }}
                            className={`py-2 px-2 rounded-xl text-xs font-mono transition-all ${
                              selectedSlot === slot
                                ? 'bg-brand-500 text-dark-950 font-bold shadow-sm'
                                : 'bg-dark-900 text-slate-300 border border-dark-800 hover:border-dark-700'
                            }`}
                            whileTap={{ scale: 0.94 }}
                            data-interactive="true"
                          >
                            {slot}
                          </motion.button>
                        ))}
                      </div>

                      <motion.button
                        onClick={() => setBookedStatus(true)}
                        className="w-full py-2.5 px-3 rounded-xl bg-dark-850 hover:bg-dark-800 border border-dark-700 text-xs font-mono text-white flex items-center justify-center gap-1.5 transition-colors"
                        whileTap={{ scale: 0.98 }}
                        data-interactive="true"
                      >
                        {bookedStatus ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Slot Confirmed: {selectedSlot}</span>
                          </>
                        ) : (
                          <span>Simulate Slot Reservation ({selectedSlot})</span>
                        )}
                      </motion.button>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 leading-relaxed bg-dark-850/60 p-2.5 rounded-xl border border-dark-800">
                      ⚡ Demonstrates atomic state updates, conditional styling, and accessible keyboard-navigable time buttons without page refreshes.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              )}

              <div className="mt-4 pt-3 border-t border-dark-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Stack: React 18 • TypeScript • Tailwind</span>
                <span className="text-brand-400">Client-Side Reactive</span>
              </div>
            </TiltCard>
          </RevealWrapper>

        </div>
      </div>
    </section>
  );
};
