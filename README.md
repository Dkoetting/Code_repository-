# Video-Widget mit Kalenderbuchung

Dieses Repository enthält ein einfaches, sofort nutzbares Frontend-Widget:

- eingebettetes Video
- Datumsauswahl (Kalender)
- freie Zeitfenster
- Buchungsformular (Name + E-Mail)
- lokale Belegungslogik mit `localStorage`

## Starten

```bash
python3 -m http.server 8000
```

Dann im Browser öffnen: `http://localhost:8000`

## Auf Webseite publizieren

Du kannst die 3 Dateien direkt in deine Webseite integrieren:

- `index.html`
- `styles.css`
- `script.js`

Oder per `<iframe>` auf einer bestehenden Seite einbinden, wenn du das Widget separat hostest.
