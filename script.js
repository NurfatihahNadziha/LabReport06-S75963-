
let questions = [
    {
        question: "What color is the sky?",
        options: ["Blue", "Green", "Pink"],
        answer: 0
    },
    {
        question: "How many legs does a cat have?",
        options: ["2", "4", "8"],
        answer: 1
    },
    {
        question: "Which one is a fruit?",
        options: ["Apple", "Car", "Shoe"],
        answer: 0
    },
    {
        question: "What do humans breathe?",
        options: ["Oxygen", "Water", "Sand"],
        answer: 0
    },
    {
        question: "How many days are in a week?",
        options: ["5", "7", "10"],
        answer: 1
    }
];

let currentIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }
}

function startTimer() {
    timeLeft = 10;
    document.getElementById("time").innerHTML = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("time").innerHTML = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion(); 
        }
    }, 1000);
}

function displayQuestion() {
    let q = questions[currentIndex];

    document.getElementById("question").innerHTML = q.question;

    let optionBox = document.getElementById("options");
    optionBox.innerHTML = "";

    for (let i = 0; i < q.options.length; i++) {
        let btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerHTML = q.options[i];

        btn.onclick = function () {
            checkAnswer(i); 
        };

        optionBox.appendChild(btn);
    }

    document.getElementById("feedback").innerHTML = "";
}

function checkAnswer(selectedOption) {
    let correct = questions[currentIndex].answer;

    if (selectedOption === correct) {
        score++;
        document.getElementById("feedback").innerHTML = "Correct!";
    } else {
        document.getElementById("feedback").innerHTML = "Incorrect!";
    }

    document.getElementById("score").innerHTML = score;

    clearInterval(timer);
}

function nextQuestion() {
    currentIndex++;

    if (currentIndex >= questions.length) {
        document.getElementById("question").innerHTML = "Quiz Completed!";
        document.getElementById("options").innerHTML = "";
        document.getElementById("feedback").innerHTML = "";
        document.getElementById("timer").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
        return;
    }

    displayQuestion();
    startTimer();
}

function startQuiz() {
    shuffleQuestions(); 
    displayQuestion(); 
    startTimer(); 
}

document.getElementById("nextBtn").onclick = nextQuestion;

startQuiz();
