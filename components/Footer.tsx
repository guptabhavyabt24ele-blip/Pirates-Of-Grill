import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-12 px-6 bg-zinc-950 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-zinc-800/80">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">🏴‍☠️</div>
            <span className="font-bold text-white uppercase tracking-wider">Pirates of Grill</span>
          </div>
          <p className="text-zinc-500 leading-relaxed">
            The ultimate barbecue voyage featuring endless charcoal grills, gourmet dining, and seamless reservations.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider mb-4 font-mono text-[11px]">Navigation</h4>
          <ul className="space-y-2 font-medium">
            <li><Link href="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
            <li><Link href="/menu" className="hover:text-orange-400 transition-colors">Feast Menu</Link></li>
            <li><Link href="/reservations" className="hover:text-orange-400 transition-colors">Book a Table</Link></li>
            <li><Link href="/locations" className="hover:text-orange-400 transition-colors">Port Locations</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider mb-4 font-mono text-[11px]">Staff & Admin</h4>
          <ul className="space-y-2 font-medium">
            <li><Link href="/admin" className="hover:text-orange-400 transition-colors">Staff POS & Billing</Link></li>
            <li><Link href="/admin" className="hover:text-orange-400 transition-colors">Table Floor Management</Link></li>
            <li><Link href="/admin" className="hover:text-orange-400 transition-colors">Offers & Inventory</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider mb-4 font-mono text-[11px]">Secure Comms</h4>
          <p className="text-zinc-500 mb-2">Subscribe for captain's secret feasts and weekend specials.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="captain@crew.com"
              className="bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl text-zinc-200 text-xs w-full focus:outline-none focus:border-orange-500"
            />
            <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-zinc-600 font-mono text-[10px]">
        <p>© 2026 Pirates of Grill. All rights reserved. 4K Restaurant Platform.</p>
        <p>Secured with Supabase RLS & Minor-Unit Currency Architecture.</p>
      </div>
    </footer>
  );
}
