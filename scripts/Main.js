function main()
{
  //mass is in grams
  var redLeft = false;
  var redRight = true;
  var redJump = false;

  var greyLeft = false;
  var greyRight = true;
  var greyJump = false;

  function iconChange()
  {
    setTimeout(function(){ document.getElementById("icon").href = "Sprite/frame_0.png";}, 1000);
    setTimeout(function(){ document.getElementById("icon").href = "Sprite/frame_1.png";}, 2000);
    setTimeout(function(){ document.getElementById("icon").href = "Sprite/frame_2.png";}, 3000);
    setTimeout(function(){ document.getElementById("icon").href = "Sprite/frame_3.png";}, 4000);
  }

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

    var redSprite;
    var greySprite;
    var blueSprite;
    var pinkSprite;
    var greenSprite;
    var yellowSprite;

    var pipeSprite;
    var pipeBodySprite;
    var clawBodySprite;

    var armLeftSprite;
    var armRightSprite;
    var armConnectLeftSprite;
    var armConnectRightSprite;

    var leftBucket;
    var rightBucket;

    var sprite1;
    var sprite2;
    var pinkTest;
    var blueTest;

    var greyArrowToGreyPlayer;

    //Constraint Variables
    var clawToPipeBody;
    var leftConnectToClaw;
    var rightConnectToClaw;
    var leftArmToLeftConnect;
    var rightArmToRightConnect;
    var rightArmToLeftArm;
    var leftConnectToClawTop;
    var rightConnectToClawTop;
    var leftConnectToRightConnect;

    var redArrow;
    var greyArrow;
    var rotationValue = 0.1;
    var cursors;
    var greyJumpTimer = true;
    var lastGreyJump = 0;

    var game = new Phaser.Game(config);

    function preload()
    {
      //Favicon image Function
      setInterval(function() { iconChange();}, 10);

      //loads image by ("Name your giving to sprite" , "the sprite location" , "JSON file location")
      //player Sprites
      this.load.image('red', 'Sprite/redCapture.png','Sprite/physics/redShape.json');
      this.load.image('grey', 'Sprite/greyCapture.png','Sprite/physics/greyShape.json');
      this.load.image('green', 'Sprite/greenCapture.png','Sprite/physics/greenShape.json');
      this.load.image('yellow', 'Sprite/yellowCapture.png','Sprite/physics/yellowShape.json');
      this.load.image('pink', 'Sprite/pinkCapture.png', 'Sprite/physics/pinkShape.json');
      this.load.image('blue', 'Sprite/blueCapture.png', 'Sprite/physics/blueShape.json' );
      this.load.image('clawBody', 'Sprite/clawBody.png', 'Sprite/physics/clawBodyShape.json');

      this.load.image('armLeftBody', 'Sprite/armLeft.png', 'Sprite/physics/armLeftShape.json');
      this.load.image('armRightBody', 'Sprite/armRight.png', 'Sprite/physics/armRightShape.json');
      this.load.image('armConnectBody', 'Sprite/armConnect.png', 'Sprite/physics/armConnectShape.json');
      this.load.image('bucket', 'Sprite/glassPanel.png', 'Sprite/physics/glassPrison.json');

      //claw Sprites
      this.load.image('pipe','Sprite/clawBar.png');
      this.load.image('pipeBody','Sprite/clawBarBody.png');

      this.load.image('greyArrow', 'Sprite/greyArrow.png');
      this.load.image('redArrow', 'Sprite/redArrow.png');

      //Loading in animated Sprites
      this.load.spritesheet('redMove', 'Sprite/redPlayer.png', { frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('greyMove' ,'Sprite/greyPlayer.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('greyJump' ,'Sprite/greyJump.png' ,{ frameWidth: 331, frameHeight: 294 });

      //Loading in JSON file and name
      this.load.json('clawShape', 'Sprite/physics/clawBodyShape.json');
      this.load.json('blueShape', 'Sprite/physics/blueShape.json');
      this.load.json('pinkShape', 'Sprite/physics/pinkShape.json');
      this.load.json('greyShape', 'Sprite/physics/greyShape.json');
      this.load.json('redShape', 'Sprite/physics/redShape.json');
      this.load.json('armLeftShape','Sprite/physics/armLeftShape.json');
      this.load.json('armRightShape','Sprite/physics/armRightShape.json');
      this.load.json('armConnectShape','Sprite/physics/armConnectShape.json');
      this.load.json('bucketShape','Sprite/physics/glassPrison.json');
    }

    function create()
    {
      this.matter.world.setBounds();
      cursors = this.input.keyboard.createCursorKeys();

      // Naming Scheme givin to JSON file
      var shapeClaw = this.cache.json.get('clawShape');
      var shapeBlue = this.cache.json.get('blueShape');
      var shapePink = this.cache.json.get('pinkShape');
      var shapeGrey = this.cache.json.get('greyShape');
      var shapeRed = this.cache.json.get('redShape');
      var shapeArmLeft = this.cache.json.get('armLeftShape');
      var shapeArmRight = this.cache.json.get('armRightShape');
      var shapeArmConnect = this.cache.json.get('armConnectShape');
      var shapeBucket = this.cache.json.get('bucketShape');

      pinkTest = this.matter.add.image(100, 400, 'pink','pink',{shape: shapePink.pinkCapture })
      .setScale(0.2).setBounce(1).setVelocity(15).setMass(400);
      blueTest = this.matter.add.image(450, 450, 'blue','blue', {shape: shapeBlue.blueCapture })
      .setScale(0.5).setBounce(1).setVelocity(-2, 6).setMass(400);

      armLeftSprite = this.matter.add.image(300, 200,'armLeftBody', 'armLeftBody',{ shape: shapeArmLeft.armLeft})
      .setMass(0.01).setIgnoreGravity(false).setStatic(false).setScale(0.5).setMass(2750);

      armRightSprite = this.matter.add.image(500, 200,'armRightBody', 'armRightBody',{ shape: shapeArmRight.armRight})
      .setMass(0.01).setIgnoreGravity(false).setStatic(false).setScale(0.5).setMass(2750);

      armConnectRightSprite = this.matter.add.image(800, 500,'armConnectBody', 'armConnectBody',{ shape: shapeArmConnect.armConnect})
      .setMass(0.01).setIgnoreGravity(false).setStatic(false).setScale(0.5).setMass(2750);

      armConnectLeftSprite = this.matter.add.image(600, 500,'armConnectBody', 'armConnectBody',{ shape: shapeArmConnect.armConnect})
      .setMass(0.01).setIgnoreGravity(false).setStatic(false).setScale(0.5).setMass(2750);

      clawBodySprite = this.matter.add.image(300, 700,'clawBody' ,'clawBody', {shape: shapeClaw.clawBody})
      .setScale(0.5).setMass(11000);//.setFixedRotation();

      pipeBodySprite = this.matter.add.image(400, 50, 'pipeBody',{ shape: 'square'})
      .setFixedRotation().setMass(50000000).setIgnoreGravity(true).setStatic(true);

      leftBucket = this.matter.add.image(40,400, 'bucket','bucket', {shape: shapeBucket.glassPanel})
      .setMass(1000).setStatic(true).setScale(0.3);

      rightBucket = this.matter.add.image(955,400, 'bucket', 'bucket', {shape: shapeBucket.glassPanel})
      .setMass(1000).setStatic(true).setScale(0.3);


      greyArrow = this.matter.add.image(50, 300, 'greyArrow', null,)
          .setScale(0.1).setMass(1).setBounce(0).setIgnoreGravity(false)
          .setFixedRotation(true).setSensor(true).setInteractive();

      redArrow = this.matter.add.image(50, 300, 'redArrow', null,)
          .setScale(0.1).setMass(1).setBounce(0).setIgnoreGravity(false)
          .setFixedRotation(true).setSensor(true).setInteractive();
          //Creates Animation for Sprite
      var redAnimation = this.anims.create({
          key: 'walk',
          frames: this.anims.generateFrameNumbers('redMove'),
          frameRate: 6, repeat: -1,
      });

      var greyAnimation = this.anims.create({
            key: 'walk1',
            frames: this.anims.generateFrameNumbers('greyMove'),
            frameRate: 6, repeat: -1
      });

      var greyJumpAnimation = this.anims.create({
            key: 'greyJump',
            frames: this.anims.generateFrameNumbers('greyJump'),
            frameRate: 6, repeat: 1
      });

      //Setting JSON collider for Sprite
        sprite1 = this.matter.add.sprite(600, 300, 'redMove','redMove',{shape: shapeRed.redCapture})
          .setScale(0.25).setMass(400).setBounce(0.7).setFixedRotation(true).setInteractive();
        sprite1.play('walk');

        sprite2 = this.matter.add.sprite(50, 300, 'greyMove','greyMove',{shape: shapeGrey.greyCapture})
          .setScale(0.25).setMass(400).setBounce(0.7).setFriction(0).setFixedRotation(true).setAngularVelocity(0);
        sprite2.play('walk1');

      //Constraints connect 2 Bodies to another by a point
      clawToPipeBody = Phaser.Physics.Matter.Matter.Constraint.create(
      {
        bodyA: pipeBodySprite.body, bodyB: clawBodySprite.body,
        pointA: {x: 0, y: 45 }, pointB: {x: 0, y: -110 },
        length: 8, stiffness: 1
      });
      this.matter.world.add(clawToPipeBody);

      leftConnectToClaw = Phaser.Physics.Matter.Matter.Constraint.create(
      {
        bodyA: armConnectLeftSprite.body, bodyB: clawBodySprite.body,
        pointA: {x: 35, y: 0 }, pointB: {x: -30, y: 70 },length: 4, stiffness: 1
      });
      this.matter.world.add(leftConnectToClaw);

      rightConnectToClaw = Phaser.Physics.Matter.Matter.Constraint.create(
      {
        bodyA: armConnectRightSprite.body, bodyB: clawBodySprite.body,
        pointA: {x: -35, y: 0 }, pointB: {x: 30, y: 70 },length: 4, stiffness: 1
      });
      this.matter.world.add(rightConnectToClaw);

      leftArmToLeftConnect = Phaser.Physics.Matter.Matter.Constraint.create(
      {
        bodyA: armLeftSprite.body, bodyB: armConnectLeftSprite.body,
        pointA: {x: 15, y: -55 }, pointB: {x: -30, y: 0 }, length: 5, stiffness: 1
      });
      this.matter.world.add(leftArmToLeftConnect);

      rightArmToRightConnect = Phaser.Physics.Matter.Matter.Constraint.create(
      {
        bodyA: armRightSprite.body, bodyB: armConnectRightSprite.body,
        pointA: {x: -15, y: -55 }, pointB: {x: 30, y: 0 }, length: 5, stiffness: 1
      });
      this.matter.world.add(rightArmToRightConnect);

      greyArrowToGreyPlayer = Phaser.Physics.Matter.Matter.Constraint.create(
      {
        bodyA: greyArrow.body, bodyB: sprite2.body,
        pointA: {x: 0, y: 0 }, pointB: {x: 0, y: 0 }, length: 70, stiffness: 1
      });
      this.matter.world.add(greyArrowToGreyPlayer);

      rightArmToLeftArm = Phaser.Physics.Matter.Matter.Constraint.create(
      {
        bodyA: armRightSprite.body, bodyB: armLeftSprite.body,
        pointA: {x: -5, y: 55 }, pointB: {x: 0, y: 55 }, length: 150, stiffness: 1
      });
      this.matter.world.add(rightArmToLeftArm);

      leftConnectToRightConnect = Phaser.Physics.Matter.Matter.Constraint.create(
      {
        bodyA: armConnectLeftSprite.body, bodyB: armConnectRightSprite.body,
        pointA: {x: -30, y: 0 }, pointB: {x: 30, y: 0 }, length: 170, stiffness: 1
      });
      this.matter.world.add(leftConnectToRightConnect);

      leftConnectToClawTop = Phaser.Physics.Matter.Matter.Constraint.create(
      {
        bodyA: armConnectLeftSprite.body, bodyB: clawBodySprite.body,
        pointA: {x: -30, y: 0 }, pointB: {x: 0, y: -90 }, length: 200, stiffness: 1
      });
      this.matter.world.add(leftConnectToClawTop);

      rightConnectToClawTop = Phaser.Physics.Matter.Matter.Constraint.create(
      {
        bodyA: armConnectRightSprite.body, bodyB: clawBodySprite.body,
        pointA: {x: 30, y: 0 }, pointB: {x: 0, y: -90 }, length: 200, stiffness: 1
      });
      this.matter.world.add(rightConnectToClawTop);

      this.input.setPollAlways();

    }

    function update()
    {
        greyArrow.thrustLeft(0.5);
        pipeBodySprite.thrustLeft(3);
        //redArrow.thrustLeft(0.01);
        greyJumpTimer = (this.time.now - lastGreyJump) > 550;
        if(greyArrow.y > sprite2.y)
        {
          greyArrow.y = sprite2.y;
        }

        if (this.input.gamepad.total === 0)
        {
            return;
        }

        // Keyboard for Claw Machine
        if (cursors.left.isDown)
        {
            if(rightArmToLeftArm.length > 1)
            {
              rightArmToLeftArm.length = rightArmToLeftArm.length-5;
            }
            if(leftConnectToRightConnect.length > 125)
            {
              leftConnectToRightConnect.length = leftConnectToRightConnect.length-2;
            }
            if(leftConnectToClawTop.length < 220 && rightConnectToClawTop.length < 220)
            {
              leftConnectToClawTop.length = leftConnectToClawTop.length+2;
              rightConnectToClawTop.length = rightConnectToClawTop.length+2;
            }
        }
        if (cursors.right.isDown)
        {
            if(rightArmToLeftArm.length < 200)
            {
              rightArmToLeftArm.length = rightArmToLeftArm.length + 5;
            }
            if(leftConnectToRightConnect.length < 175)
            {
              leftConnectToRightConnect.length = leftConnectToRightConnect.length+2;
            }
            if(leftConnectToClawTop.length > 185 && rightConnectToClawTop.length > 185)
            {
              leftConnectToClawTop.length = leftConnectToClawTop.length-2;
              rightConnectToClawTop.length = rightConnectToClawTop.length-2;
            }
        }

        if (cursors.left.isDown)
        {
            pipeBodySprite.thrustBack(80);
        }
        if (cursors.up.isDown)
        {
          if(clawToPipeBody.length > 6)
          {
            clawToPipeBody.length = clawToPipeBody.length - 5 ;
          }
        }
        if (cursors.right.isDown)
        {
          pipeBodySprite.thrust(100);
        }
        if (cursors.down.isDown)
        {
            //pipeBodySprite.thrustRight(80);
          if(clawToPipeBody.length < 200)
          {
              clawToPipeBody.length = clawToPipeBody.length + 5;
          }
        }


        var pad1 = this.input.gamepad.getPad(0);
        var pad2 = this.input.gamepad.getPad(1);
        //var pad3 = this.input.gamepad.getPad(2);
        //var pad4 = this.input.gamepad.getPad(3);

        if (pad1.axes.length)
        {
            var redAxisH = pad1.axes[0].getValue();
            var redAxisV = pad1.axes[1].getValue();

            sprite1.x += 20 * redAxisH;
            sprite1.y += 20 * redAxisV;

            if(redAxisH > 0)
            {
              redArrow.rotation -= 0.01;
              redLeft = true;
              redRight = false;
            }
            if(redAxisH < 0)
            {
              redArrow.rotation += 0.01;
              redLeft = false;
              redRight = true;
            }
        }

        if(pad1.buttons.length)
        {
            var redButton = pad1.buttons[1].value;

            if (redButton === 1 && !redJump)
            {
                redJump = true;
                sprite1.setVelocityY(-25);
            }
            if (redButton === 0)
            {
                redJump = false;
            }

        }

        if(pad2.axes.length)
        {
            var greyAxisH = pad2.axes[0].getValue();

            if(greyAxisH > 0) //right
            {
              greyArrow.angle += 15;
              if(greyArrow.angle > 90)
              {
                greyArrow.angle = 90;
              }
              greyLeft = true;
              greyRight = false;
            }
            if(greyAxisH < 0) //left
            {
              greyArrow.angle -= 15;
              if(greyArrow.angle < -90)
              {
                greyArrow.angle = -90;
              }
              greyLeft = false;
              greyRight = true;
            }
        }
        if(pad2.buttons.length)
        {
            var greyButton = pad2.buttons[1].value;
            if (greyButton === 1 && greyJumpTimer && !greyJump)
            {
                lastGreyJump = this.time.now;
                sprite2.setVelocityY(-25);
                greyJump = true;
            }
            if (greyButton === 0 )
            {
                greyJump = false;
            }
        }
        if(!redLeft)
        {
          sprite1.flipX = true;
        }

        if(!redRight)
        {
          sprite1.flipX = false;
        }

        if(!greyLeft)
        {
          sprite2.flipX = true;
        }

        if(!greyRight)
        {
          sprite2.flipX = false;
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
