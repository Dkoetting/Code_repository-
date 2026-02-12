const data = {
  config: {
    brand: "KIeR - KI er-leben",
    primaryColor: "#0891b2",
    webhookUrl: "HIER_DEINE_WEBHOOK_URL_VON_ZAPIER_ODER_MAKE_EINTRAGEN",
  },
  dimensions: [
    "Strategie",
    "Governance",
    "Infrastruktur",
    "Kultur",
    "Prozesse",
    "Wertschöpfung",
  ],
  questions: [
    {
      id: 1,
      dim: "Strategie",
      q: "KI-Vision & Strategie?",
      opt: [
        "Keine",
        "Ad-hoc",
        "Konzept existiert",
        "Fest verankert",
        "Strategischer Treiber",
      ],
    },
    {
      id: 2,
      dim: "Strategie",
      q: "Budget & Ressourcen?",
      opt: [
        "Kein Budget",
        "Einzelfallprüfung",
        "Jährliches Budget",
        "KI-Investitionspriorität",
        "KI-native Finanzierung",
      ],
    },
    {
      id: 3,
      dim: "Governance",
      q: "EU AI Act & Compliance?",
      opt: [
        "Unbekannt",
        "Beobachtung",
        "Leitlinien aktiv",
        "Full Compliance Prozess",
        "KI-Ethik als Standard",
      ],
    },
    {
      id: 4,
      dim: "Infrastruktur",
      q: "Datenqualität & Zugriff?",
      opt: [
        "Daten-Silos",
        "Zentrales Repository",
        "Cloud-Infrastruktur",
        "Echtzeit-Pipelines",
        "KI-optimierte Architektur",
      ],
    },
    {
      id: 5,
      dim: "Infrastruktur",
      q: "Tool-Stack?",
      opt: [
        "Keine KI-Tools",
        "Schatten-KI (ChatGPT privat)",
        "Unternehmens-Lizenzen",
        "Eigene API-Plattform",
        "Full-Stack AI-Customizing",
      ],
    },
    {
      id: 6,
      dim: "Kultur",
      q: "KI-Literacy im Team?",
      opt: [
        "Kein Wissen",
        "Punktuelle Schulung",
        "Regelmäßige Formate",
        "Breite Qualifizierung",
        "KI-Experten in jedem Team",
      ],
    },
    {
      id: 7,
      dim: "Kultur",
      q: "Management-Support?",
      opt: [
        "Skeptisch",
        "Abwartend",
        "Unterstützend",
        "KI-Evangelisten",
        "Visionäres Vorbild",
      ],
    },
    {
      id: 8,
      dim: "Prozesse",
      q: "KI-Use-Case-Pipeline?",
      opt: [
        "Keine Ideen",
        "Ideensammlung",
        "Pilotprojekte laufen",
        "Systematische Umsetzung",
        "KI-gesteuerte Optimierung",
      ],
    },
    {
      id: 9,
      dim: "Prozesse",
      q: "Automatisierungsgrad?",
      opt: [
        "Rein manuell",
        "Teil-automatisiert",
        "Standardprozesse KI-unterstützt",
        "End-to-End KI-Prozesse",
        "Self-evolving Processes",
      ],
    },
    {
      id: 10,
      dim: "Wertschöpfung",
      q: "ROI & Skalierung?",
      opt: [
        "Nicht messbar",
        "Kostenfokus",
        "Erste ROI-Erfolge",
        "Skalierte Wertschöpfung",
        "Neues KI-Geschäftsmodell",
      ],
    },
  ],
};

export default data;
