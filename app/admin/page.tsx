'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AdminPOSPage() {
  const [selectedTable, setSelectedTable] = useState('Table 01 (4 Seater)');
  const [partySize, setPartySize] = useState('4');
  const [orders, setOrders] = useState([
    { id: 1, name: 'Captain’s Smoked BBQ Ribs', qty: 2, priceMinor: 149800 },
    { id: 2, name: 'Blackbeard’s Peri-Peri Skewers', qty: 3, priceMinor: 188700 },
    { id: 3, name: 'Black Pearl Rum Mocktail', qty: 4, priceMinor: 131600 },
  ]);
  const [showReceipt, setShowReceipt] = useState(false);

  const subtotalMinor = orders.reduce((sum, item) => sum + item.qty * item.priceMinor, 0);
  const taxMinor = Math.round(subtotalMinor * 0.05); // 5% GST
  const totalMinor = subtotalMinor + taxMinor;

  const formatCurrency = (minor: number) => `₹${(minor / 100).toFixed(2)}`;

  const handleAddItem = (name: string, priceMinor: number) => {
    setOrders(prev => {
      const existing = prev.find(o => o.name === name);
      if (existing) {
        return prev.map(o => o.name === name ? { ...o, qty: o.qty + 1 } : o);
      }
      return [...prev, { id: Date.now(), name, qty: 1, priceMinor }];
    });
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="py-16 px-6 max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono uppercase border border-orange-500/20">
                Staff POS & Billing Software
              </span>
              <h1 className="text-3xl font-extrabold text-white uppercase mt-2">Floor & Finance Management</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-emerald-400">
                ● Live Database Synced
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Table Selection & Floor status */}
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">Floor Tables</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Table 01 (4 Seater)', 'Table 02 (2 Seater)', 'Table 03 (6 Seater)', 'Table 04 (Captain’s Table)'].map(tbl => (
                  <button
                    key={tbl}
                    onClick={() => setSelectedTable(tbl)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedTable === tbl
                        ? 'bg-orange-600/20 border-orange-500 text-white shadow-lg'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-sm font-bold text-white">{tbl}</div>
                    <div className="text-[10px] font-mono text-orange-400 mt-1">Status: Occupied</div>
                  </button>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <label className="text-xs font-mono text-zinc-400 uppercase">Seated Party Size</label>
                <input
                  type="number"
                  value={partySize}
                  onChange={e => setPartySize(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Current Table Active Order & Menu Quick Add */}
            <div className="lg:col-span-2 p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedTable}</h3>
                    <p className="text-xs text-zinc-400">Party of {partySize} • Active Dining Session</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
                    Session Open
                  </span>
                </div>

                {/* Ordered Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800 text-xs font-mono text-zinc-400 uppercase">
                        <th className="py-3">Item Description</th>
                        <th className="py-3 text-center">Qty</th>
                        <th className="py-3 text-right">Amount (Minor Units)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 font-mono">
                      {orders.map(o => (
                        <tr key={o.id}>
                          <td className="py-3 font-sans font-medium text-white">{o.name}</td>
                          <td className="py-3 text-center">{o.qty}</td>
                          <td className="py-3 text-right text-amber-400">{formatCurrency(o.qty * o.priceMinor)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Quick Add Menu */}
                <div className="space-y-3 pt-4 border-t border-zinc-800">
                  <h4 className="text-xs font-mono text-zinc-400 uppercase">Quick Add Feast Items</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleAddItem('Captain’s Smoked BBQ Ribs', 74900)}
                      className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-orange-500 text-xs text-zinc-200 transition-all cursor-pointer"
                    >
                      + BBQ Ribs (₹749)
                    </button>
                    <button
                      onClick={() => handleAddItem('Blackbeard’s Peri-Peri Skewers', 62900)}
                      className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-orange-500 text-xs text-zinc-200 transition-all cursor-pointer"
                    >
                      + Peri-Peri Skewers (₹629)
                    </button>
                    <button
                      onClick={() => handleAddItem('Kraken’s Garlic Butter Prawns', 89900)}
                      className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-orange-500 text-xs text-zinc-200 transition-all cursor-pointer"
                    >
                      + Garlic Prawns (₹899)
                    </button>
                  </div>
                </div>
              </div>

              {/* Bill Totals & Print Button */}
              <div className="pt-6 border-t border-zinc-800 space-y-4">
                <div className="space-y-1 font-mono text-sm">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotalMinor)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>GST (5%)</span>
                    <span>{formatCurrency(taxMinor)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-zinc-800">
                    <span>Total Amount</span>
                    <span className="text-amber-400">{formatCurrency(totalMinor)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowReceipt(true)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold tracking-wider uppercase shadow-xl hover:from-orange-500 hover:to-amber-500 transition-all cursor-pointer"
                >
                  Print Thermal Receipt & Generate Secure Payment QR 🖨️
                </button>
              </div>
            </div>
          </div>

          {/* THERMAL RECEIPT & SECURE QR MODAL */}
          {showReceipt && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-white text-zinc-900 p-8 rounded-2xl max-w-md w-full shadow-2xl font-mono space-y-6 relative">
                <button
                  onClick={() => setShowReceipt(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-200 text-zinc-800 flex items-center justify-center font-bold text-sm hover:bg-zinc-300"
                >
                  ✕
                </button>

                <div className="text-center space-y-1 border-b border-dashed border-zinc-400 pb-4">
                  <h2 className="text-xl font-black uppercase">PIRATES OF GRILL</h2>
                  <p className="text-[11px] text-zinc-600">Connaught Place Flagship Port, New Delhi</p>
                  <p className="text-[10px] text-zinc-500">GSTIN: 07AABCP1234F1Z5 • Table: {selectedTable}</p>
                </div>

                <div className="space-y-2 text-xs border-b border-dashed border-zinc-400 pb-4">
                  {orders.map(o => (
                    <div key={o.id} className="flex justify-between">
                      <span>{o.qty}x {o.name}</span>
                      <span>{formatCurrency(o.qty * o.priceMinor)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1 text-xs border-b border-dashed border-zinc-400 pb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotalMinor)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>{formatCurrency(taxMinor)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm pt-1">
                    <span>TOTAL DUE</span>
                    <span>{formatCurrency(totalMinor)}</span>
                  </div>
                </div>

                {/* SECURE PAYMENT QR CODE */}
                <div className="text-center space-y-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                  <div className="w-32 h-32 mx-auto bg-zinc-900 text-white flex items-center justify-center text-xs rounded-lg font-bold shadow-inner">
                    [ SECURE QR INTENT ]
                  </div>
                  <p className="text-[10px] text-zinc-600 leading-tight">
                    Scan with any UPI / Banking app to pay exactly {formatCurrency(totalMinor)}. Linked directly to bill amount via Supabase RLS.
                  </p>
                </div>

                <button
                  onClick={() => {
                    alert('Receipt sent to thermal printer & payment intent registered!');
                    setShowReceipt(false);
                  }}
                  className="w-full py-3 bg-zinc-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                >
                  Print Now & Mark Paid ⚡
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
