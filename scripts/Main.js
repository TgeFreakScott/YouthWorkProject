function main()
{

  var redLeft = false;
  var redRight = true;
  var greyLeft = false;
  var greyRight = true;
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
        physics: {
          default: 'arcade',
          arcade: { debug: true, gravity: { y: 60 },
          collideWorldBounds: true } },

        input: {gamepad: true},
        scene: { preload: preload, create: create, update: update  }
    };

    var counter = 100;

    var redSprite
    var greySprite
    var blueSprite
    var pinkSprite
    var greenSprite
    var yellowSprite

    var sprite1
    var sprite2

    var game = new Phaser.Game(config);

    function preload()
    {
      this.load.image('blue', 'Sprite/blueCapture.png');
      this.load.image('red', 'Sprite/redCapture.png');
      this.load.image('grey', 'Sprite/greyCapture.png');
      this.load.image('pink', 'Sprite/pinkCapture.png');
      this.load.image('green', 'Sprite/greenCapture.png');
      this.load.image('yellow', 'Sprite/yellowCapture.png');

      //this.load.spritesheet('pink', 'Sprite/pinkJump.png', { frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('redMove', 'Sprite/redPlayer.png', { frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('greyMove', 'Sprite/greyPlayer.png', { frameWidth: 331, frameHeight: 294 });
      setInterval(function() { iconChange();}, 10);

    }

    function create()
    {
       this.physics.world.gravity.y = 60;


       var group = this.physics.add.group({
            angularDrag: 5,
            angularVelocity: 60,
            defaultKey: 'red',
            bounceX: 1,
            bounceY: 1.1,
            collideWorldBounds: true,
            dragX: 60,
            dragY: 60
       });

      // group.create(300, 300).setGravity(0, 120);

          var redAnimation = this.anims.create({
              key: 'walk',
              frames: this.anims.generateFrameNumbers('redMove'),
              frameRate: 6,
              repeat: -1
            });
          var greyAnimation = this.anims.create({
                key: 'walk1',
                frames: this.anims.generateFrameNumbers('greyMove'),
                frameRate: 6,
                repeat: -1
            });

            sprite1 = this.physics.add.sprite(50, 300, 'redMove')
                .setScale(0.6)
                .setCollideWorldBounds(true)
                .setInteractive();

            sprite1.play('walk');

            sprite2 = this.physics.add.sprite(50, 300, 'greyMove')
                .setScale(0.6)
                .setCollideWorldBounds(true)
                .setInteractive();

            sprite2.play('walk1');

            this.physics.add.collider(sprite1, sprite2);

          //this.tweens.add({targets: sprite,x: 750, duration: 8800,ease: 'Linear'});

          redSprite = this.add.sprite(100, 100, 'red').setScale(0.4).setInteractive();
          greySprite = this.add.sprite(200, 200, 'grey').setScale(0.4).setInteractive();
          //pinkSprite = this.add.sprite(300, 300, 'pink').setScale(0.4).setInteractive();
          //yellowSprite = this.add.sprite(400, 400, 'yellow').setScale(0.4).setInteractive();
          //blueSprite = this.add.sprite(500, 500, 'blue').setScale(0.4).setInteractive();
          //greenSprite = this.add.sprite(600, 600, 'green').setScale(0.4).setInteractive();

          this.input.setPollAlways();

          //var image = this.add.image(sprite.x - 32, 300, 'blue').setScale(0.2);

          /*var tween = this.tweens.add(
          //  {
          //    targets: image,
          //    props:
          //    {
          //      x: {value: '-=64', ease: 'Power1'},
          //      y: {value: '+=50', ease: 'Bounce.easeOut'}
              },
              duration: 750,
              repeat: 100,
              delay: 10
            });
          tween.seek(0.5);*/
    }

    function update()
    {
        if (this.input.gamepad.total === 0)
        {
            return;
        }

        var pad1 = this.input.gamepad.getPad(0);
        var pad2 = this.input.gamepad.getPad(1);
        //var pad3 = this.input.gamepad.getPad(2);
        //var pad4 = this.input.gamepad.getPad(3);

        if (pad1.axes.length)
        {
            var redAxisH = pad1.axes[0].getValue();
            var redAxisV = pad1.axes[1].getValue();

            sprite1.x += 4 * redAxisH;
            sprite1.y += 4 * redAxisV;
            if(redAxisH < 0 && !redLeft)
            {
              sprite1.flipX = true;
              redLeft = true;
              redRight = false;
            }
            if(redAxisH > 0 && !redRight)
            {
              sprite1.flipX = false;
              redLeft = false;
              redRight = true;
            }

        }

        if(pad2.axes.length)
        {
            var greyAxisH = pad2.axes[0].getValue();
            var greyAxisV = pad2.axes[1].getValue();

            sprite2.x += 4 * greyAxisH;
            sprite2.y += 4 * greyAxisV;

            if(greyAxisH < 0 && !greyLeft)
            {
              sprite2.flipX = true;
              greyLeft = true;
              greyRight = false;
            }
            if(greyAxisH > 0 && !greyRight)
            {
              sprite2.flipX = false;
              greyLeft = false;
              greyRight = true;
            }
        }

        /*if (pad3.axes.length)
        {
            var pinkAxisH = pad3.axes[0].getValue();
            var pinkAxisV = pad3.axes[1].getValue();

            pinkSprite.x += 4 * pinkAxisH;
            pinkSprite.y += 4 * pinkAxisV;

            pinkSprite.flipX = (pinkAxisH < 0);

        }

        if(pad4.axes.length)
        {
            var yellowAxisH = pad4.axes[0].getValue();
            var yellowAxisV = pad4.axes[1].getValue();

            yellowSprite.x += 4 * yellowAxisH;
            yellowSprite.y += 4 * yellowAxisV;

            yellowSprite.flipX = (yellowAxisH < 0);
        }*/

    }



}
