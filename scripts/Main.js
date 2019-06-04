var CustomPipeline2 = new Phaser.Class({

    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
    initialize:

    function CustomPipeline2 (game)
    {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: [
              "precision mediump float;",

              //"in" attributes from our vertex shader
              "varying vec4 outColor;",
              "varying vec2 outTexCoord;",

              //declare uniforms
              "uniform sampler2D u_texture;",
              "uniform float resolution;",
              "uniform float radius;",
              "uniform vec2 dir;",

              "void main() {",
              //this will be our RGBA sum
              "vec4 sum = vec4(0.0);",

              //our original texcoord for this fragment
              "vec2 tc = outTexCoord;",

              //the amount to blur, i.e. how far off center to sample from
              //1.0 -> blur by one pixel
              //2.0 -> blur by two pixels, etc.
              "float blur = radius/resolution;",

              //the direction of our blur
              //(1.0, 0.0) -> x-axis blur
              //(0.0, 1.0) -> y-axis blur
              "float hstep = dir.x;",
              "float vstep = dir.y;",

              //apply blurring, using a 9-tap filter with predefined gaussian weights",

              "sum += texture2D(u_texture, vec2(tc.x - 4.0*blur*hstep, tc.y - 4.0*blur*vstep)) * 0.0162162162;",
              "sum += texture2D(u_texture, vec2(tc.x - 3.0*blur*hstep, tc.y - 3.0*blur*vstep)) * 0.0540540541;",
              "sum += texture2D(u_texture, vec2(tc.x - 2.0*blur*hstep, tc.y - 2.0*blur*vstep)) * 0.1216216216;",
              "sum += texture2D(u_texture, vec2(tc.x - 1.0*blur*hstep, tc.y - 1.0*blur*vstep)) * 0.1945945946;",

              "sum += texture2D(u_texture, vec2(tc.x, tc.y)) * 0.2270270270;",

              "sum += texture2D(u_texture, vec2(tc.x + 1.0*blur*hstep, tc.y + 1.0*blur*vstep)) * 0.1945945946;",
              "sum += texture2D(u_texture, vec2(tc.x + 2.0*blur*hstep, tc.y + 2.0*blur*vstep)) * 0.1216216216;",
              "sum += texture2D(u_texture, vec2(tc.x + 3.0*blur*hstep, tc.y + 3.0*blur*vstep)) * 0.0540540541;",
              "sum += texture2D(u_texture, vec2(tc.x + 4.0*blur*hstep, tc.y + 4.0*blur*vstep)) * 0.0162162162;",
//poop
              //discard alpha for our simple demo,return
              "gl_FragColor =  vec4(sum.rgb, 1.0);",
              "}"

          ].join('\n')
        });
    }
});
var MainMenu ={};

var GameOverScene ={};

GameOverScene.Boot = function()
{

};

GameOverScene.Boot.prototype = ({
//var GameOverScene = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:

    function GameOverScene ()
    {
        Phaser.Scene.call(this, { key: 'gameOver' });
    },

    preload: function ()
    {

    },

    create: function ()
    {
            textGameOver = this.add.text(300, 250, 'Game Over', { font: '20px Arial' })
                .setFontSize(64).setFontStyle('bold')
                .setTint(0xff000f, 0xfff000, 0x0f000f, 0xf00000)
                .setPadding({ left: 66 , right: 66, top : 66, bottom: 66 })
                .setBackgroundColor('#000000');

            this.input.once('pointerdown', function (){
              //  this.scene.add('Boot1', MyGame.Boot, true);
                this.scene.start('myGame');
                console.log('OOF');
                  }, this);
    },

    update: function (time, delta)
    {
          console.log('Game Over Update Screen');
    }

});

var MyGame ={};

function main()
{
  //mass is in grams
  var redLeft = false;
  var redRight = true;
  var redJump = false;

  var greyLeft = false;
  var greyRight = true;
  var greyJump = false;

  var computerID;

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
          MyGame,
          GameOverScene,
          MainMenu,
          preload: preload,
          create: create,
          update: update,
          physics:{
                  arcade: { debug: true, gravity: { y: 60 }, collideWorldBounds: true },
                  matter: { debug: true, gravity: { y: 9.78 } },
                  impact: { debug: true }},
                },
        audio: {
            disableWebAudio: true
        }
    };

    Phaser.Scene.call(this, { key: 'myGame' });

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
    var backgroundSprite;
    var floorSprite;

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
    var time = 0;

    var cursors;
    var keys;
    var music;
    var textTimer;
    var timer = 180;
    var nextTimer = 30;
    var textLives;
    var lives = 5;
    var textGameOver;
    var greyJumpTimer = true;
    var lastGreyJump = 0;
    var textBool = false;
    var pinkTimer = 1.2;
    var pinkJumpTimer = 4;

    var game = new Phaser.Game(config);

    //game.scene.add('Boot1', MyGame.Boot, false);
    game.scene.add('Boot', GameOverScene.Boot, false);
    //game.scene.add('gameOver', GameOverScene, true, { x: 400, y: 300 });

    function preload()
    {
      //Favicon image Function
      setInterval(function() { iconChange();}, 10);


      customPipeline = game.renderer.addPipeline('Custom', new CustomPipeline2(game));
      customPipeline.setFloat1('resolution', game.config.width, game.config.height);
      customPipeline.setFloat1('radius', 1.0);
      customPipeline.setFloat2('dir', 1.0, 1.0);

      //Loading in test music
      this.load.audio('test', ['audio/musicTest.mp3', 'audio/musicTest.ogg']);

      //loads image by ("Name your giving to sprite" , "the sprite location" , "JSON file location")
      //player Sprites
      this.load.image('red', 'Sprite/redCapture.png','Sprite/physics/redShape.json');
      this.load.image('grey', 'Sprite/greyCapture.png','Sprite/physics/greyShape.json');
      this.load.image('green', 'Sprite/greenCapture.png','Sprite/physics/greenShape.json');
      this.load.image('yellow', 'Sprite/yellowCapture.png','Sprite/physics/yellowShape.json');
      this.load.image('pink', 'Sprite/pinkCapture.png', 'Sprite/physics/pinkShape.json');
      this.load.image('blue', 'Sprite/blueCapture.png', 'Sprite/physics/blueShape.json' );
      this.load.image('white', 'Sprite/base.png', 'Sprite/physics/pinkShape.json');
      this.load.image('clawBody', 'Sprite/clawBody.png', 'Sprite/physics/clawBodyShape.json');

      this.load.image('armLeftBody', 'Sprite/armLeft.png', 'Sprite/physics/armLeftShape.json');
      this.load.image('armRightBody', 'Sprite/armRight.png', 'Sprite/physics/armRightShape.json');
      this.load.image('armConnectBody', 'Sprite/armConnect.png', 'Sprite/physics/armConnectShape.json');
      this.load.image('bucket', 'Sprite/glassPanel.png', 'Sprite/physics/glassPrison.json');
      this.load.image('background', 'Sprite/background.png');
      this.load.image('floor', 'Sprite/floor.png');

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
      var self = this;
      this.socket = io();
      this.otherPlayers = this.add.group();
      this.socket.on('getSocketID', function (tempVar)
      {
        computerID = tempVar;
      });
      cursors = this.input.keyboard.createCursorKeys();
      keys = this.input.keyboard.addKeys('W,A,S,D,I,J,K,L');

      var Bodies = Phaser.Physics.Matter.Matter.Bodies;

      var rectA1 = Bodies.rectangle(0, 0, 50, 14);
      var rectA2 = Bodies.rectangle(0, 0, 14, 50);
      var circleA1 = Bodies.circle(-10, 0, 14);
      var circleA2 = Bodies.circle(10, 0, 14);
      var circleA3 = Bodies.circle(0, -10, 14);
      var circleA4 = Bodies.circle(0, 10, 14);

      var rectB1 = Bodies.rectangle(0, 0, 50, 14);
      var rectB2 = Bodies.rectangle(0, 0, 14, 50);
      var circleB1 = Bodies.circle(-10, 0, 14);
      var circleB2 = Bodies.circle(10, 0, 14);
      var circleB3 = Bodies.circle(0, -10, 14);
      var circleB4 = Bodies.circle(0, 10, 14);

      var rectC1 = Bodies.rectangle(0, 0, 50, 14);
      var rectC2 = Bodies.rectangle(0, 0, 14, 50);
      var circleC1 = Bodies.circle(-10, 0, 14);
      var circleC2 = Bodies.circle(10, 0, 14);
      var circleC3 = Bodies.circle(0, -10, 14);
      var circleC4 = Bodies.circle(0, 10, 14);

      var rectD1 = Bodies.rectangle(0, 0, 50, 14);
      var rectD2 = Bodies.rectangle(0, 0, 14, 50);
      var circleD1 = Bodies.circle(-10, 0, 14);
      var circleD2 = Bodies.circle(10, 0, 14);
      var circleD3 = Bodies.circle(0, -10, 14);
      var circleD4 = Bodies.circle(0, 10, 14);

      var rectE1 = Bodies.rectangle(0, 0, 50, 14);
      var rectE2 = Bodies.rectangle(0, 0, 14, 50);
      var circleE1 = Bodies.circle(-10, 0, 14);
      var circleE2 = Bodies.circle(10, 0, 14);
      var circleE3 = Bodies.circle(0, -10, 14);
      var circleE4 = Bodies.circle(0, 10, 14);


      var compoundBody = Phaser.Physics.Matter.Matter.Body.create(
        {parts: [ rectA1, rectA2, circleA1, circleA2, circleA3, circleA4 ]});
      var compoundBody2 = Phaser.Physics.Matter.Matter.Body.create(
        {parts: [ rectB1, rectB2, circleB1, circleB2, circleB3, circleB4 ]});
      var compoundBody3 = Phaser.Physics.Matter.Matter.Body.create(
        {parts: [ rectC1, rectC2, circleC1, circleC2, circleC3, circleC4 ]});
      var compoundBody4 = Phaser.Physics.Matter.Matter.Body.create(
        {parts: [ rectD1, rectD2, circleD1, circleD2, circleD3, circleD4 ]});
      var compoundBody5 = Phaser.Physics.Matter.Matter.Body.create(
        {parts: [ rectE1, rectE2, circleE1, circleE2, circleE3, circleE4 ]});

      //var block = this.matter.add.image(150, 0, 'block');
      //block.setExistingBody(compoundBody);

      //music create
      music = this.sound.add('test');
      music.play();

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

      backgroundSprite = this.add.image(500,300,'background').setScale(1.15).setAlpha(0.4);
      floorSprite = this.matter.add.image(500,930,'floor',{ shape: 'square'}).setScale(1.1).setAlpha(1).setStatic(true);

      pinkTest = this.matter.add.image(250, 400, 'pink','pink',{shape: shapePink.pinkCapture })
      .setScale(0.2).setBounce(0.6).setDensity(100).setMass(400).setFixedRotation(true);

      pinkTest.setExistingBody(compoundBody3);
      pinkTest.setPosition(250, 400).setScale(0.2).setMass(400)
      .setDensity(10).setBounce(0.7).setFixedRotation(true).setInteractive();

      blueTest = this.matter.add.image(450, 450, 'blue','blue', {shape: shapeBlue.blueCapture })
      .setFixedRotation(true).setScale(0.2).setBounce(0.6).setDensity(100).setMass(400);

      armLeftSprite = this.matter.add.image(300, 400,'armLeftBody', 'armLeftBody',{ shape: shapeArmLeft.armLeft})
      .setMass(0.01).setIgnoreGravity(false).setStatic(false).setScale(0.5).setDensity(1000).setMass(2750);

      armRightSprite = this.matter.add.image(500, 400,'armRightBody', 'armRightBody',{ shape: shapeArmRight.armRight})
      .setIgnoreGravity(false).setStatic(false).setScale(0.5).setDensity(1000).setMass(2750);

      armConnectRightSprite = this.matter.add.image(800, 500,'armConnectBody', 'armConnectBody',{ shape: shapeArmConnect.armConnect})
      .setIgnoreGravity(false).setStatic(false).setScale(0.5).setDensity(100).setMass(2750);

      armConnectLeftSprite = this.matter.add.image(600, 400,'armConnectBody', 'armConnectBody',{ shape: shapeArmConnect.armConnect})
      .setIgnoreGravity(false).setStatic(false).setScale(0.5).setMass(2750);

      clawBodySprite = this.matter.add.image(400, 210,'clawBody' ,'clawBody', {shape: shapeClaw.clawBody})
      .setScale(0.5).setMass(11000);//.setFixedRotation();

      pipeSprite = this.matter.add.image(460, 50, 'pipe',{ shape: 'square'})
      .setFixedRotation().setScale(0.6).setMass(50000000).setIgnoreGravity(true).setStatic(true);

      pipeBodySprite = this.matter.add.image(400, 50, 'pipeBody',{ shape: 'square'})
      .setFixedRotation().setScale(0.7).setMass(22000).setIgnoreGravity(true).setStatic({x:false, y:true});

      //Setting JSON collider for Sprite
      sprite1 = this.matter.add.sprite(600, 300, 'redMove','redMove',{shape: shapeRed.redCapture})
      .setScale(0.2).setMass(400).setDensity(10).setBounce(0.7).setFixedRotation(true).setInteractive();
      sprite1.setExistingBody(compoundBody2);

      sprite1.setPosition(600,300).setScale(0.2).setMass(400)
      .setDensity(10).setBounce(0.7).setFixedRotation(true).setInteractive();

      sprite2 = this.matter.add.sprite(300, 500, 'greyMove','greyMove',{shape: shapeGrey.greyCapture})
      .setScale(0.2).setMass(400).setBounce(0.7).setFriction(0).setFixedRotation(true).setAngularVelocity(0);
      sprite2.setExistingBody(compoundBody);

      sprite2.setPosition(300,500).setScale(0.2).setMass(400)
      .setBounce(0.7).setFriction(0).setFixedRotation(true).setAngularVelocity(0);

      leftBucket = this.matter.add.image(-15,570, 'bucket','bucket', {shape: shapeBucket.glassPanel})
      .setMass(1000).setStatic(true).setDensity(1000000).setScale(0.5);

      rightBucket = this.matter.add.image(980,570, 'bucket', 'bucket', {shape: shapeBucket.glassPanel})
      .setMass(1000).setStatic(true).setDensity(1000000).setScale(0.5);

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
            frameRate: 8, repeat: -1
      });

        sprite1.play('walk');
        sprite2.play('walk1');

        this.cameras.main.setRenderToTexture(customPipeline);

        var extracam = this.cameras.add();
        this.cameras.main.ignore(pinkTest);
        extracam.ignore(backgroundSprite);

      //Constraints connect 2 Bodies to another by a point
      clawToPipeBody = Phaser.Physics.Matter.Matter.Constraint.create(
      {
        bodyA: pipeBodySprite.body, bodyB: clawBodySprite.body,
        pointA: {x: 0, y: 35 }, pointB: {x: 0, y: -110 },
        length: 18, stiffness: 1
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

      textTimer = this.add.text(30, 100, 'Timer: ' + timer, { font: '20px Arial' }).setFontSize(20);
      textTimer.setTint(0xff000f, 0xfff000, 0x0f000f, 0xf00000);
      textLives = this.add.text(30, 120, 'Lives: ' + lives).setFontSize(20);
      textLives.setTint(0xff000f, 0xfff000, 0x00000f, 0xf00000);

      //var tween = this.tweens.add({
      //    targets: pinkTest,
      //    props: {
      //        x: { value: '+=600', duration: 3000, yoyo: true, repeat: -1, ease: 'Power1', repeat: -1 },
      //        y: { value: '-=64', duration: 600, yoyo: true, repeat: -1, ease: 'Power1' } },
      //    delay: 1000
      //});


      this.socket.on('redMoved', function (redData)
      {
        sprite1.setPosition(redData.x, redData.y);
      });

      this.socket.on('greyMoved', function (greyData)
      {
        sprite2.setPosition(greyData.x, greyData.y);
      });
      this.socket.on('greyArrowMoved', function (greyArrowData)
      {
        greyArrow.setPosition(greyArrowData.x, greyArrowData.y);
        greyArrow.setAngle(greyArrowData.angle);
      });

      this.input.setPollAlways();

    }

    function update()
    {
      var player = 1;

      Math.trunc(pinkTimer = pinkTimer - 0.02);
      Math.trunc(pinkJumpTimer = pinkJumpTimer - 0.02);

      if(pinkJumpTimer <= 0)
      {
          pinkTest.setVelocityY(Math.floor((Math.random() * 35) + 30));
          pinkJumpTimer = 4;
      }
      if(pinkTimer <= 0)

      {
          pinkTest.setVelocityX(Math.floor((Math.random() * 75) + -37));
          pinkTimer = 1.2;
      }

      textTimer.setText([ 'Timer: ' + Math.trunc(timer = timer - 0.02) ]);

      if(timer < 0)
      {
        this.scene.pause();

        game.scene.start('Boot', GameOverScene.Boot, true);
        //this.events.on('pause', function (){
            if(timer > 0)
            {
              game.scene.start('Boot1', MyGame.Boot, true);
              console.log('Poop')
              this.scene.resume();
            }
            timer = 4;
        //})
          //this.scene.resume();
      }



      customPipeline.setFloat1('time', time);
      //time += 0.005;

        greyArrow.thrustLeft(0.5);
        pipeBodySprite.thrustLeft(3);
        //redArrow.thrustLeft(0.01);
        //Client.sendPosition(sprite2.x, sprite2.y);

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
              rightArmToLeftArm.length = rightArmToLeftArm.length + 7;
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

        if (keys.A.isDown)
        {
            pipeBodySprite.thrustBack(80);
            if(pipeBodySprite.x > 50)
            {
              pipeBodySprite.x = pipeBodySprite.x - 5;
            }
        }
        if (cursors.up.isDown)
        {
          if(clawToPipeBody.length > 8)
          {
            clawToPipeBody.length = clawToPipeBody.length - 5 ;
          }
        }
        if (keys.D.isDown)
        {
          if(pipeBodySprite.x < 950)
          {
            pipeBodySprite.x = pipeBodySprite.x + 5;
          }
        }
        if (cursors.down.isDown)
        {
            //pipeBodySprite.thrustRight(80);
          if(clawToPipeBody.length < 215)
          {
              clawToPipeBody.length = clawToPipeBody.length + 5;
          }
        }


        var pad1 = this.input.gamepad.getPad(0);
        var pad2 = this.input.gamepad.getPad(1);
        //var pad3 = this.input.gamepad.getPad(2);
        //var pad4 = this.input.gamepad.getPad(3);
        this.socket.emit('requestSocketID');
        this.socket.on('passSocketID', function(socketID)
        {
          if (pad1.axes.length && computerID === socketID.firstConnection)
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

          if(pad1.buttons.length && computerID === socketID.firstConnection)
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
          if(pad2.axes.length && computerID === socketID.secondConnection)
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
          if(pad2.buttons.length && computerID === socketID.secondConnection)
          {
              var greyButton = pad2.buttons[1].value;
              if (greyButton === 1 && greyJumpTimer && !greyJump)
              {
                  sprite2.anims.play('greyJump');
                  lastGreyJump = this.time.now;
                  sprite2.setVelocityY(-25);
                  greyJump = true;
              }
              if (greyButton === 0 )
              {
                  greyJump = false;
                  sprite2.anims.play('walk1', true);
              }
          }
      });

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


        if(sprite1)
        {
          var redX = sprite1.x;
          var redY = sprite1.y;
          if (sprite1.oldPosition && (redX !== sprite1.oldPosition.x || redY !== sprite1.oldPosition.y))
          {
            this.socket.emit('redMovement', { x: sprite1.x, y: sprite1.y});
          }

          // save old position data
          sprite1.oldPosition = {
            x: sprite1.x,
            y: sprite1.y
          };
        }

        if(sprite2)
        {
          var greyX = sprite2.x;
          var greyY = sprite2.y;
          if (sprite2.oldPosition && (greyX !== sprite2.oldPosition.x || greyY !== sprite2.oldPosition.y))
          {
            this.socket.emit('greyMovement', { x: sprite2.x, y: sprite2.y});
          }

          // save old position data
          sprite2.oldPosition = {
            x: sprite2.x,
            y: sprite2.y
          };
        }
        if(greyArrow)
        {
          var greyArrowX = greyArrow.x;
          var greyArrowY = greyArrow.y;
          var greyArrowAngle = greyArrow.angle;
          if (greyArrow.oldPosition && (greyArrowX !== greyArrow.oldPosition.x || greyArrowY !== greyArrow.oldPosition.y || greyArrowAngle !== greyArrow.oldPosition.angle))
          {
            this.socket.emit('greyArrowMovement', { x: greyArrow.x, y: greyArrow.y, angle: greyArrow.angle});
          }

          // save old position data
          greyArrow.oldPosition = {
            x: greyArrow.x,
            y: greyArrow.y,
            angle: greyArrow.angle
          };
        }
    }


}
