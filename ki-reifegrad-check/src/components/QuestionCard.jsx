import { motion, AnimatePresence } from "framer-motion";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function QuestionCard({
  question,
  selectedIndex,
  onSelect,
  direction,
}) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question.id}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full"
      >
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 sm:p-8">
          {/* Dimension badge */}
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary-50 text-primary-700 mb-4">
            {question.dim}
          </span>

          {/* Question */}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">
            {question.q}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {question.opt.map((opt, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onSelect(idx)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary-50 text-primary-800 shadow-sm"
                      : "border-slate-200 hover:border-primary/40 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Level indicator */}
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="font-medium">{opt}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
