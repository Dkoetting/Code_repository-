# EU AI Act Reifegrad Check

Eine interaktive Webanwendung, mit der Organisationen ihren Reifegrad in Bezug auf die regulatorischen Anforderungen
von EU AI Act (Verordnung (EU) 2024/2064) und ISO/IEC 42001-2023 einschätzen können. Nutzer:innen bewerten zentrale
Handlungsfelder auf einer Skala von 1 (Keine Umsetzung) bis 5 (Vollständig umgesetzt). Aus den Antworten werden
gewichtete Reifegrade, Schwerpunktbereiche sowie priorisierte Maßnahmenvorschläge generiert.

## Features

- Strukturierter Fragenkatalog entlang der Dimensionen Governance, Risikomanagement, Daten & Modelle, Technik und Transparenz.
- Gewichtete Reifegradberechnung mit visueller Fortschrittsanzeige.
- Handlungsempfehlungen je nach Gesamtbewertung und schwächstem Bereich.
- Responsive UI mit Fokus auf übersichtlicher Darstellung für Workshops und Audits.

## So nutzen Sie den Check (auch ohne Technik-Kenntnisse)

1. **Team zusammenholen:** Laden Sie Vertreter:innen aus Fachbereich, IT und Compliance in einen 20–30-minütigen Termin ein.
2. **Fragen laut vorlesen:** Arbeiten Sie jede Karte nacheinander durch und einigen Sie sich auf eine Bewertung von 1 (Keine Umsetzung) bis 5 (Vollständig umgesetzt).
3. **Notizen machen:** Halten Sie Stichworte fest, wenn Nachweise fehlen oder Maßnahmen offen sind.
4. **Ergebnis interpretieren:** Der Bereich „Ihr Reifegrad“ zeigt Gesamtwert, Stärken und Nachholbedarf. Orientieren Sie sich besonders am schwächsten Themenfeld.
5. **To-dos ableiten:** Übernehmen Sie die Priorisierung in Ihre Aufgabenliste und ergänzen Sie Verantwortliche sowie Zeitpläne.

> Hinweis: Falls Sie die Anwendung nicht selbst starten möchten, bitten Sie Ihre IT oder Beratung, die App per `npm run dev` bereitzustellen und teilen Sie Ihnen einfach den Browser-Link mit.

## Entwicklung

1. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
2. Entwicklung starten:
   ```bash
   npm run dev
   ```
3. Produktion-Build erzeugen:
   ```bash
   npm run build
   ```

> Hinweis: Die Anwendung benötigt Node.js ≥ 18. Netzwerkzugriff auf die npm-Registry ist erforderlich, um die
> Abhängigkeiten zu installieren.
