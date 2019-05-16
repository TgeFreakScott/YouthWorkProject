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
    var currentPlayerCount;
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
          this.otherPlayers = this.physics.add.group();
          this.socket.on('currentPlayers', function (players)
          {
            Object.keys(players).forEach(function (id)
            {
              if (players[id].playerId === self.socket.id)
              {
                addPlayer(self, players[id]);
              }
            });
          });
          this.socket.on('newPlayer', function (playerInfo)
          {
            addPlayer(self, playerInfo);
          });
          this.socket.on('numberOfPlayers', function (numberofPlayersConnected)
          {
            currentPlayerCount = numberofPlayersConnected;
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
          /*
            if (this.ship)
            {
              var pad1 = this.input.gamepad.getPad(0);
              if (pad1.axes.length)
              {
                  var pinkAxisH = pad1.axes[0].getValue();
                  var pinkAxisV = pad1.axes[1].getValue();

                  this.ship.x += 4 * pinkAxisH;
                  this.ship.y += 4 * pinkAxisV;

                  this.ship.flipX = (pinkAxisH < 0);
              }
              if (this.cursors.left.isDown)
              {
                this.ship.x --;
              }
              else if (this.cursors.right.isDown)
              {
                this.ship.x ++;
              }

              if (this.cursors.up.isDown)
              {
                this.ship.y --;
              }
              else if (this.cursors.down.isDown)
              {
                this.ship.y ++;
              }
              // emit player movement
              var x = this.ship.x;
              var y = this.ship.y;
              if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y))
              {
                this.socket.emit('playerMovement', { x: this.ship.x, y: this.ship.y});
              }

              // save old position data
              this.ship.oldPosition =
              {
                x: this.ship.x,
                y: this.ship.y
              };
              */
            }
        }

        function addPlayer(self, playerInfo)
        {
          switch(currentPlayerCount)
          {
            case 0:
              pinkSprite = self.physics.add.image(playerInfo.x, playerInfo.y, 'pink').setScale(0.2).setCollideWorldBounds(true);
              players[currentPlayerCount] = pinkSprite;
              break;
            case 1:
              blueSprite = self.physics.add.image(playerInfo.x, playerInfo.y, 'blue').setScale(0.2).setCollideWorldBounds(true);
              players[currentPlayerCount] = blueSprite;
              break;
            case 2:
              greySprite = self.physics.add.image(playerInfo.x, playerInfo.y, 'grey').setScale(0.2).setCollideWorldBounds(true);
              players[currentPlayerCount] = greySprite;
              break;
            case 3:
              greenSprite = self.physics.add.image(playerInfo.x, playerInfo.y, 'green').setScale(0.2).setCollideWorldBounds(true);
              players[currentPlayerCount] = greenSprite;
              break;
            case 4:
              yellowSprite = self.physics.add.image(playerInfo.x, playerInfo.y, 'yellow').setScale(0.2).setCollideWorldBounds(true);
              players[currentPlayerCount] = yellowSprite;
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
