var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css',express.static(__dirname + '/css'));
app.use('/audio',express.static(__dirname + '/audio'));
app.use('/scripts',express.static(__dirname + '/scripts'));
app.use('/Sprite',express.static(__dirname + '/Sprite'));

app.get('/',function(req,res){
    res.sendFile(__dirname +'/Blank.html');
});

var pinkData = {x: 0, y:0};
var blueData = {x: 0, y:0};
var greyData = {x: 0, y:0};
var greenData = {x: 0, y:0};
var yellowData = {x: 0, y:0};

io.on('connection', function (socket)
 {
  // when a player moves, update the player data
  socket.on('pinkMovement', function (movementData)
  {
    pinkData.x = movementData.x;
    pinkData.y = movementData.y;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('pinkMoved', pinkData);
  });
  socket.on('blueMovement', function (movementData)
  {
    blueData.x = movementData.x;
    blueData.y = movementData.y;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('blueMoved', blueData);
  });
  socket.on('greyMovement', function (movementData)
  {
    greyData.x = movementData.x;
    greyData.y = movementData.y;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('greyMoved', greyData);
  });
  socket.on('greenMovement', function (movementData)
  {
    greenData.x = movementData.x;
    greenData.y = movementData.y;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('greenMoved', greenData);
  });
  socket.on('yellowMovement', function (movementData)
  {
    yellowData.x = movementData.x;
    yellowData.y = movementData.y;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('yellowMoved', yellowData);
  });
});

server.listen(8081,function(){
  console.log(`Listening on ${server.address().port}`);
});
