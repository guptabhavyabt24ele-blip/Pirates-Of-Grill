'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Book Table', href: '/reservations' },
    { name: 'Locations', href: '/locations' },
    { name: 'Staff POS / Admin', href: '/admin' },
  ];

  return (
    <header className="sticky top-0 z-45 backdrop-blur-md bg-[#090a0f]/90 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-600 to-amber-700 flex items-center justify-center shadow-lg shadow-orange-900/30 group-hover:scale-105 transition-transform">
            <span className="text-xl font-black text-white">🏴‍☠️</span>
          </div>
          <div>
            <span className="text-lg font-bold tracking-wider uppercase bg-gradient-to-r from-orange-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
              Pirates of Grill
            </span>
            <span className="block text-[10px] tracking-widest text-zinc-400 font-mono uppercase">
              Legendary Barbecue & Feasts
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all duration-200 hover:text-orange-400 hover:scale-105 ${
                  isActive ? 'text-orange-400 font-semibold' : 'text-zinc-300'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/reservations"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-orange-900/40 hover:from-orange-500 hover:to-amber-500 hover:scale-105 transition-all"
          >
            Reserve Table
          </Link>
        </div>
      </div>
    </header>
  );
}
