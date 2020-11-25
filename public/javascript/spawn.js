function debuffs() {
    mask = document.querySelectorAll("mask")
    sanitizer = document.querySelectorAll("sanitizer")
}

//where we create both the debuffs
function spawnmasks(){
    var board = document.querySelector(".game-board");
    let mask = document.createElement("img");
    mask.className = "masks";
    mask.style.height="50px";
    mask.style.width="70px";
    mask.style.zIndex=-10;
    mask.setAttribute("src", "images/mask.png");
    mask.style.position = "absolute";
    board.appendChild(mask);
    var randomx = randoms()[0];
    var randomy = randoms()[1];
    mask.style.left = randomx + "px";
    mask.style.top = randomy + "px";
    console.log(randomx, randomy);
    return mask;
    
}
function spawnsan(){
    var board = document.querySelector(".game-board");
    let san = document.createElement("img");
    san.className = "sanitizers";
    san.style.height="50px";
    san.style.width="30px";
    san.style.zIndex=-10;
    san.setAttribute("src", "images/sanitizer.png");
    san.style.position = "absolute";
    board.appendChild(san);
    var randomx = randoms()[0];
    var randomy = randoms()[1];
    san.style.left = randomx + "px";
    san.style.top = randomy + "px";
    console.log(randomx, randomy);
    return san;
}

//generates random coordinates on the screen
function randoms()
{
    var randomx = parseInt(Math.random()* 1000);
    var randomy = parseInt(Math.random()* 650);
    return [randomx, randomy];
}
