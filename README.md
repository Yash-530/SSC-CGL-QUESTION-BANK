# 📘 SSC CGL Question Bank

A **free online resource** for SSC CGL aspirants.  
Practice with **Official Previous Years’ Questions (2016–2024)**, including the most repeated questions—organized neatly by subject, topic, year, and difficulty.

---

## 🌐 Live Website

👉 [Click here to open SSC CGL Question Bank](https://yash-530.github.io/SSC-CGL-QUESTION-BANK/)

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

## 📊 Quiz Flow Diagram

```mermaid
flowchart TD
    A[Start Quiz] --> B{Questions Available?}
    B -- No --> C[Notification: No questions available]
    B -- Yes --> D[Ask Duration in Minutes]
    D --> E[Initialize Quiz State]
    E --> F[Show First Question + Start Timer]

    F --> G[User Selects Answer]
    G --> H{More Questions?}
    H -- Yes --> F
    H -- No --> I[End Quiz]

    I --> J[Show Score + Feedback]
    J --> K[Options: Restart / Review / Back]
    K --> L[Restart Quiz]
    K --> M[Review Questions]
    K --> N[Back to Subjects]
    N --> O[Show Filters + Question List]

---
