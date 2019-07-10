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


var greyData = {x: 0, y:0};
var greyArrowData = {x: 0, y:0, angle: 0};
var blueData = {x: 0, y:0};
var blueArrowData = {x: 0, y:0, angle: 0};
var yellowData = {x: 0, y:0};
var yellowArrowData = {x: 0, y:0, angle: 0};
var greenData = {x: 0, y:0};
var greenArrowData = {x: 0, y:0, angle: 0};
var pinkData = {x: 0, y:0};
var pinkArrowData = {x: 0, y:0, angle: 0};
var redData = {x: 0, y:0};
var clawAnchorData = {x: 0, y:0};
var clawBodyData = {x: 0, y:0, angle: 0};
var clawArmLeftData = {x: 0, y:0, angle: 0};
var clawArmRightData = {x: 0, y:0, angle: 0};
var clawGrabberLeftData = {x: 0, y:0, angle: 0};
var clawGrabberRightData = {x: 0, y:0, angle: 0};
var clawToPipeBodyData = {x1: 0, y1:0, x2: 0, y2:0, length: 0};
var leftConnectToClawData = {x1: 0, y1:0, x2: 0, y2:0, length: 0};
var rightConnectToClawData = {x1: 0, y1:0, x2: 0, y2:0, length: 0};
var leftArmToLeftConnectData = {x1: 0, y1:0, x2: 0, y2:0, length: 0};
var rightArmToRightConnectData = {x1: 0, y1:0, x2: 0, y2:0, length: 0};
var rightArmToLeftArmData = {x1: 0, y1:0, x2: 0, y2:0, length: 0};
var leftConnectToRightConnectData = {x1: 0, y1:0, x2: 0, y2:0, length: 0};
var leftConnectToClawTopData = {x1: 0, y1:0, x2: 0, y2:0, length: 0};
var rightConnectToClawTopData = {x1: 0, y1:0, x2: 0, y2:0, length: 0};
var playerOneEntered = false;
var playerTwoEntered = false;
var playerThreeEntered = false;
var playerFourEntered = false;
var playerFiveEntered = false;
var playerSixEntered = false;
var playerSevenEntered = false;
var playerEightEntered = false;
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
   socket.on('pinkMovement', function (movementData)
   {
     pinkData.x = movementData.x;
     pinkData.y = movementData.y;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('pinkMoved', pinkData);
   });
   socket.on('pinkArrowMovement', function (movementData)
   {
     pinkArrowData.x = movementData.x;
     pinkArrowData.y = movementData.y;
     pinkArrowData.angle = movementData.angle;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('pinkArrowMoved', pinkArrowData);
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
     clawBodyData.angle = movementData.angle;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('clawBodyMoved', clawBodyData);
   });
   socket.on('clawArmLeftMovement', function (movementData)
   {
     clawArmLeftData.x = movementData.x;
     clawArmLeftData.y = movementData.y;
     clawArmLeftData.angle = movementData.angle;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('clawArmLeftMoved', clawArmLeftData);
   });
   socket.on('clawArmRightMovement', function (movementData)
   {
     clawArmRightData.x = movementData.x;
     clawArmRightData.y = movementData.y;
     clawArmRightData.angle = movementData.angle;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('clawArmRightMoved', clawArmRightData);
   });
   socket.on('clawGrabberLeftMovement', function (movementData)
   {
     clawGrabberLeftData.x = movementData.x;
     clawGrabberLeftData.y = movementData.y;
     clawGrabberLeftData.angle = movementData.angle;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('clawGrabberLeftMoved', clawGrabberLeftData);
   });
   socket.on('clawGrabberRightMovement', function (movementData)
   {
     clawGrabberRightData.x = movementData.x;
     clawGrabberRightData.y = movementData.y;
     clawGrabberRightData.angle = movementData.angle;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('clawGrabberRightMoved', clawGrabberRightData);
   });
   socket.on('clawToPipeBodyMovement', function(movementData)
   {
     clawToPipeBodyData.x1 = movementData.x1;
     clawToPipeBodyData.y1 = movementData.y1;
     clawToPipeBodyData.x2 = movementData.x2;
     clawToPipeBodyData.y2 = movementData.y2;
     clawToPipeBodyData.length = movementData.length;
     socket.broadcast.emit('clawToPipeBodyMoved', clawToPipeBodyData);
   });
   socket.on('leftConnectToClawMovement', function (movementData)
   {
     leftConnectToClawData.x1 = movementData.x1;
     leftConnectToClawData.y1 = movementData.y1;
     leftConnectToClawData.x2 = movementData.x2;
     leftConnectToClawData.y2 = movementData.y2;
     leftConnectToClawData.length = movementData.length;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('leftConnectToClawMoved', leftConnectToClawData);
   });
   socket.on('rightConnectToClawMovement', function (movementData)
   {
     rightConnectToClawData.x1 = movementData.x1;
     rightConnectToClawData.y1 = movementData.y1;
     rightConnectToClawData.x2 = movementData.x2;
     rightConnectToClawData.y2 = movementData.y2;
     rightConnectToClawData.length = movementData.length;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('rightConnectToClawMoved', rightConnectToClawData);
   });

   socket.on('leftArmToLeftConnectMovement', function(movementData)
   {
     leftArmToLeftConnectData.x1 = movementData.x1;
     leftArmToLeftConnectData.y1 = movementData.y1;
     leftArmToLeftConnectData.x2 = movementData.x2;
     leftArmToLeftConnectData.y2 = movementData.y2;
     leftArmToLeftConnectData.length = movementData.length;
     socket.broadcast.emit('leftArmToLeftConnectMoved', leftArmToLeftConnectData);
   });
   socket.on('rightConnectToClawMovement', function (movementData)
   {
     rightArmToRightConnectData.x1 = movementData.x1;
     rightArmToRightConnectData.y1 = movementData.y1;
     rightArmToRightConnectData.x2 = movementData.x2;
     rightArmToRightConnectData.y2 = movementData.y2;
     rightArmToRightConnectData.length = movementData.length;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('rightConnectToClawMoved', rightArmToRightConnectData);
   });
   socket.on('rightArmToLeftArmMovement', function (movementData)
   {
     rightArmToLeftArmData.x1 = movementData.x1;
     rightArmToLeftArmData.y1 = movementData.y1;
     rightArmToLeftArmData.x2 = movementData.x2;
     rightArmToLeftArmData.y2 = movementData.y2;
     rightArmToLeftArmData.length = movementData.length;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('rightArmToLeftArmMoved', rightArmToLeftArmData);
   });
   socket.on('leftConnectToRightConnectMovement', function(movementData)
   {
     leftConnectToRightConnectData.x1 = movementData.x1;
     leftConnectToRightConnectData.y1 = movementData.y1;
     leftConnectToRightConnectData.x2 = movementData.x2;
     leftConnectToRightConnectData.y2 = movementData.y2;
     leftConnectToRightConnectData.length = movementData.length;
     socket.broadcast.emit('leftConnectToRightConnectMoved', leftConnectToRightConnectData);
   });
   socket.on('leftConnectToClawTopMovement', function (movementData)
   {
     leftConnectToClawTopData.x1 = movementData.x1;
     leftConnectToClawTopData.y1 = movementData.y1;
     leftConnectToClawTopData.x2 = movementData.x2;
     leftConnectToClawTopData.y2 = movementData.y2;
     leftConnectToClawTopData.length = movementData.length;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('leftConnectToClawTopMoved', leftConnectToClawTopData);
   });
   socket.on('rightConnectToClawTopMovement', function (movementData)
   {
     rightConnectToClawTopData.x1 = movementData.x1;
     rightConnectToClawTopData.y1 = movementData.y1;
     rightConnectToClawTopData.x2 = movementData.x2;
     rightConnectToClawTopData.y2 = movementData.y2;
     rightConnectToClawTopData.length = movementData.length;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('rightConnectToClawTopMoved', rightConnectToClawTopData);
   });

   socket.on('playerOneConnect', function (connectionData)
   {
      playerOneEntered = connectionData;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('playerOneConnected', playerOneEntered);
   });
   socket.on('playerTwoConnect', function (connectionData)
   {
      playerTwoEntered = connectionData;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('playerTwoConnected', playerTwoEntered);
   });
   socket.on('playerThreeConnect', function (connectionData)
   {
      playerThreeEntered = connectionData;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('playerThreeConnected', playerThreeEntered);
   });
   socket.on('playerFourConnect', function (connectionData)
   {
      playerFourEntered = connectionData;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('playerFourConnected', playerFourEntered);
   });
   socket.on('playerFiveConnect', function (connectionData)
   {
      playerFiveEntered = connectionData;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('playerFiveConnected', playerFiveEntered);
   });
   socket.on('playerSixConnect', function (connectionData)
   {
      playerSixEntered = connectionData;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('playerSixConnected', playerSixEntered);
   });
   socket.on('playerSevenConnect', function (connectionData)
   {
      playerSevenEntered = connectionData;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('playerSevenConnected', playerSevenEntered);
   });
   socket.on('playerEightConnect', function (connectionData)
   {
      playerEightEntered = connectionData;
     // emit a message to all players about the player that moved
     socket.broadcast.emit('playerEightConnected', playerEightEntered);
   });
  socket.on('disconnect', function ()
  {
    if(socketID.firstConnection === socket.id)
    {
      console.log('user 1 disconnected');
      socketID.firstConnection = 0;
    }
    else if(socketID.secondConnection === socket.id)
    {
      console.log('user 2 disconnected');
      socketID.secondConnection = 0;
    }
  });
 });

server.listen(8081,function(){
  console.log(`Listening on ${server.address().port}`);
});
