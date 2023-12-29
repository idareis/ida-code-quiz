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

//Elements for the functions used
const startButton = document.getElementById('start');
const questionTitle = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const endScreen = document.getElementById('end-screen');
const timeDisplay = document.getElementById('time');
const submitButton = document.getElementById('submit');
const initialsInput = document.getElementById('initials');
const feedbackElement = document.getElementById('feedback');

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
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
    timeDisplay.textContext = timeLeft;
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
