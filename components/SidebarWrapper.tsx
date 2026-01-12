"use client";

import { useState } from "react";
import { Menu, Home, PlusCircle, Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Upload Snippet", icon: PlusCircle, path: "/upload" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 w-full h-16 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 flex items-center px-6 z-[50]">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-4 hover:opacity-80 transition-opacity"
        >
          <Menu size={24} />
          <span className="font-bold tracking-tighter text-lg bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            DOLPHIN VAULT
          </span>
        </button>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#0a0a0a] border-r border-white/10 z-[70] transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-10">
            <span className="font-black text-xl tracking-tighter italic text-cyan-400">NEFU CODE</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold">System v2.0</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pt-16">
        {children}
      </div>
    </>
  );
}

