//create server
const express =  require("express");
const app = express();
//var session = require('express-session');
const path = require("path");
const https = require("https");
const fs = require("fs");
//const serv = sslServer.Server(app);

app.use(express.static('public'));
app.get("/",(req,res,next)=>{
    res.sendFile('index.html', {root: __dirname});
});

const sslServer =https.createServer({
    key: fs.readFileSync(path.join(__dirname,"cert","key.pem")),
    cert: fs.readFileSync(path.join(__dirname,"cert","cert.pem"))
},app)

const morgan = require("morgan");
app.use(morgan('dev'));



//const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const server = sslServer.listen(PORT, function(){
    console.log("listening at 3000");
});


// app.use(express.static('public'));
//send the index.html file
// app.get('/', function(req, res){
//     res.sendFile('index.html', {root: __dirname});
// });

app.use(express.json());
app.use(express.urlencoded());

const chatRouter = require('./routes/post');
app.use(chatRouter);

const createDB = require('./daos/db');
createDB();

//server.listen(PORT, () =>
//    console.log("Running the server, port = " + PORT)
//);
//player constructor
var Player = function(name,id){
    self = {
    name: name,
    score : 0,
    id: id
    }
    // self.updateScore = function (score) {
    //     self.score = score;
    // }
    // self.changeName = function(name) {
    //     self.name = name;
    // }
    return self;
}

//list of sockets
SOCKET_LIST = {};
//list of scores&players
SCORES_LIST = {};
//loading socket.io and binding to server
const io = require('socket.io')(server);

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

