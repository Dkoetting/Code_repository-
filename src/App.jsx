import { useMemo, useState } from 'react';
import './App.css';

const DIMENSIONS = [
  {
    id: 'governance',
    title: 'Governance & Organisation',
    description:
      'Strukturen, Verantwortlichkeiten und Aufsicht für KI-Systeme inklusive Risk Owner und Kontrollinstanzen.',
    weight: 0.25,
    questions: [
      {
        id: 'gov-policy',
        prompt: 'Existiert eine formalisierte KI-Governance-Policy mit Bezug zum EU AI Act?',
      },
      {
        id: 'gov-accountability',
        prompt: 'Sind Rollen wie KI-Verantwortliche und Compliance-Beauftragte klar benannt?',
      },
      {
        id: 'gov-monitoring',
        prompt: 'Werden Entscheidungs- und Prüfprozesse regelmäßig überwacht und aktualisiert?',
      },
    ],
  },
  {
    id: 'risk',
    title: 'Risikomanagement & Dokumentation',
    description:
      'Prozesse zur Identifikation, Bewertung und Behandlung von Risiken inklusive technischer Dokumentation.',
    weight: 0.2,
    questions: [
      {
        id: 'risk-assessment',
        prompt: 'Werden für jedes KI-System Risikobewertungen gemäß EU AI Act durchgeführt?',
      },
      {
        id: 'risk-mitigation',
        prompt: 'Gibt es nachverfolgbare Maßnahmenpläne zur Risikobehandlung?',
      },
      {
        id: 'risk-logging',
        prompt: 'Werden Logging-, Monitoring- und Incident-Response-Prozesse dokumentiert?',
      },
    ],
  },
  {
    id: 'data',
    title: 'Daten & Modellmanagement',
    description:
      'Datengovernance, Datenqualität, Trainings- und Testdokumentation gemäß ISO/IEC 42001-2023 Anforderungen.',
    weight: 0.2,
    questions: [
      {
        id: 'data-quality',
        prompt: 'Existiert ein Qualitäts- und Bias-Monitoring für Trainings- und Testdaten?',
      },
      {
        id: 'data-lineage',
        prompt: 'Sind Datenherkunft, -aufbereitung und -freigabe vollständig nachvollziehbar?',
      },
      {
        id: 'model-lifecycle',
        prompt: 'Wird der Modelllebenszyklus inklusive Retraining-Prozessen dokumentiert?',
      },
    ],
  },
  {
    id: 'technical',
    title: 'Technische Robustheit & Sicherheit',
    description:
      'Validierung, Testing, Cybersecurity und Performanceüberwachung der KI-Systeme.',
    weight: 0.2,
    questions: [
      {
        id: 'tech-testing',
        prompt: 'Werden Validierungs- und Verifikationstests regelmäßig durchgeführt?',
      },
      {
        id: 'tech-security',
        prompt: 'Existieren technische Sicherheitsmaßnahmen gegen Angriffe und Manipulation?',
      },
      {
        id: 'tech-postmarket',
        prompt: 'Sind Post-Market-Surveillance und Wartungsprozesse implementiert?',
      },
    ],
  },
  {
    id: 'ethics',
    title: 'Transparenz & Nutzerrechte',
    description:
      'Offenlegung, Dokumentation von Nutzerrechten und Mechanismen für Beschwerden und Erklärbarkeit.',
    weight: 0.15,
    questions: [
      {
        id: 'ethics-transparency',
        prompt: 'Werden Nutzer:innen klar über KI-Einsatz und Funktion informiert?',
      },
      {
        id: 'ethics-rights',
        prompt: 'Existiert ein dokumentierter Prozess für Beschwerde- und Rechtsbehelfsverfahren?',
      },
      {
        id: 'ethics-explainability',
        prompt: 'Sind Erklärbarkeitsmechanismen oder Audit-Trails verfügbar?',
      },
    ],
  },
];

const LEVELS = [
  {
    min: 0,
    max: 1.5,
    label: 'Reifegrad 1 – Initial',
    summary: 'Ad-hoc Aktivitäten ohne strukturierte Nachweise. Hohe Risiken, sofortige Governance-Maßnahmen nötig.',
  },
  {
    min: 1.5,
    max: 2.5,
    label: 'Reifegrad 2 – Entwickelnd',
    summary:
      'Grundlegende Richtlinien vorhanden, jedoch lückenhafte Umsetzung und Dokumentation. Fokus auf Risikobewertung und Verantwortlichkeiten.',
  },
  {
    min: 2.5,
    max: 3.5,
    label: 'Reifegrad 3 – Etabliert',
    summary:
      'Standardisierte Prozesse vorhanden, regelmäßige Kontrollen und Reports. Ausbau der Transparenz- und Monitoring-Prozesse empfohlen.',
  },
  {
    min: 3.5,
    max: 4.5,
    label: 'Reifegrad 4 – Fortgeschritten',
    summary:
      'Integrierte Governance mit durchgängiger Nachvollziehbarkeit. Fokus auf kontinuierliche Optimierung und automatisierte Kontrollen.',
  },
  {
    min: 4.5,
    max: 5.1,
    label: 'Reifegrad 5 – Exzellent',
    summary:
      'Vollständige Compliance mit proaktiver Anpassung an regulatorische Updates und Audits.',
  },
];

const maturityRecommendations = (
  averageScore,
  dimensionScores,
) => {
  const recs = [];

  if (averageScore < 2.5) {
    recs.push(
      'Priorisieren Sie die formale Verankerung von Governance- und Compliance-Rollen. Dokumentieren Sie Verantwortlichkeiten und Entscheidungsgremien.',
    );
  }

  const weakestDimension = [...dimensionScores].sort((a, b) => a.score - b.score)[0];
  if (weakestDimension) {
    recs.push(
      `Stärken Sie den Bereich "${weakestDimension.title}" durch gezielte Maßnahmen, z.B. definierte KPIs, Checklisten und regelmäßige Reviews.`,
    );
  }

  if (averageScore >= 3) {
    recs.push(
      'Implementieren Sie ein kontinuierliches Monitoring, um Audits und Berichte halbjährlich zu aktualisieren (ISO/IEC 42001-2023 Abschnitt 8).',
    );
  }

  recs.push(
    'Bereiten Sie eine technische Dokumentation mit Risikoanalyse, Testreports, Datenmanagement und Nutzerinformationen vor – erforderlich für Konformitätsbewertungen.',
  );

  return recs;
};

const scaleLabels = ['Keine Umsetzung', 'Planung', 'Teilweise umgesetzt', 'Weitgehend umgesetzt', 'Vollständig umgesetzt'];

const QUICK_START_STEPS = [
  {
    title: 'Vorbereitung',
    description:
      'Laden Sie die relevanten Kolleg:innen (z. B. Fachbereich, IT, Compliance) ein und planen Sie 20 Minuten für den Check ein.',
  },
  {
    title: 'Einschätzung je Aussage',
    description:
      'Lesen Sie jede Aussage laut vor und bewerten Sie gemeinsam auf der Skala von 1 (Keine Umsetzung) bis 5 (Vollständig umgesetzt).',
  },
  {
    title: 'Begründung notieren',
    description:
      'Notieren Sie bei Unsicherheiten kurze Stichworte, damit Sie später Nachweise oder Maßnahmen ableiten können.',
  },
  {
    title: 'Ergebnis verstehen',
    description:
      'Der Kasten «Ihr Reifegrad» fasst Gesamtpunktzahl, Stärken und Nachholbedarf zusammen. Achten Sie auf den schwächsten Bereich.',
  },
  {
    title: 'Maßnahmen ableiten',
    description:
      'Nutzen Sie die vorgeschlagenen Prioritäten als To-do-Liste und ergänzen Sie Verantwortliche sowie Fristen.',
  },
];

function QuickGuide() {
  return (
    <section className="quick-guide" aria-labelledby="quick-guide-heading">
      <h2 id="quick-guide-heading">So funktioniert der Check</h2>
      <p className="quick-guide-intro">
        Keine Technikkenntnisse nötig: Folgen Sie einfach diesen Schritten und gehen Sie Frage für Frage gemeinsam durch.
      </p>
      <ol>
        {QUICK_START_STEPS.map((step, index) => (
          <li key={step.title}>
            <strong>
              {index + 1}. {step.title}
            </strong>
            <span>{step.description}</span>
          </li>
        ))}
      </ol>
      <p className="quick-guide-tip">
        Tipp: Klicken Sie jederzeit auf «Antworten zurücksetzen», um mit einem anderen Team erneut zu starten.
      </p>
    </section>
  );
}

function SliderQuestion({ question, value, onChange }) {
  return (
    <label className="question-card" htmlFor={question.id}>
      <div className="question-text">{question.prompt}</div>
      <div className="slider-row">
        <input
          id={question.id}
          type="range"
          min="1"
          max="5"
          step="1"
          value={value ?? 3}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <span className="slider-value">{value ? `${value} – ${scaleLabels[value - 1]}` : 'Bitte wählen'}</span>
      </div>
    </label>
  );
}

function ResultCard({ totalScore, level, dimensionScores }) {
  const recommendations = useMemo(
    () => maturityRecommendations(totalScore, dimensionScores),
    [totalScore, dimensionScores],
  );

  return (
    <section className="result-card">
      <h2>Ihr Reifegrad</h2>
      <div className="score-highlight">
        <div className="score-value">{totalScore.toFixed(1)}</div>
        <div>
          <div className="score-level">{level.label}</div>
          <p>{level.summary}</p>
        </div>
      </div>
      <h3>Schwerpunkte und Empfehlungen</h3>
      <ul>
        {dimensionScores.map((dimension) => (
          <li key={dimension.id}>
            <strong>{dimension.title}:</strong> {dimension.score.toFixed(1)} / 5
          </li>
        ))}
      </ul>
      <h4>Priorisierte Maßnahmen</h4>
      <ol>
        {recommendations.map((recommendation, index) => (
          <li key={index}>{recommendation}</li>
        ))}
      </ol>
    </section>
  );
}

function ProgressBar({ completion }) {
  return (
    <div className="progress">
      <div className="progress-bar" style={{ width: `${completion}%` }} />
    </div>
  );
}

export default function App() {
  const [responses, setResponses] = useState({});

  const questionCount = DIMENSIONS.reduce((count, dimension) => count + dimension.questions.length, 0);

  const completion = useMemo(() => {
    const answered = Object.keys(responses).length;
    return Math.round((answered / questionCount) * 100);
  }, [responses, questionCount]);

  const dimensionScores = useMemo(() => {
    return DIMENSIONS.map((dimension) => {
      const scores = dimension.questions.map((question) => responses[question.id]).filter(Boolean);
      const average = scores.length
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length
        : 0;
      return {
        id: dimension.id,
        title: dimension.title,
        score: average,
        weight: dimension.weight,
      };
    });
  }, [responses]);

  const weightedScore = dimensionScores.reduce(
    (total, dimension) => total + dimension.score * dimension.weight,
    0,
  );
  const totalScore = (weightedScore / DIMENSIONS.reduce((sum, dimension) => sum + dimension.weight, 0)) || 0;
  const level = LEVELS.find((threshold) => totalScore >= threshold.min && totalScore < threshold.max) || LEVELS[0];

  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleReset = () => setResponses({});

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>EU AI Act Reifegrad-Check</h1>
          <p>
            Nutzen Sie den Schnell-Check basierend auf EU AI Act und ISO/IEC 42001-2023, um Ihren aktuellen
            Reifegrad zu ermitteln. Bewerten Sie jede Aussage auf einer Skala von 1 (Keine Umsetzung) bis 5
            (Vollständig umgesetzt).
          </p>
        </div>
        <div className="meta">
          <ProgressBar completion={completion} />
          <span>{completion}% beantwortet</span>
        </div>
      </header>

      <main className="layout">
        <section className="questionnaire">
          <QuickGuide />
          {DIMENSIONS.map((dimension) => (
            <div key={dimension.id} className="dimension-card">
              <div className="dimension-headline">
                <h2>{dimension.title}</h2>
                <span className="dimension-weight">Gewichtung: {(dimension.weight * 100).toFixed(0)}%</span>
              </div>
              <p className="dimension-description">{dimension.description}</p>
              <div className="question-list">
                {dimension.questions.map((question) => (
                  <SliderQuestion
                    key={question.id}
                    question={question}
                    value={responses[question.id]}
                    onChange={(value) => handleResponseChange(question.id, value)}
                  />
                ))}
              </div>
            </div>
          ))}
          <button type="button" className="reset-button" onClick={handleReset}>
            Antworten zurücksetzen
          </button>
        </section>

        <ResultCard totalScore={totalScore} level={level} dimensionScores={dimensionScores} />
      </main>

      <footer className="footer">
        <p>
          Hinweise: Dieser Selbstcheck ersetzt keine rechtsverbindliche Konformitätsbewertung. Nutzen Sie die
          Ergebnisse für Gap-Analysen und Audit-Vorbereitungen. Referenzen: EU AI Act (2024/2064) und ISO/IEC
          42001-2023.
        </p>
      </footer>
    </div>
  );
}
