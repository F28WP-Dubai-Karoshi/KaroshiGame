
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
        leaderboard.appendChild(person);

    }
}
//check for game over
function gameOver(){
    if(playerScore < 0){
        alert('game over! your virus died! refresh page to start over');
    }
  }
setInterval(gameOver, 100);