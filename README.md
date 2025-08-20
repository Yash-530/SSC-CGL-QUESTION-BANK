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


## 🔄 Website Workflow

```mermaid
flowchart TD

    %% --- Entry Points ---
    A[🏁 Start] --> B{Choose Action}

    B -->|📚 Study Questions| C[Select Subject]
    B -->|📥 Import Questions CSV/JSON| C

    %% --- Study Flow ---
    C --> D[Select Topic]
    D --> E[Select Year]
    E --> F[Select Difficulty]
    F --> G[Click Load Questions]
    G --> H[Questions Loaded MCQs]

    H --> I{Want Answers?}
    I -->|Yes| J[Show Answers + Explanations]
    I -->|No| K[Keep Practicing]

    H --> L{Generate PDF?}
    L -->|Yes| M[📄 Download PDF]
    L -->|No| K

    %% --- Quiz Flow ---
    F --> N[Start Quiz]
    N --> O[Enter Duration Minutes]
    O --> P[Initialize Quiz State]
    P --> Q[Show First Question + Start Timer]

    Q --> R[User Selects Answer]
    R --> S{More Questions?}
    S -->|Yes| Q
    S -->|No| T[End Quiz]

    T --> U[Show Score + Feedback]
    U --> V-Next Action
    V -->|🔄 Restart Quiz| N
    V -->|📖 Review Questions| W[Review Mode All Qs + Answers + Explanations]
    V -->|↩ Back to Subjects| X[Show Filters + Question List]

    %% --- Ending ---
    J --> X
    K --> X
    M --> X
    W --> X
    X --> Z[🏁 End]

 ```
