function createpellet(){
    var board = document.querySelector(".game-board");
    let pellet = document.createElement("img");
    pellet.className = "pellets";
    pellet.style.height="20px";
    pellet.style.width="20px";
    pellet.style.zIndex=-10;
    pellet.setAttribute("src", "images/red.png");
    pellet.style.position = "absolute";
    board.appendChild(pellet);
    randomx = parseInt(Math.random()* 1000);
    randomy = parseInt(Math.random()* 650);
    pellet.style.left = randomx + "px";
    pellet.style.top  = randomy + "px";
    console.log(randomx, randomy);
    return pellet;
  
  }
