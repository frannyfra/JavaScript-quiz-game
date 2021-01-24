const userNameInputField = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//	The event occurs when the user releases a key;
finalScore.innerText = mostRecentScore;
userNameInputField.addEventListener("keyup", event => {
    saveScoreBtn.disabled = !userNameInputField.value;
});

saveHighScore = event => {
    event.preventDefault();

    const score = {
        score: mostRecentScore,
        // score: Math.floor(Math.random() * 100),
        name: userNameInputField.value
    };

    highScores.push(score);
    //removed element by splice method and our original array of highScores has been modified, now it will only host the 5 higher scores;
    highScores.sort((a, b) => (b.score - a.score)).splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/QuizzApp/");
}