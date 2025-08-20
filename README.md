# 📘 SSC CGL Question Bank                 ![GitHub repo size](https://img.shields.io/github/repo-size/yash-530/SSC-CGL-QUESTION-BANK?color=blue&style=for-the-badge)
A **free online resource** for SSC CGL aspirants.  
Practice with **Official Previous Years’ Questions (2016–2024)**, including the most repeated questions—organized neatly by subject, topic, year, and difficulty.

A **comprehensive SSC CGL General Studies Question Bank** containing official **previous years’ questions (2016–2024)** with explanations, quiz mode, and PDF export.  
🎯 Built for aspirants to practice, revise, and test themselves effectively.



---

## 🌐 Live Website

👉 [Click here to open SSC CGL Question Bank](https://yash-530.github.io/SSC-CGL-QUESTION-BANK/)

---

## 🚀 About the Project
**SSC CGL Question Bank** is an interactive web application containing **official SSC CGL previous year questions (2016–2024)**.  
It helps aspirants **practice, review, and analyze** General Studies questions with quiz mode, filters, and PDF export.  

---

## ✨ Features

- 📚 **Subject & Topic Selection** – filter questions by subject and topic  
- 📅 **Year-wise & Difficulty Filters** – focus your practice on what matters  
- 📝 **Quiz Mode** – attempt randomized quizzes with a timer  
- ⏱ **Smart Timer** – color alerts + beep sound + countdown in final seconds  
- 📖 **Review Mode** – see correct answers and explanations after quiz  
- 📄 **PDF Generation** – export questions with answers & explanations  
- 🔔 **Notifications** – instant alerts for quiz actions & warnings  
- 🎨 **Responsive UI** – works smoothly on desktop & mobile  

---

## 📂 Project Structure

```bash
SSC-CGL-QUESTION-BANK/
│── index.html        # Main HTML file
│── style.css         # Stylesheet (UI design, colors, layout)
│── script.js         # Core logic (quiz, filters, PDF, timer)
│── /assets           # Images, icons, sound files (beep, etc.)
│── README.md         # Project documentation

```

## ⌨️ Keyboard Shortcuts: 
- *Ctrl+L*: Load Questions 
- *Ctrl+A*: Toggle Answers 
- *Ctrl+Q*: Start/Stop Quiz 
- *Ctrl+P*: Generate PDF Features: 

```mermaid
flowchart TD

    A[Start → Select Subject] --> B[Import Questions (CSV/JSON)?]
    B -->|Yes| C[Upload Extra Questions]
    B -->|No| D[Use Website Questions]
    C --> D

    D --> E[Select Topic]
    E --> F[Select Year]
    F --> G[Select Difficulty]
    G --> H[Click Load Questions]
    H --> I[Questions Loaded in MCQ Format]

    I --> J[Click Show Answers → Show Explanations]
    I --> K[Click Generate PDF → Download PDF]

---
