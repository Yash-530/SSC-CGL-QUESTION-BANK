
        // Comprehensive question bank with authentic SSC CGL questions (2016-2024)
        let questionBank = {};

        let currentQuestions = [];
        let filteredQuestions = [];
        let showingAnswers = false;
        let quizMode = false;
        let currentQuizIndex = 0;
        let quizScore = 0;
        let selectedAnswers = {};
        let quizTimer = null;
        let quizDuration = 600; // default 10 min
        let timeLeft = quizDuration;


        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            initializeApp();
        });

        function initializeApp() {
            populateSubjects();
            updateStats();
            addEventListeners();
            showNotification('Welcome to SSC CGL Question Bank!', 'success');
        }

        function addEventListeners() {
            // Subject and topic change handlers
            document.getElementById('subjectSelect').addEventListener('change', handleSubjectChange);
            document.getElementById('topicSelect').addEventListener('change', handleTopicChange);
            
            // Filter change handlers
            document.getElementById('yearFilter').addEventListener('change', handleFilterChange);
            document.getElementById('difficultyFilter').addEventListener('change', handleFilterChange);
// Button click handlers
            document.getElementById('loadBtn').addEventListener('click', loadQuestions);
            document.getElementById('answersBtn').addEventListener('click', toggleAnswers);
            document.getElementById('pdfBtn').addEventListener('click', generatePDF);
            document.getElementById('quizBtn').addEventListener('click', toggleQuiz);
            
            // Keyboard shortcuts
            document.addEventListener('keydown', handleKeyboard);
            
            // Scroll to top functionality
            window.addEventListener('scroll', handleScroll);
        }

        function handleKeyboard(e) {
            if (e.ctrlKey) {
                switch(e.key.toLowerCase()) {
                    case 'l':
                        e.preventDefault();
                        loadQuestions();
                        break;
                    case 'a':
                        e.preventDefault();
                        toggleAnswers();
                        break;
                    case 'q':
                        e.preventDefault();
                        toggleQuiz();
                        break;
                    case 'p':
                        e.preventDefault();
                        generatePDF();
                        break;
                }
            }
        }

        function updateStats() {
            let totalQuestions = 0;
            let totalSubjects = Object.keys(questionBank).length;
            let years = new Set();

        Object.keys(questionBank).forEach(subject => {
            if (Array.isArray(questionBank[subject])) {
            totalQuestions += questionBank[subject].length;
            questionBank[subject].forEach(q => { if (q.year) years.add(q.year); });
            } else {
                Object.keys(questionBank[subject]).forEach(topic => {
                    if (Array.isArray(questionBank[subject][topic])) {
                    totalQuestions += questionBank[subject][topic].length;
                    questionBank[subject][topic].forEach(q => { if (q.year) years.add(q.year); });
                }
            });
        }
    });

        // Animate total questions
        animateNumber(document.getElementById('totalQuestions'), totalQuestions, '+');
        // Animate total subjects
        animateNumber(document.getElementById('totalSubjects'), totalSubjects, '');
        // Also update years coverage if present
        const yearsEl = document.getElementById('totalYears');
        if (yearsEl) {
        animateNumber(yearsEl, years.size, '');
    }
}

        function animateNumber(element, target, suffix = '') {
            if (!element) return;
            let current = 0;
            const increment = Math.max(1, target / 50);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + suffix;
            }, 30);
        }

        function populateSubjects() {
            const subjectSelect = document.getElementById('subjectSelect');
            subjectSelect.innerHTML = '<option value="">Choose a subject...</option>';
            
            Object.keys(questionBank).forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                subjectSelect.appendChild(option);
            });
        }

        function handleSubjectChange() {
            const subject = document.getElementById('subjectSelect').value;
            const topicSelect = document.getElementById('topicSelect');
            
            topicSelect.innerHTML = '<option value="">Select a topic...</option>';
            topicSelect.disabled = !subject;
            
            if (subject && questionBank[subject]) {
                if (typeof questionBank[subject] === 'object' && !Array.isArray(questionBank[subject])) {
                    // Add "All Topics" option
                    const allOption = document.createElement('option');
                    allOption.value = 'all';
                    allOption.textContent = 'All Topics';
                    topicSelect.appendChild(allOption);
                    
                    // Add individual topics
                    Object.keys(questionBank[subject]).forEach(topic => {
                        const option = document.createElement('option');
                        option.value = topic;
                        option.textContent = topic;
                        topicSelect.appendChild(option);
                    });
                } else {
                    // Direct questions array
                    const option = document.createElement('option');
                    option.value = 'all';
                    option.textContent = 'All Questions';
                    topicSelect.appendChild(option);
                }
                topicSelect.disabled = false;
            }
            
            // Clear current questions when subject changes
            currentQuestions = [];
            displayQuestions();
        }

        function handleTopicChange() {
            // Auto-load questions when topic changes (if subject is selected)
            if (document.getElementById('subjectSelect').value && document.getElementById('topicSelect').value) {
                loadQuestions();
            }
        }

        function handleFilterChange() {
            // Re-apply filters if questions are already loaded
            if (currentQuestions.length > 0) {
                loadQuestions();
            }
        }

        function loadQuestions() {
            const subject = document.getElementById('subjectSelect').value;
            const topic = document.getElementById('topicSelect').value;
            const yearFilter = document.getElementById('yearFilter').value;
            const difficultyFilter = document.getElementById('difficultyFilter').value;
            const count = 'all';
            
            if (!subject) {
                showNotification('Please select a subject first!', 'warning');
                return;
            }
            
            if (!topic) {
                showNotification('Please select a topic!', 'warning');
                return;
            }
            
            let questions = [];
            
            // Collect questions based on subject and topic
            if (questionBank[subject]) {
                if (Array.isArray(questionBank[subject])) {
                    questions = [...questionBank[subject]];
                } else if (topic === 'all') {
                    // Get all questions from all topics
                    Object.keys(questionBank[subject]).forEach(topicKey => {
                        if (Array.isArray(questionBank[subject][topicKey])) {
                            questions = questions.concat(questionBank[subject][topicKey]);
                        }
                    });
                } else if (questionBank[subject][topic]) {
                    questions = [...questionBank[subject][topic]];
                }
            }
            
            if (questions.length === 0) {
                showNotification('No questions found for selected criteria!', 'error');
                return;
            }
            
            // Apply filters
            if (yearFilter) {
                questions = questions.filter(q => q.year === yearFilter);
            }
            
            if (difficultyFilter) {
                questions = questions.filter(q => q.difficulty === difficultyFilter);
            }
            
            if (questions.length === 0) {
                showNotification('No questions match the selected filters!', 'warning');
                return;
            }
            
            // Shuffle and limit questions
            questions = shuffleArray(questions);
            if (count !== 'all') {
                // removed limiting by count
            }
            
            currentQuestions = questions;
            showingAnswers = false;
            quizMode = false;
            selectedAnswers = {};
            
            displayQuestions();
            updateProgress();
            showNotification(`Loaded ${questions.length} questions successfully!`, 'success');
        }

function displayQuestions() {
    const content = document.getElementById('questionContent');
    
    if (!currentQuestions.length) {
        content.innerHTML = '<div class="loading">Select a subject and topic to load questions...</div>';
        return;
    }
    
    content.innerHTML = '';
    
    currentQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';
        questionDiv.style.animationDelay = `${index * 0.1}s`;
        
        // Options rendering (⚠ no onclick in normal mode!)
        const optionsHtml = q.options.map(option => {
            const isCorrect = option.trim().toLowerCase() === (q.answer || "").trim().toLowerCase();
            
            if (showingAnswers) {
                // In review mode → highlight correct answer
                return `<div class="option ${isCorrect ? "correct" : ""}">${option}</div>`;
            } else {
                // In normal mode → plain options, not clickable
                return `<div class="option">${option}</div>`;
            }
        }).join('');
        
        // Explanation only if reviewing
        const explanationHtml = showingAnswers ? `
            <div class="explanation">
                <strong>Answer:</strong> ${q.answer || "(Not provided)"}<br>
                ${q.explanation || ""}
            </div>
        ` : '';
        
        questionDiv.innerHTML = `
            <div class="question-header">
                <div class="question-number">${index + 1}</div>
                <div class="question-meta">
                    <span class="question-year">${q.year || ""}</span>
                    <span class="difficulty-indicator difficulty-${q.difficulty || "medium"}">${q.difficulty || "Medium"}</span>
                </div>
            </div>
            <div class="question">${q.question || "(No question text provided)"}</div>
            <div class="options">
                ${optionsHtml}
            </div>
            ${explanationHtml}
        `;
        
        content.appendChild(questionDiv);
    });
}

        function getOptionClass(question, option, questionIndex) {
            if (quizMode) return '';
            
            let classes = [];
            
            if (showingAnswers) {
                if (option === question.answer) {
                    classes.push('correct');
                }
            }
            
            if (selectedAnswers[questionIndex] === option) {
                if (option === question.answer) {
                    classes.push('correct');
                } else {
                    classes.push('incorrect');
                }
            }
            
            return classes.join(' ');
        }

        function selectOption(element, questionIndex, selected, correct) {
            if (quizMode) {
                // ✅ Quiz mode: delegate to quiz logic (no explanations shown here)
                handleQuizOption(element, questionIndex, selected, correct);
                return;
            }

            // ✅ Regular browsing mode
            selectedAnswers[questionIndex] = selected;

            const container = element.closest(".question-container");
            const options = container.querySelectorAll(".option");

            options.forEach(opt => {
                opt.classList.remove("selected");
            });

            element.classList.add("selected");

            // ❌ Do NOT auto-show explanation in normal mode
            // Explanations should only appear when "Review Questions" is toggled
            if (showingAnswers) {
                let explanation = container.querySelector(".explanation");
                if (!explanation) {
                    explanation = document.createElement("div");
                    explanation.className = "explanation";
                    explanation.innerHTML = `
                        <strong>Answer:</strong> ${correct}<br>
                        <strong>Explanation:</strong> ${currentQuestions[questionIndex].explanation || ""}
                    `;
                    container.appendChild(explanation);
                }
                explanation.style.display = "block";
            }
        }

        function handleQuizOption(element, questionIndex, selected, correct) {
            const container = element.parentElement.parentElement;
            const options = container.querySelectorAll('.option');
            
            // Disable all options
            options.forEach(opt => opt.style.pointerEvents = 'none');
            
            // Mark correct/incorrect
            if (selected === correct) {
                element.classList.add('correct');
                quizScore++;
                showNotification('Correct!', 'success');
            } else {
                element.classList.add('incorrect');
                // Show correct answer
                options.forEach(opt => {
                    if (opt.textContent.trim() === correct) {
                        opt.classList.add('correct');
                    }
                });
                showNotification('Incorrect!', 'error');
            }
            
            // Show explanation
            const explanation = container.querySelector('.explanation');
            if (explanation) explanation.style.display = 'block';
            
            // Auto advance after 3 seconds
            setTimeout(() => {
                nextQuizQuestion();
            }, 3000);
        }

        function toggleAnswers() {
            if (!currentQuestions.length) {
                showNotification('Please load questions first!', 'warning');
                return;
            }
            
            showingAnswers = !showingAnswers;
            displayQuestions();
            
            const btn = document.getElementById('answersBtn');
            btn.textContent = showingAnswers ? 'Hide Answers' : 'Show Answers';
        }

        function toggleQuiz() {
            if (!currentQuestions.length) {
                showNotification('Please load questions first!', 'warning');
                return;
            }
            
            if (quizMode) {
                stopQuiz();
            } else {
                startQuiz();
            }
        }

/* =========================
   QUIZ: Safe, Drop-in Fix
   ========================= */
   let quizQuestions = []; // separate from currentQuestions

function startQuiz() {
  if (!Array.isArray(currentQuestions) || currentQuestions.length === 0) {
    showNotification('No questions available to start a quiz.', 'warning');
    return;
  }

  // Ask user for duration (in minutes)
  let minsInput = prompt("⏱ Enter quiz duration in minutes:", "5");

  // If Cancel pressed or empty input
  if (minsInput === null || minsInput.trim() === "") {
    showNotification("Quiz start cancelled.", "warning");
    return;
  }

  let mins = parseInt(minsInput, 10);

  // If invalid number, reject
  if (!Number.isInteger(mins) || mins <= 0) {
    showNotification("Invalid duration entered. Quiz not started.", "error");
    return;
  }

  quizDuration = mins * 60;
  timeLeft = quizDuration;

  // ✅ Only now we enable quiz mode
  quizMode = true;
  currentQuizIndex = 0;
  quizScore = 0;
  showingAnswers = false;
  selectedAnswers = {};

  // Keep original intact, shuffle into quizQuestions
  quizQuestions = shuffleArray([...currentQuestions]);

  startQuizTimer();   // ✅ Start timer
  showQuizQuestion();

    // Change button text
  const btn = document.getElementById('quizBtn');
  if (btn) btn.textContent = 'Stop Quiz';

    // ✅ Disable buttons while quiz is active
  const answersBtn = document.getElementById('answersBtn');
  const pdfBtn = document.getElementById('pdfBtn');
  const loadBtn = document.getElementById('loadBtn'); // if you have load subject/topic button

  if (answersBtn) answersBtn.disabled = true;
  if (pdfBtn) pdfBtn.disabled = true;
  if (loadBtn) loadBtn.disabled = true;

    // ✅ Hide filters until backToSubjects
    const filters = document.getElementById('filtersContainer');
    if (filters) filters.classList.add("hidden");

  showNotification(`Quiz started! Duration: ${mins} min`, 'info');
}

function stopQuiz() {
  quizMode = false;
  clearInterval(quizTimer);

  // ✅ DO NOT reload subjects/questions here
  // Just clear out the quiz content
  const content = document.getElementById('questionContent');
  if (content) {
    content.innerHTML = `
      <div class="quiz-stopped">
        <h2>Quiz Stopped</h2>
        <p>You exited the quiz early.</p>
        <div class="button-group" style="max-width: 420px; margin: 20px auto; display: grid; gap: 10px;">
          <button class="btn btn-secondary" onclick="backToSubjects()">Back to Subjects</button>
        </div>
      </div>
    `;
  }

  // Reset quiz button
  const btn = document.getElementById('quizBtn');
  if (btn) btn.textContent = "Start Quiz Mode";

  // ✅ Keep filters hidden here, only backToSubjects restores them
  // ✅ Keep answers/pdf/load buttons disabled here too

  showNotification("Quiz stopped!", "info");
}


function showQuizQuestion() {
  if (!Array.isArray(quizQuestions) || currentQuizIndex >= quizQuestions.length) {
    endQuiz();
    return;
  }

  const content = document.getElementById('questionContent');
  if (!content) return;

  const q = quizQuestions[currentQuizIndex] || {};
  const opts = Array.isArray(q.options) ? q.options : [];

  const yearHtml = q.year ? `<span class="question-year">${q.year}</span>` : '';
  const diffTxt = q.difficulty || 'Medium';
  const diffClass = `difficulty-${String(diffTxt).toLowerCase()}`;
  const difficultyHtml = `<span class="difficulty-indicator ${diffClass}">${diffTxt}</span>`;
  const explanationHtml = q.explanation ? `<strong>Explanation:</strong> ${q.explanation}` : '';

    const optionsHtml = opts.map(option => {
    const safeOpt = String(option).replace(/'/g, "\\'");
    const safeAns = String(q.answer ?? '').replace(/'/g, "\\'");
    return `
      <div class="option"
           onclick="selectOption(this, ${currentQuizIndex}, '${safeOpt}', '${safeAns}')">
        ${option}
      </div>`;
  }).join('');

  content.innerHTML = `
    <div class="quiz-header">
      <h3>Quiz Mode - Question ${currentQuizIndex + 1} of ${quizQuestions.length}</h3>
      <p>Score: ${quizScore}/${currentQuizIndex}</p>
      <p id="quizTimerDisplay">⏱ ${formatTime(timeLeft)}</p> <!-- ✅ Timer added -->
      <div id="quizProgress" class="progress-bar"></div>
    </div>

    <div class="question-container">
      <div class="question-header">
        <div class="question-number">${currentQuizIndex + 1}</div>
        <div class="question-meta">${yearHtml}${difficultyHtml}</div>
      </div>

      <div class="question">${q.question || '(No question text provided)'}</div>

      <div class="options">${optionsHtml}</div>

      <div class="explanation" style="display: none;">
        <strong>Answer:</strong> ${q.answer ?? '(Not provided)'}<br>
        ${explanationHtml}
      </div>
    </div>
  `;

  if (typeof updateProgress === 'function') {
    try { updateProgress(); } catch {}
  }
}

function selectOption(el, qIndex, selectedRaw, correctRaw) {
  if (!el || !el.parentNode) return;
  if (el.parentNode.getAttribute('data-locked') === '1') return;
  el.parentNode.setAttribute('data-locked', '1');

  const selected = String(selectedRaw || '').trim();
  const correct  = String(correctRaw  || '').trim();

  const isCorrect = selected.localeCompare(correct, undefined, { sensitivity: 'base' }) === 0;
  if (isCorrect) {
    quizScore++;
    el.classList.add('correct');
  } else {
    el.classList.add('incorrect');
  }

  const siblings = el.parentNode.querySelectorAll('.option');
  siblings.forEach(optEl => {
    if (optEl.textContent.trim().localeCompare(correct, undefined, { sensitivity: 'base' }) === 0) {
      optEl.classList.add('correct');
    }
    optEl.style.pointerEvents = 'none';
  });

  setTimeout(nextQuizQuestion, 1200);
}

function nextQuizQuestion() {
  currentQuizIndex++;
  showQuizQuestion();
}

function endQuiz(auto = false) {
  quizMode = false;
  clearInterval(quizTimer);   // ✅ stop timer

  const total = Array.isArray(quizQuestions) ? quizQuestions.length : 0;
  if (total === 0) {
    document.getElementById('questionContent').innerHTML = "<p>No questions available to quiz.</p>";
    return;
  }

  const percentage = Math.round((quizScore / total) * 100);
  const content = document.getElementById('questionContent');

  content.innerHTML = `
    <div class="quiz-complete">
      <h2>Quiz ${auto ? "Time’s Up!" : "Completed!"}</h2>
      <div class="score-display"
           style="color: ${percentage >= 70 ? '#27ae60'
                          : percentage >= 50 ? '#f39c12'
                          : '#e74c3c'}">${percentage}%</div>
      <p style="font-size: 1.2rem;">You scored ${quizScore} out of ${total} questions</p>
      <p style="margin: 20px 0;">
        ${percentage >= 90 ? 'Outstanding performance!' :
          percentage >= 70 ? 'Good job! Keep practicing!' :
          percentage >= 50 ? 'Not bad, room for improvement!' :
          'Keep studying and try again!' }
      </p>
      <div class="button-group" style="max-width: 420px; margin: 20px auto; display: grid; gap: 10px;">
        <button class="btn btn-primary" onclick="restartQuiz()">Restart Quiz</button>
        <button class="btn btn-info" onclick="reviewQuestions()">Review Questions</button>
        <button class="btn btn-secondary" onclick="backToSubjects()">Back to Subjects</button>
      </div>
    </div>
  `;

    // ✅ Only reset quiz button text
  const btn = document.getElementById('quizBtn');
  if (btn) btn.textContent = 'Start Quiz Mode';

  showNotification(`Quiz ${auto ? "ended (time’s up)" : "completed"}! You scored ${percentage}%`,
                   auto ? 'warning' : 'success');
}

function backToSubjects() {
  quizMode = false;
  
  // ✅ Reset review/answers state
  showingAnswers = false;
  selectedAnswers = {};

  // ✅ Re-enable/restore buttons
  const answersBtn = document.getElementById('answersBtn');
  const pdfBtn = document.getElementById('pdfBtn');
  const loadBtn = document.getElementById('loadBtn');

  if (answersBtn) {
    answersBtn.disabled = false;
    answersBtn.textContent = "Show Answers"; // reset text back
  }
  if (pdfBtn) pdfBtn.disabled = false;
  if (loadBtn) loadBtn.disabled = false;
  
  // ✅ Show filters back (if you hide them during quiz)
    const filters = document.getElementById('filtersContainer');
    if (filters) filters.classList.remove("hidden");

  // Reset quiz button
  const btn = document.getElementById('quizBtn');
  if (btn) btn.textContent = "Start Quiz Mode";

  // Show normal question list
  if (typeof displayQuestions === "function") {
    displayQuestions();
  }

  showNotification("Returned to subjects view.", "info");
}

// Timer logic
let warned30s = false; // global or reset when quiz starts

function startQuizTimer() {
  clearInterval(quizTimer);
  warned30s = false; // reset flag


  quizTimer = setInterval(() => {
    timeLeft--;

    const timerDisplay = document.getElementById('quizTimerDisplay');
    if (timerDisplay) {
      timerDisplay.textContent = `⏱ ${formatTime(timeLeft)}`;
    
    // ✅ Timer coloring & alerts
      if (timeLeft <= 10) {
        // Final 10s → blinking + beep
        timerDisplay.classList.add("final-blink");
        timerDisplay.style.color = "#e74c3c"; // red
        playBeep(); // beep each second
    
      } else if (timeLeft <= 30) {
        // 30s → 11s → orange + single warning popup + one beep
        timerDisplay.classList.remove("final-blink");
        timerDisplay.style.color = "#e79614"; // orange

        if (!warned30s && timeLeft === 30) {
          playBeep(600); // lower pitch for warning
          showNotification("⚠️ Only 30 seconds remaining!", "warning");
          warned30s = true;
        }
    
    } else if (timeLeft <= 60) {
        // 60s → 31s → green (stable)
        timerDisplay.classList.remove("final-blink");
        timerDisplay.style.color = "#27ae60"; // green
    } else {
        // Above 1 min → default black
        timerDisplay.classList.remove("final-blink");
        timerDisplay.style.color = "#2c3e50"; // default dark blue
    }
}

    if (timeLeft <= 0) {
      clearInterval(quizTimer);
      endQuiz(true); // auto-submit
      }
    }, 1000);
 }

// Simple beep sound using Web Audio API
function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
    osc.stop(ctx.currentTime + 0.2);
  } catch (err) {
    console.warn("Audio not supported:", err);
  }
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' + s : s}`;
}

function restartQuiz() {
  if (Array.isArray(quizQuestions) && quizQuestions.length > 0) startQuiz();
}

function reviewQuestions() {
  // Exit quiz mode and show the list with answers visible
  quizMode = false;
  showingAnswers = true;

  if (typeof displayQuestions === 'function') {
    displayQuestions();
  }

  const btn = document.getElementById('answersBtn');
  if (btn) btn.textContent = 'Hide Answers';

  const quizBtn = document.getElementById('quizBtn');
  if (quizBtn) quizBtn.textContent = 'Start Quiz Mode';

  // ✅ Add restart/back buttons at the bottom of the review screen
  const content = document.getElementById('questionContent');
  if (content) {
    const extraControls = document.createElement("div");
    extraControls.className = "review-controls";
    extraControls.style = "margin-top:20px; display:flex; gap:10px; justify-content:center;";
    extraControls.innerHTML = `
      <button class="btn btn-primary" onclick="restartQuiz()">Restart Quiz</button>
      <button class="btn btn-secondary" onclick="backToSubjects()">Back to Subjects</button>
    `;
    content.appendChild(extraControls);

    // ✅ Reveal explanations automatically
    content.querySelectorAll(".explanation").forEach(exp => {
      exp.style.display = "block";
    });
  }
}

        function generatePDF() {
            if (!currentQuestions.length) {
                showNotification('Please load questions first!', 'warning');
                return;
            }
            
            const printSection = document.getElementById('printSection');
            const subject = document.getElementById('subjectSelect').value;
            const topic = document.getElementById('topicSelect').value;
            
            let content = `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
                        <h1 style="color: #2c3e50; margin-bottom: 10px;">SSC CGL General Studies Question Bank</h1>
                        <h2 style="color: #7f8c8d; margin-bottom: 5px;">Subject: ${subject}</h2>
                        <h3 style="color: #7f8c8d; margin-bottom: 5px;">Topic: ${topic}</h3>
                        <p style="color: #7f8c8d;">Previous Years Questions (2016-2024) | Total Questions: ${currentQuestions.length}</p>
                        <p style="color: #7f8c8d;">Generated on: ${new Date().toLocaleDateString()}</p>
                    </div>
            `;
            
            currentQuestions.forEach((q, index) => {
                content += `
                    <div style="margin-bottom: 25px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; page-break-inside: avoid;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <div style="background: #3498db; color: white; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold;">${index + 1}</div>
                            <div style="display: flex; gap: 10px;">
                                <span style="background: #f39c12; color: white; padding: 5px 12px; border-radius: 15px; font-size: 12px; font-weight: 600;">${q.year}</span>
                                <span style="background: ${q.difficulty === 'easy' ? '#d4edda' : q.difficulty === 'medium' ? '#fff3cd' : '#f8d7da'}; color: ${q.difficulty === 'easy' ? '#155724' : q.difficulty === 'medium' ? '#856404' : '#721c24'}; padding: 5px 12px; border-radius: 15px; font-size: 12px; font-weight: 600; text-transform: uppercase;">${q.difficulty}</span>
                            </div>
                        </div>
                        <div style="font-size: 16px; font-weight: 600; margin-bottom: 15px; line-height: 1.5;">${q.question}</div>
                        <div style="margin-bottom: 15px;">
                            ${q.options.map(option => `
                                <div style="padding: 10px; margin: 8px 0; border: 1px solid #ddd; border-radius: 6px; ${option === q.answer ? 'background: #d4edda; border-color: #27ae60; font-weight: 600;' : ''}">${option}</div>
                            `).join('')}
                        </div>
                        <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 6px; font-style: italic;">
                            <strong>Answer:</strong> ${q.answer}<br>
                            <strong>Explanation:</strong> ${q.explanation}
                        </div>
                    </div>
                `;
            });
            
            content += '</div>';
            printSection.innerHTML = content;
            
            // Trigger print
            setTimeout(() => {
                window.print();
            }, 100);
            
            showNotification('PDF generation initiated! Please use your browser\'s print dialog.', 'info');
        }

        function updateProgress() {
            const progressFill = document.getElementById('progressFill');
            const progressText = document.getElementById('progressText');
            
            if (quizMode && currentQuestions.length > 0) {
                const percentage = Math.round((currentQuizIndex / currentQuestions.length) * 100);
                progressFill.style.width = percentage + '%';
                progressText.textContent = percentage + '%';
            } else if (currentQuestions.length > 0) {
                progressFill.style.width = '100%';
                progressText.textContent = '100%';
            } else {
                progressFill.style.width = '0%';
                progressText.textContent = '0%';
            }
        }

        function shuffleArray(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }

        function showNotification(message, type = 'info') {
            // Remove existing notifications
            const existing = document.querySelectorAll('.notification');
            existing.forEach(n => n.remove());
            
            const notification = document.createElement('div');
            notification.className = 'notification';
            
            const colors = {
                success: '#27ae60',
                warning: '#f39c12',
                error: '#e74c3c',
                info: '#3498db'
            };
            
            notification.style.backgroundColor = colors[type] || colors.info;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            // Auto remove after 4 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.remove();
                        }
                    }, 300);
                }
            }, 2000);
        }

        function handleScroll() {
            const scrollButton = document.getElementById('scrollToTop');
            if (window.pageYOffset > 300) {
                if (!scrollButton) {
                    const button = document.createElement('button');
                    button.id = 'scrollToTop';
                    button.innerHTML = '↑';
                    button.style.cssText = `
                        position: fixed;
                        bottom: 30px;
                        right: 30px;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                        color: white;
                        border: none;
                        font-size: 20px;
                        cursor: pointer;
                        z-index: 1000;
                        transition: all 0.3s ease;
                        box-shadow: var(--card-shadow);
                    `;
                    button.onclick = scrollToTop;
                    button.onmouseover = function() {
                        this.style.transform = 'translateY(-3px)';
                        this.style.boxShadow = 'var(--hover-shadow)';
                    };
                    button.onmouseout = function() {
                        this.style.transform = 'translateY(0)';
                        this.style.boxShadow = 'var(--card-shadow)';
                    };
                    document.body.appendChild(button);
                }
            } else {
                if (scrollButton) {
                    scrollButton.remove();
                }
            }
        }

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        function showStats() {
            const subject = document.getElementById('subjectSelect').value;
            let statsMessage = `Total Questions: ${Object.keys(questionBank).reduce((total, subj) => {
                if (Array.isArray(questionBank[subj])) {
                    return total + questionBank[subj].length;
                } else {
                    return total + Object.keys(questionBank[subj]).reduce((subtotal, topic) => {
                        return subtotal + (Array.isArray(questionBank[subj][topic]) ? questionBank[subj][topic].length : 0);
                    }, 0);
                }
            }, 0)}`;
            
            if (subject) {
                let subjectCount = 0;
                if (Array.isArray(questionBank[subject])) {
                    subjectCount = questionBank[subject].length;
                } else {
                    Object.keys(questionBank[subject]).forEach(topic => {
                        if (Array.isArray(questionBank[subject][topic])) {
                            subjectCount += questionBank[subject][topic].length;
                        }
                    });
                }
                statsMessage += `\n${subject}: ${subjectCount} questions`;
            }
            
            showNotification(statsMessage, 'info');
        }

        // Initialize tooltips and help
        function showHelp() {
            const helpMessage = `
Keyboard Shortcuts:
• Ctrl+L: Load Questions
• Ctrl+A: Toggle Answers
• Ctrl+Q: Start/Stop Quiz
• Ctrl+P: Generate PDF

Features:
• Filter by year and difficulty
• Interactive quiz mode
• PDF export functionality
• Progress tracking
            `;
            showNotification(helpMessage, 'info');
        }

        // Add help button functionality
        document.addEventListener('DOMContentLoaded', function() {
            const helpBtn = document.createElement('button');
            helpBtn.innerHTML = '?';
            helpBtn.style.cssText = `
                position: fixed;
                bottom: 90px;
                right: 30px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: var(--warning-color);
                color: white;
                border: none;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: var(--card-shadow);
            `;
            helpBtn.onclick = showHelp;
            helpBtn.title = 'Show Help';
            document.body.appendChild(helpBtn);
        });
    


// ===== Clean Method Bootstrap (no questionCount UI) =====
document.addEventListener('DOMContentLoaded', async function() {
  try {
    const res = await fetch('questions.json', {cache:'no-store'});
    const data = await res.json();
    if (!data || typeof data !== 'object') throw new Error('Invalid questions.json');
    questionBank = data;
  } catch (e) {
    console.error('Failed to load questions.json', e);
    alert('Failed to load questions. Please ensure questions.json is present.');
  }
  try {
    if (typeof initializeApp === 'function') initializeApp();
    else {
      // Fallback: at least wire core buttons if present
      const map = [['loadBtn','loadQuestions'],['answersBtn','toggleAnswers'],['pdfBtn','generatePDF'],['quizBtn','toggleQuiz']];
      map.forEach(([id, fn])=>{
        const el = document.getElementById(id);
        if (el && typeof window[fn] === 'function') el.addEventListener('click', ()=>window[fn]());
      });
    }
  } catch(e){ console.error(e); }
});



// ===== Bulk Import (CSV/JSON) =====
(function(){
  function parseCSV(text){
    const lines = text.split(/\r?\n/).filter(l=>l.trim().length);
    if (!lines.length) return [];
    const header = lines[0].split(",").map(h=>h.trim().toLowerCase());
    const out = [];
    for (let i=1;i<lines.length;i++){
      const raw = lines[i];
      // naive CSV split (no commas inside quotes for simplicity)
      const cols = raw.split(",").map(c=>c.trim());
      if (!cols.length) continue;
      const row = {};
      header.forEach((h,idx)=> row[h] = cols[idx] || "");
      out.push(row);
    }
    return out;
  }

function normalizeRow(row) {
  const subject = (row.subject || row.Subject || "General").trim();
  const topic = (row.topic || row.Topic || "Misc").trim();
  const question = (row.question || row.Question || "").trim();

  let options = [];
  if (Array.isArray(row.options)) {
    options = row.options.map(o => String(o).trim()).filter(Boolean);
  } else if (typeof row.options === "string" || typeof row.Options === "string") {
    const raw = (row.options || row.Options || "").trim();
    options = raw.split(/[\|;] */).filter(Boolean);
  } else {
    const A = row.A || row.a,
          B = row.B || row.b,
          C = row.C || row.c,
          D = row.D || row.d;
    options = [A, B, C, D].filter(Boolean);
  }

  const answer = (row.answer || row.Answer || "").trim();
  const year = parseInt(row.year || row.Year || "");
  const difficulty = (row.difficulty || row.Difficulty || "").trim();

  // ✅ Validation checks
  if (!question) return { error: "Missing question text" };
  if (!options.length) return { error: "Missing options" };
  if (!answer) return { error: "Missing answer" };
  if (isNaN(year)) return { error: "Missing or invalid year" };
  if (!difficulty) return { error: "Missing difficulty" };

  return { subject, topic, question, options, answer, year, difficulty };
}



  async function importFile(file){
    const text = await file.text();
    let rows = [];
    try{
      if (file.name.toLowerCase().endsWith(".json")) {
        const data = JSON.parse(text);
        if (Array.isArray(data)) {
          rows = data;
        } else if (data && typeof data === 'object') {
          if (Array.isArray(data.items)) {
            rows = data.items;
          } else {
            // Nested subject → topic → questions[]
            rows = [];
            Object.entries(data).forEach(([subject, topics]) => {
              if (topics && typeof topics === 'object') {
                Object.entries(topics).forEach(([topic, questions]) => {
                  if (Array.isArray(questions)) {
                    questions.forEach(q => rows.push({ subject, topic, ...q }));
                  }
                });
              }
            });
          }
        } else {
          throw new Error("Unsupported JSON shape");
        }
      } else {
        rows = parseCSV(text);
      }
    }catch(e){
      alert("Could not parse file: " + e.message);
      return;
    }

    let added = 0;
    rows.forEach(r=>{
      const n = normalizeRow(r);
      if (!n) return;
      if (!questionBank[n.subject]) questionBank[n.subject] = {};
      if (!questionBank[n.subject][n.topic]) questionBank[n.subject][n.topic] = [];
      // Deduplicate by exact question text within subject/topic
      const arr = questionBank[n.subject][n.topic];
      if (!arr.some(q=> (q.question||"").trim() === n.question)){
        arr.push({
          question: n.question,
          options: n.options,
          answer: n.answer,
          year: n.year,
          difficulty: n.difficulty
        });
        added++;
      }
    });

        // ✅ Always update stats after import
    try {
      if (typeof updateStats === "function") {
        updateStats();
      }
    } catch (e) {
      console.warn("Stats update failed:", e);
    }

    // ✅ Feedback for user
    if (added > 0) {
      alert(`✅ File uploaded successfully! ${added} new question(s) added.`);
    } else {
      alert("⚠️ File processed, but no new questions were added.\n(Maybe duplicates or invalid format)");
    }

    // ✅ Refresh UI so questions appear immediately
    if (typeof populateSubjects === "function") try { populateSubjects(); } catch {}
    if (typeof handleFilterChange === "function") try { handleFilterChange(); } catch {}
    if (typeof renderQuestions === "function") try { renderQuestions(); } catch {}
    // Fallback stats updater

    if (typeof populateSubjects === 'function') try{ populateSubjects(); }catch{}
    if (typeof handleFilterChange === 'function') try{ handleFilterChange(); }catch{}
    if (typeof renderQuestions === 'function') try{ renderQuestions(); }catch{}
    try{ if (typeof updateStats==='function') updateStats(); else (function(){
  // fallback stats updater (best-effort)
  const total = Object.values(questionBank).reduce((sum,topics)=> sum + Object.values(topics||{}).reduce((s,a)=> s + (Array.isArray(a)?a.length:0),0), 0);
  const subjCount = Object.keys(questionBank||{}).length;
  const years = new Set();
  Object.values(questionBank||{}).forEach(topics=>{
    Object.values(topics||{}).forEach(arr=> (arr||[]).forEach(q=>{ if(q && q.year) years.add(q.year); }));
  });
  const y = years.size;
  const qEl = document.querySelector('[data-stat="total-questions"], #totalQuestions');
  const sEl = document.querySelector('[data-stat="subject-categories"], #subjectCategories');
  const yEl = document.querySelector('[data-stat="years-coverage"], #yearsCoverage');
  if (qEl) qEl.textContent = total;
  if (sEl) sEl.textContent = subjCount;
  if (yEl) yEl.textContent = y;
})(); }catch(e){console.warn(e);}
showNotification && showNotification(`Imported ${added} new question(s).`);
  }

  document.addEventListener('DOMContentLoaded', function(){
    const fileInput = document.getElementById('importFile');
    const btn = document.getElementById('importBtn');
    if (fileInput && btn){
      btn.addEventListener('click', ()=>{
        if (!fileInput.files || !fileInput.files[0]){
          alert('Please choose a CSV or JSON file first.');
          return;
        }
        importFile(fileInput.files[0]);
      });
    }
  });
})();
