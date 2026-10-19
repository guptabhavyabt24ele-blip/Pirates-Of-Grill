'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CinematicIntro from '@/components/CinematicIntro';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem('pog_intro_seen');
    if (seen) {
      setShowIntro(false);
    }
  }, []);

  const handleCompleteIntro = () => {
    setShowIntro(false);
    sessionStorage.setItem('pog_intro_seen', 'true');
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 font-sans selection:bg-orange-500 selection:text-white flex flex-col justify-between">
      {showIntro && <CinematicIntro onComplete={handleCompleteIntro} />}

      <div>
        <Navbar />

        {/* HERO SECTION */}
        <section className="relative py-28 sm:py-36 px-6 flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,88,12,0.15)_0%,transparent_60%)] pointer-events-none"></div>
          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono tracking-wider uppercase">
              <span>⚔️ Endless Grills & Gourmet Feasts Across the Seven Seas</span>
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
              <Link
                href="/reservations"
                className="px-8 py-4 rounded-xl bg-orange-600 text-white font-bold tracking-wider uppercase shadow-xl shadow-orange-900/40 hover:bg-orange-500 hover:scale-105 transition-all duration-300"
              >
                Book Your Table Now 🏴‍☠️
              </Link>
              <Link
                href="/menu"
                className="px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-bold tracking-wider uppercase hover:bg-zinc-800 hover:border-orange-500/50 hover:scale-105 transition-all duration-300"
              >
                Explore Feast Menu
              </Link>
            </div>
          </div>
        </section>

        {/* ACTIVE OFFERS BANNER */}
        <section className="py-20 px-6 bg-zinc-950 border-y border-zinc-800/80">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-white uppercase tracking-wider">Captain’s Special Offers</h2>
              <p className="text-zinc-400 text-sm">Grab your crew and claim these limited-time feasts at our port locations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-500/30 relative overflow-hidden group hover:border-orange-500 transition-all shadow-xl">
                <div className="absolute top-0 right-0 px-4 py-1 bg-orange-600 text-white text-[10px] font-bold uppercase rounded-bl-xl font-mono">20% OFF</div>
                <h3 className="text-xl font-bold text-white mb-2">Weekday Pirate Buffet</h3>
                <p className="text-sm text-zinc-400 mb-6">Unlimited starters, grills, main courses, and desserts from Monday to Thursday.</p>
                <span className="text-xs text-orange-400 font-mono font-semibold">Code: PIRATE20</span>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/30 relative overflow-hidden group hover:border-amber-500 transition-all shadow-xl">
                <div className="absolute top-0 right-0 px-4 py-1 bg-amber-600 text-white text-[10px] font-bold uppercase rounded-bl-xl font-mono">FREE DRINK</div>
                <h3 className="text-xl font-bold text-white mb-2">Weekend Rum Punch</h3>
                <p className="text-sm text-zinc-400 mb-6">Complimentary signature mocktail or punch bowl for groups of 4 or more.</p>
                <span className="text-xs text-amber-400 font-mono font-semibold">Code: RUMPUNCH</span>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-emerald-500/30 relative overflow-hidden group hover:border-emerald-500 transition-all shadow-xl">
                <div className="absolute top-0 right-0 px-4 py-1 bg-emerald-600 text-white text-[10px] font-bold uppercase rounded-bl-xl font-mono">BIRTHDAY</div>
                <h3 className="text-xl font-bold text-white mb-2">Captain’s Birthday Bash</h3>
                <p className="text-sm text-zinc-400 mb-6">Celebrating a birthday? The captain treats the birthday guest with a complimentary feast!</p>
                <span className="text-xs text-emerald-400 font-mono font-semibold">Valid with ID Proof</span>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE HIGHLIGHTS */}
        <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono uppercase tracking-widest">
              ⚓ Why Dine With Us
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">The Pirate Standard</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-xl">🔥</div>
              <h3 className="text-xl font-bold text-white">Live Charcoal Grills</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Every table features a built-in live charcoal grill where skewers sizzle to your exact liking throughout your feast.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-amber-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xl">🏴‍☠️</div>
              <h3 className="text-xl font-bold text-white">Immersive Pirate Theme</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Step into a legendary maritime tavern complete with treasure chests, captain's quarters, and themed cocktails.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xl">⚡</div>
              <h3 className="text-xl font-bold text-white">Instant Table Booking</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Real-time table allocation and instant digital QR billing guarantees a smooth, frictionless dining experience.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
