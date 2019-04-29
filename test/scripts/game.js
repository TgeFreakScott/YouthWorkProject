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
      physics:{
              arcade: { debug: true, gravity: { y: 60 }, collideWorldBounds: true },
              matter: { debug: true, gravity: { y: 9.78 } },
              impact: { debug: true }},
            }
    };

    var game = new Phaser.Game(config);
    var pinkSprite;
    function preload()
        {
          this.load.image('pink', 'Sprite/pinkCapture.png', 'Sprite/physics/pinkShape.json');
          this.load.json('pinkShape', 'Sprite/physics/pinkShape.json');
        }
        function create()
        {
          this.matter.world.setBounds();
          cursors = this.input.keyboard.createCursorKeys();
          keys = this.input.keyboard.addKeys('W,A,S,D');

          Client.askNewPlayer();
          this.input.setPollAlways();

        }

        function update()
        {
            Client.sendClick(this.pinkSprite.x, this.pinkSprite.y);
            if (pad1.axes.length)
            {
                var pinkAxisH = pad1.axes[0].getValue();
                var pinkAxisV = pad1.axes[1].getValue();

                pinkSprite.x += 4 * pinkAxisH;
                pinkSprite.y += 4 * pinkAxisV;

                pinkSprite.flipX = (pinkAxisH < 0);

            }

        }
        function addNewPlayer(id,x,y)
        {
          var shapePink = this.cache.json.get('pinkShape');
          this.playerMap[id] = this.matter.add.image(250, 400, 'pink','pink',{shape: shapePink.pinkCapture })
          .setScale(0.2).setBounce(0.6).setDensity(100).setMass(400);
        }
        function removePlayer(id)
        {
          this.playerMap[id].destroy();
          delete this.playerMap[id];
        }
        function movePlayer(id,x,y)
        {
          var player = this.playerMap[id];
          var distance = Phaser.Math.distance(player.x,player.y,x,y);
          var duration = distance*10;
          var tween = game.add.tween(player);
          tween.to({x:x,y:y}, duration);
          tween.start();
        }
  }
