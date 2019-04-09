function main()
{

  function iconChange()
  {
    setTimeout(function(){ document.getElementById("icon").href = "Sprite/frame_0.png";}, 1000);
    setTimeout(function(){ document.getElementById("icon").href = "Sprite/frame_1.png";}, 2000);
    setTimeout(function(){ document.getElementById("icon").href = "Sprite/frame_2.png";}, 3000);
    setTimeout(function(){ document.getElementById("icon").href = "Sprite/frame_3.png";}, 4000);
  }

    //const game = new Game();
    //game.update();

    var config = {
        type: Phaser.AUTO,
        parent: 'phaser-example',
        width: 800,
        height: 600,
        pixelArt: true,
        input: {gamepad: true},
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var redSprite
    var game = new Phaser.Game(config);

    function preload()
    {
      this.load.image('blue', 'Sprite/pinkCapture.png');
      this.load.image('red', 'Sprite/redCapture.png');
      this.load.spritesheet('pink', 'Sprite/pinkJump.png', { frameWidth: 331, frameHeight: 294 });
      setInterval(function() { iconChange();}, 10);

    }

    function create()
    {
      var pinkAnimation = this.anims.create({
          key: 'walk',
          frames: this.anims.generateFrameNumbers('pink'),
          frameRate: 6,
          repeat: 100
      });


      var sprite = this.add.sprite(50, 300, 'pink').setScale(0.6);
      sprite.play('walk');

      this.tweens.add({targets: sprite,x: 750, duration: 8800,ease: 'Linear'});

      sprite.on('animationrepeat-walk', function () {
          var blueSpawn = this.add.image(sprite.x - 32, 300, 'blue').setScale(0.2);

          this.tweens.add({targets: blueSpawn,
            props: {x: {value: '-=64', ease: 'Power1'},
            y: {value: '+=50', ease: 'Bounce.easeOut'}},duration: 750});},this);

      redSprite = this.add.sprite(400, 300, 'red').setScale(0.5).setInteractive();
      this.input.setPollAlways();
    }


    function update()
    {
        if (this.input.gamepad.total === 0)
        {
            return;
        }

        var pad = this.input.gamepad.getPad(0);
        if (pad.axes.length)
        {
            var axisH = pad.axes[0].getValue();
            var axisV = pad.axes[1].getValue();

            redSprite.x += 4 * axisH;
            redSprite.y += 4 * axisV;

            redSprite.flipX = (axisH > 0);
        }

    }



}
