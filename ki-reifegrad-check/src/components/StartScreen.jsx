import { motion } from "framer-motion";
import data from "../data";

export default function StartScreen({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="text-center max-w-xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-8 sm:p-12">
        {/* Brand */}
        <div className="mb-6">
          <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full bg-primary-50 text-primary-700 mb-4">
            {data.config.brand}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight">
            KI-Reifegrad
            <br />
            <span className="text-primary">Quick-Check</span>
          </h1>
        </div>

        <p className="text-slate-500 mb-4 leading-relaxed">
          Ermitteln Sie in wenigen Minuten den KI-Reifegrad Ihres Unternehmens.{" "}
          <strong>{data.questions.length} Fragen</strong> in{" "}
          <strong>{data.dimensions.length} Dimensionen</strong> geben Ihnen
          einen klaren Überblick.
        </p>

        {/* Dimension pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {data.dimensions.map((dim) => (
            <span
              key={dim}
              className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600"
            >
              {dim}
            </span>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/25 transition-colors cursor-pointer"
        >
          Jetzt starten
        </motion.button>
      </div>
    </motion.div>
  );
}
