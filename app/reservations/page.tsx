'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ReservationsPage() {
  const [selectedLocation, setSelectedLocation] = useState('Connaught Place, New Delhi');
  const [guestCount, setGuestCount] = useState('4');
  const [bookingDate, setBookingDate] = useState('2026-10-20');
  const [bookingTime, setBookingTime] = useState('20:00');
  const [captainName, setCaptainName] = useState('');
  const [phone, setPhone] = useState('');
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus(`Ahoy Captain ${captainName || 'Guest'}! Your table for ${guestCount} at ${selectedLocation} on ${bookingDate} at ${bookingTime} is confirmed. Confirmation sent to ${phone || 'your comms'}.`);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="py-20 px-6 max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono uppercase tracking-widest">
              ⚓ Table Booking System
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight">Reserve Your Voyage</h1>
            <p className="text-zinc-400 text-sm">Secure your table at our flagship barbecue taverns with instant confirmation.</p>
          </div>

          <form onSubmit={handleBookingSubmit} className="p-8 sm:p-12 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-6">
            {bookingStatus && (
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium text-center leading-relaxed">
                {bookingStatus}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase">Select Tavern Port</label>
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
                value={captainName}
                onChange={e => setCaptainName(e.target.value)}
                placeholder="e.g. Captain Jack Sparrow"
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 uppercase">Contact Phone / Comms</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
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
      </div>

      <Footer />
    </div>
  );
}
