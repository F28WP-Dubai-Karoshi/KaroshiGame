//create server
const express =  require("express");
const app = express();
const path = require("path");
const http = require("http");
const serv = http.Server(app); 
const morgan = require("morgan");
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;
serv.listen(PORT, function(){
    console.log("listening at 3000");
});

app.use(express.static('public'));
app.get("/",function(req,res){
    res.sendFile('index.html', {root: __dirname});
});

app.use(express.json());
app.use(express.urlencoded());

const chatRouter = require('./routes/post');
app.use(chatRouter);

const createDB = require('./daos/db');
createDB();


var Player = function(name,id){
    self = {
    name: name,
    score : 0,
    id: id
    }
    return self;
}

//list of sockets
SOCKET_LIST = {};
//list of scores&players
SCORES_LIST = {};
//loading socket.io and binding to server
const io = require('socket.io')(serv);

io.sockets.on('connection', function(socket) {
    console.log(socket.id + 'has joined the game.');
    //create a player
    var player = new Player(name = 'anonymous', socket.id);
    //add name to the player
    socket.on('username-submit', function(username) {
        player.name = username;
        console.log("hello" + username); // for debugging
        io.emit('participant', '<i>' + player.name + ' joined the game...</i>');
    })


    SCORES_LIST[socket.id] = player;
    SOCKET_LIST[socket.id] = socket;

    //listen for new score updates from user, then change player.score accordingly
    socket.on('sendNewScore', function(score) {
        player.score = score;
    });
   
    //chat feature
    socket.on('submitted_message', function(message) {
        io.emit('submitted_message', '<strong>' + player.name + ' : </strong>' + message);
        console.log(message);
    });

    socket.on('disconnect', function() {
        console.log(socket.id + 'has left the game.')
        delete SCORES_LIST[socket.id];
        delete SOCKET_LIST[socket.id];
        io.emit('participant', '<i>' + player.name + ' left the game...</i>');
    });



});

//emit score every 40 milliseconds
setInterval(function(){
    // info about name and scores of everyone to be sent to every player
    var pack = [];
    for(var i in SCORES_LIST){
        var score_player = SCORES_LIST[i];
        pack.push({
            name: score_player.name,
            score: score_player.score
        })
    }
        
    sortedPack = updateLeaderBoard(pack);
    
    for(var j in SOCKET_LIST){
        var socket = SOCKET_LIST[j];
        socket.emit('updateScores', sortedPack);
    }
},50);

function updateLeaderBoard(list) {
    let newList = [];
    list.sort(function(a, b){ return b.score - a.score });
    for(let i = 0; i<list.length; i++){
        newList[i] = (i+1) + " - " + list[i].name + " : " + list[i].score;
    }
    return newList;
}

