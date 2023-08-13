const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");

const questions = [
    {
        question: "Which gas is responsible for the greenhouse effect on Earth?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
        correctAnswer: "Carbon Dioxide"
    },
    {
        question: "Who is known as the 'Father of the Indian Constitution'?",
        options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Dr. B.R. Ambedkar", "Sardar Patel"],
        correctAnswer: "Dr. B.R. Ambedkar"
    },
    {
        question: "Which river is known as the 'Sorrow of Bengal'?",
        options: ["Yamuna", "Ganges", "Brahmaputra", "Godavari"],
        correctAnswer: "Brahmaputra"
    },
    {
        question: "The concept of 'Directive Principles of State Policy' is borrowed from which country?",
        options: ["United Kingdom", "United States", "Ireland", "France"],
        correctAnswer: "Ireland"
    },
    {
        question: "What is the minimum voting age for elections to the Lok Sabha in India?",
        options: ["18 years", "21 years", "25 years", "30 years"],
        correctAnswer: "18 years"
    },
    {
        question: "Which Mughal Emperor is known for his policy of 'Sulh-i-Kul'?",
        options: ["Akbar", "Aurangzeb", "Shah Jahan", "Jahangir"],
        correctAnswer: "Akbar"
    },
    {
        question: "Who was the first woman Prime Minister of India?",
        options: ["Indira Gandhi", "Sonia Gandhi", "Pratibha Patil", "Mother Teresa"],
        correctAnswer: "Indira Gandhi"
    },
    {
        question: "The Quit India Movement was launched in which year?",
        options: ["1919", "1930", "1942", "1947"],
        correctAnswer: "1942"
    },
    {
        question: "Which Indian state is known as the 'Land of Five Rivers'?",
        options: ["Punjab", "Uttar Pradesh", "Haryana", "Rajasthan"],
        correctAnswer: "Punjab"
    },
    {
        question: "Which wildlife sanctuary is famous for the Indian one-horned rhinoceros?",
        options: ["Jim Corbett National Park", "Sundarbans National Park", "Kaziranga National Park", "Periyar National Park"],
        correctAnswer: "Kaziranga National Park"
    },
    
];

let currentQuestionIndex = 0;
let score = 0;


function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    
    questionContainer.style.color = "#000000"; 
    questionContainer.style.fontWeight = "bold";

    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option) => {
        const optionElement = document.createElement("button");
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => checkAnswer(option, currentQuestion.correctAnswer));
        optionsContainer.appendChild(optionElement);
    });
}




function checkAnswer(selectedOption, correctAnswer) {
    const optionElements = optionsContainer.querySelectorAll("button");
    
    if (selectedOption === correctAnswer) {
        score++;
        optionElements.forEach((optionElement) => {
            if (optionElement.textContent === selectedOption) {
                optionElement.style.backgroundColor = "#4CAF50"; 
            }
            optionElement.disabled = true; 
        });
    } else {
        optionElements.forEach((optionElement) => {
            if (optionElement.textContent === selectedOption) {
                optionElement.style.backgroundColor = "#FF5733"; 
            } else if (optionElement.textContent === correctAnswer) {
                optionElement.style.backgroundColor = "#4CAF50"; 
            }
            optionElement.disabled = true; 
        });
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            showQuestion();
        }, 1000); 
    } else {
        setTimeout(() => {
            showResult();
        }, 1000); 
    }
}

function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";

    resultContainer.innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2>`;
    
    if (score >= questions.length * 0.7) {
        resultContainer.innerHTML += `<p>Congratulations! You're a winner!</p><img src="winning.gif" alt="Winner GIF">`;
    } else {
        resultContainer.innerHTML += `<p>Good effort! You can try again.</p><img src="losing.gif" alt="Losing GIF">`;
    }
    
    resultContainer.innerHTML += `<h3>Question-wise Analysis:</h3>`;
    
    questions.forEach((question, index) => {
        const questionAnalysis = document.createElement("div");
        questionAnalysis.className = "question-analysis";
        questionAnalysis.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
            <p>Your Answer: ${userAnswers[index]}</p>
            <p>Correct Answer: ${question.correctAnswer}</p>
            <p>Score for this question: ${userAnswers[index] === question.correctAnswer ? "1" : "0"}</p>
        `;
        if (userAnswers[index] === question.correctAnswer) {
            questionAnalysis.classList.add("correct");
        } else {
            questionAnalysis.classList.add("wrong");
        }
        resultContainer.appendChild(questionAnalysis);
    });
    
    resultContainer.innerHTML += `<p>Thank you for playing!</p>`;
}


showQuestion();
