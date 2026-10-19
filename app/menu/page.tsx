'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'grills' | 'starters' | 'drinks' | 'desserts'>('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredMenu = menuItems.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="py-16 px-6 max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono uppercase tracking-widest">
              📜 Legendary Feast Catalog
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight">The Pirate Menu</h1>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Explore our endless charcoal grills, smoked skewers, seafood, and legendary pirate potions.
            </p>

            {/* Search Input */}
            <div className="pt-4">
              <input
                type="text"
                placeholder="Search skewers, ribs, drinks, or desserts..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full max-w-lg px-5 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-orange-500 transition-colors shadow-lg"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
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
                  <Link href="/reservations" className="text-orange-400 font-semibold group-hover:translate-x-1 transition-transform">
                    Book & Taste →
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
