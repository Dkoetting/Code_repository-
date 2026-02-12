import { useState } from "react";
import { motion } from "framer-motion";
import data from "../data";

export default function LeadForm({ scores }) {
  const [form, setForm] = useState({ vorname: "", email: "", firma: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const payload = {
      vorname: form.vorname,
      email: form.email,
      firma: form.firma,
      scores,
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch(data.config.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center"
      >
        <div className="text-4xl mb-3">&#10003;</div>
        <h3 className="text-xl font-bold text-emerald-800 mb-2">
          Vielen Dank, {form.vorname}!
        </h3>
        <p className="text-emerald-600">
          Ihre detaillierte Analyse & individuelle Roadmap wird in Kürze an{" "}
          <strong>{form.email}</strong> gesendet.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 sm:p-8"
    >
      <h3 className="text-xl font-bold text-slate-800 mb-2">
        Detaillierte Analyse & Roadmap per E-Mail erhalten?
      </h3>
      <p className="text-slate-500 text-sm mb-6">
        Wir senden Ihnen eine individuelle Auswertung mit konkreten
        Handlungsempfehlungen.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="vorname"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Vorname
          </label>
          <input
            id="vorname"
            name="vorname"
            type="text"
            required
            value={form.vorname}
            onChange={handleChange}
            placeholder="Max"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            E-Mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="max@firma.de"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="firma"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Firma
          </label>
          <input
            id="firma"
            name="firma"
            type="text"
            required
            value={form.firma}
            onChange={handleChange}
            placeholder="Muster GmbH"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-3 px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors disabled:opacity-60 cursor-pointer"
        >
          {status === "sending" ? "Wird gesendet..." : "Analyse anfordern"}
        </button>

        {status === "error" && (
          <p className="text-red-500 text-sm text-center">
            Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.
          </p>
        )}
      </form>
    </motion.div>
  );
}
