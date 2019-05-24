var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css',express.static(__dirname + '/css'));
app.use('/scripts',express.static(__dirname + '/scripts'));
app.use('/Sprite',express.static(__dirname + '/Sprite'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/Blank.html');
});

var players = {};
var playersConnected = 0;

io.on('connection', function (socket) {
  console.log('a user connected');
  // create a new player and add it to our players object
  players[socket.id] =
  {
    rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerNumber: playersConnected,
    playerId: socket.id
  };
  playersConnected++;
  // send the players object to the new player
  socket.emit('currentPlayers', players);
  // update all other players of the new player
  socket.broadcast.emit('newPlayer', players[socket.id]);
  // when a player disconnects, remove them from our players object
  socket.on('disconnect', function ()
  {
    console.log('user disconnected');
    // remove this player from our players object
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('disconnect', socket.id);
    playersConnected--;
  });
  // when a player moves, update the player data
  socket.on('playerMovement', function (movementData)
  {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });
});

server.listen(8081,function(){
  console.log(`Listening on ${server.address().port}`);
});
