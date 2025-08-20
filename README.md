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
│
├── index.html              # Main page (UI layout + markup)
├── style.css               # Styles (layout, theme, responsive rules)
├── script.js               # App logic (filters, quiz, timer, PDF)
│
├── assets/                 # Static assets (optional)
│   ├── images/             # Screenshots / logos / previews
│   │   └── preview.png
│   └── icons/              # Favicons / SVGs
│       └── ssc-cgl.svg
│
├── data/                   # Sample or starter data (optional)
│   ├── sample-questions.json
│   └── sample-questions.csv
│
├── docs/                   # Extra docs (optional)
│   └── screenshots.md
│
├── .github/                # GitHub config (optional)
│   └── workflows/
│       └── pages.yml       # GitHub Pages CI/CD (if used)
│
├── LICENSE                 # MIT (or your chosen license)
└── README.md               # This file

```mermaid
flowchart TD
    A[Start Quiz] --> B{Questions Available?}
    B -- No --> C[Show Notification: "No questions available"]
    B -- Yes --> D[Ask Duration (Minutes)]
    D --> E[Initialize Quiz State]
    E --> F[Show First Question + Timer Start]

    F --> G[User Selects Answer]
    G --> H{More Questions?}
    H -- Yes --> F
    H -- No --> I[End Quiz]

    I --> J[Show Score + Feedback]
    J --> K[Options]
    K --> L[Restart Quiz]
    K --> M[Review Questions]
    K --> N[Back to Subjects]
    N --> O[Show Filters + Question List]

---

---

Would you like me to **embed badges (shields.io)** at the very top of your README (like "Live Demo", "License", "Made with ❤️ in JS") so it looks more professional?
