"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Save, ChevronLeft, Code2, Tag, Terminal } from "lucide-react";
import Link from "next/link";

const supabase = createClient(
  "https://sjqawvdabdliehzxqlbz.supabase.co",
  "sb_publishable__fhxF1Y__FsdwpsYDZJ0Qg_qyylrLzt"
);

export default function UploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    code: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("snippets").insert([
      {
        title: formData.title,
        tags: formData.tags,
        code: formData.code,
      },
    ]);

    if (error) {
      alert("Gagal menyimpan: " + error.message);
    } else {
      router.push("/");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto pt-10">
        {/* Header Nav */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Upload New Snippet</h1>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl">
          <div className="space-y-6">
            
            {/* Title Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                <Terminal size={16} className="text-cyan-400" /> Title
              </label>
              <input
                required
                type="text"
                placeholder="E.g. Express JS Middleware"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all"
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Tags Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                <Tag size={16} className="text-purple-400" /> Tags (Pisahkan dengan koma)
              </label>
              <input
                required
                type="text"
                placeholder="NODEJS, API, AUTH"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/50 transition-all"
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            {/* Code Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                <Code2 size={16} className="text-yellow-400" /> Snippet Code
              </label>
              <textarea
                required
                rows={8}
                placeholder="Paste your code here..."
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/50 transition-all font-mono text-sm"
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-xl font-bold text-black hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={20} />
                  SAVE TO VAULT
                </>
              )}
            </button>

          </div>
        </form>
      </div>
    </main>
  );
}

