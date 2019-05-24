function main()
{
var config = {
    type: Phaser.AUTO,
    parent: 'The-Claw',
    width: 1000,
    height: 640,
    pixelArt: true,
    input: {gamepad: true},
    scene: {
      preload: preload,
      create: create,
      update: update,
      //input: {gamepad: true},
      physics:{
              arcade: { debug: true, gravity: { y: 0 }, collideWorldBounds: true },
              matter: { debug: true, gravity: { y: 9.78 } },
              impact: { debug: true }},
            }
    };
    var greySprite;
    var blueSprite;
    var pinkSprite;
    var greenSprite;
    var yellowSprite;
    var game = new Phaser.Game(config);
    const MAXPLAYERS = 5;
    function preload()
        {
          this.load.image('pink', 'Sprite/pinkCapture.png', 'Sprite/physics/pinkShape.json');
          this.load.json('pinkShape', 'Sprite/physics/pinkShape.json');
          this.load.image('blue', 'Sprite/blueCapture.png', 'Sprite/physics/blueShape.json' );
          this.load.json('blueShape', 'Sprite/physics/blueShape.json');
          this.load.image('grey', 'Sprite/greyCapture.png', 'Sprite/physics/greyShape.json');
          this.load.json('greyShape', 'Sprite/physics/greyShape.json');
          this.load.image('green', 'Sprite/greenCapture.png', 'Sprite/physics/greenShape.json' );
          this.load.json('greenShape', 'Sprite/physics/greenShape.json');
          this.load.image('yellow', 'Sprite/yellowCapture.png', 'Sprite/physics/yellowShape.json');
          this.load.json('yellowShape', 'Sprite/physics/yellowShape.json');
          this.load.image('white', 'Sprite/whiteCapture.png', 'Sprite/physics/pinkShape.json');
        }
        function create()
        {
          var self = this;
          this.socket = io();
          this.otherPlayers = this.add.group();
          cursors = this.input.keyboard.createCursorKeys();
          keys = this.input.keyboard.addKeys('W,A,S,D');
          this.socket.on('currentPlayers', function (players)
          {
            Object.keys(players).forEach(function (id)
            {
              if (players[id].playerId === self.socket.id)
              {
                addPlayer(self, players[id]);
              }
              else
              {
                addOtherPlayers(self, players[id]);
              }
            });
          });
          this.socket.on('newPlayer', function (playerInfo)
          {
              addOtherPlayers(self, playerInfo);
          });
          this.socket.on('disconnect', function (playerId)
          {
            self.otherPlayers.getChildren().forEach(function (otherPlayer)
            {
              if (playerId === otherPlayer.playerId)
              {
                otherPlayer.destroy();
              }
            });
          })
          this.socket.on('playerMoved', function (playerInfo)
          {
            self.otherPlayers.getChildren().forEach(function (otherPlayer)
            {
              if (playerInfo.playerId === otherPlayer.playerId)
              {
                otherPlayer.setPosition(playerInfo.x, playerInfo.y);
              }
            });
          });
          this.cursors = this.input.keyboard.createCursorKeys();
          this.matter.world.setBounds();
          this.input.setPollAlways();
        }

        function update()
        {
            //var pad1 = this.input.gamepad.getPad(0);
            //if (pad1.axes.length)
            //{
                //var pinkAxisH = pad1.axes[0].getValue();
                //var pinkAxisV = pad1.axes[1].getValue();

                //this.ship.x += 4 * pinkAxisH;
                //this.ship.y += 4 * pinkAxisV;

                //this.ship.flipX = (pinkAxisH < 0);
            //}
            if (this.player)
            {
              if (keys.A.isDown)
              {
                this.player.x --;
              }
              else if (keys.D.isDown)
              {
                this.player.x ++;
              }
              if (keys.W.isDown)
              {
                this.player.y --;
              }
              else if (keys.S.isDown)
              {
                this.player.y ++;
              }
            }
            // emit player movement
            var x = this.player.x;
            var y = this.player.y;
            if (this.player.oldPosition && (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y))
            {
              this.socket.emit('playerMovement', { x: this.player.x, y: this.player.y});
            }

            // save old position data
            this.player.oldPosition = {
              x: this.player.x,
              y: this.player.y
            };
          }

          function addPlayer(self, playerInfo)
          {
            self.player = self.matter.add.image(playerInfo.x, playerInfo.y, 'white').setScale(0.2);
            self.player.destroy();
            switch(playerInfo.playerNumber)
            {
              case 0:
                self.player = self.matter.add.image(playerInfo.x, playerInfo.y, 'pink').setScale(0.2);
                break;
              case 1:
                self.player = self.matter.add.image(playerInfo.x, playerInfo.y, 'blue').setScale(0.2);
                break;
              case 2:
                self.player = self.matter.add.image(playerInfo.x, playerInfo.y, 'grey').setScale(0.2);
                break;
              case 3:
                self.player = self.matter.add.image(playerInfo.x, playerInfo.y, 'green').setScale(0.2);
                break;
              case 4:
                self.player = self.matter.add.image(playerInfo.x, playerInfo.y, 'yellow').setScale(0.2);
                break;
              default:
                break;
            }
          }
          function addOtherPlayers(self, playerInfo)
          {
            var otherPlayer;
            switch(playerInfo.playerNumber)
            {
              case 0:
                otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'pink').setScale(0.2);
                otherPlayer.playerId = playerInfo.playerId;
                break;
              case 1:
                otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'blue').setScale(0.2);
                otherPlayer.playerId = playerInfo.playerId;
                break;
              case 2:
                otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'grey').setScale(0.2);
                otherPlayer.playerId = playerInfo.playerId;
                break;
              case 3:
                otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'green').setScale(0.2);
                otherPlayer.playerId = playerInfo.playerId;
                break;
              case 4:
                otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'yellow').setScale(0.2);
                otherPlayer.playerId = playerInfo.playerId;
                break;
              default:
                break;
            }
            self.otherPlayers.add(otherPlayer);
          }
  }
