import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#090a0f] text-zinc-100 selection:bg-orange-500 selection:text-white">
      {/* Navigation Shell */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#090a0f]/80 border-b border-zinc-800/80">
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
                Milestone 1 Foundation
              </span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <span className="text-orange-400 font-semibold cursor-default">Foundation</span>
            <span className="text-zinc-500 cursor-not-allowed">Menu (M3)</span>
            <span className="text-zinc-500 cursor-not-allowed">Reservations (M3)</span>
            <span className="text-zinc-500 cursor-not-allowed">Staff POS (M4-M5)</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Database & RLS Secured
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-4xl w-full text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono tracking-wider uppercase">
            <span>⚓ Milestone 1 Acceptance Gate Active</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Architectural & Design <br />
            <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 bg-clip-text text-transparent">
              Foundation Established
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            The Next.js 16 core, TypeScript structure, Tailwind design tokens, and Supabase PostgreSQL schema with strict Row Level Security (RLS) policies are fully configured and verified.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure Data Schema</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Multi-location schema covering tables, reservations, menus, bills, payments, and audit logs with minor-unit currency and isolated RLS.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Responsive Shell</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                4K-ready CSS tokens, smooth scrolling, and accessible focus states built for high-end restaurant presentation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-4">
                03
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Strict Authorization</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Server-only secret isolation, role-based access control (RBAC), and transactional billing safeguards ready for deployment.
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
            <span className="px-6 py-3 rounded-xl bg-orange-600 text-white font-medium shadow-lg cursor-default">
              Foundation Verified
            </span>
            <a
              href="#schema-summary"
              className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-medium hover:bg-zinc-800 transition-colors"
            >
              View Architecture Plan
            </a>
          </div>
        </div>
      </main>

      {/* Schema Summary Section */}
      <section id="schema-summary" className="py-16 px-6 border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Database Schema & RLS Coverage</h2>
            <p className="text-zinc-400 text-sm">Deployed Supabase migrations and security boundaries.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-2xl font-bold text-orange-400">14</div>
              <div className="text-xs text-zinc-400 mt-1 uppercase font-mono">Secured Tables</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-2xl font-bold text-amber-400">RLS</div>
              <div className="text-xs text-zinc-400 mt-1 uppercase font-mono">Row Level Security</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-2xl font-bold text-emerald-400">Minor Units</div>
              <div className="text-xs text-zinc-400 mt-1 uppercase font-mono">Exact Money Math</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-2xl font-bold text-blue-400">PostgreSQL</div>
              <div className="text-xs text-zinc-400 mt-1 uppercase font-mono">Supabase Backend</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-6 text-center text-xs text-zinc-500">
        <p>© 2026 Pirates of Grill. All rights reserved. Milestone 1 Foundation Platform.</p>
      </footer>
    </div>
  );
}
