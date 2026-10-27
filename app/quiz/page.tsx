"use client";

import { useState, useEffect } from "react";

// DUMMY DATA
const mockQuestion = {
  question_id: "q-101",
  topic: "Python Basics",
  current_level: 1,
  question_text: "Manakah dari tipe data berikut yang sifatnya mutable (bisa diubah nilainya) di Python?",
  options: [
    { id: "A", text: "Tuple" },
    { id: "B", text: "String" },
    { id: "C", text: "List" },
    { id: "D", text: "Integer" }
  ]
};

export default function QuizPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  // STATE BARU: Timer & Progress
  const [timeLeft, setTimeLeft] = useState<number>(60); // 60 detik per soal
  const currentQuestionNumber = 3; // Contoh: User sedang di soal ke-3
  const totalQuestions = 10;
  const progressPercentage = (currentQuestionNumber / totalQuestions) * 100;

  // EFEK TIMER HITUNG MUNDUR
  useEffect(() => {
    // Kalau waktu masih ada dan belum submit, kurangi 1 detik
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } 
    // Kalau waktu habis, otomatis kumpulkan jawaban
    else if (timeLeft === 0 && !isSubmitted) {
      setIsSubmitted(true);
    }
  }, [timeLeft, isSubmitted]);

  const handleSubmit = () => {
    if (selectedOption) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-6">
      
      {/* HEADER QUIZ: Progress Bar & Timer */}
      <div className="w-full max-w-2xl mb-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-semibold text-slate-400">
            Soal {currentQuestionNumber} dari {totalQuestions}
          </span>
          <div className={`flex items-center gap-2 font-mono text-lg font-bold ${
            timeLeft <= 10 && !isSubmitted ? "text-rose-500 animate-pulse" : "text-slate-300"
          }`}>
            <span>⏱️</span>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
          </div>
        </div>
        {/* Progress Bar Line */}
        <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-xl">
        
        {/* TOPIC & LEVEL BADGE */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Topik Kuis</span>
            <h1 className="text-xl font-bold text-indigo-400">{mockQuestion.topic}</h1>
          </div>
          <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-sm font-semibold">
            Level {mockQuestion.current_level}
          </div>
        </div>

        {/* QUESTION TEXT */}
        <div className="mb-8">
          <h2 className="text-lg font-medium leading-relaxed">{mockQuestion.question_text}</h2>
        </div>

        {/* OPTIONS GROUP */}
        <div className="space-y-3 mb-8">
          {mockQuestion.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => !isSubmitted && setSelectedOption(opt.id)}
                disabled={isSubmitted}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                  isSelected
                    ? "bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md"
                    : isSubmitted
                      ? "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed" // Warna pudar kalau sudah submit
                      : "bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    isSelected ? "bg-indigo-500 text-white" : "bg-slate-600 text-slate-300"
                  }`}>
                    {opt.id}
                  </span>
                  <span>{opt.text}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* FEEDBACK (Muncul setelah klik Submit atau Waktu Habis) */}
        {isSubmitted && (
          <div className="mb-6 p-4 rounded-xl bg-slate-700/70 border border-slate-600 text-slate-200 text-sm animate-in fade-in zoom-in duration-300">
            {timeLeft === 0 && !selectedOption ? (
              <p className="font-semibold text-rose-400 mb-1"> Waktu Habis!</p>
            ) : (
              <p className="font-semibold text-emerald-400 mb-1"> Jawaban Terkirim!</p>
            )}
            <p>Penjelasan AI: <b>List</b> bersifat <i>mutable</i> di Python, artinya isi elemennya dapat dimodifikasi setelah dibuat.</p>
          </div>
        )}

        {/* FOOTER BUTTON */}
        <button
          onClick={isSubmitted ? () => window.location.href = '/dashboard' : handleSubmit}
          disabled={!selectedOption && !isSubmitted} // Disable kalau belum milih & belum submit
          className={`w-full py-4 rounded-xl font-bold transition-all ${
            selectedOption || isSubmitted
              ? "bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer shadow-lg shadow-indigo-500/25"
              : "bg-slate-700 text-slate-500 cursor-not-allowed"
          }`}
        >
          {isSubmitted ? "Lihat Hasil (Dashboard) →" : "Kirim Jawaban"}
        </button>

      </div>
    </div>
  );
}