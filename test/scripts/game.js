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
    var players = [];
    var game = new Phaser.Game(config);
    var greySprite;
    var blueSprite;
    var pinkSprite;
    var greenSprite;
    var yellowSprite;
    var numberofPlayersConnected = 0;
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
        }
        function create()
        {
          var self = this;
          this.socket = io();
          cursors = this.input.keyboard.createCursorKeys();
          keys = this.input.keyboard.addKeys('W,A,S,D,I,J,K,L');
          this.socket.on('currentPlayers', function (players)
          {
            Object.keys(players).forEach(function (id)
            {
              addPlayer(self, players[id]);
            });
          });
          this.socket.on('newPlayer', function (playerInfo)
          {
            addPlayer(self, playerInfo);
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
          });

          this.socket.on('PlayerCount', function(playersConnected)
          {
            numberofPlayersConnected = playersConnected;
          });

          this.socket.on('playerMoved', function (playerInfo)
          {
            if (playerInfo.playerId === pinkSprite.playerId)
            {
              pinkSprite.setPosition(playerInfo.x, playerInfo.y);
            }
            if (playerInfo.playerId === blueSprite.playerId)
            {
              blueSprite.setPosition(playerInfo.x, playerInfo.y);
            }
            if (playerInfo.playerId === greySprite.playerId)
            {
              greySprite.setPosition(playerInfo.x, playerInfo.y);
            }
            if (playerInfo.playerId === greenSprite.playerId)
            {
              greenSprite.setPosition(playerInfo.x, playerInfo.y);
            }
            if (playerInfo.playerId === yellowSprite.playerId)
            {
              yellowSprite.setPosition(playerInfo.x, playerInfo.y);
            }
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
            if (pinkSprite)
            {
              if (keys.A.isDown)
              {
                pinkSprite.x --;
              }
              else if (keys.D.isDown)
              {
                pinkSprite.x ++;
              }

              if (keys.W.isDown)
              {
                pinkSprite.y --;
              }
              else if (keys.S.isDown)
              {
                pinkSprite.y ++;
              }
              var pinkX = pinkSprite.x;
              var pinkY = pinkSprite.y;
              if (pinkSprite.oldPosition && (pinkX !== pinkSprite.oldPosition.x || pinkY !== pinkSprite.oldPosition.y))
              {
                this.socket.emit('playerMovement', { x: pinkSprite.x, y: pinkSprite.y});
              }

              // save old position data
              pinkSprite.oldPosition =
              {
                x: pinkSprite.x,
                y: pinkSprite.y
              };
            }

            if(blueSprite)
            {
              if (keys.J.isDown)
              {
                blueSprite.x --;
              }
              else if (keys.L.isDown)
              {
                blueSprite.x ++;
              }
              if (keys.I.isDown)
              {
                blueSprite.y --;
              }
              else if (keys.K.isDown)
              {
                blueSprite.y ++;
              }
              var blueX = blueSprite.x;
              var blueY = blueSprite.y;
              if (blueSprite.oldPosition && (blueX !== blueSprite.oldPosition.x || blueY !== blueSprite.oldPosition.y))
              {
                this.socket.emit('playerMovement', { x: blueSprite.x, y: blueSprite.y});
              }

              // save old position data
              blueSprite.oldPosition =
              {
                x: blueSprite.x,
                y: blueSprite.y
              };
            }

            if(greySprite)
            {
              if (cursors.left.isDown)
              {
                greySprite.x --;
              }
              else if (cursors.right.isDown)
              {
                greySprite.x ++;
              }

              if (cursors.up.isDown)
              {
                greySprite.y --;
              }
              else if (cursors.down.isDown)
              {
                greySprite.y ++;
              }
              var greyX = greySprite.x;
              var greyY = greySprite.y;
              if (greySprite.oldPosition && (greyX !== greySprite.oldPosition.x || greyY !== greySprite.oldPosition.y))
              {
                this.socket.emit('playerMovement', { x: greySprite.x, y: greySprite.y});
              }

              // save old position data
              greySprite.oldPosition =
              {
                x: greySprite.x,
                y: greySprite.y
              };
            }

            if(greenSprite)
            {
              var greenX = greenSprite.x;
              var greenY = greenSprite.y;
              if (greenSprite.oldPosition && (greenX !== greenSprite.oldPosition.x || greenY !== greenSprite.oldPosition.y))
              {
                this.socket.emit('playerMovement', { x: greenSprite.x, y: greenSprite.y});
              }

              // save old position data
              greenSprite.oldPosition =
              {
                x: greenSprite.x,
                y: greenSprite.y
              };
            }

            if(yellowSprite)
            {
              var yellowX = yellowSprite.x;
              var yellowY = yellowSprite.y;
              if (yellowSprite.oldPosition && (yellowX !== yellowSprite.oldPosition.x || yellowY !== yellowSprite.oldPosition.y))
              {
                this.socket.emit('playerMovement', { x: yellowSprite.x, y: yellowSprite.y});
              }

              // save old position data
              yellowSprite.oldPosition =
              {
                x: yellowSprite.x,
                y: yellowSprite.y
              };
            }
          }
          function addPlayer(self, playerInfo)
          {
            switch(playerInfo.playerNumber)
            {
              case 0:
                pinkSprite = self.physics.add.image(playerInfo.x, playerInfo.y, 'pink').setScale(0.2).setCollideWorldBounds(true);
                pinkSprite.playerId = playerInfo.playerId;
                break;
              case 1:
                blueSprite = self.physics.add.image(playerInfo.x, playerInfo.y, 'blue').setScale(0.2).setCollideWorldBounds(true);
                blueSprite.playerId = playerInfo.playerId;
                break;
              case 2:
                greySprite = self.physics.add.image(playerInfo.x, playerInfo.y, 'grey').setScale(0.2).setCollideWorldBounds(true);
                greySprite.playerId = playerInfo.playerId;
                break;
              case 3:
                greenSprite = self.physics.add.image(playerInfo.x, playerInfo.y, 'green').setScale(0.2).setCollideWorldBounds(true);
                greenSprite.playerId = playerInfo.playerId;
                break;
              case 4:
                yellowSprite = self.physics.add.image(playerInfo.x, playerInfo.y, 'yellow').setScale(0.2).setCollideWorldBounds(true);
                yellowSprite.playerId = playerInfo.playerId;
                break;
              case 5:
                break;
              case 6:
                break;
              case 7:
                break;
              default:
                break;
            }
          }

          function addOtherPlayers(self, playerInfo)
          {
            var shapePink = self.cache.json.get('blueShape');
            const otherPlayer = self.physics.add.image(playerInfo.x, playerInfo.y, 'blue').setScale(0.2).setCollideWorldBounds(true);
            otherPlayer.playerId = playerInfo.playerId;
            self.otherPlayers.add(otherPlayer);
          }
  }
