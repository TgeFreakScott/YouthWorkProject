

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
      //this.load.image('red', 'Sprite/redCapture.png','Sprite/physics/redShape.json');
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
      this.load.image('bucketHitBox', 'Sprite/glassBox.png');
      this.load.image('background', 'Sprite/background.png');
      this.load.image('youthBackground', 'Sprite/YEStageBackground.png');
      this.load.image('gameOverBackground', 'Sprite/GameOverBackground.png');
      this.load.image('floor', 'Sprite/floor.png');


      //claw Sprites
      this.load.image('pipe','Sprite/clawBar.png');
      this.load.image('pipeBody','Sprite/clawBarBody.png');

      //yes/no/maybe sprites
      this.load.image('yes', 'Sprite/agree.png');
      this.load.image('no', 'Sprite/disagree.png');
      this.load.image('maybe', 'Sprite/maybe.png');
      this.load.image('agree', 'Sprite/agree.png');
      this.load.image('disagree', 'Sprite/disagree.png');

      this.load.image('greyArrow', 'Sprite/greyArrow.png');
      this.load.image('blueArrow', 'Sprite/blueArrow.png');
      this.load.image('yellowArrow', 'Sprite/yellowArrow.png');
      this.load.image('greenArrow', 'Sprite/greenArrow.png');
      this.load.image('pinkArrow', 'Sprite/pinkArrow.png');
      //this.load.image('redArrow', 'Sprite/greenArrow.png');

      this.load.image('yes', 'Sprite/yes.png');
      this.load.image('no', 'Sprite/no.png');
      this.load.image('maybe', 'Sprite/maybe.png');
      this.load.image('connectScreen', 'Sprite/PlayerEnter.png');
      this.load.spritesheet('enter', 'Sprite/tick.png',{ frameWidth: 455, frameHeight: 480 });
      this.load.spritesheet('notEnter', 'Sprite/x.png',{ frameWidth: 455, frameHeight: 455 });

      //this.load.spritesheet('clawControls', 'Sprite/ClawControls.png',{ frameWidth: 1024, frameHeight: 720 });
      //this.load.spritesheet('playerControls', 'Sprite/PlayerControls.png',{ frameWidth: 1024, frameHeight: 720 });

      this.load.image('clawControls', 'Sprite/ClawControls.png',{ frameWidth: 1024, frameHeight: 720 });
      this.load.image('playerControls', 'Sprite/PlayerControls.png',{ frameWidth: 1024, frameHeight: 720 });

      //Loading in animated Sprites
      //this.load.spritesheet('redMove', 'Sprite/redPlayer.png', { frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('greyMove' ,'Sprite/greyPlayer.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('pinkMove' ,'Sprite/pinkPlayer.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('yellowMove' ,'Sprite/yellowPlayer.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('blueMove' ,'Sprite/bluePlayer.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('greenMove' ,'Sprite/greenPlayer.png' ,{ frameWidth: 331, frameHeight: 294 });

      this.load.image('blueDickHead',['Sprite/blueDickhead.png', 'Sprite/blueDickhead_n.png']);
      this.load.image('pinkDickHead',['Sprite/pinkDickhead.png', 'Sprite/blueDickhead_n.png']);
      this.load.image('yellowDickHead',['Sprite/yellowDickhead.png', 'Sprite/blueDickhead_n.png']);
      this.load.image('greyDickHead',['Sprite/greyDickhead.png', 'Sprite/blueDickhead_n.png']);
      this.load.image('greenDickHead',['Sprite/greenDickhead.png', 'Sprite/blueDickhead_n.png']);
      this.load.image('clawOneDickHead',['Sprite/clawOneDickhead.png', 'Sprite/blueDickhead_n.png']);
      this.load.image('clawTwoDickHead',['Sprite/clawTwoDickhead.png', 'Sprite/blueDickhead_n.png']);
      this.load.image('clawThreeDickHead',['Sprite/clawThreeDickhead.png', 'Sprite/blueDickhead_n.png']);

      this.load.image('light','Sprite/light.png' );

      this.load.spritesheet('greyJump' ,'Sprite/greyJump.png' ,{ frameWidth: 331, frameHeight: 294 });
      //this.load.spritesheet('redJump' ,'Sprite/redJump.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('pinkJump' ,'Sprite/pinkJump.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('yellowJump' ,'Sprite/yellowJump.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('blueJump' ,'Sprite/blueJump.png' ,{ frameWidth: 331, frameHeight: 294 });
      this.load.spritesheet('greenJump' ,'Sprite/greenJump.png' ,{ frameWidth: 331, frameHeight: 294 });

      //Loading in JSON file and name
      this.load.json('clawShape', 'Sprite/physics/clawBodyShape.json');
      this.load.json('blueShape', 'Sprite/physics/blueShape.json');
      this.load.json('pinkShape', 'Sprite/physics/pinkShape.json');
      this.load.json('greyShape', 'Sprite/physics/greyShape.json');
      //this.load.json('redShape', 'Sprite/physics/redShape.json');
      this.load.json('armLeftShape','Sprite/physics/armLeftShape.json');
      this.load.json('armRightShape','Sprite/physics/armRightShape.json');
      this.load.json('armConnectShape','Sprite/physics/armConnectShape.json');
      this.load.json('bucketShape','Sprite/physics/glassPrison.json');
    },

    create: function ()
    {
        console.log('%c Preloader ', 'background: green; color: white; display: block;');
        this.scene.start('mainmenu');
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

var clawControlSprite;
var playerControlSprite;

var keys;
var keyQ;
var keyW;
var keyE;
var keyA;
var keyS;
var keyD;
var keyZ;
var keyX;
var keyC;
var keyR;
var keyT;
var keyY;
var keyF;
var keyG;
var keyH;
var keyV;
var keyB;
var keyN;
var keyU;
var keyI;
var keyO;
var keyJ;
var keyK;
var keyL;
var keySpace;
var screenTimer = 0;

var image1;
var image2;

var clawControlsDone = false;


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

        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

        keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

        keyU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      //  controlsSprite = this.add.sprite(500, 340, 'clawControl').setScale(0.975).setAlpha(1);

        image1 = this.add.image(500, 340, 'clawControls').setScale(0.975).setAlpha(1);

      /*  var changeToClaw = this.anims.create({
            key: 'clawControl',
            frames: this.anims.generateFrameNumbers('clawControls'),
            frameRate: 8, repeat: 0,
        });
        var changeToPlayer = this.anims.create({
              key: 'playerControl',
              frames: this.anims.generateFrameNumbers('playerControls'),
              frameRate: 8, repeat: 0
        });

        controlsSprite.play('clawControl'); */

    },

    update: function (time, delta)
    {
      console.log('Main Menu Update Screen');
      if(clawControlsDone)
      {
        screenTimer++;
      }
      if (keyE.isDown)
      {
        image1.setScale(110);

        if(!clawControlsDone)
        {
          clawControlsDone = true;
          //controlsSprite.play('playerControl');
          image2 = this.add.image(500, 330, 'playerControls').setScale(0.9).setAlpha(1);

          var pressSpace = this.add.text(700, 550, 'press SPACE', { font: '6px Arial' })
              .setFontSize(20).setFontStyle('bold')
              .setTint(0xff000f, 0xfff000, 0x0f000f, 0xf00000)
              .setPadding({ left: 66 , right: 66, top : 66, bottom: 66 });
        }
        if(screenTimer >= 300)
        {
          this.scene.start('playerEnter');
        }
      }

      if (keyD.isDown)
      {
        image1.setScale(110);

        if(!clawControlsDone)
        {
          clawControlsDone = true;
          //controlsSprite.play('playerControl');
          image2 = this.add.image(500, 330, 'playerControls').setScale(0.9).setAlpha(1);

          var pressSpace = this.add.text(700, 550, 'press SPACE', { font: '6px Arial' })
              .setFontSize(20).setFontStyle('bold')
              .setTint(0xff000f, 0xfff000, 0x0f000f, 0xf00000)
              .setPadding({ left: 66 , right: 66, top : 66, bottom: 66 });
        }
        if(screenTimer >= 300)
        {
          this.scene.start('playerEnter');
        }
      }

      if (keyC.isDown)
      {
        image1.setScale(110);

        if(!clawControlsDone)
        {
          clawControlsDone = true;
          //controlsSprite.play('playerControl');
          image2 = this.add.image(500, 330, 'playerControls').setScale(0.9).setAlpha(1);

          var pressSpace = this.add.text(700, 550, 'press SPACE', { font: '6px Arial' })
              .setFontSize(20).setFontStyle('bold')
              .setTint(0xff000f, 0xfff000, 0x0f000f, 0xf00000)
              .setPadding({ left: 66 , right: 66, top : 66, bottom: 66 });
        }
        if(screenTimer >= 300)
        {
          this.scene.start('playerEnter');
        }
      }

      if (keyY.isDown)
      {
        image1.setScale(110);

        if(!clawControlsDone)
        {
          clawControlsDone = true;
          //controlsSprite.play('playerControl');
          image2 = this.add.image(500, 330, 'playerControls').setScale(0.9).setAlpha(1);

          var pressSpace = this.add.text(700, 550, 'press SPACE', { font: '6px Arial' })
              .setFontSize(20).setFontStyle('bold')
              .setTint(0xff000f, 0xfff000, 0x0f000f, 0xf00000)
              .setPadding({ left: 66 , right: 66, top : 66, bottom: 66 });
        }
        if(screenTimer >= 300)
        {
          this.scene.start('playerEnter');
        }
      }

      if (keyH.isDown)
      {
        image1.setScale(110);

        if(!clawControlsDone)
        {
          clawControlsDone = true;
          //controlsSprite.play('playerControl');
          image2 = this.add.image(500, 330, 'playerControls').setScale(0.9).setAlpha(1);

          var pressSpace = this.add.text(700, 550, 'press SPACE', { font: '6px Arial' })
              .setFontSize(20).setFontStyle('bold')
              .setTint(0xff000f, 0xfff000, 0x0f000f, 0xf00000)
              .setPadding({ left: 66 , right: 66, top : 66, bottom: 66 });
        }
        if(screenTimer >= 300)
        {
          this.scene.start('playerEnter');
        }
      }

      if (keyN.isDown)
      {
        image1.setScale(110);

        if(!clawControlsDone)
        {
          clawControlsDone = true;
          //controlsSprite.play('playerControl');
          image2 = this.add.image(500, 330, 'playerControls').setScale(0.9).setAlpha(1);

          var pressSpace = this.add.text(700, 550, 'press SPACE', { font: '6px Arial' })
              .setFontSize(20).setFontStyle('bold')
              .setTint(0xff000f, 0xfff000, 0x0f000f, 0xf00000)
              .setPadding({ left: 66 , right: 66, top : 66, bottom: 66 });
        }
        if(screenTimer >= 300)
        {
          this.scene.start('playerEnter');
        }
      }

      if (keyO.isDown)
      {
        image1.setScale(110);

        if(!clawControlsDone)
        {
          clawControlsDone = true;
          //controlsSprite.play('playerControl');
          image2 = this.add.image(500, 330, 'playerControls').setScale(0.9).setAlpha(1);

          var pressSpace = this.add.text(700, 550, 'press SPACE', { font: '6px Arial' })
              .setFontSize(20).setFontStyle('bold')
              .setTint(0xff000f, 0xfff000, 0x0f000f, 0xf00000)
              .setPadding({ left: 66 , right: 66, top : 66, bottom: 66 });
        }
        if(screenTimer >= 300)
        {
          this.scene.start('playerEnter');
        }
      }

      if (keyL.isDown)
      {
        image1.setScale(110);

        if(!clawControlsDone)
        {
          clawControlsDone = true;
          //controlsSprite.play('playerControl');
          image2 = this.add.image(500, 330, 'playerControls').setScale(0.9).setAlpha(1);

          var pressSpace = this.add.text(700, 550, 'press SPACE', { font: '6px Arial' })
              .setFontSize(20).setFontStyle('bold')
              .setTint(0xff000f, 0xfff000, 0x0f000f, 0xf00000)
              .setPadding({ left: 66 , right: 66, top : 66, bottom: 66 });
        }
        if(screenTimer >= 300)
        {
          this.scene.start('playerEnter');
        }
      }

      if(keySpace.isDown)
      {
        this.scene.start('playerEnter');
      }
    }

});

var PlayerEnter = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:

    function PlayerEnter ()
    {
        Phaser.Scene.call(this, { key: 'playerEnter' });
        window.MENU = this;
        this.controls;
    },

    create: function ()
    {
      var self = this;
      //this.socket = io();
      /*this.socket.on('getSocketID', function (tempVar)
      {
        computerID = tempVar;
      });

      //this.input.keyboard.on('keydown', function (event) {console.dir(event); });

      //keys = this.input.keyboard.addKeys('Q,W,E,A,S,D,Z,X,C,R,T,Y,F,G,H,C,V,B,U,I,O,J,K,L');
      //cursors = this.input.keyboard.createCursorKeys();
*/

      keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

      keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
      keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
      keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
      keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);

      keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
      keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

      keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
      keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
      keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

      keyU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
      keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
      keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

      keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
      keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
      keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

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
      /*this.socket.on('playerOneConnected', function(playerOneEntered)
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
      });*/
      console.log('%c PlayerEnter ', 'background: green; color: white; display: block;');

    },

    update: function(time, delta)
    {
      var self = this;
      if (this.input.gamepad.total === 0)
      {
          return;
      }
      /*var pad1 = this.input.gamepad.getPad(0);
      var pad2 = this.input.gamepad.getPad(1);
      var pad3 = this.input.gamepad.getPad(2);
      var pad4 = this.input.gamepad.getPad(3);
      var pad5 = this.input.gamepad.getPad(4);
      var pad6 = this.input.gamepad.getPad(5);
      var pad7 = this.input.gamepad.getPad(6);
      var pad8 = this.input.gamepad.getPad(7);*/
      console.log('%c Updating Player Enter ', 'background: green; color: white; display: block;');
/*      //this.socket.emit('requestSocketID');
      //this.socket.on('passSocketID', function(socketID)
      //{
        //if(firstSocket !==0 && secondSocket !== 0)
        //{
          //First Computer
          //if(pad1.buttons.length)// && computerID === socketID.firstConnection)
          //{
           //var a1 = pad1.buttons[1].value;
           */

            if (keyE.isDown && !playerOneEnter)
            {
                console.log("Player 1 entered");
                playerOneEnter = true;
                //self.socket.emit('playerOneConnect', playerOneEnter);
            }
          //}

          //if(pad2.buttons.length)// && computerID === socketID.firstConnection)
          //{
            //var a2 = pad2.buttons[1].value;
            if (keyD.isDown && !playerTwoEnter)
            {
                console.log("Player 2 entered");
                playerTwoEnter = true;
                //self.socket.emit('playerTwoConnect', playerTwoEnter);
            }
          //}

          //if(pad3.buttons.length)// && computerID === socketID.firstConnection)
          //{
            //var a3 = pad3.buttons[1].value;
            if (keyC.isDown && !playerThreeEnter)
            {
                console.log("Player 3 entered");
                playerThreeEnter = true;
                //self.socket.emit('playerThreeConnect', playerThreeEnter);
            }
          //}

          //if(pad4.buttons.length)// && computerID === socketID.firstConnection)
          //{
            //var a4 = pad4.buttons[1].value;
            if (keyY.isDown && !playerFourEnter)
            {
                console.log("Player 4 entered");
                playerFourEnter = true;
                //self.socket.emit('playerFourConnect', playerFourEnter);
            }
          //}

          //Second Computer
          //if (pad5.buttons.length)// && computerID === socketID.secondConnection)
          //{
            //var a5 = pad5.buttons[1].value;
            if (keyH.isDown && !playerFiveEnter)
            {
                console.log("Player 5 entered");
                playerFiveEnter = true;
                //self.socket.emit('playerFiveConnect', playerFiveEnter);
            }
          //}

          //if (pad6.buttons.length)// && computerID === socketID.secondConnection)
          //{
          //  var a6 = pad6.buttons[1].value;
            if (keyN.isDown && !playerSixEnter)
            {
                console.log("Player 6 entered");
                playerSixEnter = true;
                //self.socket.emit('playerSixConnect', playerSixEnter);
            }
          //}

          //if (pad7.buttons.length)// && computerID === socketID.secondConnection)
          //{
          //  var a7 = pad7.buttons[1].value;
            if (keyO.isDown && !playerSevenEnter)
            {
                console.log("Player 7 entered");
                playerSevenEnter = true;
                //self.socket.emit('playerSevenConnect', playerSevenEnter);
            }
        //  //}

          //if(pad8.buttons.length)// && computerID === socketID.secondConnection)
          //{
            //var a8 = pad8.buttons[1].value;
            if (keyL.isDown && !playerEightEnter)
            {
                console.log("Player 8 entered");
                playerEightEnter = true;
                //self.socket.emit('playerEightConnect', playerEightEnter);
            }
          //}
        //}
      //});
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
      //this.scene.start('game', { port: this.socket, socket: computerID});
      this.scene.start('game');
    }
  }
});

var whoWon;
var gameOverBackgroundSprite;

var GameOverScene = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:

    function GameOverScene ()
    {
        Phaser.Scene.call(this, { key: 'gameOver' });
    },

    init: function(data)
    {
      whoWon = data.winner;
    },

    create: function ()
    {
      keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

      keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
      keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
      keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
      keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);

      keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
      keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

      keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
      keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
      keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

      keyU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
      keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
      keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

      keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
      keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
      keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

      gameOverBackgroundSprite = this.add.image(500,300,'gameOverBackground').setScale(0.4);

      if(whoWon)
      {
        console.log('%c Game Over', 'background: green; color: white; display: block;');

              textGameOver = this.add.text(300, 250, 'Game Over!', { font: '20px Arial' })
                  .setFontSize(64).setFontStyle('bold')
                  .setTint(0xff000f, 0xfff000, 0x0f000f, 0xf00000)
                  .setPadding({ left: 66 , right: 66, top : 66, bottom: 66 })
                  .setBackgroundColor('#000000');

              whoWonText = this.add.text(275, 400, 'Players win!', { font: '20px Arial' })
                  .setFontSize(64).setFontStyle('bold')
                  .setTint(0xff000f, 0xfff000, 0x0f000f, 0xf00000)
                  .setPadding({ left: 66 , right: 66, top : 66, bottom: 66 })
                  .setBackgroundColor('#000000');
      }
      else if(!whoWon)
      {
        console.log('%c Game Over ', 'background: green; color: white; display: block;');

            textGameOver = this.add.text(300, 250, 'Game Over!', { font: '20px Arial' })
                .setFontSize(64).setFontStyle('bold')
                .setTint(0xff000f, 0xfff000, 0x0f000f, 0xf00000)
                .setPadding({ left: 66 , right: 66, top : 66, bottom: 66 })
                .setBackgroundColor('#000000');

          whoWonText = this.add.text(275, 400, 'Claw wins!', { font: '20px Arial' })
                .setFontSize(64).setFontStyle('bold')
                .setTint(0xff000f, 0xfff000, 0x0f000f, 0xf00000)
                .setPadding({ left: 66 , right: 66, top : 66, bottom: 66 })
                .setBackgroundColor('#000000');

      }

    },

    update: function (time, delta)
    {
      console.log('Game Over Update Screen');
      if (keyE.isDown)
      {
        this.scene.start('youthelement');
      }

      if (keyD.isDown)
      {
        this.scene.start('youthelement');
      }

      if (keyC.isDown)
      {
        this.scene.start('youthelement');
      }

      if (keyY.isDown)
      {
        this.scene.start('youthelement');
      }

      if (keyH.isDown)
      {
        this.scene.start('youthelement');
      }

      if (keyN.isDown)
      {
        this.scene.start('youthelement');
      }

      if (keyO.isDown)
      {
        this.scene.start('youthelement');
      }

      if (keyL.isDown)
      {
        this.scene.start('youthelement');
      }
    }
});

var yesSprite;
var noSprite;
var maybeSprite;
var yeBackground;

var light;
var guide;

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

      yeBackground = this.add.image(510, 300, 'youthBackground').setScale(0.4).setAlpha(0.6);
      yesSprite = this.add.image(100, 50, 'yes').setScale(0.35);
      noSprite = this.add.image(900, 50, 'no').setScale(0.35);
      maybeSprite = this.add.image(500, 50, 'maybe').setScale(0.35);

      //pinkPlayer = this.add.image(500,500,'pinkMove').setScale(0.25);

      bluePlayer = this.add.sprite(500, 100,'blueDickHead').setScale(0.2);
      bluePlayer.setPipeline('Light2D');
      light1 = this.lights.addLight(500,100,100).setIntensity(10);

      pinkPlayer = this.add.sprite(500, 170,'pinkDickHead').setScale(0.2);
      pinkPlayer.setPipeline('Light2D');
      light2 = this.lights.addLight(500,170,100).setIntensity(10);

      greenPlayer = this.add.sprite(500, 240,'greenDickHead').setScale(0.2);
      greenPlayer.setPipeline('Light2D');
      light3 = this.lights.addLight(500,240,100).setIntensity(10);

      yellowPlayer = this.add.sprite(500, 310,'yellowDickHead').setScale(0.2);
      yellowPlayer.setPipeline('Light2D');
      light4 = this.lights.addLight(500,310,100).setIntensity(10);

      greyPlayer = this.add.sprite(500, 380,'greyDickHead').setScale(0.2);
      greyPlayer.setPipeline('Light2D');
      light5 = this.lights.addLight(500,380,100).setIntensity(10);

      clawOnePlayer = this.add.sprite(500, 450,'clawOneDickHead').setScale(0.2);
      clawOnePlayer.setPipeline('Light2D');
      light6 = this.lights.addLight(500,450,100).setIntensity(10);

      clawTwoPlayer = this.add.sprite(500, 520,'clawTwoDickHead').setScale(0.2);
      clawTwoPlayer.setPipeline('Light2D');
      light7 = this.lights.addLight(500,520,100).setIntensity(10);

      clawThreePlayer = this.add.sprite(500, 600,'clawThreeDickHead').setScale(0.2);
      clawThreePlayer.setPipeline('Light2D');
      light8 = this.lights.addLight(500,600,100).setIntensity(10);

      this.lights.enable().setAmbientColor(0xEAD1DC);

      keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

      keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
      keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
      keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
      keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);

      keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
      keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

      keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
      keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
      keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

      keyU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
      keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
      keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

      keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
      keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
      keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

        console.log('%c YouthElement ', 'background: green; color: white; display: block;');


    },

    update: function (time, delta)
    {
          console.log('Youth Element Update');
//grey
          if(keyQ.isDown) //LEFT
          {
            if( greyPlayer.x > 100)
            {
                light5.x -=15;
                greyPlayer.x -= 15;
            }
          }

          if(keyW.isDown) //RIGHT
          {
            if( greyPlayer.x < 900)
            {
                light5.x +=15;
                greyPlayer.x += 15;
            }
          }

          if(light5.x < 150 )
          {
            light5.setColor(0x00ff00).setIntensity(15);
          }

          if(light5.x > 150 && light5.x < 550 )
          {
            light5.setColor(0xEAD1DC).setIntensity(5);
          }

          if(light5.x > 750 )
          {
            light5.setColor(0xff0000).setIntensity(15);
          }

//blue
          if(keyA.isDown) //LEFT
          {
            if( bluePlayer.x > 100)
            {
              light1.x -=15;
                bluePlayer.x -= 15;
            }
          }

          if(keyS.isDown) //RIGHT
          {
            if(bluePlayer.x < 900)
            {
                light1.x+=15;
                bluePlayer.x += 15;
            }
          }

          if(light1.x < 150 )
          {
            light1.setColor(0x00ff00).setIntensity(15);
          }

          if(light1.x > 150 && light1.x < 550 )
          {
            light1.setColor(0xEAD1DC).setIntensity(5);
          }

          if(light1.x > 750 )
          {
            light1.setColor(0xff0000).setIntensity(15);
          }
//yellow
          if(keyZ.isDown) //LEFT
          {
            //
            if( yellowPlayer.x > 100)
            {
                light4.x -= 15;
                yellowPlayer.x -= 15;
            }
          }

          if(keyX.isDown) //RIGHT
          {
            if( yellowPlayer.x < 900)
            {
                light4.x += 15;
                yellowPlayer.x += 15;
            }
          }

          if(light4.x < 150 )
          {
            light4.setColor(0x00ff00).setIntensity(15);
          }

          if(light4.x > 150 && light4.x < 550 )
          {
            light4.setColor(0xEAD1DC).setIntensity(5);
          }

          if(light4.x > 750 )
          {
            light4.setColor(0xff0000).setIntensity(15);
          }
//green
          if(keyR.isDown) //LEFT
          {
            //
            if( greenPlayer.x > 100)
            {
              light3.x -=15;
              greenPlayer.x -= 15;
            }
          }

          if(keyT.isDown) //RIGHT
          {
            if( greenPlayer.x < 900)
            {
              light3.x +=15;
              greenPlayer.x += 15;
            }
          }

          if(light3.x < 150 )
          {
            light3.setColor(0x00ff00).setIntensity(15);
          }

          if(light3.x > 150 && light3.x < 550 )
          {
            light3.setColor(0xEAD1DC).setIntensity(5);
          }

          if(light3.x > 750 )
          {
            light3.setColor(0xff0000).setIntensity(15);
          }
//pink
          if(keyF.isDown) //LEFT
          {
            //
            if( pinkPlayer.x > 100)
            {
              light2.x -=15;
              pinkPlayer.x -= 15;
            }
          }

          if(keyG.isDown) //RIGHT
          {
            if( pinkPlayer.x < 900)
            {
              light2.x +=15;
              pinkPlayer.x += 15;
            }
          }

          if(light2.x < 150 )
          {
            light2.setColor(0x00ff00).setIntensity(15);
          }

          if(light2.x > 150 && light2.x < 550 )
          {
            light2.setColor(0xEAD1DC).setIntensity(5);
          }

          if(light2.x > 750 )
          {
            light2.setColor(0xff0000).setIntensity(15);
          }
//left right claw
          if(keyV.isDown) //LEFT
          {
            //light6.x
            if( clawOnePlayer.x > 100)
            {
              light6.x -=15;
              clawOnePlayer.x -= 15;
            }
          }

          if(keyB.isDown) //RIGHT
          {
            if( clawOnePlayer.x < 900)
            {
              light6.x +=15;
              clawOnePlayer.x += 15;
            }
          }

          if(light6.x < 150 )
          {
            light6.setColor(0x00ff00).setIntensity(15);
          }

          if(light6.x > 150 && light6.x < 550 )
          {
            light6.setColor(0xEAD1DC).setIntensity(5);
          }

          if(light6.x > 750 )
          {
            light6.setColor(0xff0000).setIntensity(15);
          }
//up down claw
          if(keyU.isDown) //LEFT
          {
            //light7.x
            if( clawTwoPlayer.x > 100)
            {
              light7.x -=15;
              clawTwoPlayer.x -= 15;
            }
          }

          if(keyI.isDown) //RIGHT
          {
            if( clawTwoPlayer.x < 900)
            {
              light7.x +=15;
              clawTwoPlayer.x += 15;
            }
          }

          if(light7.x < 150 )
          {
            light7.setColor(0x00ff00).setIntensity(15);
          }

          if(light7.x > 150 && light7.x < 550 )
          {
            light7.setColor(0xEAD1DC).setIntensity(5);
          }

          if(light7.x > 750 )
          {
            light7.setColor(0xff0000).setIntensity(15);
          }
//open close claw
          if(keyJ.isDown) //LEFT
          {
            //light8.x
            if( clawThreePlayer.x > 100)
            {
              light8.x -=15;
              clawThreePlayer.x -= 15;
            }
          }

          if(keyK.isDown) //RIGHT
          {
            if( clawThreePlayer.x < 900)
            {
              light8.x +=15;
              clawThreePlayer.x += 15;
            }
          }

          if(light8.x < 150 )
          {
            light8.setColor(0x00ff00).setIntensity(15);
          }

          if(light8.x > 150 && light8.x < 550 )
          {
            light8.setColor(0xEAD1DC).setIntensity(5);
          }

          if(light8.x > 750 )
          {
            light8.setColor(0xff0000).setIntensity(15);
          }
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
var leftBucketHitBox;
var rightBucket;
var rightBucketHitBox;
var backgroundSprite;
var floorSprite;

var pinkPlayer;
var greyPlayer;
var bluePlayer;
var yellowPlayer;
var greenPlayer;

var greyArrowToGreyPlayer;
var blueArrowToBluePlayer;
var yellowArrowToYellowPlayer;
var greenArrowToGreenPlayer;
var pinkArrowToPinkPlayer;

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

var greyArrow;
var blueArrow;
var yellowArrow;
var greenArrow;
var pinkArrow;
var rotationValue = 0.1;
var pipeTime = 0;

var cursors;
var keys;
var keyQ;
var keyW;
var keyE;
var keyA;
var keyS;
var keyD;
var keyZ;
var keyX;
var keyC;
var keyR;
var keyT;
var keyY;
var keyF;
var keyG;
var keyH;
var keyV;
var keyB;
var keyN;
var keyU;
var keyI;
var keyO;
var keyJ;
var keyK;
var keyL;

var playerWin = false;
var music;
var textTimer;
var timer = 30;
var greyRespawnTimer = 5;
var blueRespawnTimer = 5;
var greenRespawnTimer = 5;
var yellowRespawnTimer = 5;
var pinkRespawnTimer = 5;
var bounceCounter = 0;
var nextTimer = 30;
var textLives;
var lives = 5;
var textGameOver;
var whoWonText;
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


var Game = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:

    function Game()
    {
        Phaser.Scene.call(this, { key: 'game' });
        window.GAME = this;
        this.controls;
    },

    /*init: function (data)
    {
        console.log('init', data);
        this.socket = data.port;
        computerID = data.socket;
    },*/

    create: function ()
    {
        console.log('%c Game ', 'background: green; color: white; display: block;');

        this.matter.world.setBounds();
        var self = this;

        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

        keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

        keyU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

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
        //var rectCaptureBoxLeft = Bodies.rectangle(90, 0, 80,80);
        //var circCaptureBoxC1 = Bodies.circle(90, 0, 80, { isSensor: true, label: 'top' });

        var rectCaptureBoxA2 = Bodies.rectangle( 0, 0, 14, 190);
        var rectCaptureBoxB2 = Bodies.rectangle(-160, 90, 330, 14);
        //var rectCaptureBoxRight = Bodies.rectangle(90, 0, 80,80);
        //var circCaptureBoxC2 = Bodies.circle(-90, 0, 80, { isSensor: true, label: 'top' });

        var compoundCaptureBox1 = Phaser.Physics.Matter.Matter.Body.create(
          {parts: [ rectCaptureBoxA1, rectCaptureBoxB1]});//, circCaptureBoxC1 ]});
        var compoundCaptureBox2 = Phaser.Physics.Matter.Matter.Body.create(
          {parts: [ rectCaptureBoxA2, rectCaptureBoxB2]});//, circCaptureBoxC2 ]});

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
        var shapeGreen = this.cache.json.get('greenShape');
        var shapeYellow = this.cache.json.get('yellowShape');

        var shapeArmLeft = this.cache.json.get('armLeftShape');
        var shapeArmRight = this.cache.json.get('armRightShape');
        var shapeArmConnect = this.cache.json.get('armConnectShape');
        var shapeBucket = this.cache.json.get('bucketShape');

        backgroundSprite = this.add.image(500,300,'background').setScale(1.15).setAlpha(0.4);
        floorSprite = this.matter.add.image(500,930,'floor',{ shape: 'square'}).setScale(1.1).setAlpha(1).setStatic(true);

        armLeftSprite = this.matter.add.image(300, 400,'armLeftBody', 'armLeftBody', { shape: shapeArmLeft.armLeft})
        .setMass(0.01).setIgnoreGravity(true).setStatic(false).setScale(0.5).setDensity(1000).setMass(2750);

        armRightSprite = this.matter.add.image(500, 400,'armRightBody', 'armRightBody', { shape: shapeArmRight.armRight})
        .setIgnoreGravity(false).setStatic(false).setScale(0.5).setDensity(1000).setMass(2750);

        armConnectRightSprite = this.matter.add.image(450, 350,'armConnectBody', 'armConnectBody',{ shape: shapeArmConnect.armConnect})
        .setIgnoreGravity(false).setStatic(false).setScale(0.5).setDensity(100).setMass(2750);

        armConnectLeftSprite = this.matter.add.image(350, 350,'armConnectBody', 'armConnectBody', { shape: shapeArmConnect.armConnect})
        .setIgnoreGravity(false).setStatic(false).setScale(0.5).setMass(2750);

        clawBodySprite = this.matter.add.image(400, 210,'clawBody' ,'clawBody',{shape: shapeClaw.clawBody})
        .setScale(0.5).setMass(11000).setStatic(false);//.setFixedRotation();

        pipeSprite = this.matter.add.image(460, 50, 'pipe',{ shape: 'square'})
        .setFixedRotation().setScale(0.6).setMass(50000000).setIgnoreGravity(true).setStatic(true);

        pipeBodySprite = this.matter.add.image(400, 50, 'pipeBody',{ shape: 'square'})
        .setFixedRotation().setScale(0.7).setMass(22000).setIgnoreGravity(true).setStatic({x:false, y:true});


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
        leftBucket.setPosition(70,600)
        .setMass(1000).setStatic(true).setDensity(1000000).setScale(0.5);

        leftBucketHitBox = this.matter.add.image(80,600, 'bucketHitBox', {shape:'square'})
        .setMass(1000).setStatic(true).setDensity(1000000).setSensor(true).setScale(0.25);

         rightBucket = this.matter.add.image(980,570, 'bucket', 'bucket', {shape: shapeBucket.glassPanel})
        .setMass(1000).setStatic(true).setDensity(1000000).setScale(0.5);

        rightBucket.setExistingBody(compoundCaptureBox1);
        rightBucket.setPosition(940,600)
        .setMass(1000).setStatic(true).setDensity(1000000).setScale(0.5);

        rightBucketHitBox = this.matter.add.image(930,600, 'bucketHitBox', {shape:'square'})
        .setMass(1000).setStatic(true).setDensity(1000000).setSensor(true).setScale(0.25);

        greyArrow = this.matter.add.image(50, 300, 'greyArrow', null,)
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

        var pinkJumpAnimation = this.anims.create({
              key: 'pinkJump',
              frames: this.anims.generateFrameNumbers('pinkJump'),
              frameRate: 8, repeat: -1
        });

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
          bodyA: pipeBodySprite.body,
          bodyB: clawBodySprite.body,
          pointA: {x: 0, y: 35 },
          pointB: {x: 0, y: -110 },
          length: 18, stiffness: 1
        });
        this.matter.world.add(clawToPipeBody);

        leftConnectToClaw = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: armConnectLeftSprite.body,
          bodyB: clawBodySprite.body,
          pointA: {x: 30, y: 0 },
          pointB: {x: -30, y: 70 },
          length: 4, stiffness: 1
        });
        this.matter.world.add(leftConnectToClaw);

        rightConnectToClaw = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: armConnectRightSprite.body,
          bodyB: clawBodySprite.body,
          pointA: {x: -35, y: 0 },
          pointB: {x: 30, y: 70 },
          length: 4, stiffness: 1
        });
        this.matter.world.add(rightConnectToClaw);

        leftArmToLeftConnect = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: armLeftSprite.body,
          bodyB: armConnectLeftSprite.body,
          pointA: {x: 15, y: -55 },
          pointB: {x: -30, y: 0 },
          length: 5, stiffness: 1
        });
        this.matter.world.add(leftArmToLeftConnect);

        rightArmToRightConnect = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: armRightSprite.body,
          bodyB: armConnectRightSprite.body,
          pointA: {x: -15, y: -55 },
          pointB: {x: 30, y: 0 },
          length: 5, stiffness: 1
        });
        this.matter.world.add(rightArmToRightConnect);

        rightArmToLeftArm = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: armRightSprite.body,
          bodyB: armLeftSprite.body,
          pointA: {x: -5, y: 55 },
          pointB: {x: 0, y: 55 },
          length: 150, stiffness: 1
        });
        this.matter.world.add(rightArmToLeftArm);

        leftConnectToRightConnect = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: armConnectLeftSprite.body,
          bodyB: armConnectRightSprite.body,
          pointA: {x: -30, y: 0 },
          pointB: {x: 30, y: 0 },
          length: 170, stiffness: 1
        });
        this.matter.world.add(leftConnectToRightConnect);

        leftConnectToClawTop = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: armConnectLeftSprite.body,
          bodyB: clawBodySprite.body,
          pointA: {x: -30, y: 0 },
          pointB: {x: 0, y: -90 },
          length: 200, stiffness: 1
        });
        this.matter.world.add(leftConnectToClawTop);

        rightConnectToClawTop = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: armConnectRightSprite.body,
          bodyB: clawBodySprite.body,
          pointA: {x: 30, y: 0 },
          pointB: {x: 0, y: -90 },
          length: 200, stiffness: 1
        });
        this.matter.world.add(rightConnectToClawTop);

        //Arrow Constraints
        greyArrowToGreyPlayer = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: greyArrow.body,
          bodyB: greyPlayer.body,
          pointA: {x: 0, y: 0 },
          pointB: {x: 0, y: 0 },
          length: 70, stiffness: 1
        });
        this.matter.world.add(greyArrowToGreyPlayer);

        blueArrowToBluePlayer = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: blueArrow.body,
          bodyB: bluePlayer.body,
          pointA: {x: 0, y: 0 },
          pointB: {x: 0, y: 0 },
          length: 70, stiffness: 1
        });
        this.matter.world.add(blueArrowToBluePlayer);

        yellowArrowToYellowPlayer = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: yellowArrow.body,
          bodyB: yellowPlayer.body,
          pointA: {x: 0, y: 0 },
          pointB: {x: 0, y: 0 },
          length: 70, stiffness: 1
        });
        this.matter.world.add(yellowArrowToYellowPlayer);

        greenArrowToGreenPlayer = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: greenArrow.body,
          bodyB: greenPlayer.body,
          pointA: {x: 0, y: 0 },
          pointB: {x: 0, y: 0 },
          length: 70, stiffness: 1
        });
        this.matter.world.add(greenArrowToGreenPlayer);

        pinkArrowToPinkPlayer = Phaser.Physics.Matter.Matter.Constraint.create(
        {
          bodyA: pinkArrow.body,
          bodyB: pinkPlayer.body,
          pointA: {x: 0, y: 0 },
          pointB: {x: 0, y: 0 },
          length: 70, stiffness: 1
        });
        this.matter.world.add(pinkArrowToPinkPlayer);

        textTimer = this.add.text(30, 100, 'Timer: ' + timer, { font: '20px Arial' }).setFontSize(20);
        textTimer.setTint(0xff000f, 0xfff000, 0x0f000f, 0xf00000);
        textLives = this.add.text(30, 120, 'Lives: ' + lives).setFontSize(20);
        textLives.setTint(0xff000f, 0xfff000, 0x00000f, 0xf00000);

        /*this.socket.on('greyMoved', function (greyData)
        {
          greyPlayer.setPosition(greyData.x, greyData.y);
        });
        this.socket.on('greyArrowMoved', function (greyArrowData)
        {
          greyArrow.setPosition(greyArrowData.x, greyArrowData.y);
          greyArrow.setAngle(greyArrowData.angle);
        });
        this.socket.on('greyConstraintMoved', function (greyArrowToGreyPlayerData)
        {
          greyArrowToGreyPlayer.pointA.x = greyArrowToGreyPlayerData.x1;
          greyArrowToGreyPlayer.pointA.y = greyArrowToGreyPlayerData.y1;
          greyArrowToGreyPlayer.pointB.x = greyArrowToGreyPlayerData.x2;
          greyArrowToGreyPlayer.pointB.y = greyArrowToGreyPlayerData.y2;
          greyArrowToGreyPlayer.length = greyArrowToGreyPlayerData.length;
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
        this.socket.on('blueConstraintMoved', function (blueArrowToBlueData)
        {
          blueArrowToBluePlayer.pointA.x = blueArrowToBluePlayerData.x1;
          blueArrowToBluePlayer.pointA.y = blueArrowToBluePlayerData.y1;
          blueArrowToBluePlayer.pointB.x = blueArrowToBluePlayerData.x2;
          blueArrowToBluePlayer.pointB.y = blueArrowToBluePlayerData.y2;
          blueArrowToBluePlayer.length = blueArrowToBluePlayerData.length;
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
        this.socket.on('yellowConstraintMoved', function (yellowArrowToYellowPlayerData)
        {
          yellowArrowToYellowPlayer.pointA.x = yellowArrowToYellowPlayerData.x1;
          yellowArrowToYellowPlayer.pointA.y = yellowArrowToYellowPlayerData.y1;
          yellowArrowToYellowPlayer.pointB.x = yellowArrowToYellowPlayerData.x2;
          yellowArrowToYellowPlayer.pointB.y = yellowArrowToYellowPlayerData.y2;
          yellowArrowToYellowPlayer.length = yellowArrowToYellowPlayerData.length;
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
        this.socket.on('greenConstraintMoved', function (greenArrowToGreenPlayerData)
        {
          greenArrowToGreenPlayer.pointA.x = greenArrowToGreenPlayerData.x1;
          greenArrowToGreenPlayer.pointA.y = greenArrowToGreenPlayerData.y1;
          greenArrowToGreenPlayer.pointB.x = greenArrowToGreenPlayerData.x2;
          greenArrowToGreenPlayer.pointB.y = greenArrowToGreenPlayerData.y2;
          greenArrowToGreenPlayer.length = greenArrowToGreenPlayerData.length;
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
        this.socket.on('pinkConstraintMoved', function (pinkArrowToPinkPlayerData)
        {
          pinkArrowToPinkPlayer.pointA.x = pinkArrowToPinkPlayerData.x1;
          pinkArrowToPinkPlayer.pointA.y = pinkArrowToPinkPlayerData.y1;
          pinkArrowToPinkPlayer.pointB.x = pinkArrowToPinkPlayerData.x2;
          pinkArrowToPinkPlayer.pointB.y = pinkArrowToPinkPlayerData.y2;
          pinkArrowToPinkPlayer.length = pinkArrowToPinkPlayerData.length;
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


        this.socket.on('clawToPipeBodyMoved', function (clawToPipeBodyData)
        {
          clawToPipeBody.pointA.x = clawToPipeBodyData.x1;
          clawToPipeBody.pointA.y = clawToPipeBodyData.y1;
          clawToPipeBody.pointB.x = clawToPipeBodyData.x2;
          clawToPipeBody.pointB.y = clawToPipeBodyData.y2;
          clawToPipeBody.bodyA.position.x = clawToPipeBodyData.bodyX1;
          clawToPipeBody.bodyA.position.y = clawToPipeBodyData.bodyY1;
          clawToPipeBody.bodyB.position.x = clawToPipeBodyData.bodyX2;
          clawToPipeBody.bodyB.position.y = clawToPipeBodyData.bodyY2;
          clawToPipeBody.length = clawToPipeBodyData.length;

        });

        this.socket.on('leftConnectToClawMoved', function (leftConnectToClawData)
        {
          leftConnectToClaw.pointA.x = leftConnectToClawData.x1;
          leftConnectToClaw.pointA.y = leftConnectToClawData.y1;
          leftConnectToClaw.pointB.x = leftConnectToClawData.x2;
          leftConnectToClaw.pointB.y = leftConnectToClawData.y2;
          leftConnectToClaw.bodyA.position.x = leftConnectToClawData.bodyX1;
          leftConnectToClaw.bodyA.position.y = leftConnectToClawData.bodyY1;
          leftConnectToClaw.bodyB.position.x = leftConnectToClawData.bodyX2;
          leftConnectToClaw.bodyB.position.y = leftConnectToClawData.bodyY2;
          leftConnectToClaw.length = leftConnectToClawData.length;

        });

        this.socket.on('rightConnectToClawMoved', function (rightConnectToClawData)
        {
          rightConnectToClaw.pointA.x = rightConnectToClawData.x1;
          rightConnectToClaw.pointA.y = rightConnectToClawData.y1;
          rightConnectToClaw.pointB.x = rightConnectToClawData.x2;
          rightConnectToClaw.pointB.y = rightConnectToClawData.y2;
          rightConnectToClaw.bodyA.position.x = rightConnectToClawData.bodyX1;
          rightConnectToClaw.bodyA.position.y = rightConnectToClawData.bodyY1;
          rightConnectToClaw.bodyB.position.x = rightConnectToClawData.bodyX2;
          rightConnectToClaw.bodyB.position.y = rightConnectToClawData.bodyY2;
          rightConnectToClaw.length = rightConnectToClawData.length;

        });

        this.socket.on('leftArmToLeftConnectMoved', function (leftArmToLeftConnectData)
        {
          leftArmToLeftConnect.pointA.x = leftArmToLeftConnectData.x1;
          leftArmToLeftConnect.pointA.y = leftArmToLeftConnectData.y1;
          leftArmToLeftConnect.pointB.x = leftArmToLeftConnectData.x2;
          leftArmToLeftConnect.pointB.y = leftArmToLeftConnectData.y2;
          leftArmToLeftConnect.bodyA.position.x = leftArmToLeftConnectData.bodyX1;
          leftArmToLeftConnect.bodyA.position.y = leftArmToLeftConnectData.bodyY1;
          leftArmToLeftConnect.bodyB.position.x = leftArmToLeftConnectData.bodyX2;
          leftArmToLeftConnect.bodyB.position.y = leftArmToLeftConnectData.bodyY2;
          leftArmToLeftConnect.length = leftArmToLeftConnectData.length;

        });

        this.socket.on('rightArmToRightConnectMoved', function (rightArmToRightConnectData)
        {
          rightArmToRightConnect.pointA.x = rightArmToRightConnectData.x1;
          rightArmToRightConnect.pointA.y = rightArmToRightConnectData.y1;
          rightArmToRightConnect.pointB.x = rightArmToRightConnectData.x2;
          rightArmToRightConnect.pointB.y = rightArmToRightConnectData.y2;
          rightArmToRightConnect.bodyA.position.x = rightArmToRightConnectData.bodyX1;
          rightArmToRightConnect.bodyA.position.y = rightArmToRightConnectData.bodyY1;
          rightArmToRightConnect.bodyB.position.x = rightArmToRightConnectData.bodyX2;
          rightArmToRightConnect.bodyB.position.y = rightArmToRightConnectData.bodyY2;
          rightArmToRightConnect.length = rightArmToRightConnectData.length;

        });

        this.socket.on('rightArmToLeftArmMoved', function (rightArmToLeftArmData)
        {
          rightArmToLeftArm.pointA.x = rightArmToLeftArmData.x1;
          rightArmToLeftArm.pointA.y = rightArmToLeftArmData.y1;
          rightArmToLeftArm.pointB.x = rightArmToLeftArmData.x2;
          rightArmToLeftArm.pointB.y = rightArmToLeftArmData.y2;
          rightArmToLeftArm.bodyA.position.x = rightArmToLeftArmData.bodyX1;
          rightArmToLeftArm.bodyA.position.y = rightArmToLeftArmData.bodyY1;
          rightArmToLeftArm.bodyB.position.x = rightArmToLeftArmData.bodyX2;
          rightArmToLeftArm.bodyB.position.y = rightArmToLeftArmData.bodyY2;
          rightArmToLeftArm.length = rightArmToLeftArmData.length;
        });

        this.socket.on('leftConnectToRightConnectMoved', function (leftConnectToRightConnectData)
        {
          leftConnectToRightConnect.pointA.x = leftConnectToRightConnectData.x1;
          leftConnectToRightConnect.pointA.y = leftConnectToRightConnectData.y1;
          leftConnectToRightConnect.pointB.x = leftConnectToRightConnectData.x2;
          leftConnectToRightConnect.pointB.y = leftConnectToRightConnectData.y2;
          leftConnectToRightConnect.bodyA.position.x = leftConnectToRightConnectData.bodyX1;
          leftConnectToRightConnect.bodyA.position.y = leftConnectToRightConnectData.bodyY1;
          leftConnectToRightConnect.bodyB.position.x = leftConnectToRightConnectData.bodyX2;
          leftConnectToRightConnect.bodyB.position.y = leftConnectToRightConnectData.bodyY2;
          leftConnectToRightConnect.length = leftConnectToRightConnectData.length;

        });

        this.socket.on('leftConnectToClawTopMoved', function (leftConnectToClawTopData)
        {
          leftConnectToClawTop.pointA.x = leftConnectToClawTopData.x1;
          leftConnectToClawTop.pointA.y = leftConnectToClawTopData.y1;
          leftConnectToClawTop.pointB.x = leftConnectToClawTopData.x2;
          leftConnectToClawTop.pointB.y = leftConnectToClawTopData.y2;
          leftConnectToClawTop.bodyA.position.x = leftConnectToClawTopData.bodyX1;
          leftConnectToClawTop.bodyA.position.y = leftConnectToClawTopData.bodyY1;
          leftConnectToClawTop.bodyB.position.x = leftConnectToClawTopData.bodyX2;
          leftConnectToClawTop.bodyB.position.y = leftConnectToClawTopData.bodyY2;
          leftConnectToClawTop.length = leftConnectToClawTopData.length;

        });

        this.socket.on('rightConnectToClawTopMoved', function (rightConnectToClawTopData)
        {
          rightConnectToClawTop.pointA.x = rightConnectToClawTopData.x1;
          rightConnectToClawTop.pointA.y = rightConnectToClawTopData.y1;
          rightConnectToClawTop.pointB.x = rightConnectToClawTopData.x2;
          rightConnectToClawTop.pointB.y = rightConnectToClawTopData.y2;
          rightConnectToClawTop.bodyA.position.x = rightConnectToClawTopData.bodyX1;
          rightConnectToClawTop.bodyA.position.y = rightConnectToClawTopData.bodyY1;
          rightConnectToClawTop.bodyB.position.x = rightConnectToClawTopData.bodyX2;
          rightConnectToClawTop.bodyB.position.y = rightConnectToClawTopData.bodyY2;
          rightConnectToClawTop.length = rightConnectToClawTopData.length;
        });*/

        this.matterCollision.addOnCollideStart(
        {
          objectA: greyPlayer,
          objectB: leftBucketHitBox,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            greyRespawnTimer -= 0.5;
            if(greyRespawnTimer <= 0)
            {
              greyPlayer.setPosition(500,500);
              if(lives === 5)
              {
                lives = 4;
              }
              else if(lives === 4)
              {
                lives = 3;
              }
              else if(lives === 3)
              {
                lives = 2;
              }
              else if(lives === 2)
              {
                lives = 1;
              }
              else if(lives === 1)
              {
                lives = 0;
              }
              else if(lives === 0)
              {
                playerWin = false;
                this.scene.start('gameOver', { winner: playerWin});
              }
              greyRespawnTimer = 5;
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: greyPlayer,
          objectB: rightBucketHitBox,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            greyRespawnTimer -= 0.5;
            if(greyRespawnTimer <= 0)
            {
              greyPlayer.setPosition(500,500);
              if(lives === 5)
              {
                lives = 4;
              }
              else if(lives === 4)
              {
                lives = 3;
              }
              else if(lives === 3)
              {
                lives = 2;
              }
              else if(lives === 2)
              {
                lives = 1;
              }
              else if(lives === 1)
              {
                lives = 0;
              }
              else if(lives === 0)
              {
                playerWin = false;
                this.scene.start('gameOver', { winner: playerWin});
              }
              greyRespawnTimer = 5;
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: bluePlayer,
          objectB: leftBucketHitBox,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            blueRespawnTimer -= 0.5;
            if(blueRespawnTimer <= 0)
            {
              bluePlayer.setPosition(500,500);
              if(lives === 5)
              {
                lives = 4;
              }
              else if(lives === 4)
              {
                lives = 3;
              }
              else if(lives === 3)
              {
                lives = 2;
              }
              else if(lives === 2)
              {
                lives = 1;
              }
              else if(lives === 1)
              {
                lives = 0;
              }
              else if(lives === 0)
              {
                playerWin = false;
                this.scene.start('gameOver', { winner: playerWin});
              }
              blueRespawnTimer = 5;
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: bluePlayer,
          objectB: rightBucketHitBox,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            blueRespawnTimer -= 0.5;
            if(blueRespawnTimer <= 0)
            {
              bluePlayer.setPosition(500,500);
              if(lives === 5)
              {
                lives = 4;
              }
              else if(lives === 4)
              {
                lives = 3;
              }
              else if(lives === 3)
              {
                lives = 2;
              }
              else if(lives === 2)
              {
                lives = 1;
              }
              else if(lives === 1)
              {
                lives = 0;
              }
              else if(lives === 0)
              {
                playerWin = false;
                this.scene.start('gameOver', { winner: playerWin});
              }
              blueRespawnTimer = 5;
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: greenPlayer,
          objectB: leftBucketHitBox,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            greenRespawnTimer -= 0.5;
            if(greenRespawnTimer <= 0)
            {
              greenPlayer.setPosition(500,500);
              if(lives === 5)
              {
                lives = 4;
              }
              else if(lives === 4)
              {
                lives = 3;
              }
              else if(lives === 3)
              {
                lives = 2;
              }
              else if(lives === 2)
              {
                lives = 1;
              }
              else if(lives === 1)
              {
                lives = 0;
              }
              else if(lives === 0)
              {
                playerWin = false;
                this.scene.start('gameOver', { winner: playerWin});
              }
              greenRespawnTimer = 5;
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: greenPlayer,
          objectB: rightBucketHitBox,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            greenRespawnTimer -= 0.5;
            if(greenRespawnTimer <= 0)
            {
              greenPlayer.setPosition(500,500);
              if(lives === 5)
              {
                lives = 4;
              }
              else if(lives === 4)
              {
                lives = 3;
              }
              else if(lives === 3)
              {
                lives = 2;
              }
              else if(lives === 2)
              {
                lives = 1;
              }
              else if(lives === 1)
              {
                lives = 0;
              }
              else if(lives === 0)
              {
                playerWin = false;
                this.scene.start('gameOver', { winner: playerWin});
              }
              greenRespawnTimer = 5;
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: yellowPlayer,
          objectB: leftBucketHitBox,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            yellowRespawnTimer -= 0.5;
            if(yellowRespawnTimer <= 0)
            {
              yellowPlayer.setPosition(500,500);
              if(lives === 5)
              {
                lives = 4;
              }
              else if(lives === 4)
              {
                lives = 3;
              }
              else if(lives === 3)
              {
                lives = 2;
              }
              else if(lives === 2)
              {
                lives = 1;
              }
              else if(lives === 1)
              {
                lives = 0;
              }
              else if(lives === 0)
              {
                playerWin = false;
                this.scene.start('gameOver', { winner: playerWin});
              }
              yellowRespawnTimer = 5;
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: yellowPlayer,
          objectB: rightBucketHitBox,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            yellowRespawnTimer -= 0.5;
            if(yellowRespawnTimer <= 0)
            {
              yellowPlayer.setPosition(500,500);
              if(lives === 5)
              {
                lives = 4;
              }
              else if(lives === 4)
              {
                lives = 3;
              }
              else if(lives === 3)
              {
                lives = 2;
              }
              else if(lives === 2)
              {
                lives = 1;
              }
              else if(lives === 1)
              {
                lives = 0;
              }
              else if(lives === 0)
              {
                playerWin = false;
                this.scene.start('gameOver', { winner: playerWin});
              }
              yellowRespawnTimer = 5;
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: pinkPlayer,
          objectB: leftBucketHitBox,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            pinkRespawnTimer -= 0.5;
            if(pinkRespawnTimer <= 0)
            {
              pinkPlayer.setPosition(500,500);
              if(lives === 5)
              {
                lives = 4;
              }
              else if(lives === 4)
              {
                lives = 3;
              }
              else if(lives === 3)
              {
                lives = 2;
              }
              else if(lives === 2)
              {
                lives = 1;
              }
              else if(lives === 1)
              {
                lives = 0;
              }
              else if(lives === 0)
              {
                playerWin = false;
                this.scene.start('gameOver', { winner: playerWin});
              }
              pinkRespawnTimer = 5;
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: pinkPlayer,
          objectB: rightBucketHitBox,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            pinkRespawnTimer -= 0.5;
            if(pinkRespawnTimer <= 0)
            {
              pinkPlayer.setPosition(500,500);
              if(lives === 5)
              {
                lives = 4;
              }
              else if(lives === 4)
              {
                lives = 3;
              }
              else if(lives === 3)
              {
                lives = 2;
              }
              else if(lives === 2)
              {
                lives = 1;
              }
              else if(lives === 1)
              {
                lives = 0;
              }
              else if(lives === 0)
              {
                playerWin = false;
                this.scene.start('gameOver', { winner: playerWin});
              }
              pinkRespawnTimer = 5;
            }
          }
        });

        this.matterCollision.addOnCollideStart(
        {
          objectA: greyPlayer,
          objectB: armConnectLeftSprite,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            if(bounceCounter === 0)
            {
              bounceCounter = 1;
            }
            else if(bounceCounter === 1)
            {
              bounceCounter = 2;
            }
            else if(bounceCounter === 2)
            {
              bounceCounter = 3;
            }
            else if(bounceCounter === 3)
            {
              if(rightArmToLeftArm.length < 200)
              {
                rightArmToLeftArm.length += (7);
              }
              if(leftConnectToRightConnect.length < 175)
              {
                leftConnectToRightConnect.length += (2);
              }
              if(leftConnectToClawTop.length > 185 && rightConnectToClawTop.length > 185)
              {
                leftConnectToClawTop.length -= (2);
                rightConnectToClawTop.length -= (2);
              }
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: greyPlayer,
          objectB: armConnectRightSprite,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            if(bounceCounter === 0)
            {
              bounceCounter = 1;
            }
            else if(bounceCounter === 1)
            {
              bounceCounter = 2;
            }
            else if(bounceCounter === 2)
            {
              bounceCounter = 3;
            }
            else if(bounceCounter === 3)
            {
              if(rightArmToLeftArm.length < 200)
              {
                rightArmToLeftArm.length += (7);
              }
              if(leftConnectToRightConnect.length < 175)
              {
                leftConnectToRightConnect.length += (2);
              }
              if(leftConnectToClawTop.length > 185 && rightConnectToClawTop.length > 185)
              {
                leftConnectToClawTop.length -= (2);
                rightConnectToClawTop.length -= (2);
              }
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: bluePlayer,
          objectB: armConnectLeftSprite,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            if(bounceCounter === 0)
            {
              bounceCounter = 1;
            }
            else if(bounceCounter === 1)
            {
              bounceCounter = 2;
            }
            else if(bounceCounter === 2)
            {
              bounceCounter = 3;
            }
            else if(bounceCounter === 3)
            {
              if(rightArmToLeftArm.length < 200)
              {
                rightArmToLeftArm.length += (7);
              }
              if(leftConnectToRightConnect.length < 175)
              {
                leftConnectToRightConnect.length += (2);
              }
              if(leftConnectToClawTop.length > 185 && rightConnectToClawTop.length > 185)
              {
                leftConnectToClawTop.length -= (2);
                rightConnectToClawTop.length -= (2);
              }
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: bluePlayer,
          objectB: armConnectRightSprite,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            if(bounceCounter === 0)
            {
              bounceCounter = 1;
            }
            else if(bounceCounter === 1)
            {
              bounceCounter = 2;
            }
            else if(bounceCounter === 2)
            {
              bounceCounter = 3;
            }
            else if(bounceCounter === 3)
            {
              if(rightArmToLeftArm.length < 200)
              {
                rightArmToLeftArm.length += (7);
              }
              if(leftConnectToRightConnect.length < 175)
              {
                leftConnectToRightConnect.length += (2);
              }
              if(leftConnectToClawTop.length > 185 && rightConnectToClawTop.length > 185)
              {
                leftConnectToClawTop.length -= (2);
                rightConnectToClawTop.length -= (2);
              }
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: greenPlayer,
          objectB: armConnectLeftSprite,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            if(bounceCounter === 0)
            {
              bounceCounter = 1;
            }
            else if(bounceCounter === 1)
            {
              bounceCounter = 2;
            }
            else if(bounceCounter === 2)
            {
              bounceCounter = 3;
            }
            else if(bounceCounter === 3)
            {
              if(rightArmToLeftArm.length < 200)
              {
                rightArmToLeftArm.length += (7);
              }
              if(leftConnectToRightConnect.length < 175)
              {
                leftConnectToRightConnect.length += (2);
              }
              if(leftConnectToClawTop.length > 185 && rightConnectToClawTop.length > 185)
              {
                leftConnectToClawTop.length -= (2);
                rightConnectToClawTop.length -= (2);
              }
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: greenPlayer,
          objectB: armConnectRightSprite,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            if(bounceCounter === 0)
            {
              bounceCounter = 1;
            }
            else if(bounceCounter === 1)
            {
              bounceCounter = 2;
            }
            else if(bounceCounter === 2)
            {
              bounceCounter = 3;
            }
            else if(bounceCounter === 3)
            {
              if(rightArmToLeftArm.length < 200)
              {
                rightArmToLeftArm.length += (7);
              }
              if(leftConnectToRightConnect.length < 175)
              {
                leftConnectToRightConnect.length += (2);
              }
              if(leftConnectToClawTop.length > 185 && rightConnectToClawTop.length > 185)
              {
                leftConnectToClawTop.length -= (2);
                rightConnectToClawTop.length -= (2);
              }
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: yellowPlayer,
          objectB: armConnectLeftSprite,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            if(bounceCounter === 0)
            {
              bounceCounter = 1;
            }
            else if(bounceCounter === 1)
            {
              bounceCounter = 2;
            }
            else if(bounceCounter === 2)
            {
              bounceCounter = 3;
            }
            else if(bounceCounter === 3)
            {
              if(rightArmToLeftArm.length < 200)
              {
                rightArmToLeftArm.length += (7);
              }
              if(leftConnectToRightConnect.length < 175)
              {
                leftConnectToRightConnect.length += (2);
              }
              if(leftConnectToClawTop.length > 185 && rightConnectToClawTop.length > 185)
              {
                leftConnectToClawTop.length -= (2);
                rightConnectToClawTop.length -= (2);
              }
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: yellowPlayer,
          objectB: armConnectRightSprite,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            if(bounceCounter === 0)
            {
              bounceCounter = 1;
            }
            else if(bounceCounter === 1)
            {
              bounceCounter = 2;
            }
            else if(bounceCounter === 2)
            {
              bounceCounter = 3;
            }
            else if(bounceCounter === 3)
            {
              if(rightArmToLeftArm.length < 200)
              {
                rightArmToLeftArm.length += (7);
              }
              if(leftConnectToRightConnect.length < 175)
              {
                leftConnectToRightConnect.length += (2);
              }
              if(leftConnectToClawTop.length > 185 && rightConnectToClawTop.length > 185)
              {
                leftConnectToClawTop.length -= (2);
                rightConnectToClawTop.length -= (2);
              }
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: pinkPlayer,
          objectB: armConnectLeftSprite,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            if(bounceCounter === 0)
            {
              bounceCounter = 1;
            }
            else if(bounceCounter === 1)
            {
              bounceCounter = 2;
            }
            else if(bounceCounter === 2)
            {
              bounceCounter = 3;
            }
            else if(bounceCounter === 3)
            {
              if(rightArmToLeftArm.length < 200)
              {
                rightArmToLeftArm.length += (7);
              }
              if(leftConnectToRightConnect.length < 175)
              {
                leftConnectToRightConnect.length += (2);
              }
              if(leftConnectToClawTop.length > 185 && rightConnectToClawTop.length > 185)
              {
                leftConnectToClawTop.length -= (2);
                rightConnectToClawTop.length -= (2);
              }
            }
          }
        });
        this.matterCollision.addOnCollideStart(
        {
          objectA: pinkPlayer,
          objectB: armConnectRightSprite,
          callback: ({bodyA, gameObjectA, bodyB, gameObjectB}) => {
            if(bounceCounter === 0)
            {
              bounceCounter = 1;
            }
            else if(bounceCounter === 1)
            {
              bounceCounter = 2;
            }
            else if(bounceCounter === 2)
            {
              bounceCounter = 3;
            }
            else if(bounceCounter === 3)
            {
              if(rightArmToLeftArm.length < 200)
              {
                rightArmToLeftArm.length += (7);
              }
              if(leftConnectToRightConnect.length < 175)
              {
                leftConnectToRightConnect.length += (2);
              }
              if(leftConnectToClawTop.length > 185 && rightConnectToClawTop.length > 185)
              {
                leftConnectToClawTop.length -= (2);
                rightConnectToClawTop.length -= (2);
              }
            }
          }
        });

        this.input.setPollAlways();
    },


    update: function (time, delta)
    {

        //this.controls.update(delta);
        var player = 1;
        var self = this;
        var fps = delta / 10;
        var fps2 = delta / 1000;
        var fps3 = delta / 20;

        textTimer.setText([ 'Timer: ' + Math.trunc(timer -= (0.02 * fps3)) ]);
        textLives.setText(['Lives: ' + lives]);

        if(timer < 0)
        {
            //this.scene.start('gameOver');
            playerWin = true;
            this.scene.start('gameOver', { winner: playerWin});
            timer = 90;
        }

        customPipeline.setFloat1('time', pipeTime);

          greyArrow.thrustLeft(0.5);
          blueArrow.thrustLeft(0.5);
          yellowArrow.thrustLeft(0.5);
          greenArrow.thrustLeft(0.5);
          pinkArrow.thrustLeft(0.5);
          pipeBodySprite.thrustLeft(3);

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

          /*var pad1 = this.input.gamepad.getPad(0);
          var pad2 = this.input.gamepad.getPad(1);
          var pad3 = this.input.gamepad.getPad(2);
          var pad4 = this.input.gamepad.getPad(3);
          var pad5 = this.input.gamepad.getPad(4);
          var pad6 = this.input.gamepad.getPad(5);
          var pad7 = this.input.gamepad.getPad(6);
          var pad8 = this.input.gamepad.getPad(7);
          //this.socket.emit('requestSocketID');
          //this.socket.on('passSocketID', function(socketID)
          //{
            //Computer 1
            //Player 1
            //if (pad1.axes.length)// && computerID === socketID.firstConnection)
            //{
              //var greyAxisH = pad1.axes[0].getValue();
*/
              if(keyW.isDown) //right
              {
                console.log("poop");
                greyArrow.angle += 15 * fps;
                if(greyArrow.angle > 90)
                {
                  greyArrow.angle = 90;
                }
                greyLeft = true;
                greyRight = false;
              }
              if(keyQ.isDown) //left
              {
                greyArrow.angle -= 15 * fps;
                if(greyArrow.angle < -90)
                {
                  greyArrow.angle = -90;
                }
                greyLeft = false;
                greyRight = true;
              }
            //}

            //if(pad1.buttons.length)// && computerID === socketID.firstConnection)
          //  {

              //var greyButton = pad1.buttons[1].value;
              if (keyE.isDown && greyJumpTimer && !greyJump)
              {
                  greyPlayer.anims.play('greyJump');
                  lastGreyJump = self.time.now;
                  greyPlayer.setVelocityY(-27);
                  greyJump = true;
              }
              if (!keyE.isDown)
              {
                  greyJump = false;
                  greyPlayer.anims.play('walk1', true);
              }
            //}

            //Player 2
            //if (pad2.axes.length)// && computerID === socketID.firstConnection)
            //{

              //var blueAxisH = pad2.axes[0].getValue();

              if(keyS.isDown) //right
              {
                blueArrow.angle += 15 * fps;
                if(blueArrow.angle > 90)
                {
                  blueArrow.angle = 90;
                }
                blueLeft = true;
                blueRight = false;
              }
              if(keyA.isDown) //left
              {
                blueArrow.angle -= 15 * fps;
                if(blueArrow.angle < -90)
                {
                  blueArrow.angle = -90;
                }
                blueLeft = false;
                blueRight = true;
              }
            //}

            //if(pad2.buttons.length)// && computerID === socketID.firstConnection)
            //{

              //var blueButton = pad2.buttons[1].value;
              if (keyD.isDown && blueJumpTimer && !blueJump)
              {
                  bluePlayer.anims.play('blueJump');
                  lastBlueJump = self.time.now;
                  bluePlayer.setVelocityY(-27);
                  blueJump = true;
              }
              if (!keyD.isDown)
              {
                  blueJump = false;
                  bluePlayer.anims.play('walk2', true);
              }
            //}

            //Player 3
            //if (pad3.axes.length)// && computerID === socketID.firstConnection)
            //{

              //var yellowAxisH = pad3.axes[0].getValue();

              if(keyX.isDown) //right
              {
                yellowArrow.angle += 15 * fps;
                if(yellowArrow.angle > 90)
                {
                  yellowArrow.angle = 90;
                }
                yellowLeft = true;
                yellowRight = false;
              }
              if(keyZ.isDown) //left
              {
                yellowArrow.angle -= 15 * fps;
                if(yellowArrow.angle < -90)
                {
                  yellowArrow.angle = -90;
                }
                yellowLeft = false;
                yellowRight = true;
              }
            //}

            //if(pad3.buttons.length)// && computerID === socketID.firstConnection)
            //{

              //var yellowButton = pad3.buttons[1].value;
              if (keyC.isDown && yellowJumpTimer && !yellowJump)
              {
                  yellowPlayer.anims.play('yellowJump');
                  lastYellowJump = self.time.now;
                  yellowPlayer.setVelocityY(-27);
                  yellowJump = true;
              }
              if (!keyC.isDown)
              {
                  yellowJump = false;
                  yellowPlayer.anims.play('walk3', true);
              }
            //}

            //Player 4
            //if (pad4.axes.length)// && computerID === socketID.firstConnection)
            //{

              //var greenAxisH = pad4.axes[0].getValue();

              if(keyT.isDown) //right
              {
                greenArrow.angle += 15 * fps;
                if(greenArrow.angle > 90)
                {
                  greenArrow.angle = 90;
                }
                greenLeft = true;
                greenRight = false;
              }
              if(keyR.isDown) //left
              {
                greenArrow.angle -= 15 * fps;
                if(greenArrow.angle < -90)
                {
                  greenArrow.angle = -90;
                }
                greenLeft = false;
                greenRight = true;
              }
            //}

            //if(pad4.buttons.length)// && computerID === socketID.firstConnection)
          //  {

              //var greenButton = pad4.buttons[1].value;
              if (keyY.isDown && greenJumpTimer && !greenJump)
              {
                  greenPlayer.anims.play('greenJump');
                  lastGreenJump = self.time.now;
                  greenPlayer.setVelocityY(-27);
                  greenJump = true;
              }
              if (!keyY.isDown)
              {
                  greenJump = false;
                  greenPlayer.anims.play('walk4', true);
              }
            //}

            //Second Computer
            //if (pad5.axes.length)// && computerID === socketID.secondConnection)
            //{
                //var pinkAxisH = pad5.axes[0].getValue();

                if(keyG.isDown) //right
                {
                  pinkArrow.angle += 15 * fps;
                  if(pinkArrow.angle > 90)
                  {
                    pinkArrow.angle = 90;
                  }
                  pinkLeft = true;
                  pinkRight = false;
                }
                if(keyF.isDown) //left
                {
                  pinkArrow.angle -= 15 * fps;
                  if(pinkArrow.angle < -90)
                  {
                    pinkArrow.angle = -90;
                  }
                  pinkLeft = false;
                  pinkRight = true;
                }

            //}

            //if(pad5.buttons.length)// && computerID === socketID.secondConnection)
          //  {
                //var pinkButton = pad5.buttons[1].value;

                if (keyH.isDown  && pinkJumpTimer && !pinkJump)
                {
                    pinkJump = true;
                    pinkPlayer.anims.play('pinkJump');
                    lastPinkJump = self.time.now;
                    pinkPlayer.setVelocityY(-27);
                }
                if (!keyH.isDown)
                {
                    pinkJump = false;
                    pinkPlayer.anims.play('walk5', true);
                }
          //  }
            //if (pad6.axes.length)// && computerID === socketID.secondConnection)
            //{
              //var speed = (600 / 2) / 1000;
              // image.x += speed * dt;
                //clawHorizontalAxes = pad6.axes[0].getValue();
                if(keyB.isDown) //right
                {
                  if(pipeBodySprite.x < 950)
                  {
                    pipeBodySprite.x += 2.5 * fps;
                  }
                }
                if(keyV.isDown) //left
                {
                  //pipeBodySprite.thrustBack(1 * delta);
                  if(pipeBodySprite.x > 50)
                  {
                    pipeBodySprite.x -= 2.5 * fps;
                  }
                }
            //}
              //console.log(speed)
          //  if (pad7.axes.length)// && computerID === socketID.secondConnection)
            //{
              //clawverticalAxes = pad7.axes[1].getValue();
              if(keyI.isDown) //down
              {
                //self.socket.emit('down');
                if(clawToPipeBody.length < 215)
                {
                    clawToPipeBody.length += (5);
                }
              }
              if(keyU.isDown) //up
              {
                //self.socket.emit('up');
                if(clawToPipeBody.length > 10)
                {
                  clawToPipeBody.length -= (5);
                }
              }

            //}
            //if (pad8.axes.length)// && computerID === socketID.secondConnection)
            //{
              //clawGripHorizontalAxes = pad8.axes[0].getValue();
              if(keyK.isDown) //open
              {
                //self.socket.emit('open');
                if(rightArmToLeftArm.length < 200)
                {
                  rightArmToLeftArm.length += (7 * fps);
                }
                if(leftConnectToRightConnect.length < 175)
                {
                  leftConnectToRightConnect.length += (2 * fps);
                }
                if(leftConnectToClawTop.length > 185 && rightConnectToClawTop.length > 185)
                {
                  leftConnectToClawTop.length -= (2 * fps);
                  rightConnectToClawTop.length -= (2 * fps);
                }
              }
              if(keyJ.isDown) //close
              {
                if(rightArmToLeftArm.length > 1)
                {
                  rightArmToLeftArm.length = rightArmToLeftArm.length - (5 * fps);
                }
                if(leftConnectToRightConnect.length > 125)
                {
                  leftConnectToRightConnect.length -= (2 * fps);
                }
                if(leftConnectToClawTop.length < 220 && rightConnectToClawTop.length < 220)
                {
                  leftConnectToClawTop.length += (2 * fps);
                  rightConnectToClawTop.length += (2 * fps);
                }
              }
            //}

        //});
        /*  // Keyboard for Claw Machine
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

          /*if(greyPlayer)
          {
            var greyX = greyPlayer.x;
            var greyY = greyPlayer.y;
            if (greyPlayer.oldPosition && (greyX !== greyPlayer.oldPosition.x
              || greyY !== greyPlayer.oldPosition.y))
            {
              this.socket.emit('greyMovement', {
                x: greyPlayer.x,
                y: greyPlayer.y});
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
            if (greyArrow.oldPosition && (greyArrowX !== greyArrow.oldPosition.x
              || greyArrowY !== greyArrow.oldPosition.y
              || greyArrowAngle !== greyArrow.oldPosition.angle))
            {
              this.socket.emit('greyArrowMovement', {
                x: greyArrow.x,
                y: greyArrow.y,
                angle: greyArrow.angle});
            }

            // save old position data
            greyArrow.oldPosition = {
              x: greyArrow.x,
              y: greyArrow.y,
              angle: greyArrow.angle
            };
          }
          if(greyArrowToGreyPlayer)
          {
            var greyArrowToGreyPlayerX1 = greyArrowToGreyPlayer.pointA.x;
            var greyArrowToGreyPlayerY1 = greyArrowToGreyPlayer.pointA.y;
            var greyArrowToGreyPlayerX2 = greyArrowToGreyPlayer.pointB.x;
            var greyArrowToGreyPlayerY2 = greyArrowToGreyPlayer.pointB.y;
            var greyArrowToGreyPlayerLength = greyArrowToGreyPlayer.length;

            if (greyArrowToGreyPlayer.oldPosition &&
              (greyArrowToGreyPlayerX1 !== greyArrowToGreyPlayer.oldPosition.x1
              || greyArrowToGreyPlayerY1 !== greyArrowToGreyPlayer.oldPosition.y1
              || greyArrowToGreyPlayerX2 !== greyArrowToGreyPlayer.oldPosition.x2
              || greyArrowToGreyPlayerY2 !== greyArrowToGreyPlayer.oldPosition.y2
              || greyArrowToGreyPlayerLength !== greyArrowToGreyPlayer.oldPosition.length))
            {
              this.socket.emit('greyConstraintMovement', {
                x1: greyArrowToGreyPlayer.pointA.x,
                y1: greyArrowToGreyPlayer.pointA.y,
                x2: greyArrowToGreyPlayer.pointB.x,
                y2: greyArrowToGreyPlayer.pointB.y,
                length: greyArrowToGreyPlayer.length});
            }

            // save old position data
            greyArrowToGreyPlayer.oldPosition = {
              x1: greyArrowToGreyPlayer.pointA.x,
              y1: greyArrowToGreyPlayer.pointA.y,
              x2: greyArrowToGreyPlayer.pointB.x,
              y2: greyArrowToGreyPlayer.pointB.y,
              length: greyArrowToGreyPlayer.length
            };
          }

          if(bluePlayer)
          {
            var blueX = bluePlayer.x;
            var blueY = bluePlayer.y;
            if (bluePlayer.oldPosition && (blueX !== bluePlayer.oldPosition.x
              || blueY !== bluePlayer.oldPosition.y))
            {
              this.socket.emit('blueMovement', {
                x: bluePlayer.x,
                y: bluePlayer.y});
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
            if (blueArrow.oldPosition && (blueArrowX !== blueArrow.oldPosition.x
              || blueArrowY !== blueArrow.oldPosition.y
              || blueArrowAngle !== blueArrow.oldPosition.angle))
            {
              this.socket.emit('blueArrowMovement', {
                x: blueArrow.x,
                y: blueArrow.y,
                angle: blueArrow.angle});
            }

            // save old position data
            blueArrow.oldPosition = {
              x: blueArrow.x,
              y: blueArrow.y,
              angle: blueArrow.angle
            };
          }
          if(blueArrowToBluePlayer)
          {
            var blueArrowToBluePlayerX1 = blueArrowToBluePlayer.pointA.x;
            var blueArrowToBluePlayerY1 = blueArrowToBluePlayer.pointA.y;
            var blueArrowToBluePlayerX2 = blueArrowToBluePlayer.pointB.x;
            var blueArrowToBluePlayerY2 = blueArrowToBluePlayer.pointB.y;
            var blueArrowToBluePlayerLength = blueArrowToBluePlayer.length;

            if (blueArrowToBluePlayer.oldPosition &&
              (blueArrowToBluePlayerX1 !== blueArrowToBluePlayer.oldPosition.x1
              || blueArrowToBluePlayerY1 !== blueArrowToBluePlayer.oldPosition.y1
              || blueArrowToBluePlayerX2 !== blueArrowToBluePlayer.oldPosition.x2
              || blueArrowToBluePlayerY2 !== blueArrowToBluePlayer.oldPosition.y2
              || blueArrowToBluePlayerLength !== blueArrowToBluePlayer.oldPosition.length))
            {
              this.socket.emit('blueConstraintMovement', {
                x1: blueArrowToBluePlayer.pointA.x,
                y1: blueArrowToBluePlayer.pointA.y,
                x2: blueArrowToBluePlayer.pointB.x,
                y2: blueArrowToBluePlayer.pointB.y,
                length: blueArrowToBluePlayer.length});
            }

            // save old position data
            blueArrowToBluePlayer.oldPosition = {
              x1: blueArrowToBluePlayer.pointA.x,
              y1: blueArrowToBluePlayer.pointA.y,
              x2: blueArrowToBluePlayer.pointB.x,
              y2: blueArrowToBluePlayer.pointB.y,
              length: blueArrowToBluePlayer.length
            };
          }

          if(yellowPlayer)
          {
            var yellowX = yellowPlayer.x;
            var yellowY = yellowPlayer.y;
            if (yellowPlayer.oldPosition && (yellowX !== yellowPlayer.oldPosition.x
              || yellowY !== yellowPlayer.oldPosition.y))
            {
              this.socket.emit('yellowMovement', {
                x: yellowPlayer.x,
                y: yellowPlayer.y});
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
            if (yellowArrow.oldPosition && (yellowArrowX !== yellowArrow.oldPosition.x
              || yellowArrowY !== yellowArrow.oldPosition.y
              || yellowArrowAngle !== yellowArrow.oldPosition.angle))
            {
              this.socket.emit('yellowArrowMovement', {
                x: yellowArrow.x,
                y: yellowArrow.y,
                angle: yellowArrow.angle});
            }

            // save old position data
            yellowArrow.oldPosition = {
              x: yellowArrow.x,
              y: yellowArrow.y,
              angle: yellowArrow.angle
            };
          }
          if(yellowArrowToYellowPlayer)
          {
            var yellowArrowToYellowPlayerX1 = yellowArrowToYellowPlayer.pointA.x;
            var yellowArrowToYellowPlayerY1 = yellowArrowToYellowPlayer.pointA.y;
            var yellowArrowToYellowPlayerX2 = yellowArrowToYellowPlayer.pointB.x;
            var yellowArrowToYellowPlayerY2 = yellowArrowToYellowPlayer.pointB.y;
            var yellowArrowToYellowPlayerLength = yellowArrowToYellowPlayer.length;

            if (yellowArrowToYellowPlayer.oldPosition &&
              (yellowArrowToYellowPlayerX1 !== yellowArrowToYellowPlayer.oldPosition.x1
              || yellowArrowToYellowPlayerY1 !== yellowArrowToYellowPlayer.oldPosition.y1
              || yellowArrowToYellowPlayerX2 !== yellowArrowToYellowPlayer.oldPosition.x2
              || yellowArrowToYellowPlayerY2 !== yellowArrowToYellowPlayer.oldPosition.y2
              || yellowArrowToYellowPlayerLength !== yellowArrowToYellowPlayer.oldPosition.length))
            {
              this.socket.emit('yellowConstraintMovement', {
                x1: yellowArrowToYellowPlayer.pointA.x,
                y1: yellowArrowToYellowPlayer.pointA.y,
                x2: yellowArrowToYellowPlayer.pointB.x,
                y2: yellowArrowToYellowPlayer.pointB.y,
                length: yellowArrowToYellowPlayer.length});
            }

            // save old position data
            yellowArrowToYellowPlayer.oldPosition = {
              x1: yellowArrowToYellowPlayer.pointA.x,
              y1: yellowArrowToYellowPlayer.pointA.y,
              x2: yellowArrowToYellowPlayer.pointB.x,
              y2: yellowArrowToYellowPlayer.pointB.y,
              length: yellowArrowToYellowPlayer.length
            };
          }

          if(greenPlayer)
          {
            var greenX = greenPlayer.x;
            var greenY = greenPlayer.y;
            if (greenPlayer.oldPosition && (greenX !== greenPlayer.oldPosition.x
              || greenY !== greenPlayer.oldPosition.y))
            {
              this.socket.emit('greenMovement', {
                x: greenPlayer.x,
                y: greenPlayer.y});
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
            if (greenArrow.oldPosition && (greenArrowX !== greenArrow.oldPosition.x
              || greenArrowY !== greenArrow.oldPosition.y
              || greenArrowAngle !== greenArrow.oldPosition.angle))
            {
              this.socket.emit('greenArrowMovement', {
                x: greenArrow.x,
                y: greenArrow.y,
                angle: greenArrow.angle});
            }

            // save old position data
            greenArrow.oldPosition = {
              x: greenArrow.x,
              y: greenArrow.y,
              angle: greenArrow.angle
            };
          }
          if(greenArrowToGreenPlayer)
          {
            var greenArrowToGreenPlayerX1 = greenArrowToGreenPlayer.pointA.x;
            var greenArrowToGreenPlayerY1 = greenArrowToGreenPlayer.pointA.y;
            var greenArrowToGreenPlayerX2 = greenArrowToGreenPlayer.pointB.x;
            var greenArrowToGreenPlayerY2 = greenArrowToGreenPlayer.pointB.y;
            var greenArrowToGreenPlayerLength = greenArrowToGreenPlayer.length;

            if (greenArrowToGreenPlayer.oldPosition &&
              (greenArrowToGreenPlayerX1 !== greenArrowToGreenPlayer.oldPosition.x1
              || greenArrowToGreenPlayerY1 !== greenArrowToGreenPlayer.oldPosition.y1
              || greenArrowToGreenPlayerX2 !== greenArrowToGreenPlayer.oldPosition.x2
              || greenArrowToGreenPlayerY2 !== greenArrowToGreenPlayer.oldPosition.y2
              || greenArrowToGreenPlayerLength !== greenArrowToGreenPlayer.oldPosition.length))
            {
              this.socket.emit('greenConstraintMovement', {
                x1: greenArrowToGreenPlayer.pointA.x,
                y1: greenArrowToGreenPlayer.pointA.y,
                x2: greenArrowToGreenPlayer.pointB.x,
                y2: greenArrowToGreenPlayer.pointB.y,
                length: greenArrowToGreenPlayer.length});
            }

            // save old position data
            greenArrowToGreenPlayer.oldPosition = {
              x1: greenArrowToGreenPlayer.pointA.x,
              y1: greenArrowToGreenPlayer.pointA.y,
              x2: greenArrowToGreenPlayer.pointB.x,
              y2: greenArrowToGreenPlayer.pointB.y,
              length: greenArrowToGreenPlayer.length
            };
          }

          if(pinkPlayer)
          {
            var pinkX = pinkPlayer.x;
            var pinkY = pinkPlayer.y;
            if (pinkPlayer.oldPosition && (pinkX !== pinkPlayer.oldPosition.x
              || pinkY !== pinkPlayer.oldPosition.y))
            {
              this.socket.emit('pinkMovement', {
                x: pinkPlayer.x,
                y: pinkPlayer.y});
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
            if (pinkArrow.oldPosition && (pinkArrowX !== pinkArrow.oldPosition.x
              || pinkArrowY !== pinkArrow.oldPosition.y
              || pinkArrowAngle !== pinkArrow.oldPosition.angle))
            {
              this.socket.emit('pinkArrowMovement', {
                x: pinkArrow.x,
                y: pinkArrow.y,
                angle: pinkArrow.angle});
            }

            // save old position data
            pinkArrow.oldPosition = {
              x: pinkArrow.x,
              y: pinkArrow.y,
              angle: pinkArrow.angle
            };
          }
          if(pinkArrowToPinkPlayer)
          {
            var pinkArrowToPinkPlayerX1 = pinkArrowToPinkPlayer.pointA.x;
            var pinkArrowToPinkPlayerY1 = pinkArrowToPinkPlayer.pointA.y;
            var pinkArrowToPinkPlayerX2 = pinkArrowToPinkPlayer.pointB.x;
            var pinkArrowToPinkPlayerY2 = pinkArrowToPinkPlayer.pointB.y;
            var pinkArrowToPinkPlayerLength = pinkArrowToPinkPlayer.length;

            if (pinkArrowToPinkPlayer.oldPosition &&
              (pinkArrowToPinkPlayerX1 !== pinkArrowToPinkPlayer.oldPosition.x1
              || pinkArrowToPinkPlayerY1 !== pinkArrowToPinkPlayer.oldPosition.y1
              || pinkArrowToPinkPlayerX2 !== pinkArrowToPinkPlayer.oldPosition.x2
              || pinkArrowToPinkPlayerY2 !== pinkArrowToPinkPlayer.oldPosition.y2
              || pinkArrowToPinkPlayerLength !== pinkArrowToPinkPlayer.oldPosition.length))
            {
              this.socket.emit('pinkConstraintMovement', {
                x1: pinkArrowToPinkPlayer.pointA.x,
                y1: pinkArrowToPinkPlayer.pointA.y,
                x2: pinkArrowToPinkPlayer.pointB.x,
                y2: pinkArrowToPinkPlayer.pointB.y,
                length: pinkArrowToPinkPlayer.length});
            }

            // save old position data
            pinkArrowToPinkPlayer.oldPosition = {
              x1: pinkArrowToPinkPlayer.pointA.x,
              y1: pinkArrowToPinkPlayer.pointA.y,
              x2: pinkArrowToPinkPlayer.pointB.x,
              y2: pinkArrowToPinkPlayer.pointB.y,
              length: pinkArrowToPinkPlayer.length
            };
          }

          if(pipeBodySprite)
          {
            var pipeBodyX = pipeBodySprite.x;
            var pipeBodyY = pipeBodySprite.y;
            if (pipeBodySprite.oldPosition && (pipeBodyX !== pipeBodySprite.oldPosition.x
              || pipeBodyY !== pipeBodySprite.oldPosition.y))
            {
              this.socket.emit('clawAnchorMovement', {
                 x: pipeBodySprite.x,
                 y: pipeBodySprite.y});
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
            if (clawBodySprite.oldPosition && (clawBodyX !== clawBodySprite.oldPosition.x
              || clawBodyY !== clawBodySprite.oldPosition.y
              || clawBodyAngle !== clawBodySprite.oldPosition.angle))
            {
              this.socket.emit('clawBodyMovement', {
                x: clawBodySprite.x,
                y: clawBodySprite.y,
                angle: clawBodySprite.angle});
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

            if (armConnectLeftSprite.oldPosition && (armConnectLeftX !== armConnectLeftSprite.oldPosition.x
              || armConnectLeftY !== armConnectLeftSprite.oldPosition.y
              || armConnectLeftAngle !== armConnectLeftSprite.oldPosition.angle))
            {
              this.socket.emit('clawArmLeftMovement', {
                x: armConnectLeftSprite.x,
                y: armConnectLeftSprite.y,
                angle: armConnectLeftSprite.angle});
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
            if (armConnectRightSprite.oldPosition && (armConnectRightX !== armConnectRightSprite.oldPosition.x
              || armConnectRightY !== armConnectRightSprite.oldPosition.y
              || armConnectRightAngle !== armConnectRightSprite.oldPosition.angle))
            {
              this.socket.emit('clawArmRightMovement', {
                x: armConnectRightSprite.x,
                y: armConnectRightSprite.y,
                angle: armConnectRightSprite.angle});
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

            if (armLeftSprite.oldPosition && (pipeBodyX !== armLeftSprite.oldPosition.x
              || pipeBodyY !== armLeftSprite.oldPosition.y
              || armLeftAngle !== armLeftSprite.oldPosition.angle))
            {
              this.socket.emit('clawGrabberLeftMovement', {
                x: armLeftSprite.x,
                y: armLeftSprite.y});
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

            if (armRightSprite.oldPosition && (armRightX !== armRightSprite.oldPosition.x
              || armRightY !== armRightSprite.oldPosition.y
              || armRightAngle !== armRightSprite.oldPosition.angle))
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

          if(clawToPipeBody)
          {
            var clawToPipeBodyX1 = clawToPipeBody.pointA.x;
            var clawToPipeBodyY1 = clawToPipeBody.pointA.y;
            var clawToPipeBodyX2 = clawToPipeBody.pointB.x;
            var clawToPipeBodyY2 = clawToPipeBody.pointB.y;
            var clawToPipeBodyBodyX1 = pipeBodySprite.x;
            var clawToPipeBodyBodyY1 = pipeBodySprite.y;
            var clawToPipeBodyBodyX2 = clawBodySprite.x;
            var clawToPipeBodyBodyY2 = clawBodySprite.y;
            var clawToPipeBodyLength = clawToPipeBody.length;

            if (clawToPipeBody.oldPosition &&
              ((clawToPipeBodyX1 !== clawToPipeBody.oldPosition.x1 && clawToPipeBodyBodyX1 !== clawToPipeBody.oldPosition.bodyAX)
              || (clawToPipeBodyY1 !== clawToPipeBody.oldPosition.y1 && clawToPipeBodyBodyY1 !== clawToPipeBody.oldPosition.bodyAY)
              || (clawToPipeBodyX2 !== clawToPipeBody.oldPosition.x2 && clawToPipeBodyBodyX2 !== clawToPipeBody.oldPosition.bodyBX)
              || (clawToPipeBodyY2 !== clawToPipeBody.oldPosition.y2 && clawToPipeBodyBodyY2 !== clawToPipeBody.oldPosition.bodyBY)
              || clawToPipeBodyLength !== clawToPipeBody.oldPosition.length ))
            {
              this.socket.emit('clawToPipeBodyMovement',
               {
                x1: clawToPipeBody.pointA.x,
                y1: clawToPipeBody.pointA.y,
                x2: clawToPipeBody.pointB.x,
                y2: clawToPipeBody.pointB.y,
                bodyX1: pipeBodySprite.x,
                bodyY1: pipeBodySprite.y,
                bodyX2: clawBodySprite.x,
                bodyY2: clawBodySprite.y,
                length: clawToPipeBody.length
              });
            }

            // save old position data
            clawToPipeBody.oldPosition = {
              x1: clawToPipeBody.pointA.x,
              y1: clawToPipeBody.pointA.y,
              x2: clawToPipeBody.pointB.x,
              y2: clawToPipeBody.pointB.y,
              bodyAX: pipeBodySprite.x,
              bodyAY: pipeBodySprite.y,
              bodyBX: clawBodySprite.x,
              bodyBY: clawBodySprite.y,
              length: clawToPipeBody.length
            };
          }

          if(leftConnectToClaw)
          {
            var leftConnectToClawX1 = leftConnectToClaw.pointA.x;
            var leftConnectToClawY1 = leftConnectToClaw.pointA.y;
            var leftConnectToClawX2 = leftConnectToClaw.pointB.x;
            var leftConnectToClawY2 = leftConnectToClaw.pointB.y;
            var leftConnectToClawBodyX1 = armConnectLeftSprite.x;
            var leftConnectToClawBodyY1 = armConnectLeftSprite.y;
            var leftConnectToClawBodyX2 = clawBodySprite.x;
            var leftConnectToClawBodyY2 = clawBodySprite.y;
            var leftConnectToClawLength = leftConnectToClaw.length;

            if (leftConnectToClaw.oldPosition &&
              ((leftConnectToClawX1 !== leftConnectToClaw.oldPosition.x1 && leftConnectToClawBodyX1 !== leftConnectToClaw.oldPosition.bodyAX)
              || (leftConnectToClawY1 !== leftConnectToClaw.oldPosition.y1 && leftConnectToClawBodyY1 !== leftConnectToClaw.oldPosition.bodyAY)
              || (leftConnectToClawX2 !== leftConnectToClaw.oldPosition.x2 && leftConnectToClawBodyX2 !== leftConnectToClaw.oldPosition.bodyBX)
              || (leftConnectToClawY2 !== leftConnectToClaw.oldPosition.y2 && leftConnectToClawBodyY2 !== leftConnectToClaw.oldPosition.bodyBY)
              || leftConnectToClawLength !== leftConnectToClaw.oldPosition.length ))
            {
              this.socket.emit('leftConnectToClawMovement',
              {
                x1: leftConnectToClaw.pointA.x,
                y1: leftConnectToClaw.pointA.y,
                x2: leftConnectToClaw.pointB.x,
                y2: leftConnectToClaw.pointB.y,
                bodyX1: armConnectLeftSprite.x,
                bodyY1: armConnectLeftSprite.y,
                bodyX2: clawBodySprite.x,
                bodyY2: clawBodySprite.y,
                length: leftConnectToClaw.length
              });
            }

            // save old position data
            leftConnectToClaw.oldPosition = {
              x1: leftConnectToClaw.pointA.x,
              y1: leftConnectToClaw.pointA.y,
              x2: leftConnectToClaw.pointB.x,
              y2: leftConnectToClaw.pointB.y,
              bodyAX: armConnectLeftSprite.x,
              bodyAY: armConnectLeftSprite.y,
              bodyBX: clawBodySprite.x,
              bodyBY: clawBodySprite.y,
              length: leftConnectToClaw.length
            };
          }

          if(rightConnectToClaw)
          {
            var rightConnectToClawX1 = rightConnectToClaw.pointA.x;
            var rightConnectToClawY1 = rightConnectToClaw.pointA.y;
            var rightConnectToClawX2 = rightConnectToClaw.pointB.x;
            var rightConnectToClawY2 = rightConnectToClaw.pointB.y;
            var rightConnectToClawBodyX1 = armConnectRightSprite.x;
            var rightConnectToClawBodyY1 = armConnectRightSprite.y;
            var rightConnectToClawBodyX2 = clawBodySprite.x;
            var rightConnectToClawBodyY2 = clawBodySprite.y;
            var rightConnectToClawLength = rightConnectToClaw.length;

            if (rightConnectToClaw.oldPosition &&
              ((rightConnectToClawX1 !== rightConnectToClaw.oldPosition.x1 && rightConnectToClawBodyX1 !== rightConnectToClaw.oldPosition.bodyAX)
              || (rightConnectToClawY1 !== rightConnectToClaw.oldPosition.y1 && rightConnectToClawBodyY1 !== rightConnectToClaw.oldPosition.bodyAY)
              || (rightConnectToClawX2 !== rightConnectToClaw.oldPosition.x2 && rightConnectToClawBodyX2 !== rightConnectToClaw.oldPosition.bodyBX)
              || (rightConnectToClawY2 !== rightConnectToClaw.oldPosition.y2 && rightConnectToClawBodyY2 !== rightConnectToClaw.oldPosition.bodyBY)
              || rightConnectToClawLength !== rightConnectToClaw.oldPosition.length))
            {
              this.socket.emit('rightConnectToClawMovement',
              {
                x1: rightConnectToClaw.pointA.x,
                y1: rightConnectToClaw.pointA.y,
                x2: rightConnectToClaw.pointB.x,
                y2: rightConnectToClaw.pointB.y,
                bodyX1: armConnectRightSprite.x,
                bodyY1: armConnectRightSprite.y,
                bodyX2: clawBodySprite.x,
                bodyY2: clawBodySprite.y,
                length: rightConnectToClaw.length
              });

            }

            // save old position data
            rightConnectToClaw.oldPosition = {
              x1: rightConnectToClaw.pointA.x,
              y1: rightConnectToClaw.pointA.y,
              x2: rightConnectToClaw.pointB.x,
              y2: rightConnectToClaw.pointB.y,
              bodyAX: armConnectRightSprite.x,
              bodyAY: armConnectRightSprite.y,
              bodyBX: clawBodySprite.x,
              bodyBY: clawBodySprite.y,
              length: rightConnectToClaw.length
            };
          }

          if(leftArmToLeftConnect)
          {
            var leftArmToLeftConnectX1 = leftArmToLeftConnect.pointA.x;
            var leftArmToLeftConnectY1 = leftArmToLeftConnect.pointA.y;
            var leftArmToLeftConnectX2 = leftArmToLeftConnect.pointB.x;
            var leftArmToLeftConnectY2 = leftArmToLeftConnect.pointB.y;
            var leftArmToLeftConnectBodyX1 = leftArmToLeftConnect.bodyA.position.x;
            var leftArmToLeftConnectBodyY1 = leftArmToLeftConnect.bodyA.position.y;
            var leftArmToLeftConnectBodyX2 = leftArmToLeftConnect.bodyB.position.x;
            var leftArmToLeftConnectBodyY2 = leftArmToLeftConnect.bodyB.position.y;
            var leftArmToLeftConnectLength = leftArmToLeftConnect.length;

            if (leftArmToLeftConnect.oldPosition &&
              ((leftArmToLeftConnectX1 !== leftArmToLeftConnect.oldPosition.x1 && leftArmToLeftConnectBodyX1 !== leftArmToLeftConnect.oldPosition.bodyAX)
              || (leftArmToLeftConnectY1 !== leftArmToLeftConnect.oldPosition.y1 && leftArmToLeftConnectBodyY1 !== leftArmToLeftConnect.oldPosition.bodyAY)
              || (leftArmToLeftConnectX2 !== leftArmToLeftConnect.oldPosition.x2 && leftArmToLeftConnectBodyX2 !== leftArmToLeftConnect.oldPosition.bodyBX)
              || (leftArmToLeftConnectY2 !== leftArmToLeftConnect.oldPosition.y2 && leftArmToLeftConnectBodyY2 !== leftArmToLeftConnect.oldPosition.bodyBY)
              || leftArmToLeftConnectLength !== leftArmToLeftConnect.oldPosition.length))
            {
              this.socket.emit('leftArmToLeftConnectMovement',
              {
                x1: leftArmToLeftConnect.pointA.x,
                y1: leftArmToLeftConnect.pointA.y,
                x2: leftArmToLeftConnect.pointB.x,
                y2: leftArmToLeftConnect.pointB.y,
                bodyX1: leftArmToLeftConnect.bodyA.position.x,
                bodyY1: leftArmToLeftConnect.bodyA.position.y,
                bodyX2: leftArmToLeftConnect.bodyB.position.x,
                bodyY2: leftArmToLeftConnect.bodyB.position.y,
                length: leftArmToLeftConnect.length
              });
            }

            // save old position data
            leftArmToLeftConnect.oldPosition = {
              x1: leftArmToLeftConnect.pointA.x,
              y1: leftArmToLeftConnect.pointA.y,
              x2: leftArmToLeftConnect.pointB.x,
              y2: leftArmToLeftConnect.pointB.y,
              bodyAX: leftArmToLeftConnect.bodyA.position.x,
              bodyAY: leftArmToLeftConnect.bodyA.position.y,
              bodyBX: leftArmToLeftConnect.bodyB.position.x,
              bodyBY: leftArmToLeftConnect.bodyB.position.y,
              length: leftArmToLeftConnect.length
            };
          }

          if(rightArmToRightConnect)
          {
            var rightArmToRightConnectX1 = rightArmToRightConnect.pointA.x;
            var rightArmToRightConnectY1 = rightArmToRightConnect.pointA.y;
            var rightArmToRightConnectX2 = rightArmToRightConnect.pointB.x;
            var rightArmToRightConnectY2 = rightArmToRightConnect.pointB.y;
            var rightArmToRightConnectBodyX1 = rightArmToRightConnect.bodyA.position.x;
            var rightArmToRightConnectBodyY1 = rightArmToRightConnect.bodyA.position.y;
            var rightArmToRightConnectBodyX2 = rightArmToRightConnect.bodyB.position.x;
            var rightArmToRightConnectBodyY2 = rightArmToRightConnect.bodyB.position.y;
            var rightArmToRightConnectLength = rightArmToRightConnect.length;

            if (rightArmToRightConnect.oldPosition &&
              ((rightArmToRightConnectX1 !== rightArmToRightConnect.oldPosition.x1 && rightArmToRightConnectBodyX1 !== rightArmToRightConnect.oldPosition.bodyAX)
              ||(rightArmToRightConnectY1 !== rightArmToRightConnect.oldPosition.y1 && rightArmToRightConnectBodyY1 !== rightArmToRightConnect.oldPosition.bodyAY)
              || (rightArmToRightConnectX2 !== rightArmToRightConnect.oldPosition.x2 && rightArmToRightConnectBodyX2 !== rightArmToRightConnect.oldPosition.bodyBX)
              || (rightArmToRightConnectY2 !== rightArmToRightConnect.oldPosition.y2 && rightArmToRightConnectBodyY2 !== rightArmToRightConnect.oldPosition.bodyBY)
              || rightArmToRightConnectLength !== rightArmToRightConnect.oldPosition.length ))
            {
              this.socket.emit('rightArmToRightConnectMovement',
              {
                x1: rightArmToRightConnect.pointA.x,
                y1: rightArmToRightConnect.pointA.y,
                x2: rightArmToRightConnect.pointB.x,
                y2: rightArmToRightConnect.pointB.y,
                bodyX1: rightArmToRightConnect.bodyA.position.x,
                bodyY1: rightArmToRightConnect.bodyA.position.y,
                bodyX2: rightArmToRightConnect.bodyB.position.x,
                bodyY2: rightArmToRightConnect.bodyB.position.y,
                length: rightArmToRightConnect.length
              });
            }

            // save old position data
            rightArmToRightConnect.oldPosition = {
              x1: rightArmToRightConnect.pointA.x,
              y1: rightArmToRightConnect.pointA.y,
              x2: rightArmToRightConnect.pointB.x,
              y2: rightArmToRightConnect.pointB.y,
              bodyAX: rightArmToRightConnect.bodyA.position.x,
              bodyAY: rightArmToRightConnect.bodyA.position.y,
              bodyBX: rightArmToRightConnect.bodyB.position.x,
              bodyBY: rightArmToRightConnect.bodyB.position.y,
              length: rightArmToRightConnect.length
            };
          }

          if(rightArmToLeftArm)
          {
            var rightArmToLeftArmX1 = rightArmToLeftArm.pointA.x;
            var rightArmToLeftArmY1 = rightArmToLeftArm.pointA.y;
            var rightArmToLeftArmX2 = rightArmToLeftArm.pointB.x;
            var rightArmToLeftArmY2 = rightArmToLeftArm.pointB.y;
            var rightArmToLeftArmBodyX1 = rightArmToLeftArm.bodyA.position.x;
            var rightArmToLeftArmBodyY1 = rightArmToLeftArm.bodyA.position.y;
            var rightArmToLeftArmBodyX2 = rightArmToLeftArm.bodyB.position.x;
            var rightArmToLeftArmBodyY2 = rightArmToLeftArm.bodyB.position.y;
            var rightArmToLeftArmLength = rightArmToLeftArm.length;

            if (rightArmToLeftArm.oldPosition &&
              ((rightArmToLeftArmX1 !== rightArmToLeftArm.oldPosition.x1 && rightArmToLeftArmBodyX1 !== rightArmToLeftArm.oldPosition.bodyAX)
              || (rightArmToLeftArmY1 !== rightArmToLeftArm.oldPosition.y1 && rightArmToLeftArmBodyY1 !== rightArmToLeftArm.oldPosition.bodyAY)
              || (rightArmToLeftArmX2 !== rightArmToLeftArm.oldPosition.x2 && rightArmToLeftArmBodyX2 !== rightArmToLeftArm.oldPosition.bodyBX)
              || (rightArmToLeftArmY2 !== rightArmToLeftArm.oldPosition.y2 && rightArmToLeftArmBodyY2 !== rightArmToLeftArm.oldPosition.bodyBY)
              || rightArmToLeftArmLength !== rightArmToLeftArm.oldPosition.length ))
            {
              this.socket.emit('rightArmToLeftArmMovement',
              {
                x1: rightArmToLeftArm.pointA.x,
                y1: rightArmToLeftArm.pointA.y,
                x2: rightArmToLeftArm.pointB.x,
                y2: rightArmToLeftArm.pointB.y,
                bodyX1: rightArmToLeftArm.bodyA.position.x,
                bodyY1: rightArmToLeftArm.bodyA.position.y,
                bodyX2: rightArmToLeftArm.bodyB.position.x,
                bodyY2: rightArmToLeftArm.bodyB.position.y,
                length: rightArmToLeftArm.length
            });
            }

            // save old position data
            rightArmToLeftArm.oldPosition = {
              x1: rightArmToLeftArm.pointA.x,
              y1: rightArmToLeftArm.pointA.y,
              x2: rightArmToLeftArm.pointB.x,
              y2: rightArmToLeftArm.pointB.y,
              bodyAX: rightArmToLeftArm.bodyA.position.x,
              bodyAY: rightArmToLeftArm.bodyA.position.y,
              bodyBX: rightArmToLeftArm.bodyB.position.x,
              bodyBY: rightArmToLeftArm.bodyB.position.y,
              length: rightArmToLeftArm.length
            };
          }

          if(leftConnectToRightConnect)
          {
            var leftConnectToRightConnectX1 = leftConnectToRightConnect.pointA.x;
            var leftConnectToRightConnectY1 = leftConnectToRightConnect.pointA.y;
            var leftConnectToRightConnectX2 = leftConnectToRightConnect.pointB.x;
            var leftConnectToRightConnectY2 = leftConnectToRightConnect.pointB.y;
            var leftConnectToRightConnectBodyX1 = leftConnectToRightConnect.bodyA.position.x;
            var leftConnectToRightConnectBodyY1 = leftConnectToRightConnect.bodyA.position.y;
            var leftConnectToRightConnectBodyX2 = leftConnectToRightConnect.bodyB.position.x;
            var leftConnectToRightConnectBodyY2 = leftConnectToRightConnect.bodyB.position.y;
            var leftConnectToRightConnectLength = leftConnectToRightConnect.length;

            if (leftConnectToRightConnect.oldPosition &&
              ((leftConnectToRightConnectX1 !== leftConnectToRightConnect.oldPosition.x1 && leftConnectToRightConnectBodyX1 !== leftConnectToRightConnect.oldPosition.bodyAX)
              || (leftConnectToRightConnectY1 !== leftConnectToRightConnect.oldPosition.y1 && leftConnectToRightConnectBodyY1 !== leftConnectToRightConnect.oldPosition.bodyAY)
              || (leftConnectToRightConnectX2 !== leftConnectToRightConnect.oldPosition.x2 && leftConnectToRightConnectBodyX2 !== leftConnectToRightConnect.oldPosition.bodyBX)
              || (leftConnectToRightConnectY2 !== leftConnectToRightConnect.oldPosition.y2 && leftConnectToRightConnectBodyY2 !== leftConnectToRightConnect.oldPosition.bodyBY)
              || leftConnectToRightConnectLength !== leftConnectToRightConnect.oldPosition.length ))
            {
              this.socket.emit('leftConnectToRightConnectMovement',
              {
                x1: leftConnectToRightConnect.pointA.x,
                y1: leftConnectToRightConnect.pointA.y,
                x2: leftConnectToRightConnect.pointB.x,
                y2: leftConnectToRightConnect.pointB.y,
                bodyX1: leftConnectToRightConnect.bodyA.position.x,
                bodyY1: leftConnectToRightConnect.bodyA.position.y,
                bodyX2: leftConnectToRightConnect.bodyB.position.x,
                bodyY2: leftConnectToRightConnect.bodyB.position.y,
                length: leftConnectToRightConnect.length
            });
            }

            // save old position data
            leftConnectToRightConnect.oldPosition = {
              x1: leftConnectToRightConnect.pointA.x,
              y1: leftConnectToRightConnect.pointA.y,
              x2: leftConnectToRightConnect.pointB.x,
              y2: leftConnectToRightConnect.pointB.y,
              bodyAX: leftConnectToRightConnect.bodyA.position.x,
              bodyAY: leftConnectToRightConnect.bodyA.position.y,
              bodyBX: leftConnectToRightConnect.bodyB.position.x,
              bodyBY: leftConnectToRightConnect.bodyB.position.y,
              length: leftConnectToRightConnect.length
            };
          }

          if(leftConnectToClawTop)
          {
            var leftConnectToClawTopX1 = leftConnectToClawTop.pointA.x;
            var leftConnectToClawTopY1 = leftConnectToClawTop.pointA.y;
            var leftConnectToClawTopX2 = leftConnectToClawTop.pointB.x;
            var leftConnectToClawTopY2 = leftConnectToClawTop.pointB.y;
            var leftConnectToClawTopBodyX1 = leftConnectToClawTop.bodyA.position.x;
            var leftConnectToClawTopBodyY1 = leftConnectToClawTop.bodyA.position.y;
            var leftConnectToClawTopBodyX2 = leftConnectToClawTop.bodyB.position.x;
            var leftConnectToClawTopBodyY2 = leftConnectToClawTop.bodyB.position.y;
            var leftConnectToClawTopLength = leftConnectToClawTop.length;

            if (leftConnectToClawTop.oldPosition &&
              ((leftConnectToClawTopX1 !== leftConnectToClawTop.oldPosition.x1 && leftConnectToClawTopBodyX1 !== leftConnectToClawTop.oldPosition.bodyAX)
              || (leftConnectToClawTopY1 !== leftConnectToClawTop.oldPosition.y1 && leftConnectToClawTopBodyY1 !== leftConnectToClawTop.oldPosition.bodyAY)
              || (leftConnectToClawTopX2 !== leftConnectToClawTop.oldPosition.x2 && leftConnectToClawTopBodyX2 !== leftConnectToClawTop.oldPosition.bodyBX)
              || (leftConnectToClawTopY2 !== leftConnectToClawTop.oldPosition.y2 && leftConnectToClawTopBodyY2 !== leftConnectToClawTop.oldPosition.bodyBY)
              || leftConnectToClawTopLength !== leftConnectToClawTop.oldPosition.length ))
            {
              this.socket.emit('leftConnectToClawTopMovement',
              {
                x1: leftConnectToClawTop.pointA.x,
                y1: leftConnectToClawTop.pointA.y,
                x2: leftConnectToClawTop.pointB.x,
                y2: leftConnectToClawTop.pointB.y,
                bodyX1: leftConnectToClawTop.bodyA.position.x,
                bodyY1: leftConnectToClawTop.bodyA.position.y,
                bodyX2: leftConnectToClawTop.bodyB.position.x,
                bodyY2: leftConnectToClawTop.bodyB.position.y,
                length: leftConnectToClawTop.length
            });
          }

            // save old position data
            leftConnectToClawTop.oldPosition = {
              x1: leftConnectToClawTop.pointA.x,
              y1: leftConnectToClawTop.pointA.y,
              x2: leftConnectToClawTop.pointB.x,
              y2: leftConnectToClawTop.pointB.y,
              bodyAX: leftConnectToClawTop.bodyA.position.x,
              bodyAY: leftConnectToClawTop.bodyA.position.y,
              bodyBX: leftConnectToClawTop.bodyB.position.x,
              bodyBY: leftConnectToClawTop.bodyB.position.y,
              length: leftConnectToClawTop.length
            };
          }

          if(rightConnectToClawTop)
          {
            var rightConnectToClawTopX1 = rightConnectToClawTop.pointA.x;
            var rightConnectToClawTopY1 = rightConnectToClawTop.pointA.y;
            var rightConnectToClawTopX2 = rightConnectToClawTop.pointB.x;
            var rightConnectToClawTopY2 = rightConnectToClawTop.pointB.y;
            var rightConnectToClawTopBodyX1 = rightArmToRightConnect.bodyA.position.x;
            var rightConnectToClawTopBodyY1 = rightArmToRightConnect.bodyA.position.y;
            var rightConnectToClawTopBodyX2 = rightArmToRightConnect.bodyB.position.x;
            var rightConnectToClawTopBodyY2 = rightArmToRightConnect.bodyB.position.y;
            var rightConnectToClawTopLength = rightConnectToClawTop.length;

            if (rightConnectToClawTop.oldPosition &&
              ((rightConnectToClawTopX1 !== rightConnectToClawTop.oldPosition.x1 && rightConnectToClawTopBodyX1 !== rightConnectToClawTop.oldPosition.bodyAX)
              || (rightConnectToClawTopY1 !== rightConnectToClawTop.oldPosition.y1 && rightConnectToClawTopBodyY1 !== rightConnectToClawTop.oldPosition.bodyAY)
              || (rightConnectToClawTopX2 !== rightConnectToClawTop.oldPosition.x2  && rightConnectToClawTopBodyX2 !== rightConnectToClawTop.oldPosition.bodyBX)
              || (rightConnectToClawTopY2 !== rightConnectToClawTop.oldPosition.y2 && rightConnectToClawTopBodyY2 !== rightConnectToClawTop.oldPosition.bodyBY)
              || rightConnectToClawTopLength !== rightConnectToClawTop.oldPosition.length ))
            {
              this.socket.emit('rightConnectToClawTopMovement',
              {
                x1: rightConnectToClawTop.pointA.x,
                y1: rightConnectToClawTop.pointA.y,
                x2: rightConnectToClawTop.pointB.x,
                y2: rightConnectToClawTop.pointB.y,
                bodyX1: rightConnectToClawTop.bodyA.position.x,
                bodyY1: rightConnectToClawTop.bodyA.position.y,
                bodyX2: rightConnectToClawTop.bodyB.position.x,
                bodyY2: rightConnectToClawTop.bodyB.position.y,
                length: rightConnectToClawTop.length
            });
            }

            // save old position data
            rightConnectToClawTop.oldPosition = {
              x1: rightConnectToClawTop.pointA.x,
              y1: rightConnectToClawTop.pointA.y,
              x2: rightConnectToClawTop.pointB.x,
              y2: rightConnectToClawTop.pointB.y,
              bodyAX: rightConnectToClawTop.bodyA.position.x,
              bodyAY: rightConnectToClawTop.bodyA.position.y,
              bodyBX: rightConnectToClawTop.bodyB.position.x,
              bodyBY: rightConnectToClawTop.bodyB.position.y,
              length: rightConnectToClawTop.length
            };
          }*/
    }
});


//import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
//import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin/src";

var config = {
        type: Phaser.AUTO,
        parent: 'The-Claw',
        width: 1000,
        height: 640,
        pixelArt: true,
        input: {gamepad: true},
        audio: { disableWebAudio: true },
        physics:{
          default: 'matter',
          arcade: { debug: true, gravity: { y: 60 }, collideWorldBounds: true },
          matter: { debug: false, gravity: { y: 9.78 } },
          impact: { debug: true } },
        scene: [
            Preloader,
            MainMenu,
            PlayerEnter,
            Game,
            YouthElement,
            GameOverScene ],
        plugins: {
          scene: [
            {
              plugin: PhaserMatterCollisionPlugin,
              key: "matterCollision",
              mapping: "matterCollision"
            }
 ]},

  };
  var game = new Phaser.Game(config);
