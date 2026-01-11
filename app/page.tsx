"use client";

import { useState, useEffect } from "react";

interface MoodEntry {
  mood: string;
  date: string;
  time: string;
}

export default function EnhancedMentalHealthHub() {
  const [darkMode, setDarkMode] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<
    "inhale" | "hold" | "exhale"
  >("inhale");
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  // Quiz questions
  const quizQuestions = [
    {
      question:
        "Seberapa sering Anda merasa sedih atau cemas dalam 2 minggu terakhir?",
      options: [
        "Tidak pernah",
        "Jarang",
        "Kadang-kadang",
        "Sering",
        "Sangat sering",
      ],
    },
    {
      question: "Apakah Anda mengalami kesulitan tidur atau tidur berlebihan?",
      options: ["Tidak", "Jarang", "Kadang-kadang", "Sering", "Setiap hari"],
    },
    {
      question:
        "Apakah Anda masih menikmati aktivitas yang biasanya Anda sukai?",
      options: [
        "Ya, sangat",
        "Ya, sebagian besar",
        "Kadang-kadang",
        "Jarang",
        "Tidak sama sekali",
      ],
    },
    {
      question:
        "Seberapa baik Anda dapat berkonsentrasi pada tugas sehari-hari?",
      options: ["Sangat baik", "Baik", "Cukup", "Buruk", "Sangat buruk"],
    },
  ];

  // Breathing exercise timer
  useEffect(() => {
    if (breathingActive) {
      const phases: Array<{
        name: "inhale" | "hold" | "exhale";
        duration: number;
      }> = [
        { name: "inhale", duration: 4000 },
        { name: "hold", duration: 7000 },
        { name: "exhale", duration: 8000 },
      ];

      let currentPhaseIndex = 0;

      const runPhase = () => {
        const phase = phases[currentPhaseIndex];
        setBreathingPhase(phase.name);

        setTimeout(() => {
          currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
          if (breathingActive) runPhase();
        }, phase.duration);
      };

      runPhase();
    }
  }, [breathingActive]);

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);

    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      // Quiz completed
      const score = newAnswers.reduce((sum, val) => sum + val, 0);
      alert(getQuizResult(score));
      setShowQuiz(false);
      setCurrentQuizQuestion(0);
      setQuizAnswers([]);
    }
  };

  const getQuizResult = (score: number) => {
    if (score <= 4)
      return "Kesehatan mental Anda tampak baik! Terus jaga dengan self-care rutin.";
    if (score <= 8)
      return "Anda mungkin mengalami stres ringan. Coba teknik relaksasi dan istirahat cukup.";
    if (score <= 12)
      return "Ada tanda-tanda stres sedang. Pertimbangkan untuk berbicara dengan teman atau konselor.";
    return "Sangat disarankan untuk berkonsultasi dengan profesional kesehatan mental.";
  };

  const addMoodEntry = (mood: string) => {
    const newEntry: MoodEntry = {
      mood,
      date: new Date().toLocaleDateString("id-ID"),
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMoodEntries([newEntry, ...moodEntries.slice(0, 6)]);
  };

  const bgClass = darkMode
    ? "bg-gray-900"
    : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50";
  const textClass = darkMode ? "text-white" : "text-gray-900";
  const cardBgClass = darkMode ? "bg-gray-800" : "bg-white";
  const borderClass = darkMode ? "border-gray-700" : "border-purple-100";

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Header/Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 ${
          darkMode ? "bg-gray-800/90" : "bg-white/80"
        } backdrop-blur-md shadow-sm z-50 transition-colors`}
      >
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">🧠</span>
            </div>
            <span className={`font-bold ${textClass} text-lg`}>
              Mental Health Hub
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${
                darkMode ? "bg-gray-700" : "bg-purple-100"
              } hover:opacity-80 transition-opacity`}
            >
              <span className="text-xl">{darkMode ? "☀️" : "🌙"}</span>
            </button>
            <a
              href="#resources"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Sumber Daya
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div
            className={`inline-block ${
              darkMode
                ? "bg-purple-900 text-purple-200"
                : "bg-purple-100 text-purple-700"
            } px-4 py-2 rounded-full text-sm font-medium mb-6`}
          >
            ✨ Terima kasih telah peduli dengan kesehatan mental anda
          </div>
          <h1
            className={`font-bold text-4xl md:text-6xl ${textClass} mb-6 leading-tight`}
          >
            Pusat Informasi <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Kesehatan Mental
            </span>
          </h1>
          <p
            className={`${
              darkMode ? "text-gray-300" : "text-gray-600"
            } text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed`}
          >
            Website ini berisi rangkuman materi, tips praktis, dan berbagai
            sumber daya untuk mendukung perjalanan kesehatan mental Anda.
          </p>

          {/* Interactive Tools Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              onClick={() => setShowQuiz(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all"
            >
              <span>✅</span>
              Self-Assessment Quiz
            </button>
            <button
              onClick={() => setShowBreathing(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all"
            >
              <span>🫁</span>
              Breathing Exercise
            </button>
            <button
              onClick={() => setShowMoodTracker(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all"
            >
              <span>📊</span>
              Mood Tracker
            </button>
          </div>
        </div>
      </section>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className={`${cardBgClass} rounded-2xl p-8 max-w-2xl w-full shadow-2xl`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-2xl font-bold ${textClass}`}>
                Self-Assessment
              </h3>
              <button
                onClick={() => {
                  setShowQuiz(false);
                  setCurrentQuizQuestion(0);
                  setQuizAnswers([]);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                {quizQuestions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 flex-1 rounded-full ${
                      idx <= currentQuizQuestion
                        ? "bg-gradient-to-r from-purple-600 to-pink-600"
                        : darkMode
                        ? "bg-gray-700"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                } mb-2`}
              >
                Pertanyaan {currentQuizQuestion + 1} dari {quizQuestions.length}
              </p>
              <h4 className={`text-xl font-semibold ${textClass} mb-6`}>
                {quizQuestions[currentQuizQuestion].question}
              </h4>

              <div className="space-y-3">
                {quizQuestions[currentQuizQuestion].options.map(
                  (option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      className={`w-full text-left p-4 rounded-lg border-2 ${
                        darkMode
                          ? "border-gray-700 hover:border-purple-500 hover:bg-gray-700"
                          : "border-gray-200 hover:border-purple-500 hover:bg-purple-50"
                      } transition-all`}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Breathing Exercise Modal */}
      {showBreathing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className={`${cardBgClass} rounded-2xl p-8 max-w-lg w-full shadow-2xl text-center`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-2xl font-bold ${textClass}`}>
                Breathing Exercise 4-7-8
              </h3>
              <button
                onClick={() => {
                  setShowBreathing(false);
                  setBreathingActive(false);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="mb-8">
              <div
                className={`w-48 h-48 mx-auto rounded-full border-4 ${
                  breathingPhase === "inhale"
                    ? "border-blue-500 scale-110"
                    : breathingPhase === "hold"
                    ? "border-purple-500 scale-110"
                    : "border-pink-500 scale-90"
                } flex items-center justify-center transition-all duration-1000 ${
                  darkMode
                    ? "bg-gray-700"
                    : "bg-gradient-to-br from-blue-100 to-purple-100"
                }`}
              >
                <div className="text-center">
                  <span
                    className={`text-5xl block mb-2 ${
                      breathingPhase === "inhale"
                        ? ""
                        : breathingPhase === "hold"
                        ? ""
                        : ""
                    }`}
                  >
                    🫁
                  </span>
                  <p className={`text-xl font-bold ${textClass} capitalize`}>
                    {breathingPhase === "inhale"
                      ? "Tarik Nafas"
                      : breathingPhase === "hold"
                      ? "Tahan"
                      : "Buang Nafas"}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setBreathingActive(!breathingActive)}
              className="flex items-center gap-2 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all"
            >
              <span className="text-xl">{breathingActive ? "⏸️" : "▶️"}</span>
              {breathingActive ? "Pause" : "Mulai"}
            </button>

            <p
              className={`mt-6 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Tarik nafas 4 detik → Tahan 7 detik → Buang nafas 8 detik
            </p>
          </div>
        </div>
      )}

      {/* Mood Tracker Modal */}
      {showMoodTracker && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className={`${cardBgClass} rounded-2xl p-8 max-w-2xl w-full shadow-2xl`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-2xl font-bold ${textClass}`}>
                Mood Tracker
              </h3>
              <button
                onClick={() => setShowMoodTracker(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <p
              className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-6`}
            >
              Bagaimana perasaan Anda hari ini?
            </p>

            <div className="grid grid-cols-5 gap-4 mb-8">
              {[
                { emoji: "😊", label: "Sangat Baik", color: "green" },
                { emoji: "🙂", label: "Baik", color: "blue" },
                { emoji: "😐", label: "Biasa", color: "yellow" },
                { emoji: "😔", label: "Kurang Baik", color: "orange" },
                { emoji: "😢", label: "Buruk", color: "red" },
              ].map((mood, idx) => (
                <button
                  key={idx}
                  onClick={() => addMoodEntry(mood.label)}
                  className={`p-4 rounded-xl border-2 ${
                    darkMode
                      ? "border-gray-700 hover:border-gray-500"
                      : "border-gray-200 hover:border-gray-400"
                  } hover:shadow-lg transition-all text-center`}
                >
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {mood.label}
                  </p>
                </button>
              ))}
            </div>

            {moodEntries.length > 0 && (
              <div>
                <h4 className={`font-semibold ${textClass} mb-3`}>
                  Riwayat Mood
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {moodEntries.map((entry, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg ${
                        darkMode ? "bg-gray-700" : "bg-gray-50"
                      } flex justify-between items-center`}
                    >
                      <span className={textClass}>{entry.mood}</span>
                      <span
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {entry.date} - {entry.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ringkasan Materi Section */}
      <section
        className={`py-20 px-4 ${darkMode ? "bg-gray-800/50" : "bg-white/60"}`}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className={`font-bold text-3xl md:text-4xl ${textClass} mb-4`}>
              Rangkuman Materi
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "🧠",
                bgColor: darkMode ? "bg-gray-700" : "bg-white",
                borderColor: "border-purple-100",
                title: "Apa Itu Kesehatan Mental?",
                description:
                  "Kesehatan mental adalah kondisi dimana individu dapat menyadari kemampuannya, mengatasi stres kehidupan normal, bekerja produktif, dan berkontribusi pada komunitasnya.",
                points: [
                  "Kesehatan mental sama pentingnya dengan kesehatan fisik",
                  "Semua orang memiliki kesehatan mental yang perlu dijaga",
                  "Gangguan mental dapat dialami oleh siapa saja",
                ],
              },
              {
                icon: "📊",
                bgColor: darkMode ? "bg-gray-700" : "bg-white",
                borderColor: "border-pink-100",
                title: "Tanda-Tanda yang Perlu Diwaspadai",
                description:
                  "Kenali gejala awal agar dapat segera mendapatkan bantuan yang tepat.",
                points: [
                  "Perubahan mood atau perilaku yang signifikan",
                  "Kesulitan tidur atau tidur berlebihan",
                  "Menarik diri dari aktivitas sosial",
                  "Kehilangan minat pada hal yang biasa disukai",
                  "Perubahan nafsu makan drastis",
                ],
              },
              {
                icon: "💜",
                bgColor: darkMode ? "bg-gray-700" : "bg-white",
                borderColor: "border-blue-100",
                title: "Tips Self-Care Harian",
                description:
                  "Praktikkan kebiasaan sehat untuk menjaga kesehatan mental Anda.",
                points: [
                  "Tidur cukup (7-9 jam per malam)",
                  "Olahraga teratur minimal 30 menit",
                  "Makan makanan bergizi seimbang",
                  "Luangkan waktu untuk hobi dan relaksasi",
                  "Batasi penggunaan media sosial",
                ],
              },
              {
                icon: "🧘",
                bgColor: darkMode ? "bg-gray-700" : "bg-white",
                borderColor: "border-green-100",
                title: "Teknik Manajemen Stres",
                description:
                  "Metode praktis yang bisa langsung diterapkan saat merasa tertekan.",
                points: [
                  "Teknik pernapasan 4-7-8",
                  "Meditasi atau mindfulness 10 menit",
                  "Journaling perasaan dan pikiran",
                  "Berbicara dengan orang terpercaya",
                  "Aktivitas fisik ringan seperti jalan kaki",
                ],
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`${
                  item.bgColor
                } p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border ${
                  darkMode ? "border-gray-700" : item.borderColor
                }`}
              >
                <div
                  className={`w-14 h-14 ${
                    darkMode
                      ? "bg-gray-600"
                      : item.borderColor.replace("border", "bg")
                  } rounded-full flex items-center justify-center mb-4`}
                >
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className={`font-semibold text-xl ${textClass} mb-3`}>
                  {item.title}
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } leading-relaxed mb-4`}
                >
                  {item.description}
                </p>
                <ul
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } text-sm space-y-2`}
                >
                  {item.points.map((point, pidx) => (
                    <li key={pidx}>• {point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Praktis Sehari-hari */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className={`font-bold text-3xl md:text-4xl ${textClass} mb-4`}>
              Tips Praktis Sehari-hari
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🌅",
                title: "Pagi Hari",
                tips: "Mulai dengan gratitude journal. Tuliskan 3 hal yang Anda syukuri.",
              },
              {
                icon: "☀️",
                title: "Siang Hari",
                tips: "Istirahat sejenak. Lakukan stretching atau jalan-jalan singkat.",
              },
              {
                icon: "🌙",
                title: "Malam Hari",
                tips: "Hindari layar 1 jam sebelum tidur. Baca buku atau dengar musik.",
              },
              {
                icon: "💝",
                title: "Setiap Saat",
                tips: "Jangan ragu untuk meminta bantuan saat membutuhkan.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`${cardBgClass} p-6 rounded-xl shadow-md hover:shadow-lg transition-all border ${borderClass} text-center`}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className={`font-semibold text-lg ${textClass} mb-3`}>
                  {item.title}
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } text-sm leading-relaxed`}
                >
                  {item.tips}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section
        id="resources"
        className={`py-20 px-4 ${darkMode ? "bg-gray-800/50" : "bg-white/60"}`}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className={`font-bold text-3xl md:text-4xl ${textClass} mb-4`}>
              Sumber Daya & Bantuan
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
            <p
              className={`${darkMode ? "text-gray-400" : "text-gray-600"} mt-4`}
            >
              Jangan ragu untuk mencari bantuan profesional jika diperlukan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-2xl shadow-xl text-white">
              <h3 className="font-bold text-2xl mb-4 flex items-center gap-2">
                <span className="text-2xl">📞</span>
                Layanan Darurat
              </h3>
              <div className="space-y-3">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <p className="font-semibold mb-1">Halo Kemkes 119</p>
                  <p className="text-sm text-purple-100">
                    Layanan konsultasi kesehatan 24/7
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <p className="font-semibold mb-1">
                    Into The Light - 1500-454
                  </p>
                  <p className="text-sm text-purple-100">
                    Hotline pencegahan bunuh diri
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <p className="font-semibold mb-1">Sejiwa - 119 ext 8</p>
                  <p className="text-sm text-purple-100">
                    Konseling kesehatan jiwa
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`${cardBgClass} p-8 rounded-2xl shadow-xl border ${borderClass}`}
            >
              <h3
                className={`font-bold text-2xl ${textClass} mb-4 flex items-center gap-2`}
              >
                <span className="text-2xl">👥</span>
                Layanan Profesional
              </h3>
              <div className="space-y-3">
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <p className={`font-semibold ${textClass} mb-1`}>Psikolog</p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Untuk konseling dan terapi bicara
                  </p>
                </div>
                <div className="border-l-4 border-pink-500 pl-4 py-2">
                  <p className={`font-semibold ${textClass} mb-1`}>Psikiater</p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Untuk diagnosis dan pengobatan medis
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className={`font-semibold ${textClass} mb-1`}>Konselor</p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Untuk bimbingan dan dukungan
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`mt-8 ${
              darkMode
                ? "bg-blue-900/30 border-blue-700"
                : "bg-blue-50 border-blue-500"
            } border-l-4 p-6 rounded-lg`}
          >
            <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
              <strong>💡 Catatan Penting:</strong> Tidak ada yang salah dengan
              mencari bantuan profesional. Berkonsultasi dengan ahli kesehatan
              mental adalah langkah berani dan positif untuk kesejahteraan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Mitos vs Fakta */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className={`font-bold text-3xl md:text-4xl ${textClass} mb-4`}>
              Mitos vs Fakta
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6">
            {[
              {
                mitos: "Gangguan mental adalah tanda kelemahan",
                fakta:
                  "Gangguan mental adalah kondisi medis yang dapat dialami siapa saja, bukan masalah karakter atau kelemahan pribadi.",
              },
              {
                mitos: "Orang dengan gangguan mental tidak bisa bekerja",
                fakta:
                  "Dengan perawatan yang tepat, kebanyakan orang dengan gangguan mental dapat produktif dan sukses dalam karir mereka.",
              },
              {
                mitos: "Kesehatan mental hanya soal orang dewasa",
                fakta:
                  "Anak-anak dan remaja juga dapat mengalami masalah kesehatan mental dan membutuhkan perhatian khusus.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`${cardBgClass} p-6 rounded-xl shadow-md border ${borderClass}`}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-l-4 border-red-400 pl-4">
                    <p className="text-red-600 font-semibold text-sm mb-2 flex items-center gap-2">
                      <span>❌</span>
                      MITOS
                    </p>
                    <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                      {item.mitos}
                    </p>
                  </div>
                  <div className="border-l-4 border-green-400 pl-4">
                    <p className="text-green-600 font-semibold text-sm mb-2 flex items-center gap-2">
                      <span>✅</span>
                      FAKTA
                    </p>
                    <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                      {item.fakta}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Motivasi */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto max-w-3xl text-center text-white">
          <div className="text-6xl mb-6">💜</div>
          <blockquote className="text-2xl md:text-3xl font-medium mb-4 leading-relaxed">
            "Menjaga kesehatan mental adalah bentuk cinta pada diri sendiri"
          </blockquote>
          <p className="text-purple-100 text-lg">
            Ingatlah bahwa Anda tidak sendiri dalam perjalanan ini
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
                <span className="font-bold text-xl">Mental Health Hub</span>
              </div>
              <p className="text-gray-400 text-sm">
                Sumber informasi dan dukungan untuk kesehatan mental Anda
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📧 info@mentalhealth.com</p>
                <p>📱 +62 812-3456-7890</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Ingat</h4>
              <p className="text-sm text-gray-400">
                Jika Anda atau orang terdekat mengalami krisis mental, segera
                hubungi layanan darurat atau profesional kesehatan mental.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 KKN Mental Health Hub. Dibuat dengan ❤️ untuk kesehatan
              mental yang lebih baik.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
