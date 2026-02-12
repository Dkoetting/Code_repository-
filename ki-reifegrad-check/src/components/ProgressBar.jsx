import { motion } from "framer-motion";
import data from "../data";

export default function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100;

  return (
    <div className="w-full mb-8">
      {/* Step indicator */}
      <div className="flex justify-between items-center mb-2 text-sm text-slate-500">
        <span>
          Frage {current + 1} von {total}
        </span>
        <span className="font-medium text-primary">
          {data.questions[current]?.dim}
        </span>
      </div>

      {/* Bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Dimension dots */}
      <div className="flex justify-between mt-3">
        {data.dimensions.map((dim, i) => {
          const dimQuestions = data.questions.filter((q) => q.dim === dim);
          const firstIdx = data.questions.findIndex((q) => q.dim === dim);
          const lastIdx = firstIdx + dimQuestions.length - 1;
          const isActive = current >= firstIdx && current <= lastIdx;
          const isDone = current > lastIdx;

          return (
            <div key={dim} className="flex flex-col items-center gap-1">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isDone
                    ? "bg-primary scale-100"
                    : isActive
                      ? "bg-primary-light ring-2 ring-primary/30 scale-125"
                      : "bg-slate-300"
                }`}
              />
              <span
                className={`text-[10px] leading-tight text-center hidden sm:block ${
                  isActive ? "text-primary font-semibold" : "text-slate-400"
                }`}
              >
                {dim}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
