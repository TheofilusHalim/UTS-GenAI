import Link from "next/link";

// DUMMY DATA (Kontrak API Evaluasi Akhir dengan Backend)
const mockReport = {
  final_score: 85,
  final_level: 3, 
  level_name: "Advanced",
  total_questions: 10,
  correct_answers: 8,
  strengths: ["Pemahaman struktur data (List, Dictionary)", "Logika perulangan (For/While)"],
  weaknesses: ["Konsep Object-Oriented Programming (OOP)", "Penanganan Error (Try-Except)"],
  ai_feedback: "Luar biasa! Kamu sudah menguasai dasar-dasar Python dengan sangat baik sehingga sistem menaikkanmu ke Level 3. Untuk menyempurnakan keahlianmu, fokuslah berlatih membuat Class (OOP) dan cara menangani error agar kodemu lebih tangguh."
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Diagnostic Report</h1>
          <p className="text-slate-400">Hasil evaluasi kuis adaptifmu telah selesai dianalisis.</p>
        </div>

        {/* TOP METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg flex flex-col items-center justify-center">
            <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Skor Akhir</span>
            <div className="text-5xl font-bold text-indigo-400">{mockReport.final_score}<span className="text-2xl text-slate-500">/100</span></div>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg flex flex-col items-center justify-center">
            <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Level Tercapai</span>
            <div className="text-3xl font-bold text-emerald-400">Level {mockReport.final_level}</div>
            <div className="text-emerald-500/70 text-sm font-medium mt-1">{mockReport.level_name}</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg flex flex-col items-center justify-center">
            <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Akurasi</span>
            <div className="text-3xl font-bold text-sky-400">{mockReport.correct_answers} <span className="text-lg text-slate-500">dari {mockReport.total_questions} Benar</span></div>
          </div>
        </div>

        {/* AI FEEDBACK SECTION */}
        <div className="bg-indigo-900/20 border border-indigo-500/30 p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🤖</span>
            <h2 className="text-xl font-bold text-indigo-300">Analisis Gemini AI</h2>
          </div>
          <p className="text-indigo-100/80 leading-relaxed text-lg">
            "{mockReport.ai_feedback}"
          </p>
        </div>

        {/* STRENGTHS & WEAKNESSES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <span>✓</span> Kekuatan Utama
            </h3>
            <ul className="space-y-3">
              {mockReport.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-rose-400 mb-4 flex items-center gap-2">
              <span>🎯</span> Area Peningkatan
            </h3>
            <ul className="space-y-3">
              {mockReport.weaknesses.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300">
                  <span className="text-rose-500 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/quiz" className="px-8 py-4 rounded-xl font-bold bg-slate-700 hover:bg-slate-600 text-white transition-all text-center">
            ↻ Ulangi Kuis
          </Link>
          <Link href="/" className="px-8 py-4 rounded-xl font-bold bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 transition-all text-center">
            Kembali ke Beranda
          </Link>
        </div>

      </div>
    </div>
  );
}