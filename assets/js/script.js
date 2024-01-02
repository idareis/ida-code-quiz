// Questions for the quiz
const questions = [
  {
      question: "What is Loid Forger's codename?",
      choices: ["Sunrise", "Moonlight", "Twilight", "Dusk"],
      correctAnswer: "Twilight"
  },
  {
      question: "What is Anya's secret?",
      choices: ["Telepathy", "Precognition", "Psychometry", "Clairvoyance"],
      correctAnswer: "Telepathy"
  },
  {
      question: "What is Yor Forger's assassin company name?",
      choices: ["Xterminate", "Knives' Out", "Garden", "Raincode"],
      correctAnswer: "Garden"
  },
  {
      question: "Where is Spy x Family based?",
      choices: ["Dinsford", "Ostania", "Metropolis", "Zion"],
      correctAnswer: "Ostania"
  },
  {
      question: "What does Anya need to get to become an Imperial Scholar?",
      choices: ["Tonitrus Bolts", "Best Badges", "Stella Stars", "All-Round Emblems"],
      correctAnswer: "Stella Stars"
  }
]

//Set elements
const startButton = document.getElementById('start');
const questionTitle = document.getElementById('question-title');
const choicesElement = document.getElementById('choices');
const endScreen = document.getElementById('end-screen');
const timeDisplay = document.getElementById('time');
const submitButton = document.getElementById('submit');
const initialsInput = document.getElementById('initials');
const feedbackElement = document.getElementById('feedback');

let currentQuestion = 0;
let score = 0;
let timeLeft = 60; // Setting the initial time here
let timer;

function startQuiz() {
  startButton.addEventListener('click', startTimer);
  displayQuestion();
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
  updateTimer();
  document.getElementById('start-screen').classList.add('hide');
  document.getElementById('questions').classList.remove('hide');
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
  } else {
    clearInterval(timer);
    endQuiz();
  }
}

function displayQuestion() {
  const currentQ = questions[currentQuestion];
  questionTitle.textContent = currentQ.question;
  choicesElement.innerHTML = '';

  currentQ.choices.forEach((choice) => {
    const choiceButton = document.createElement('button');
    choiceButton.textContent = choice;
    choiceButton.addEventListener('click', checkAnswer);
    choicesElement.appendChild(choiceButton);
  });
}

function checkAnswer(e) {
  const selectedAnswer = e.target.textContent;
  const correctAnswer = questions[currentQuestion].correctAnswer;

  if (selectedAnswer === correctAnswer) {
    score++;
  } else {
    timeLeft -= 10; // Subtracting time for incorrect answers
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }


  const choices = document.querySelectorAll('.choices button');
  choices.forEach(choice => {
    choice.disabled = true;
  });

  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  document.getElementById('questions').classList.add('hide');
  endScreen.classList.remove('hide');
  document.getElementById('final-score').textContent = score;
}

submitButton.addEventListener('click', () => {
  const initials = initialsInput.value.trim();
  const scoreData = {
    initials: initials,
    score: score
  };
  
  let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScores.push(scoreData);
  highScores.sort((a, b) => b.score - a.score);
  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.href = 'highscores.html';
});

startQuiz();