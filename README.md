# 📘 SSC CGL Question Bank

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-Visit%20Now-2b7fff?style=for-the-badge)](https://yash-530.github.io/SSC-CGL-QUESTION-BANK/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-orange?style=for-the-badge)
![Made with HTML](https://img.shields.io/badge/Made%20with-HTML-blue?style=for-the-badge)
![Made with JS](https://img.shields.io/badge/Made%20with-JavaScript-yellow?style=for-the-badge)

---

## 🚀 About the Project
**SSC CGL Question Bank** is an interactive web application containing **official SSC CGL previous year questions (2016–2024)**.  
It helps aspirants **practice, review, and analyze** General Studies questions with quiz mode, filters, and PDF export.  

---

## ✨ Features
✅ Filter by **Subject, Topic, Year, Difficulty**  
✅ **Quiz Mode** with Timer, Score & Review  
✅ **PDF Generation** of selected questions  
✅ User-friendly notifications  
✅ Mobile Responsive UI  

---

## 📂 Project Structure

SSC-CGL-QUESTION-BANK/
├─ index.html                # Main page (UI markup, IDs for JS hooks)
├─ style.css                 # All styles (layout, controls, timer colors, utilities)
├─ script.js                 # App logic (state, filters, quiz, timer, PDF, import)
│
├─ assets/                   # Static assets
│  ├─ icons/                 # Favicons / SVGs
│  │  └─ favicon.png
│  ├─ images/                # Screenshots / logos (for README/UI)
│  └─ sounds/                # (optional) audio cues
│     └─ beep.mp3            # if you switch to file-based beep instead of WebAudio
│
├─ data/                     # (optional) example files for quick testing
│  ├─ sample.csv
│  └─ sample.json
│
├─ docs/                     # (optional) extra documentation / screenshots
│  └─ screenshots.png
│
├─ .github/                  # (optional) CI for Pages or linting
│  └─ workflows/
│     └─ pages.yml
│
├─ README.md                 # The nice README we wrote
├─ LICENSE                   # MIT (or your choice)
└─ CNAME                     # (optional) custom domain for GitHub Pages


---

## 🔄 Quiz Flow

```mermaid
flowchart TD
    A[User Selects Subject & Topic] --> B[Questions Loaded]
    B --> C[Start Quiz Mode]
    C --> D[Timer Starts ⏱]
    D --> E[Answer Questions]
    E -->|Correct/Incorrect| F[Track Score]
    F --> G[Next Question ➡️]
    G --> H{Last Question?}
    H -->|No| E
    H -->|Yes| I[Quiz Completed 🎉]
    I --> J[Show Score & Performance]
    J --> K[Options: Restart | Review | Back to Subjects]


---

✨ This version adds:
- **Badges** (live demo, license, tech)  
- **Flow Diagram (quiz flow in Mermaid)**  
- **Structured sections** (clear & user-friendly)  

Do you also want me to add a **preview screenshot** of your app (UI) at the top of README? That attracts visitors immediately.

