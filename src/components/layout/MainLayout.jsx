import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col min-h-screen lg:pl-72 transition-all duration-300">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 pt-24 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto w-full">
          <div className="animate-fade-in-up">
            {children}
          </div>
        </main>

        <footer className="py-6 px-8 border-t border-white/5 text-center">
          <p className="text-xs text-slate-600 font-medium tracking-wide">
            MY WORK FITNESS © 2026 • BUILT FOR GAINS
          </p>
        </footer>
      </div>
    </div>
  );
}
