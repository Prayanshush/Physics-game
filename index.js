
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LEVELS = [
  {
    title: "Level 1: Displacement Dash",
    question: "Kachodi moves from 0 m to 100 m in a straight line. What is the displacement?",
    options: ["100 m", "0 m", "-100 m"],
    answer: "100 m",
  },
  {
    title: "Level 2: Speed Challenge",
    question: "If Kachodi travels 200 m in 10 seconds, what is the speed?",
    options: ["20 m/s", "2 m/s", "0.2 m/s"],
    answer: "20 m/s",
  },
  {
    title: "Level 3: Acceleration Arena",
    question: "If initial velocity is 0, final velocity is 10 m/s in 5s, what is acceleration?",
    options: ["2 m/s²", "5 m/s²", "10 m/s²"],
    answer: "2 m/s²",
  }
];

export default function Home() {
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

  const current = LEVELS[level];

  useEffect(() => {
    const bgm = new Audio('/music.mp3');
    bgm.loop = true;
    bgm.volume = 0.4;
    bgm.play();
    return () => bgm.pause();
  }, []);

  const handleAnswer = (option) => {
    if (option === current.answer) {
      setScore(score + 1);
      setMessage("✅ Correct! Kachodi rolls ahead! 🌀");
      setTimeout(() => {
        setMessage("");
        if (level + 1 < LEVELS.length) {
          setLevel(level + 1);
        } else {
          setShowResult(true);
        }
      }, 2000);
    } else {
      setMessage("❌ Oops! Wrong kachodi flip! Try again.");
    }
  };

  if (showResult) {
    return (
      <motion.div className="p-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold mb-4">🎉 Congrats, Kachodi Champ!</h1>
        <p className="text-xl">You scored {score} out of {LEVELS.length}.</p>
        <p className="mt-4">Motion mastered like a true snack legend! 🚀</p>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => window.location.reload()}>Play Again</button>
      </motion.div>
    );
  }

  return (
    <motion.div className="max-w-xl mx-auto p-6 text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2 className="text-2xl font-bold mb-4">{current.title}</h2>
      <p className="mb-6">{current.question}</p>
      <div className="flex flex-col gap-3">
        {current.options.map((opt, idx) => (
          <motion.div whileTap={{ scale: 0.95 }} key={idx}>
            <button onClick={() => handleAnswer(opt)} className="px-4 py-2 bg-green-500 text-white rounded">{opt}</button>
          </motion.div>
        ))}
      </div>
      {message && <p className="mt-4 text-lg font-semibold">{message}</p>}
    </motion.div>
  );
}
