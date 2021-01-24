const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScores.map(eachScore => {
    const createHtml = document.createElement("li");
    createHtml.innerText = `${eachScore.name.toUpperCase()} : ${eachScore.score}`;
    return highScoresList.append(createHtml);
});

// highScoresList.innerHtml = highScores.map(score => {
//     return `<li class="high-scores">${score.name} : ${score.score}</li>`
// }).join("");


