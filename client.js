var Client = {};
Client.socket = io.connect();

/*Client.sendPosition = function(x,y)
{
  Client.socket.emit('position',{x:x,y:y});
};*/

/*Client.socket.on('move',function(data)
{
    Game.movePlayer(data.id,data.x,data.y);
});*/
