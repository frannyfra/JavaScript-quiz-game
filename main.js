const questionBoxDisplay = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progress-text");
const scoreCounterText = document.getElementById("score-counter");
const progressbarFull = document.getElementById("progressbar-full");

let currentQuestion = {};
// let currentQuestion;
//allow to create a delay 
let acceptingAnswers = false;
//store the score
// let score = parseInt(scoreCounterText.getAttribute("data-score"));
let score = 0;
//store the number of questions that have been fired;
let questionsCounter = 0;
//copy of the questions in order to give to the user always a new question, once the question has been asked it will be removed from this array so will not show up the same question;
let availableQuestions = [];

//array of obj:
let questions = [];
// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

const url = "https://opentdb.com/api.php?amount=3&category=9&difficulty=easy&type=multiple";


fetch(url)
    .then(response => {
        return response.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions.results.map(loadedSingleQuestion => {
            const formattedQuestion = {
                question: loadedSingleQuestion.question,
                // answer: loadedSingleQuestion.answer
            };
            answerChoices = [...loadedSingleQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedQuestion.answer - 1, 0, loadedSingleQuestion.correct_answer);

            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            })
            return formattedQuestion;
        })
        startGame();
    })
    .catch(err => {
        console.log(err);
    })


startGame = () => {
    questionCounter = 0;
    score = 0;
    //use the spread operator to make  a copy of questions( array of obj);
    availableQuestions = [...questions];
    getNewQuestion();
}

const getNewQuestion = () => {
    //for each question the questionCounter is gonna go up of one;
    // The assign() method loads a new document.
    if (availableQuestions.length === 0 || questionsCounter >= MAX_QUESTIONS) {
        // The localStorage and sessionStorage properties allow to save key/value pairs in a web browser.
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("./end.html");
    }
    questionCounter++;
    progressText.innerText = `Questions: ${questionCounter}/${MAX_QUESTIONS}`;

    //update the progress bar 
    progressbarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    scoreCounterText.innerHTML = score;

    //get a random number in order to get a random question, set up using the availableQuestion;-> because once a question has been used will be removed from that array( to not repeat again the same question) and the length of the available question is gonna change, is not fixed therefore we have to establish a length that can be dynamic ptherwise we get a undefined;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    //set up the current question = available questions = array of obj, end I want to access and get the available question at the number( which will be the index) that come out from the random function;
    //currentQuestion = availableQuestions[questionIndex]; === console.log(availableQuestions[2]);
    // console.log(availableQuestions[2]);
    // console.log(availableQuestions[1]);
    // console.log(availableQuestions[3], "should be undefined")
    currentQuestion = availableQuestions[questionIndex];
    //render my question to the page -> take the div (questionBoxDisplay) with dom manipulation set it up as current question( question that has been picked up) and because the question itself is an object, i want to return/ access the question; 
    questionBoxDisplay.innerText = currentQuestion.question;

    choices.forEach(choice => {
        // choice.dataset["number"] && const number = choice.getAttribute("data-number") they both return the value of the data that has beene set in the html;
        const number = choice.dataset["number"];
        // const number = choice.getAttribute("data-number");
        choice.innerText = currentQuestion["choice" + number];
    });
    //remove the question that has been showed already. Use splice as will change the original array 
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", event => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        // const selectedChoice = event.target;
        // console.log(selectedChoice, "selected choice")
        //string
        const selectedChoice = event.target.getAttribute("data-number");
        //compare if the selectedChoice - choice made by the user is equal to the right answer. the right answer is accessed from our currentQuestion (obj) and getting the property of answer; currentQuestion.answer
        //when we compare the two variables we need to use == and not equal strict as we are comparing a string and a number togheter;
        //currentQuestion.answer is a number 
        // console.log(selectedChoice == currentQuestion.answer)

        const classToApply = selectedChoice == currentQuestion.answer ? "correct" : "incorrect";
        // The parentElement property returns the parent element of the specified element.

        if (classToApply === "correct") {
            incrementScoreCounter(CORRECT_BONUS);
        }

        event.target.parentElement.classList.add(classToApply);
        setTimeout(() => {
            event.target.parentElement.classList.remove(classToApply);;
            getNewQuestion();
        }, 1000);
    });
})

const incrementScoreCounter = (num) => {
    score += num;
    scoreCounterText.innerText = score;
    console.log(typeof score)
}
