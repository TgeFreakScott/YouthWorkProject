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

              "gl_FragColor =  vec4(sum.rgb, 1.0);",
              "}"

          ].join('\n')
        });
    }
});


var Preloader = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:

    function Preloader ()
    {
        Phaser.Scene.call(this, { key: 'preloader' });
    },

    preload: function ()
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

      //yes/no/maybe sprites
      this.load.image('yes', 'Sprite/yes.png');
      this.load.image('no', 'Sprite/no.png');
      this.load.image('maybe', 'Sprite/maybe.png');

      this.load.image('greyArrow', 'Sprite/greyArrow.png');
      this.load.image('blueArrow', 'Sprite/blueArrow.png');
      this.load.image('yellowArrow', 'Sprite/yellowArrow.png');
      this.load.image('greenArrow', 'Sprite/greenArrow.png');
      this.load.image('pinkArrow', 'Sprite/pinkArrow.png');
      this.load.image('redArrow', 'Sprite/greenArrow.png');

      this.load.image('yes', 'Sprite/yes.png');
      this.load.image('no', 'Sprite/no.png');
      this.load.image('maybe', 'Sprite/maybe.png');
      this.load.image('connectScreen', 'Sprite/PlayerEnter.png');
      this.load.spritesheet('enter', 'Sprite/tick.png',{ frameWidth: 455, frameHeight: 480 });
      this.load.spritesheet('notEnter', 'Sprite/x.png',{ frameWidth: 455, frameHeight: 455 });

      //Loading in animated Sprites
      this.load.spritesheet('redMove', 'Sprite/redPlayer.png', { frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('greyMove' ,'Sprite/greyPlayer.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('pinkMove' ,'Sprite/pinkPlayer.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('yellowMove' ,'Sprite/yellowPlayer.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('blueMove' ,'Sprite/bluePlayer.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('greenMove' ,'Sprite/greenPlayer.png' ,{ frameWidth: 331, frameHeight: 294 });

      this.load.spritesheet('greyJump' ,'Sprite/greyJump.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('redJump' ,'Sprite/redJump.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('pinkJump' ,'Sprite/pinkJump.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('yellowJump' ,'Sprite/yellowJump.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('blueJump' ,'Sprite/blueJump.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('greenJump' ,'Sprite/greenJump.png' ,{ frameWidth: 331, frameHeight: 294 });

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
    },

    create: function ()
    {
        console.log('%c Preloader ', 'background: green; color: white; display: block;');
        this.scene.start('playerenter');
    }

});

var playerOneEnter = false;
var playerTwoEnter = false;
var playerThreeEnter = false;
var playerFourEnter = false;
var playerFiveEnter = false;
var playerSixEnter = false;
var playerSevenEnter = false;
var playerEightEnter = false;
var playerConnectBG;
var playerOneIcon;
var playerTwoIcon;
var playerThreeIcon;
var playerFourIcon;
var playerFiveIcon;
var playerSixIcon;
var playerSevenIcon;
var playerEightIcon;
var firstSocket = 0;
var secondSocket = 0;

var PlayerEnter = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:

    function PlayerEnter ()
    {
        Phaser.Scene.call(this, { key: 'playerenter' });
        window.MENU = this;
        this.controls;
    },

    create: function ()
    {
      var self = this;
      this.socket = io();
      this.socket.on('getSocketID', function (tempVar)
      {
        computerID = tempVar;
      });
      playerConnectBG = this.add.image(500,300,'connectScreen').setScale(1).setAlpha(1);
      playerOneIcon = this.add.sprite(100,210,'notEnter').setScale(0.1).setAlpha(1);
      playerTwoIcon = this.add.sprite(275,210,'notEnter').setScale(0.1).setAlpha(1);
      playerThreeIcon = this.add.sprite(425,210,'notEnter').setScale(0.1).setAlpha(1);
      playerFourIcon = this.add.sprite(575,210,'notEnter').setScale(0.1).setAlpha(1);
      playerFiveIcon = this.add.sprite(725,210,'notEnter').setScale(0.1).setAlpha(1);
      playerSixIcon = this.add.sprite(875,250,'notEnter').setScale(0.1).setAlpha(1);
      playerSevenIcon = this.add.sprite(875,306,'notEnter').setScale(0.1).setAlpha(1);
      playerEightIcon = this.add.sprite(875,360,'notEnter').setScale(0.1).setAlpha(1);
      var changeToX = this.anims.create({
          key: 'notEntered',
          frames: this.anims.generateFrameNumbers('notEnter'),
          frameRate: 8, repeat: 0,
      });
      var changeToTick = this.anims.create({
            key: 'entered',
            frames: this.anims.generateFrameNumbers('enter'),
            frameRate: 8, repeat: 0
      });
      playerOneIcon.play('notEntered');
      playerTwoIcon.play('notEntered');
      playerThreeIcon.play('notEntered');
      playerFourIcon.play('notEntered');
      playerFiveIcon.play('notEntered');
      playerSixIcon.play('notEntered');
      playerSevenIcon.play('notEntered');
      playerEightIcon.play('notEntered');
      this.socket.on('playerOneConnected', function(playerOneEntered)
      {
        playerOneEnter = playerOneEntered;
      });
      this.socket.on('playerTwoConnected', function(playerTwoEntered)
      {
        playerTwoEnter = playerTwoEntered;
      });
      this.socket.on('playerThreeConnected', function(playerThreeEntered)
      {
        playerThreeEnter = playerThreeEntered;
      });
      this.socket.on('playerFourConnected', function(playerFourEntered)
      {
        playerFourEnter = playerFourEntered;
      });
      this.socket.on('playerFiveConnected', function(playerFiveEntered)
      {
        playerFiveEnter = playerFiveEntered;
      });
      this.socket.on('playerSixConnected', function(playerSixEntered)
      {
        playerSixEnter = playerSixEntered;
      });
      this.socket.on('playerSevenConnected', function(playerSevenEntered)
      {
        playerSevenEnter = playerSevenEntered;
      });
      this.socket.on('playerEightConnected', function(playerEightEntered)
      {
        playerEightEnter = playerEightEntered;
      });
      console.log('%c PlayerEnter ', 'background: green; color: white; display: block;');

    },

    update: function(time, delta)
    {
      var self = this;
      if (this.input.gamepad.total === 0)
      {
          return;
      }
      var pad1 = this.input.gamepad.getPad(0);
      var pad2 = this.input.gamepad.getPad(1);
      var pad3 = this.input.gamepad.getPad(2);
      var pad4 = this.input.gamepad.getPad(3);
      console.log('%c Updating Player Enter ', 'background: green; color: white; display: block;');
      this.socket.emit('requestSocketID');
      this.socket.on('passSocketID', function(socketID)
      {
        //if(firstSocket !==0 && secondSocket !== 0)
        //{
          //First Computer
          if(pad1.buttons.length && computerID === socketID.firstConnection)
          {
            var a1 = pad1.buttons[1].value;
            if (a1 === 1 && !playerOneEnter)
            {
                console.log("Player 1 entered");
                playerOneEnter = true;
                self.socket.emit('playerOneConnect', playerOneEnter);
            }
          }

          if(pad2.buttons.length && computerID === socketID.firstConnection)
          {
            var a2 = pad2.buttons[1].value;
            if (a2 === 1 && !playerTwoEnter)
            {
                console.log("Player 2 entered");
                playerTwoEnter = true;
                self.socket.emit('playerTwoConnect', playerTwoEnter);
            }
          }

          if(pad3.buttons.length && computerID === socketID.firstConnection)
          {
            var a3 = pad3.buttons[1].value;
            if (a3 === 1 && !playerThreeEnter)
            {
                console.log("Player 3 entered");
                playerThreeEnter = true;
                self.socket.emit('playerThreeConnect', playerThreeEnter);
            }
          }

          if(pad4.buttons.length && computerID === socketID.firstConnection)
          {
            var a4 = pad4.buttons[1].value;
            if (a4 === 1 && !playerFourEnter)
            {
                console.log("Player 4 entered");
                playerFourEnter = true;
                self.socket.emit('playerFourConnect', playerFourEnter);
            }
          }

          //Second Computer
          if (pad1.buttons.length && computerID === socketID.secondConnection)
          {
            var a5 = pad1.buttons[1].value;
            if (a5 === 1 && !playerFiveEnter)
            {
                console.log("Player 5 entered");
                playerFiveEnter = true;
                self.socket.emit('playerFiveConnect', playerFiveEnter);
            }
          }

          if (pad2.buttons.length && computerID === socketID.secondConnection)
          {
            var a6 = pad2.buttons[1].value;
            if (a6 === 1 && !playerSixEnter)
            {
                console.log("Player 6 entered");
                playerSixEnter = true;
                self.socket.emit('playerSixConnect', playerSixEnter);
            }
          }

          if (pad3.buttons.length && computerID === socketID.secondConnection)
          {
            var a7 = pad3.buttons[1].value;
            if (a7 === 1 && !playerSevenEnter)
            {
                console.log("Player 7 entered");
                playerSevenEnter = true;
                self.socket.emit('playerSevenConnect', playerSevenEnter);
            }
          }

          if(pad4.buttons.length && computerID === socketID.secondConnection)
          {
            var a8 = pad4.buttons[1].value;
            if (a8 === 1 && !playerEightEnter)
            {
                console.log("Player 8 entered");
                playerEightEnter = true;
                self.socket.emit('playerEightConnect', playerEightEnter);
            }
          }
        //}
      });
    if(playerOneEnter)
    {
      playerOneIcon.play('entered');
    }
    if(playerTwoEnter)
    {
      playerTwoIcon.play('entered');
    }
    if(playerThreeEnter)
    {
      playerThreeIcon.play('entered');
    }
    if(playerFourEnter)
    {
      playerFourIcon.play('entered');
    }
    if(playerFiveEnter)
    {
      playerFiveIcon.play('entered');
    }
    if(playerSixEnter)
    {
      playerSixIcon.play('entered');
    }
    if(playerSevenEnter)
    {
    playerSevenIcon.play('entered');
    }
    if(playerEightEnter)
    {
      playerEightIcon.play('entered');
    }

    if(playerOneEnter && playerTwoEnter && playerThreeEnter && playerFourEnter && playerFiveEnter && playerSixEnter && playerSevenEnter && playerEightEnter)
    {
      console.log("Move to game screen");
      this.scene.start('game', { port: this.socket, socket: computerID});
    }
  }
});

var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:

    function MainMenu ()
    {
        Phaser.Scene.call(this, { key: 'mainmenu' });
        window.MENU = this;
    },

    create: function ()
    {
        console.log('%c MainMenu ', 'background: green; color: white; display: block;');

        //var bg = this.add.image(0, 0, 'buttonBG');
        //var text = this.add.image(0, 0, 'buttonText');
        //var container = this.add.container(400, 300, [ bg, text ]);

        //bg.setInteractive();
        //bg.once('pointerup', function(){ this.scen e.start('game'); }, this);

    }

});

var GameOverScene = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:

    function GameOverScene ()
    {
        Phaser.Scene.call(this, { key: 'gameOver' });
    },

    create: function ()
    {


      console.log('%c GameOver ', 'background: green; color: white; display: block;');

            textGameOver = this.add.text(300, 250, 'Game Over', { font: '20px Arial' })
                .setFontSize(64).setFontStyle('bold')
                .setTint(0xff000f, 0xfff000, 0x0f000f, 0xf00000)
                .setPadding({ left: 66 , right: 66, top : 66, bottom: 66 })
                .setBackgroundColor('#000000');

            this.input.once('pointerdown', function (){
                this.scene.start('youthelement');
                console.log('pointer press');
                  }, this);
    },

    update: function (time, delta)
    {
          console.log('Game Over Update Screen');
    }

});

var yesSprite;
var noSprite;
var maybeSprite;

var YouthElement = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:

    function YouthElement ()
    {
        Phaser.Scene.call(this, { key: 'youthelement' });
        window.MENU = this;
        this.controls;
    },



    create: function ()
    {
      yesSprite = this.add.image(100,100, 'yes').setScale(1);
      noSprite = this.add.image(150,150, 'no').setScale(1);
      maybeSprite = this.add.image(200,200, 'maybe').setScale(1);

        console.log('%c YouthElement ', 'background: green; color: white; display: block;');
    },

    update: function (time, delta)
    {
          console.log('Youth Element Screen');

    }

});

function iconChange()
{
  setTimeout(function(){ document.getElementById("icon").href = "Sprite/frame_0.png";}, 1000);
  setTimeout(function(){ document.getElementById("icon").href = "Sprite/frame_1.png";}, 2000);
  setTimeout(function(){ document.getElementById("icon").href = "Sprite/frame_2.png";}, 3000);
  setTimeout(function(){ document.getElementById("icon").href = "Sprite/frame_3.png";}, 4000);
}

//mass is in grams

var greyLeft = false;
var greyRight = true;
var greyJump = false;

var blueLeft = false;
var blueRight = true;
var blueJump = false;

var yellowLeft = false;
var yellowRight = true;
var yellowJump = false;

var greenLeft = false;
var greenRight = true;
var greenJump = false;

var pinkLeft = false;
var pinkRight = true;
var pinkJump = false;

var computerID;
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

var redTest;
var pinkPlayer;
var greyPlayer;
var bluePlayer;
var yellowPlayer;
var greenPlayer;

var greyArrowToGreyPlayer;
var blueArrowToBluePlayer;
var yellowArrowToYellowPlayer;
var greenArrowToGreenPlayer;

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
var blueArrow;
var yellowArrow;
var greenArrow;
var pinkArrow;
var rotationValue = 0.1;
var pipeTime = 0;

var cursors;
var keys;
var music;
var textTimer;
var timer = 60;
var nextTimer = 30;
var textLives;
var lives = 5;
var textGameOver;
var greyJumpTimer = true;
var lastGreyJump = 0;
var blueJumpTimer = true;
var lastBlueJump = 0;
var yellowJumpTimer = true;
var lastYellowJump = 0;
var greenJumpTimer = true;
var lastGreenJump = 0;
var pinkJumpTimer = true;
var lastPinkJump = 0;
var textBool = false;
var pinkTimer = 1.2;

var speed = Phaser.Math.GetSpeed(400, 1);
var fps = 60/1000;


var Game = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:

    function Game()
    {
        Phaser.Scene.call(this, { key: 'game' });
        window.GAME = this;
        this.controls;
    },

    init: function (data)
    {
        console.log('init', data);
        this.socket = data.port;
        computerID = data.socket;
    },

    create: function ()
    {
        console.log('%c Game ', 'background: green; color: white; display: block;');

        this.matter.world.setBounds();
        var self = this;

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

        var rectF1 = Bodies.rectangle(0, 0, 50, 14);
        var rectF2 = Bodies.rectangle(0, 0, 14, 50);
        var circleF1 = Bodies.circle(-10, 0, 14);
        var circleF2 = Bodies.circle(10, 0, 14);
        var circleF3 = Bodies.circle(0, -10, 14);
        var circleF4 = Bodies.circle(0, 10, 14);

        var rectCaptureBoxA1 = Bodies.rectangle(160, 90, 330, 14);
        var rectCaptureBoxB1 = Bodies.rectangle( 0, 0, 14, 190);
        var circCaptureBoxC1 = Bodies.circle(90, 0, 80, { isSensor: true, label: 'top' });

        var rectCaptureBoxA2 = Bodies.rectangle( 0, 0, 14, 190);
        var rectCaptureBoxB2 = Bodies.rectangle(-160, 90, 330, 14);
        var circCaptureBoxC2 = Bodies.circle(-90, 0, 80, { isSensor: true, label: 'top' });

        var compoundCaptureBox1 = Phaser.Physics.Matter.Matter.Body.create(
          {parts: [ rectCaptureBoxA1, rectCaptureBoxB1, circCaptureBoxC1 ]});
        var compoundCaptureBox2 = Phaser.Physics.Matter.Matter.Body.create(
          {parts: [ rectCaptureBoxA2, rectCaptureBoxB2, circCaptureBoxC2 ]});

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
        var compoundBody6 = Phaser.Physics.Matter.Matter.Body.create(
          {parts: [ rectF1, rectF2, circleF1, circleF2, circleF3, circleF4 ]});

        //music create
        music = this.sound.add('test');
        music.play();

        // Naming Scheme givin to JSON file
        var shapeClaw = this.cache.json.get('clawShape');
        var shapeBlue = this.cache.json.get('blueShape');
        var shapePink = this.cache.json.get('pinkShape');
        var shapeGrey = this.cache.json.get('greyShape');
        var shapeRed = this.cache.json.get('redShape');
        var shapeGreen = this.cache.json.get('greenShape');
        var shapeYellow = this.cache.json.get('yellowShape');

        var shapeArmLeft = this.cache.json.get('armLeftShape');
        var shapeArmRight = this.cache.json.get('armRightShape');
        var shapeArmConnect = this.cache.json.get('armConnectShape');
        var shapeBucket = this.cache.json.get('bucketShape');

        backgroundSprite = this.add.image(500,300,'background').setScale(1.15).setAlpha(0.4);
        floorSprite = this.matter.add.image(500,930,'floor',{ shape: 'square'}).setScale(1.1).setAlpha(1).setStatic(true);

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
        redTest = this.matter.add.sprite(600, 300, 'redMove','redMove',{shape: shapeRed.redCapture})
        .setScale(0.2).setMass(400).setDensity(10).setBounce(0.7).setFixedRotation(true).setInteractive();
        redTest.setExistingBody(compoundBody2);
        redTest.setPosition(600,300).setScale(0.2).setMass(400)
        .setDensity(10).setBounce(0.7).setFixedRotation(true).setInteractive();

        greyPlayer = this.matter.add.sprite(300, 500, 'greyMove','greyMove',{shape: shapeGrey.greyCapture})
        .setScale(0.2).setMass(400).setBounce(0.7).setFriction(0).setFixedRotation(true).setAngularVelocity(0);
        greyPlayer.setExistingBody(compoundBody);
        greyPlayer.setPosition(300,500).setScale(0.2).setMass(400)
        .setBounce(0.7).setFriction(0).setFixedRotation(true).setAngularVelocity(0);

        bluePlayer = this.matter.add.sprite(300, 500, 'blueMove','blueMove',{shape: shapeGrey.greyCapture})
        .setScale(0.2).setMass(400).setBounce(0.7).setFriction(0).setFixedRotation(true).setAngularVelocity(0);
        bluePlayer.setExistingBody(compoundBody4);
        bluePlayer.setPosition(400,400).setScale(0.2).setMass(400)
        .setBounce(0.7).setFriction(0).setFixedRotation(true).setAngularVelocity(0);

        yellowPlayer = this.matter.add.sprite(300, 500, 'yellowMove','yellowMove',{shape: shapeGrey.greyCapture})
        .setScale(0.2).setMass(400).setBounce(0.7).setFriction(0).setFixedRotation(true).setAngularVelocity(0);
        yellowPlayer.setExistingBody(compoundBody5);
        yellowPlayer.setPosition(200,400).setScale(0.2).setMass(400)
        .setBounce(0.7).setFriction(0).setFixedRotation(true).setAngularVelocity(0);

        greenPlayer = this.matter.add.sprite(300, 500, 'greenMove','greenMove',{shape: shapeGrey.greyCapture})
        .setScale(0.2).setMass(400).setBounce(0.7).setFriction(0).setFixedRotation(true).setAngularVelocity(0);
        greenPlayer.setExistingBody(compoundBody6);
        greenPlayer.setPosition(800,400).setScale(0.2).setMass(400)
        .setBounce(0.7).setFriction(0).setFixedRotation(true).setAngularVelocity(0);

        pinkPlayer = this.matter.add.sprite(250, 400, 'pinkMove','pinkMove',{shape: shapePink.pinkCapture })
        .setScale(0.2).setMass(400).setBounce(0.7).setFriction(0).setFixedRotation(true).setAngularVelocity(0);
        pinkPlayer.setExistingBody(compoundBody3);
        pinkPlayer.setPosition(250, 400).setScale(0.2).setMass(400)
        .setBounce(0.7).setFriction(0).setFixedRotation(true).setAngularVelocity(0);

        leftBucket = this.matter.add.image(-15,570, 'bucket','bucket', {shape: shapeBucket.glassPanel})
        .setMass(1000).setStatic(true).setDensity(1000000).setScale(0.5);

        leftBucket.setExistingBody(compoundCaptureBox2);
        leftBucket.setPosition(70,550)
        .setMass(1000).setStatic(true).setDensity(1000000).setScale(0.5);

         rightBucket = this.matter.add.image(980,570, 'bucket', 'bucket',) // {shape:shapeBucket.glassPanel})
        .setMass(1000).setStatic(true).setDensity(1000000).setScale(0.5);

        rightBucket.setExistingBody(compoundCaptureBox1);
        rightBucket.setPosition(940,550)
        .setMass(1000).setStatic(true).setDensity(1000000).setScale(0.5);

        greyArrow = this.matter.add.image(50, 300, 'greyArrow', null,)
            .setScale(0.1).setMass(1).setBounce(0).setIgnoreGravity(false)
            .setFixedRotation(true).setSensor(true).setInteractive();
        redArrow = this.matter.add.image(50, 300, 'redArrow', null,)
            .setScale(0.1).setMass(1).setBounce(0).setIgnoreGravity(false)
            .setFixedRotation(true).setSensor(true).setInteractive();
        blueArrow = this.matter.add.image(50, 300, 'blueArrow', null,)
            .setScale(0.1).setMass(1).setBounce(0).setIgnoreGravity(false)
              .setFixedRotation(true).setSensor(true).setInteractive();
        yellowArrow = this.matter.add.image(50, 300, 'yellowArrow', null,)
            .setScale(0.1).setMass(1).setBounce(0).setIgnoreGravity(false)
            .setFixedRotation(true).setSensor(true).setInteractive();
        greenArrow = this.matter.add.image(50, 300, 'greenArrow', null,)
            .setScale(0.1).setMass(1).setBounce(0).setIgnoreGravity(false)
            .setFixedRotation(true).setSensor(true).setInteractive();

        pinkArrow = this.matter.add.image(50, 300, 'pinkArrow', null,)
            .setScale(0.1).setMass(1).setBounce(0).setIgnoreGravity(false)
            .setFixedRotation(true).setSensor(true).setInteractive();

        //Creates Animation for Sprite
        //Walking
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

        var blueAnimation = this.anims.create({
            key: 'walk2',
            frames: this.anims.generateFrameNumbers('blueMove'),
            frameRate: 6, repeat: -1,
        });

        var yellowAnimation = this.anims.create({
              key: 'walk3',
              frames: this.anims.generateFrameNumbers('yellowMove'),
              frameRate: 6, repeat: -1
        });

        var greenAnimation = this.anims.create({
            key: 'walk4',
            frames: this.anims.generateFrameNumbers('greenMove'),
            frameRate: 6, repeat: -1,
        });

        var pinkAnimation = this.anims.create({
            key: 'walk5',
            frames: this.anims.generateFrameNumbers('pinkMove'),
            frameRate: 6, repeat: -1,
        });

        //Jumping
        var greyJumpAnimation = this.anims.create({
              key: 'greyJump',
              frames: this.anims.generateFrameNumbers('greyJump'),
              frameRate: 8, repeat: -1
        });

        var blueJumpAnimation = this.anims.create({
              key: 'blueJump',
              frames: this.anims.generateFrameNumbers('blueJump'),
              frameRate: 8, repeat: -1
        });

        var yellowJumpAnimation = this.anims.create({
              key: 'yellowJump',
              frames: this.anims.generateFrameNumbers('yellowJump'),
              frameRate: 8, repeat: -1
        });

        var greenJumpAnimation = this.anims.create({
              key: 'greenJump',
              frames: this.anims.generateFrameNumbers('greenJump'),
              frameRate: 8, repeat: -1
        });

        var redJumpAnimation = this.anims.create({
              key: 'redJump',
              frames: this.anims.generateFrameNumbers('redJump'),
              frameRate: 8, repeat: -1
        });

        var pinkJumpAnimation = this.anims.create({
              key: 'pinkJump',
              frames: this.anims.generateFrameNumbers('pinkJump'),
              frameRate: 8, repeat: -1
        });

          redTest.play('walk');
          greyPlayer.play('walk1');
          bluePlayer.play('walk2');
          yellowPlayer.play('walk3');
          greenPlayer.play('walk4');
          pinkPlayer.play('walk5');

          this.cameras.main.setRenderToTexture(customPipeline);

          var extracam = this.cameras.add();
          this.cameras.main.ignore(pinkPlayer);
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
          bodyA: greyArrow.body, bodyB: greyPlayer.body,
          pointA: {x: 0, y: 0 }, pointB: {x: 0, y: 0 }, length: 70, stiffness: 1
        });
        this.matter.world.add(greyArrowToGreyPlayer);

        blueArrowToBluePlayer = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: blueArrow.body, bodyB: bluePlayer.body,
          pointA: {x: 0, y: 0 }, pointB: {x: 0, y: 0 }, length: 70, stiffness: 1
        });
        this.matter.world.add(blueArrowToBluePlayer);

        yellowArrowToYellowPlayer = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: yellowArrow.body, bodyB: yellowPlayer.body,
          pointA: {x: 0, y: 0 }, pointB: {x: 0, y: 0 }, length: 70, stiffness: 1
        });
        this.matter.world.add(yellowArrowToYellowPlayer);

        greenArrowToGreenPlayer = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: greenArrow.body, bodyB: greenPlayer.body,
          pointA: {x: 0, y: 0 }, pointB: {x: 0, y: 0 }, length: 70, stiffness: 1
        });
        this.matter.world.add(greenArrowToGreenPlayer);

        pinkArrowToPinkPlayer = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: pinkArrow.body, bodyB: pinkPlayer.body,
          pointA: {x: 0, y: 0 }, pointB: {x: 0, y: 0 }, length: 70, stiffness: 1
        });
        this.matter.world.add(pinkArrowToPinkPlayer);

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
        //    targets: pinkPlayer,
        //    props: {
        //        x: { value: '+=600', duration: 3000, yoyo: true, repeat: -1, ease: 'Power1', repeat: -1 },
        //        y: { value: '-=64', duration: 600, yoyo: true, repeat: -1, ease: 'Power1' } },
        //    delay: 1000
        //});

        this.socket.on('redMoved', function (redData)
        {
          redTest.setPosition(redData.x, redData.y);
        });

        this.socket.on('greyMoved', function (greyData)
        {
          greyPlayer.setPosition(greyData.x, greyData.y);
        });
        this.socket.on('greyArrowMoved', function (greyArrowData)
        {
          greyArrow.setPosition(greyArrowData.x, greyArrowData.y);
          greyArrow.setAngle(greyArrowData.angle);
        });

        this.socket.on('blueMoved', function (blueData)
        {
          bluePlayer.setPosition(blueData.x, blueData.y);
        });
        this.socket.on('blueArrowMoved', function (blueArrowData)
        {
          blueArrow.setPosition(blueArrowData.x, blueArrowData.y);
          blueArrow.setAngle(blueArrowData.angle);
        });

        this.socket.on('yellowMoved', function (yellowData)
        {
          yellowPlayer.setPosition(yellowData.x, yellowData.y);
        });
        this.socket.on('yellowArrowMoved', function (yellowArrowData)
        {
          yellowArrow.setPosition(yellowArrowData.x, yellowArrowData.y);
          yellowArrow.setAngle(yellowArrowData.angle);
        });

        this.socket.on('greenMoved', function (greenData)
        {
          greenPlayer.setPosition(greenData.x, greenData.y);
        });
        this.socket.on('greenArrowMoved', function (greenArrowData)
        {
          greenArrow.setPosition(greenArrowData.x, greenArrowData.y);
          greenArrow.setAngle(greenArrowData.angle);
        });

        this.socket.on('pinkMoved', function (pinkData)
        {
          pinkPlayer.setPosition(pinkData.x, pinkData.y);
        });
        this.socket.on('pinkArrowMoved', function (pinkArrowData)
        {
          pinkArrow.setPosition(pinkArrowData.x, pinkArrowData.y);
          pinkArrow.setAngle(pinkArrowData.angle);
        });

        this.socket.on('clawAnchorMoved', function (clawAnchorData)
        {
          pipeBodySprite.setPosition(clawAnchorData.x, clawAnchorData.y);
        });
        this.socket.on('clawBodyMoved', function (clawBodyData)
        {
          clawBodySprite.setPosition(clawBodyData.x, clawBodyData.y);
          clawBodySprite.setAngle(clawBodyData.angle);
        });
        this.socket.on('clawArmLeftMoved', function (clawArmLeftData)
        {
          armConnectLeftSprite.setPosition(clawArmLeftData.x, clawArmLeftData.y);
          armConnectLeftSprite.setAngle(clawArmLeftData.angle);
        });
        this.socket.on('clawArmRightMoved', function (clawArmRightData)
        {
          armConnectRightSprite.setPosition(clawArmRightData.x, clawArmRightData.y);
          armConnectRightSprite.setAngle(clawArmRightData.angle);
        });
        this.socket.on('clawGrabberLeftMoved', function (clawGrabberLeftData)
        {
          armLeftSprite.setPosition(clawGrabberLeftData.x, clawGrabberLeftData.y);
          armLeftSprite.setAngle(clawGrabberLeftData.angle);
        });
        this.socket.on('clawGrabberRightMoved', function (clawGrabberRightData)
        {
          armRightSprite.setPosition(clawGrabberRightData.x, clawGrabberRightData.y);
          armRightSprite.setAngle(clawGrabberRightData.angle);
        });
        this.input.setPollAlways();
    },


    update: function (time, delta)
    {

        //this.controls.update(delta);
        var player = 1;
        var self = this;
        var fps = delta / 100;
        var fps2 = delta / 1000;
        var fps3 = delta / 20;

        textTimer.setText([ 'Timer: ' + Math.trunc(timer -= (0.02 * fps3)) ]);

        if(timer < 0)
        {
            this.scene.start('gameOver')
            timer = 60;
        }

        customPipeline.setFloat1('time', pipeTime);
        //time += 0.005;

          greyArrow.thrustLeft(0.5);
          blueArrow.thrustLeft(0.5);
          yellowArrow.thrustLeft(0.5);
          greenArrow.thrustLeft(0.5);
          pinkArrow.thrustLeft(0.5);
          pipeBodySprite.thrustLeft(3);
          //redArrow.thrustLeft(0.01);
          //Client.sendPosition(greyPlayer.x, greyPlayer.y);

          greyJumpTimer = (this.time.now - lastGreyJump) > 550;
          blueJumpTimer = (this.time.now - lastBlueJump) > 550;
          yellowJumpTimer = (this.time.now - lastYellowJump) > 550;
          greenJumpTimer = (this.time.now - lastGreenJump) > 550;
          pinkJumpTimer = (this.time.now - lastPinkJump) > 550;

          if(greyArrow.y > greyPlayer.y)
          {
            greyArrow.y = greyPlayer.y;
          }

          if(blueArrow.y > bluePlayer.y)
          {
            blueArrow.y = bluePlayer.y;
          }

          if(yellowArrow.y > yellowPlayer.y)
          {
            yellowArrow.y = yellowPlayer.y;
          }

          if(greenArrow.y > greenPlayer.y)
          {
            greenArrow.y = greenPlayer.y;
          }

          if(pinkArrow.y > pinkPlayer.y)
          {
            pinkArrow.y = pinkPlayer.y;
          }

          if (this.input.gamepad.total === 0)
          {
              return;
          }

          var pad1 = this.input.gamepad.getPad(0);
          var pad2 = this.input.gamepad.getPad(1);
          var pad3 = this.input.gamepad.getPad(2);
          var pad4 = this.input.gamepad.getPad(3);
          this.socket.emit('requestSocketID');
          this.socket.on('passSocketID', function(socketID)
          {
            //Computer 1
            //Player 1
            if (pad1.axes.length && computerID === socketID.firstConnection)
            {
              var greyAxisH = pad1.axes[0].getValue();

              if(greyAxisH > 0) //right
              {
                greyArrow.angle += 15 * fps;
                if(greyArrow.angle > 90)
                {
                  greyArrow.angle = 90;
                }
                greyLeft = true;
                greyRight = false;
              }
              if(greyAxisH < 0) //left
              {
                greyArrow.angle -= 15 * fps;
                if(greyArrow.angle < -90)
                {
                  greyArrow.angle = -90;
                }
                greyLeft = false;
                greyRight = true;
              }
            }

            if(pad1.buttons.length && computerID === socketID.firstConnection)
            {
              var greyButton = pad1.buttons[1].value;
              if (greyButton === 1 && greyJumpTimer && !greyJump)
              {
                  greyPlayer.anims.play('greyJump');
                  lastGreyJump = self.time.now;
                  greyPlayer.setVelocityY(-27);
                  greyJump = true;
              }
              if (greyButton === 0 )
              {
                  greyJump = false;
                  greyPlayer.anims.play('walk1', true);
              }
            }

            //Player 2
            if (pad2.axes.length && computerID === socketID.firstConnection)
            {
              var blueAxisH = pad2.axes[0].getValue();

              if(blueAxisH > 0) //right
              {
                blueArrow.angle += 15 * fps;
                if(blueArrow.angle > 90)
                {
                  blueArrow.angle = 90;
                }
                blueLeft = true;
                blueRight = false;
              }
              if(blueAxisH < 0) //left
              {
                blueArrow.angle -= 15 * fps;
                if(blueArrow.angle < -90)
                {
                  blueArrow.angle = -90;
                }
                blueLeft = false;
                blueRight = true;
              }
            }

            if(pad2.buttons.length && computerID === socketID.firstConnection)
            {
              var blueButton = pad2.buttons[1].value;
              if (blueButton === 1 && blueJumpTimer && !blueJump)
              {
                  bluePlayer.anims.play('blueJump');
                  lastBlueJump = self.time.now;
                  bluePlayer.setVelocityY(-27);
                  blueJump = true;
              }
              if (blueButton === 0 )
              {
                  blueJump = false;
                  bluePlayer.anims.play('walk2', true);
              }
            }

            //Player 3
            if (pad3.axes.length && computerID === socketID.firstConnection)
            {
              var yellowAxisH = pad3.axes[0].getValue();

              if(yellowAxisH > 0) //right
              {
                yellowArrow.angle += 15 * fps;
                if(yellowArrow.angle > 90)
                {
                  yellowArrow.angle = 90;
                }
                yellowLeft = true;
                yellowRight = false;
              }
              if(yellowAxisH < 0) //left
              {
                yellowArrow.angle -= 15 * fps;
                if(yellowArrow.angle < -90)
                {
                  yellowArrow.angle = -90;
                }
                yellowLeft = false;
                yellowRight = true;
              }
            }

            if(pad3.buttons.length && computerID === socketID.firstConnection)
            {
              var yellowButton = pad3.buttons[1].value;
              if (yellowButton === 1 && yellowJumpTimer && !yellowJump)
              {
                  yellowPlayer.anims.play('yellowJump');
                  lastYellowJump = self.time.now;
                  yellowPlayer.setVelocityY(-27);
                  yellowJump = true;
              }
              if (yellowButton === 0 )
              {
                  yellowJump = false;
                  yellowPlayer.anims.play('walk3', true);
              }
            }

            //Player 4
            if (pad4.axes.length && computerID === socketID.firstConnection)
            {
              var greenAxisH = pad4.axes[0].getValue();

              if(greenAxisH > 0) //right
              {
                greenArrow.angle += 15 * fps;
                if(greenArrow.angle > 90)
                {
                  greenArrow.angle = 90;
                }
                greenLeft = true;
                greenRight = false;
              }
              if(greenAxisH < 0) //left
              {
                greenArrow.angle -= 15 * fps;
                if(greenArrow.angle < -90)
                {
                  greenArrow.angle = -90;
                }
                greenLeft = false;
                greenRight = true;
              }
            }

            if(pad4.buttons.length && computerID === socketID.firstConnection)
            {
              var greenButton = pad4.buttons[1].value;
              if (greenButton === 1 && greenJumpTimer && !greenJump)
              {
                  greenPlayer.anims.play('greenJump');
                  lastGreenJump = self.time.now;
                  greenPlayer.setVelocityY(-27);
                  greenJump = true;
              }
              if (greenButton === 0 )
              {
                  greenJump = false;
                  greenPlayer.anims.play('walk4', true);
              }
            }

            //Second Computer
            if (pad1.axes.length && computerID === socketID.secondConnection)
            {
                var pinkAxisH = pad1.axes[0].getValue();

                if(pinkAxisH > 0) //right
                {
                  pinkArrow.angle += 15 * fps;
                  if(pinkArrow.angle > 90)
                  {
                    pinkArrow.angle = 90;
                  }
                  pinkLeft = true;
                  pinkRight = false;
                if(pinkAxisH < 0) //left
                {
                  pinkArrow.angle -= 15 * fps;
                  if(pinkArrow.angle < -90)
                  {
                    pinkArrow.angle = -90;
                  }
                  pinkLeft = false;
                  pinkRight = true;
                }
              }
            }

            if(pad1.buttons.length && computerID === socketID.secondConnection)
            {
                var pinkButton = pad1.buttons[1].value;

                if (pinkButton === 1 && !pinkJump)
                {
                    pinkJump = true;
                    pinkPlayer.setVelocityY(-27);
                }
                if (pinkButton === 0)
                {
                    pinkJump = false;
                }
            }

            if (pad2.axes.length && computerID === socketID.secondConnection)
            {
              //var speed = (600 / 2) / 1000;
              // image.x += speed * dt;

                clawHorizontalAxes = pad2.axes[0].getValue();
                if(clawHorizontalAxes > 0) //right
                {
                  if(pipeBodySprite.x < 950)
                  {
                    pipeBodySprite.x += pipeBodySprite.x * fps2;
                  }
                }
                if(clawHorizontalAxes < 0) //left
                {
                  //pipeBodySprite.thrustBack(1 * delta);
                  if(pipeBodySprite.x > 50)
                  {
                    pipeBodySprite.x -= pipeBodySprite.x * fps2;
                  }
                }


            }
              //console.log(speed)

            if (pad3.axes.length && computerID === socketID.secondConnection)
            {
              clawverticalAxes = pad3.axes[1].getValue();
              if(clawverticalAxes > 0) //down
              {
                if(clawToPipeBody.length < 215)
                {
                    clawToPipeBody.length = clawToPipeBody.length + (5 * fps2);
                }
              }
              if(clawverticalAxes < 0) //up
              {
                if(clawToPipeBody.length > 8)
                {
                  clawToPipeBody.length = clawToPipeBody.length - (5 * fps2);
                }
              }

            }

            if (pad4.axes.length && computerID === socketID.secondConnection)
            {
              clawGripHorizontalAxes = pad4.axes[0].getValue();
              if(clawGripHorizontalAxes > 0) //right
              {
                if(rightArmToLeftArm.length < 200)
                {
                  rightArmToLeftArm.length = rightArmToLeftArm.length + (7 * fps2);
                }
                if(leftConnectToRightConnect.length < 175)
                {
                  leftConnectToRightConnect.length = leftConnectToRightConnect.length+ (2 * fps2);
                }
                if(leftConnectToClawTop.length > 185 && rightConnectToClawTop.length > 185)
                {
                  leftConnectToClawTop.length = leftConnectToClawTop.length - (2 * fps2);
                  rightConnectToClawTop.length = rightConnectToClawTop.length - (2 * fps2);
                }
              }
              if(clawGripHorizontalAxes < 0) //left
              {
                if(rightArmToLeftArm.length > 1)
                {
                  rightArmToLeftArm.length = rightArmToLeftArm.length - (5 * fps2);
                }
                if(leftConnectToRightConnect.length > 125)
                {
                  leftConnectToRightConnect.length = leftConnectToRightConnect.length - (2 * fps2);
                }
                if(leftConnectToClawTop.length < 220 && rightConnectToClawTop.length < 220)
                {
                  leftConnectToClawTop.length = leftConnectToClawTop.length + (2 * fps2);
                  rightConnectToClawTop.length = rightConnectToClawTop.length + (2 * fps2);
                }
              }
            }

            //Test Player

        });

          /*if(!redLeft)
          {
            redTest.flipX = true;
          }

          if(!redRight)
          {
            redTest.flipX = false;
          }*/

          if(!greyLeft)
          {
            greyPlayer.flipX = true;
          }

          if(!greyRight)
          {
            greyPlayer.flipX = false;
          }

          if(!blueLeft)
          {
            bluePlayer.flipX = true;
          }

          if(!blueRight)
          {
            bluePlayer.flipX = false;
          }

          if(!yellowLeft)
          {
            yellowPlayer.flipX = true;
          }

          if(!yellowRight)
          {
            yellowPlayer.flipX = false;
          }

          if(!greenLeft)
          {
            greenPlayer.flipX = true;
          }

          if(!greenRight)
          {
            greenPlayer.flipX = false;
          }

          if(!pinkLeft)
          {
            pinkPlayer.flipX = true;
          }

          if(!pinkRight)
          {
            pinkPlayer.flipX = false;
          }


          if(redTest)
          {
            var redX = redTest.x;
            var redY = redTest.y;
            if (redTest.oldPosition && (redX !== redTest.oldPosition.x || redY !== redTest.oldPosition.y))
            {
              this.socket.emit('redMovement', { x: redTest.x, y: redTest.y});
            }

            // save old position data
            redTest.oldPosition = {
              x: redTest.x,
              y: redTest.y
            };
          }

          if(greyPlayer)
          {
            var greyX = greyPlayer.x;
            var greyY = greyPlayer.y;
            if (greyPlayer.oldPosition && (greyX !== greyPlayer.oldPosition.x || greyY !== greyPlayer.oldPosition.y))
            {
              this.socket.emit('greyMovement', { x: greyPlayer.x, y: greyPlayer.y});
            }

            // save old position data
            greyPlayer.oldPosition = {
              x: greyPlayer.x,
              y: greyPlayer.y
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

          if(bluePlayer)
          {
            var blueX = bluePlayer.x;
            var blueY = bluePlayer.y;
            if (bluePlayer.oldPosition && (blueX !== bluePlayer.oldPosition.x || blueY !== bluePlayer.oldPosition.y))
            {
              this.socket.emit('blueMovement', { x: bluePlayer.x, y: bluePlayer.y});
            }

            // save old position data
            bluePlayer.oldPosition = {
              x: bluePlayer.x,
              y: bluePlayer.y
            };
          }
          if(blueArrow)
          {
            var blueArrowX = blueArrow.x;
            var blueArrowY = blueArrow.y;
            var blueArrowAngle = blueArrow.angle;
            if (blueArrow.oldPosition && (blueArrowX !== blueArrow.oldPosition.x || blueArrowY !== blueArrow.oldPosition.y || blueArrowAngle !== blueArrow.oldPosition.angle))
            {
              this.socket.emit('blueArrowMovement', { x: blueArrow.x, y: blueArrow.y, angle: blueArrow.angle});
            }

            // save old position data
            blueArrow.oldPosition = {
              x: blueArrow.x,
              y: blueArrow.y,
              angle: blueArrow.angle
            };
          }

          if(yellowPlayer)
          {
            var yellowX = yellowPlayer.x;
            var yellowY = yellowPlayer.y;
            if (yellowPlayer.oldPosition && (yellowX !== yellowPlayer.oldPosition.x || yellowY !== yellowPlayer.oldPosition.y))
            {
              this.socket.emit('yellowMovement', { x: yellowPlayer.x, y: yellowPlayer.y});
            }

            // save old position data
            yellowPlayer.oldPosition = {
              x: yellowPlayer.x,
              y: yellowPlayer.y
            };
          }

          if(yellowArrow)
          {
            var yellowArrowX = yellowArrow.x;
            var yellowArrowY = yellowArrow.y;
            var yellowArrowAngle = yellowArrow.angle;
            if (yellowArrow.oldPosition && (yellowArrowX !== yellowArrow.oldPosition.x || yellowArrowY !== yellowArrow.oldPosition.y || yellowArrowAngle !== yellowArrow.oldPosition.angle))
            {
              this.socket.emit('yellowArrowMovement', { x: yellowArrow.x, y: yellowArrow.y, angle: yellowArrow.angle});
            }

            // save old position data
            yellowArrow.oldPosition = {
              x: yellowArrow.x,
              y: yellowArrow.y,
              angle: yellowArrow.angle
            };
          }

          if(greenPlayer)
          {
            var greenX = greenPlayer.x;
            var greenY = greenPlayer.y;
            if (greenPlayer.oldPosition && (greenX !== greenPlayer.oldPosition.x || greenY !== greenPlayer.oldPosition.y))
            {
              this.socket.emit('greenMovement', { x: greenPlayer.x, y: greenPlayer.y});
            }

            // save old position data
            greenPlayer.oldPosition = {
              x: greenPlayer.x,
              y: greenPlayer.y
            };
          }

          if(greenArrow)
          {
            var greenArrowX = greenArrow.x;
            var greenArrowY = greenArrow.y;
            var greenArrowAngle = greenArrow.angle;
            if (greenArrow.oldPosition && (greenArrowX !== greenArrow.oldPosition.x || greenArrowY !== greenArrow.oldPosition.y || greenArrowAngle !== greenArrow.oldPosition.angle))
            {
              this.socket.emit('greenArrowMovement', { x: greenArrow.x, y: greenArrow.y, angle: greenArrow.angle});
            }

            // save old position data
            greenArrow.oldPosition = {
              x: greenArrow.x,
              y: greenArrow.y,
              angle: greenArrow.angle
            };
          }

          if(pinkPlayer)
          {
            var pinkX = pinkPlayer.x;
            var pinkY = pinkPlayer.y;
            if (pinkPlayer.oldPosition && (pinkX !== pinkPlayer.oldPosition.x || pinkY !== pinkPlayer.oldPosition.y))
            {
              this.socket.emit('pinkMovement', { x: pinkPlayer.x, y: pinkPlayer.y});
            }

            // save old position data
            pinkPlayer.oldPosition = {
              x: pinkPlayer.x,
              y: pinkPlayer.y
            };
          }

          if(pinkArrow)
          {
            var pinkArrowX = pinkArrow.x;
            var pinkArrowY = pinkArrow.y;
            var pinkArrowAngle = pinkArrow.angle;
            if (pinkArrow.oldPosition && (pinkArrowX !== pinkArrow.oldPosition.x || pinkArrowY !== pinkArrow.oldPosition.y || pinkArrowAngle !== pinkArrow.oldPosition.angle))
            {
              this.socket.emit('pinkArrowMovement', { x: pinkArrow.x, y: pinkArrow.y, angle: pinkArrow.angle});
            }

            // save old position data
            pinkArrow.oldPosition = {
              x: pinkArrow.x,
              y: pinkArrow.y,
              angle: pinkArrow.angle
            };
          }

          if(pipeBodySprite)
          {
            var pipeBodyX = pipeBodySprite.x;
            var pipeBodyY = pipeBodySprite.y;
            if (pipeBodySprite.oldPosition && (pipeBodyX !== pipeBodySprite.oldPosition.x || pipeBodyY !== pipeBodySprite.oldPosition.y))
            {
              this.socket.emit('clawAnchorMovement', { x: pipeBodySprite.x, y: pipeBodySprite.y});
            }

            // save old position data
            pipeBodySprite.oldPosition = {
              x: pipeBodySprite.x,
              y: pipeBodySprite.y
            };
          }

          if(clawBodySprite)
          {
            var clawBodyX = clawBodySprite.x;
            var clawBodyY = clawBodySprite.y;
            var clawBodyAngle = clawBodySprite.angle;
            if (clawBodySprite.oldPosition && (clawBodyX !== clawBodySprite.oldPosition.x || clawBodyY !== clawBodySprite.oldPosition.y || clawBodyAngle !== clawBodySprite.oldPosition.angle))
            {
              this.socket.emit('clawBodyMovement', { x: clawBodySprite.x, y: clawBodySprite.y, angle: clawBodySprite.angle});
            }

            // save old position data
            clawBodySprite.oldPosition = {
              x: clawBodySprite.x,
              y: clawBodySprite.y,
              angle: clawBodySprite.angle
            };
          }

          if(armConnectLeftSprite)
          {
            var armConnectLeftX = armConnectLeftSprite.x;
            var armConnectLeftY = armConnectLeftSprite.y;
            var armConnectLeftAngle = armConnectLeftSprite.angle;

            if (armConnectLeftSprite.oldPosition && (armConnectLeftX !== armConnectLeftSprite.oldPosition.x || armConnectLeftY !== armConnectLeftSprite.oldPosition.y || armConnectLeftAngle !== armConnectLeftSprite.oldPosition.angle))
            {
              this.socket.emit('clawArmLeftMovement', { x: armConnectLeftSprite.x, y: armConnectLeftSprite.y, angle: armConnectLeftSprite.angle});
            }

            // save old position data
            armConnectLeftSprite.oldPosition = {
              x: armConnectLeftSprite.x,
              y: armConnectLeftSprite.y,
              angle: armConnectLeftSprite.angle
            };
          }

          if(armConnectRightSprite)
          {
            var armConnectRightX = armConnectRightSprite.x;
            var armConnectRightY = armConnectRightSprite.y;
            var armConnectRightAngle = armConnectRightSprite.angle;
            if (armConnectRightSprite.oldPosition && (armConnectRightX !== armConnectRightSprite.oldPosition.x || armConnectRightY !== armConnectRightSprite.oldPosition.y || armConnectRightAngle !== armConnectRightSprite.oldPosition.angle))
            {
              this.socket.emit('clawArmRightMovement', { x: armConnectRightSprite.x, y: armConnectRightSprite.y, angle: armConnectRightSprite.angle});
            }

            // save old position data
            armConnectRightSprite.oldPosition = {
              x: armConnectRightSprite.x,
              y: armConnectRightSprite.y,
              angle: armConnectRightSprite.angle
            };
          }

          if(armLeftSprite)
          {
            var armLeftX = armLeftSprite.x;
            var armLeftY = armLeftSprite.y;
            var armLeftAngle = armLeftSprite.angle;

            if (armLeftSprite.oldPosition && (pipeBodyX !== armLeftSprite.oldPosition.x || pipeBodyY !== armLeftSprite.oldPosition.y || armLeftAngle !== armLeftSprite.oldPosition.angle))
            {
              this.socket.emit('clawGrabberLeftMovement', { x: armLeftSprite.x, y: armLeftSprite.y});
            }

            // save old position data
            armLeftSprite.oldPosition = {
              x: armLeftSprite.x,
              y: armLeftSprite.y,
              angle: armLeftSprite.angle
            };
          }

          if(armRightSprite)
          {
            var armRightX = armRightSprite.x;
            var armRightY = armRightSprite.y;
            var armRightAngle = armRightSprite.angle;

            if (armRightSprite.oldPosition && (armRightX !== armRightSprite.oldPosition.x || armRightY !== armRightSprite.oldPosition.y || armRightAngle !== armRightSprite.oldPosition.angle))
            {
              this.socket.emit('clawGrabberRightMovement', { x: armRightSprite.x, y: armRightSprite.y});
            }

            // save old position data
            armRightSprite.oldPosition = {
              x: armRightSprite.x,
              y: armRightSprite.y,
              angle: armRightSprite.angle
            };
          }
    }

});

var config = {
        type: Phaser.AUTO,
        parent: 'The-Claw',
        width: 1000,
        height: 640,
        pixelArt: true,
        input: {gamepad: true},
        audio: { disableWebAudio: true },
        scene: [ Preloader, MainMenu, PlayerEnter, Game, YouthElement, GameOverScene ],
        physics:{
          default: 'matter',
                  arcade: { debug: true, gravity: { y: 60 }, collideWorldBounds: true },
                  matter: { debug: true, gravity: { y: 9.78 } },
                  impact: { debug: true } }
  };
  var game = new Phaser.Game(config);
