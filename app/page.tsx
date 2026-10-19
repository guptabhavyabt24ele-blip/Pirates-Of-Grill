'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const [activeTab, setActiveTab] = useState<'all' | 'grills' | 'starters' | 'drinks' | 'desserts'>('all');
  const [selectedLocation, setSelectedLocation] = useState('Connaught Place, New Delhi');
  const [guestCount, setGuestCount] = useState('4');
  const [bookingDate, setBookingDate] = useState('2026-10-20');
  const [bookingTime, setBookingTime] = useState('20:00');
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);

  useEffect(() => {
    // Check if intro was already seen in session
    const seen = sessionStorage.getItem('pog_intro_seen');
    if (seen) {
      setShowIntro(false);
    } else {
      const timer1 = setTimeout(() => setIntroStep(1), 1000);
      const timer2 = setTimeout(() => setIntroStep(2), 2800);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, []);

  const handleSkipIntro = () => {
    setShowIntro(false);
    sessionStorage.setItem('pog_intro_seen', 'true');
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus('Table reserved successfully! Confirmation sent to your device.');
    setTimeout(() => setBookingStatus(null), 5000);
  };

  const menuItems = [
    { id: 1, name: 'Captain’s Smoked Smokey BBQ Ribs', category: 'grills', price: '₹749', desc: 'Slow-roasted pork ribs glazed in signature spicy bourbon barbecue sauce.', badge: 'Chef Special' },
    { id: 2, name: 'Blackbeard’s Fiery Peri-Peri Skewers', category: 'grills', price: '₹629', desc: 'Jumbo chicken skewers grilled over open charcoal with fiery peri-peri spice.', badge: 'Bestseller' },
    { id: 3, name: 'Kraken’s Garlic Butter Grilled Prawns', category: 'grills', price: '₹899', desc: 'Ocean-fresh prawns bathed in garlic herb butter and charred to perfection.', badge: 'Fresh Catch' },
    { id: 4, name: 'Treasure Chest Paneer Tikka', category: 'grills', price: '₹549', desc: 'Cottage cheese stuffed with mint chutney and charred in the tandoor.', badge: 'Vegetarian' },
    { id: 5, name: 'Corsair’s Crispy Calamari', category: 'starters', price: '₹499', desc: 'Lightly battered squid rings served with tangy smoked paprika aioli.', badge: 'Popular' },
    { id: 6, name: 'Smoky Mushroom Galouti', category: 'starters', price: '₹449', desc: 'Melt-in-mouth spiced mushroom patties infused with smoked cloves.', badge: 'Vegetarian' },
    { id: 7, name: 'Black Pearl Rum Mocktail', category: 'drinks', price: '₹329', desc: 'Dark molasses syrup, lime, activated charcoal, and ginger beer fizz.', badge: 'Signature' },
    { id: 8, name: 'Sirens’ Tropical Sunset Punch', category: 'drinks', price: '₹299', desc: 'Passion fruit, orange juice, and grenadine with crushed ice.', badge: 'Refreshing' },
    { id: 9, name: 'Buried Treasure Chocolate Lava Cake', category: 'desserts', price: '₹399', desc: 'Warm chocolate cake with molten center, gold dust, and vanilla bean ice cream.', badge: 'Must Try' }
  ];

  const filteredMenu = activeTab === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 font-sans selection:bg-orange-500 selection:text-white relative overflow-x-hidden">

      {/* CINEMATIC BLENDER/WEBGL STYLE INTRO OVERLAY */}
      {showIntro && (
        <div className="fixed inset-0 z-50 bg-[#090a0f] flex flex-col items-center justify-center p-6 transition-opacity duration-700">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.15)_0%,transparent_70%)] pointer-events-none animate-pulse"></div>

          <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-orange-600/20 border border-orange-500/30 text-orange-400 font-mono text-xs uppercase tracking-widest animate-bounce">
              <span>🔥 Barbecue & Pirate Voyage</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-white uppercase drop-shadow-[0_10px_20px_rgba(234,88,12,0.4)]">
                Pirates <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 bg-clip-text text-transparent">of Grill</span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-400 max-w-lg mx-auto font-light">
                {introStep === 0 && "Igniting the open charcoal grills across the seven seas..."}
                {introStep === 1 && "Unearthing legendary recipes & bottomless feasts..."}
                {introStep === 2 && "Welcome aboard. Your ultimate dining voyage begins now."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button
                onClick={handleSkipIntro}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold tracking-wider uppercase shadow-xl shadow-orange-900/50 hover:scale-105 hover:from-orange-500 hover:to-amber-500 transition-all duration-300 cursor-pointer"
              >
                Board the Ship ⚓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP NAVIGATION */}
      <header className="sticky top-0 z-45 backdrop-blur-md bg-[#090a0f]/90 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-600 to-amber-700 flex items-center justify-center shadow-lg shadow-orange-900/30">
              <span className="text-xl font-black text-white">🪝</span>
            </div>
            <div>
              <span className="text-lg font-bold tracking-wider uppercase bg-gradient-to-r from-orange-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                Pirates of Grill
              </span>
              <span className="block text-[10px] tracking-widest text-zinc-400 font-mono uppercase">
                Milestone 2 • 4K Public Experience
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <a href="#hero" className="hover:text-orange-400 transition-colors">Home</a>
            <a href="#menu" className="hover:text-orange-400 transition-colors">Menu</a>
            <a href="#reservations" className="hover:text-orange-400 transition-colors">Book Table</a>
            <a href="#offers" className="hover:text-orange-400 transition-colors">Offers</a>
            <a href="#locations" className="hover:text-orange-400 transition-colors">Locations</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#reservations"
              className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-orange-500 hover:scale-105 transition-all"
            >
              Reserve Table
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative py-24 sm:py-32 px-6 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,88,12,0.12)_0%,transparent_60%)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono tracking-wider uppercase">
            <span>⚔️ Endless Grills & Gourmet Feasts</span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Sail into the Ultimate <br />
            <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 bg-clip-text text-transparent">
              Barbecue Voyage
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Indulge in bottomless charcoal grills, live seafood, exotic smoked skewers, and pirate-themed cocktails crafted for legendary gatherings.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#reservations"
              className="px-8 py-4 rounded-xl bg-orange-600 text-white font-bold tracking-wider uppercase shadow-xl shadow-orange-900/40 hover:bg-orange-500 hover:scale-105 transition-all duration-300"
            >
              Book Your Table Now 🏴‍☠️
            </a>
            <a
              href="#menu"
              className="px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-bold tracking-wider uppercase hover:bg-zinc-800 hover:border-orange-500/50 hover:scale-105 transition-all duration-300"
            >
              Explore Menu
            </a>
          </div>
        </div>
      </section>

      {/* ACTIVE OFFERS BANNER */}
      <section id="offers" className="py-16 px-6 bg-zinc-950 border-y border-zinc-800/80">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-white uppercase tracking-wider">Captain’s Special Offers</h2>
            <p className="text-zinc-400 text-sm">Grab your crew and claim these limited-time feasts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-500/30 relative overflow-hidden group hover:border-orange-500 transition-all">
              <div className="absolute top-0 right-0 px-4 py-1 bg-orange-600 text-white text-[10px] font-bold uppercase rounded-bl-xl font-mono">20% OFF</div>
              <h3 className="text-xl font-bold text-white mb-2">Weekday Pirate Buffet</h3>
              <p className="text-sm text-zinc-400 mb-4">Unlimited starters, grills, main courses, and desserts from Monday to Thursday.</p>
              <span className="text-xs text-orange-400 font-mono font-semibold">Code: PIRATE20</span>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/30 relative overflow-hidden group hover:border-amber-500 transition-all">
              <div className="absolute top-0 right-0 px-4 py-1 bg-amber-600 text-white text-[10px] font-bold uppercase rounded-bl-xl font-mono">FREE DRINK</div>
              <h3 className="text-xl font-bold text-white mb-2">Weekend Rum Punch</h3>
              <p className="text-sm text-zinc-400 mb-4">Complimentary signature mocktail or punch bowl for groups of 4 or more.</p>
              <span className="text-xs text-amber-400 font-mono font-semibold">Code: RUMPUNCH</span>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-emerald-500/30 relative overflow-hidden group hover:border-emerald-500 transition-all">
              <div className="absolute top-0 right-0 px-4 py-1 bg-emerald-600 text-white text-[10px] font-bold uppercase rounded-bl-xl font-mono">BIRTHDAY</div>
              <h3 className="text-xl font-bold text-white mb-2">Captain’s Birthday Bash</h3>
              <p className="text-sm text-zinc-400 mb-4">Celebrating a birthday? The captain treats the birthday guest with a complimentary feast!</p>
              <span className="text-xs text-emerald-400 font-mono font-semibold">Valid with ID Proof</span>
            </div>
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="py-24 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono uppercase tracking-widest">
            <span>📜 Legendary Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">The Pirate Feast Menu</h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm">
            Prepared over live charcoal pits and infused with secret spices from across the seas.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            {(['all', 'grills', 'starters', 'drinks', 'desserts'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40 scale-105'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map(item => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-950/20 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-mono font-bold uppercase border border-orange-500/20">
                    {item.badge}
                  </span>
                  <span className="text-lg font-black text-amber-400 font-mono">{item.price}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-6 border-t border-zinc-800/80 mt-6 flex items-center justify-between text-xs text-zinc-500">
                <span className="font-mono uppercase">Live Charcoal Grill</span>
                <span className="text-orange-400 font-semibold group-hover:translate-x-1 transition-transform">Order Now →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TABLE RESERVATION SECTION */}
      <section id="reservations" className="py-24 px-6 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono uppercase tracking-widest">
              ⚓ Reserve Your Table
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">Secure Your Feast Spot</h2>
            <p className="text-zinc-400 text-sm">Tables fill up fast during pirate hours. Book your voyage in advance.</p>
          </div>

          <form onSubmit={handleBookingSubmit} className="p-8 sm:p-10 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-6">
            {bookingStatus && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium text-center">
                {bookingStatus}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase">Select Location</label>
                <select
                  value={selectedLocation}
                  onChange={e => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                >
                  <option>Connaught Place, New Delhi</option>
                  <option>Cyber Hub, Gurugram</option>
                  <option>Indiranagar, Bengaluru</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase">Party Size (Crew Members)</label>
                <select
                  value={guestCount}
                  onChange={e => setGuestCount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                >
                  <option value="2">2 Guests (Couple Table)</option>
                  <option value="4">4 Guests (Standard Crew)</option>
                  <option value="6">6 Guests (Large Table)</option>
                  <option value="10">10+ Guests (Captain’s Table)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase">Voyage Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={e => setBookingDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase">Preferred Time Slot</label>
                <input
                  type="time"
                  value={bookingTime}
                  onChange={e => setBookingTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 uppercase">Your Name / Captain’s Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Captain Jack Sparrow"
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 uppercase">Contact Phone / Comms</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold tracking-wider uppercase shadow-xl shadow-orange-900/40 hover:from-orange-500 hover:to-amber-500 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
            >
              Confirm Table Reservation ⚓
            </button>
          </form>
        </div>
      </section>

      {/* LOCATIONS SECTION */}
      <section id="locations" className="py-24 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono uppercase tracking-widest">
            📍 Tavern Ports
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">Our Port Locations</h2>
          <p className="text-zinc-400 text-sm">Drop anchor at any of our flagship barbecue taverns.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 className="text-xl font-bold text-white">Connaught Place, New Delhi</h3>
            <p className="text-sm text-zinc-400">Outer Circle, Connaught Place • Open 12:00 PM - 11:30 PM</p>
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400">● Open Now</span>
              <span className="text-orange-400 cursor-pointer">Get Directions →</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 className="text-xl font-bold text-white">Cyber Hub, Gurugram</h3>
            <p className="text-sm text-zinc-400">DLF Cyber City, Phase 2 • Open 12:00 PM - Midnight</p>
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400">● Open Now</span>
              <span className="text-orange-400 cursor-pointer">Get Directions →</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 className="text-xl font-bold text-white">Indiranagar, Bengaluru</h3>
            <p className="text-sm text-zinc-400">100ft Road, Indiranagar • Open 12:00 PM - 11:30 PM</p>
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400">● Open Now</span>
              <span className="text-orange-400 cursor-pointer">Get Directions →</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-12 px-6 bg-zinc-950 text-center text-xs text-zinc-500 space-y-4">
        <p>© 2026 Pirates of Grill. All rights reserved. Built for legendary barbecue feasts.</p>
        <p className="font-mono text-[10px]">Milestone 2 • Public Brand Experience & Cinematic Animation Complete</p>
      </footer>

    </div>
  );
}
