import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import data from "./data";
import StartScreen from "./components/StartScreen";
import ProgressBar from "./components/ProgressBar";
import QuestionCard from "./components/QuestionCard";
import ResultsPage from "./components/ResultsPage";
import LeadForm from "./components/LeadForm";

function calculateScores(answers) {
  const grouped = {};
  data.dimensions.forEach((dim) => {
    grouped[dim] = [];
  });

  data.questions.forEach((q, idx) => {
    const val = answers[idx];
    if (val !== undefined) {
      grouped[q.dim].push(val + 1); // 0-indexed option -> 1-5 scale
    }
  });

  const scores = {};
  data.dimensions.forEach((dim) => {
    const vals = grouped[dim];
    scores[dim] =
      vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  });

  return scores;
}

export default function App() {
  const [phase, setPhase] = useState("start"); // start | quiz | results
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(1);

  const questions = data.questions;
  const total = questions.length;

  const handleStart = useCallback(() => {
    setPhase("quiz");
    setCurrentQ(0);
  }, []);

  const handleSelect = useCallback(
    (optionIndex) => {
      setAnswers((prev) => ({ ...prev, [currentQ]: optionIndex }));

      // Auto-advance after short delay
      setTimeout(() => {
        if (currentQ < total - 1) {
          setDirection(1);
          setCurrentQ((prev) => prev + 1);
        } else {
          setPhase("results");
        }
      }, 300);
    },
    [currentQ, total]
  );

  const handlePrev = useCallback(() => {
    if (currentQ > 0) {
      setDirection(-1);
      setCurrentQ((prev) => prev - 1);
    }
  }, [currentQ]);

  const handleRestart = useCallback(() => {
    setPhase("start");
    setCurrentQ(0);
    setAnswers({});
    setDirection(1);
  }, []);

  const scores = calculateScores(answers);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50/30">
      {/* Header */}
      <header className="w-full py-4 px-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="text-sm font-bold text-primary tracking-wide">
            {data.config.brand}
          </span>
          {phase !== "start" && (
            <button
              onClick={handleRestart}
              className="text-sm text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              Neu starten
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pb-12 pt-4">
        <AnimatePresence mode="wait">
          {phase === "start" && <StartScreen onStart={handleStart} />}
        </AnimatePresence>

        {phase === "quiz" && (
          <>
            <ProgressBar current={currentQ} total={total} />

            <QuestionCard
              question={questions[currentQ]}
              selectedIndex={answers[currentQ]}
              onSelect={handleSelect}
              direction={direction}
            />

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrev}
                disabled={currentQ === 0}
                className="px-5 py-2.5 text-sm font-medium rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                Zurück
              </button>

              {answers[currentQ] !== undefined && currentQ < total - 1 && (
                <button
                  onClick={() => {
                    setDirection(1);
                    setCurrentQ((prev) => prev + 1);
                  }}
                  className="px-5 py-2.5 text-sm font-medium rounded-xl bg-primary text-white hover:bg-primary-dark transition-colors cursor-pointer"
                >
                  Weiter
                </button>
              )}

              {answers[currentQ] !== undefined && currentQ === total - 1 && (
                <button
                  onClick={() => setPhase("results")}
                  className="px-5 py-2.5 text-sm font-medium rounded-xl bg-primary text-white hover:bg-primary-dark transition-colors cursor-pointer"
                >
                  Ergebnis anzeigen
                </button>
              )}
            </div>
          </>
        )}

        {phase === "results" && (
          <div className="space-y-8">
            <ResultsPage scores={scores} />
            <LeadForm scores={scores} />
          </div>
        )}
      </main>
    </div>
  );
}
