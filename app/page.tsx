"use client";

import { useState, useEffect } from 'react';
import { Search, Menu, PlusCircle, Home, Settings, ArrowRight } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Konfigurasi Supabase
const supabase = createClient(
  "https://sjqawvdabdliehzxqlbz.supabase.co",
  "sb_publishable__fhxF1Y__FsdwpsYDZJ0Qg_qyylrLzt"
);

export default function Dashboard() {
  const [snippets, setSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSnippets();
  }, []);

  async function fetchSnippets() {
    const { data, error } = await supabase
      .from('snippets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setSnippets(data);
    setLoading(false);
  }

  // Logika Filter
  const filteredSnippets = snippets.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[5%] left-[5%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[5%] right-[5%] w-[30%] h-[30%] bg-cyan-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        
        {/* Banner Section */}
        <section className="relative w-full h-52 md:h-64 rounded-3xl overflow-hidden mb-8 border border-white/10 group">
          <img 
            src="/media/banner.png" 
            alt="Banner" 
            className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
          <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-12">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-3">
              Dolphin Vault
            </h1>
            <p className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed">
              Personal library untuk menyimpan snippet kode pilihan. Efisien, rapi, dan mudah diakses kapan saja.
            </p>
          </div>
        </section>

        {/* Search Bar */}
        <div className="relative mb-10 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text"
            placeholder="Cari judul atau bahasa pemrograman..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-gray-600"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Snippet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            // Skeleton Loading
            [1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
            ))
          ) : (
            filteredSnippets.map((item) => (
              <div key={item.id} className="group bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-cyan-400/50 transition-all hover:-translate-y-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags?.split(',').map((tag: string) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <div className="bg-black/40 rounded-lg p-3 mb-4 border border-white/5">
                  <code className="text-xs text-gray-500 font-mono line-clamp-2">
                    {item.code}
                  </code>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-[11px] text-gray-600 font-mono">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                  <button className="p-2 rounded-lg border border-white/10 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Empty State */}
        {!loading && filteredSnippets.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">Vault kosong. Tidak ada snippet yang cocok.</p>
          </div>
        )}
      </div>
    </main>
  );
                              }
