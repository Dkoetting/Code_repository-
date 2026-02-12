import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import data from "../data";

const maturityLabels = [
  "",
  "Einstieg",
  "Aufbau",
  "Etabliert",
  "Fortgeschritten",
  "Vorreiter",
];

function getOverallLevel(scores) {
  const vals = Object.values(scores);
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  return Math.round(avg);
}

function getOverallLabel(scores) {
  const level = getOverallLevel(scores);
  return maturityLabels[level] || "Unbekannt";
}

function getOverallColor(scores) {
  const level = getOverallLevel(scores);
  if (level <= 1) return "text-red-500";
  if (level <= 2) return "text-orange-500";
  if (level <= 3) return "text-yellow-600";
  if (level <= 4) return "text-primary";
  return "text-emerald-500";
}

export default function ResultsPage({ scores }) {
  const chartData = data.dimensions.map((dim) => ({
    dimension: dim,
    score: scores[dim] || 0,
    fullMark: 5,
  }));

  const overall = getOverallLevel(scores);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
          Ihr KI-Reifegrad
        </h1>
        <p className="text-slate-500">
          Gesamtbewertung auf Basis von {data.questions.length} Fragen in{" "}
          {data.dimensions.length} Dimensionen
        </p>
      </div>

      {/* Score badge */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 px-8 py-6 text-center">
          <div className={`text-5xl font-black ${getOverallColor(scores)}`}>
            {overall}/5
          </div>
          <div className="text-lg font-semibold text-slate-600 mt-1">
            {getOverallLabel(scores)}
          </div>
        </div>
      </div>

      {/* Radar chart */}
      <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-4 sm:p-6 mb-8">
        <ResponsiveContainer width="100%" height={380}>
          <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fill: "#475569", fontSize: 12, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 5]}
              tickCount={6}
              tick={{ fill: "#94a3b8", fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              formatter={(value) => [
                `${value.toFixed(1)} / 5`,
                "Score",
              ]}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#0891b2"
              fill="#0891b2"
              fillOpacity={0.2}
              strokeWidth={2}
              dot={{ r: 4, fill: "#0891b2" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Dimension breakdown */}
      <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Ergebnisse nach Dimension
        </h3>
        <div className="space-y-3">
          {data.dimensions.map((dim) => {
            const score = scores[dim] || 0;
            const pct = (score / 5) * 100;
            return (
              <div key={dim}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">{dim}</span>
                  <span className="text-slate-500">
                    {score.toFixed(1)} / 5
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
