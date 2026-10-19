import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LocationsPage() {
  const locations = [
    { city: 'New Delhi', name: 'Connaught Place Port', address: 'Outer Circle, Connaught Place, New Delhi', hours: '12:00 PM - 11:30 PM', phone: '+91 11 4321 8765' },
    { city: 'Gurugram', name: 'Cyber Hub Port', address: 'DLF Cyber City, Phase 2, Gurugram', hours: '12:00 PM - Midnight', phone: '+91 124 8765 4321' },
    { city: 'Bengaluru', name: 'Indiranagar Port', address: '100ft Road, Indiranagar, Bengaluru', hours: '12:00 PM - 11:30 PM', phone: '+91 80 2345 6789' },
  ];

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="py-20 px-6 max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono uppercase tracking-widest">
              📍 Flagship Tavern Ports
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight">Our Ports of Call</h1>
            <p className="text-zinc-400 text-sm">Drop anchor at any of our premier barbecue dining destination ports.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((loc, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 hover:border-orange-500/50 transition-all shadow-xl flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono uppercase border border-orange-500/20">
                    {loc.city}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{loc.name}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{loc.address}</p>
                  <p className="text-xs font-mono text-zinc-500">🕒 {loc.hours}</p>
                  <p className="text-xs font-mono text-zinc-500">📞 {loc.phone}</p>
                </div>

                <div className="pt-6 border-t border-zinc-800">
                  <Link
                    href="/reservations"
                    className="w-full block text-center py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    Book Table at this Port ⚓
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
