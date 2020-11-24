
//sorted list of strings (containing name and score) of players to be appended to leaderboard
scores = [];

setInterval(function(){
    socket.emit('sendNewScore', playerScore);
}, 50);

socket.on('updateScores', (data) => {
    scores = data;
    displayScores();
});

let leaderboard = document.getElementById("board");
function displayScores(){
    leaderboard.innerHTML = "";
    for(let i = 0; i < scores.length; i++){
        let person = document.createElement("div");
        person.innerText = scores[i];
        person.style.textAlign="center";
        leaderboard.appendChild(person);
    }
}
//check for game over
function gameOver(){
    if(playerScore <= 0){
        document.getElementById("high-score").innerHTML=highest;
        document.getElementById("end-screen").style.visibility="visible";
    }
  }
setInterval(gameOver, 100);