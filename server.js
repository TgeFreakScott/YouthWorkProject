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
var greyData = {x: 0, y:0};
var greyArrowData = {x: 0, y:0, angle: 0};
var blueData = {x: 0, y:0};
var blueArrowData = {x: 0, y:0, angle: 0};
var yellowData = {x: 0, y:0};
var yellowArrowData = {x: 0, y:0, angle: 0};
var greenData = {x: 0, y:0};
var greenArrowData = {x: 0, y:0, angle: 0};
var redData = {x: 0, y:0};
var clawAnchorData = {x: 0, y:0};
var clawBodyData = {x: 0, y:0};
var clawArmLeftData = {x: 0, y:0};
var clawArmRightData = {x: 0, y:0};
var clawGrabberLeftData = {x: 0, y:0};
var clawGrabberRightData = {x: 0, y:0};
var socketID = {firstConnection: 0, secondConnection:0};

io.on('connection', function (socket)
 {
   console.log("A user connected");
   var tempVar = 0;
   if(socketID.firstConnection === 0)
   {
     tempVar = socket.id;
     socketID.firstConnection = tempVar;
     socket.emit('getSocketID', tempVar);
   }
   else
   {
     tempVar = socket.id;
     socketID.secondConnection = tempVar;
     socket.emit('getSocketID', tempVar);
   }

   socket.on('requestSocketID', function()
   {
     socket.emit('passSocketID', socketID);
   });
   // when a player moves, update the player data
   socket.on('pinkMovement', function (movementData)
   {
     pinkData.x = movementData.x;
     pinkData.y = movementData.y;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('pinkMoved', pinkData);
   });

   socket.on('greyMovement', function (movementData)
   {
     greyData.x = movementData.x;
     greyData.y = movementData.y;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('greyMoved', greyData);
   });
   socket.on('greyArrowMovement', function (movementData)
   {
     greyArrowData.x = movementData.x;
     greyArrowData.y = movementData.y;
     greyArrowData.angle = movementData.angle;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('greyArrowMoved', greyArrowData);
   });
   socket.on('blueMovement', function (movementData)
   {
     blueData.x = movementData.x;
     blueData.y = movementData.y;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('blueMoved', blueData);
   });
   socket.on('blueArrowMovement', function (movementData)
   {
     blueArrowData.x = movementData.x;
     blueArrowData.y = movementData.y;
     blueArrowData.angle = movementData.angle;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('blueArrowMoved', blueArrowData);
   });
   socket.on('yellowMovement', function (movementData)
   {
     yellowData.x = movementData.x;
     yellowData.y = movementData.y;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('yellowMoved', yellowData);
   });
   socket.on('yellowArrowMovement', function (movementData)
   {
     yellowArrowData.x = movementData.x;
     yellowArrowData.y = movementData.y;
     yellowArrowData.angle = movementData.angle;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('yellowArrowMoved', yellowArrowData);
   });
   socket.on('greenMovement', function (movementData)
   {
     greenData.x = movementData.x;
     greenData.y = movementData.y;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('greenMoved', greenData);
   });
   socket.on('greenArrowMovement', function (movementData)
   {
     greenArrowData.x = movementData.x;
     greenArrowData.y = movementData.y;
     greenArrowData.angle = movementData.angle;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('greenArrowMoved', greenArrowData);
   });
   socket.on('redMovement', function (movementData)
   {
     redData.x = movementData.x;
     redData.y = movementData.y;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('redMoved', redData);
   });
   socket.on('clawAnchorMovement', function (movementData)
   {
     clawAnchorData.x = movementData.x;
     clawAnchorData.y = movementData.y;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('clawAnchorMoved', clawAnchorData);
   });
   socket.on('clawBodyMovement', function (movementData)
   {
     clawBodyData.x = movementData.x;
     clawBodyData.y = movementData.y;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('clawBodyMoved', clawBodyData);
   });
   socket.on('clawArmLeftMovement', function (movementData)
   {
     clawArmLeftData.x = movementData.x;
     clawArmLeftData.y = movementData.y;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('clawArmLeftMoved', clawArmLeftData);
   });
   socket.on('clawArmRightMovement', function (movementData)
   {
     clawArmRightData.x = movementData.x;
     clawArmRightData.y = movementData.y;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('clawArmRightMoved', clawArmRightData);
   });
   socket.on('clawGrabberLeftMovement', function (movementData)
   {
     clawGrabberLeftData.x = movementData.x;
     clawGrabberLeftData.y = movementData.y;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('clawGrabberLeftMoved', clawGrabberLeftData);
   });
   socket.on('clawGrabberRightMovement', function (movementData)
   {
     clawGrabberRightData.x = movementData.x;
     clawGrabberRightData.y = movementData.y;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('clawGrabberRightMoved', clawGrabberRightData);
   });
   // when a player disconnects, remove them from our players object
  socket.on('disconnect', function ()
  {
    console.log('user disconnected');
    if(socketID.firstConnection === socket.id)
    {
      socketID.firstConnection = 0;
    }
    else if(socketID.secondConnection === socket.id)
    {
      socketID.secondConnection = 0;
    }
    //io.emit('disconnect');
  });
 });

server.listen(8081,function(){
  console.log(`Listening on ${server.address().port}`);
});
