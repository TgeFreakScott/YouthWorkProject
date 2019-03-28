class Game
{
  constructor()
    {
        this.boundRecursiveUpdate = this.update.bind(this);

        this.canvas = document.getElementById("canvas");
        canvas.id = "canvas";
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth;
        this.ctx = canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.sceneManager = new ScreenManager(this.ctx, this.canvas);
        this.sceneManager.addScene(new Menu("Menu", this.sceneManager, this.ctx));
        this.sceneManager.addScene(new Gameplay("Gameplay", this.sceneManager, this.ctx));
        this.sceneManager.goToScene("Menu");
        this.sceneManager.renderCurrentScene(this.ctx);
    }

    init()
    {
        document.addEventListener("keydown",this.keyDownHandler.bind(null, this));
        document.addEventListener("gamepadconnected", function(e) { console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);});
        document.addEventListener("gamepaddisconnected", function(e) { console.log("Gamepad disconnected from index %d: %s",e.gamepad.index, e.gamepad.id);});

        var gamepads = {};

        function gamepadHandler(event, connecting)
        {
          var gamepad = event.gamepad;
          // Note:
          // gamepad === navigator.getGamepads()[gamepad.index]

          if (connecting)
          {
            gamepads[gamepad.index] = gamepad;
          }
          else
          {
            delete gamepads[gamepad.index];
          }
        }

        document.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
        document.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);


    }

    update()
    {
      //this.GamePad();
      var now = Date.now();//takes time from computer
      var deltaTime = (now - this.previousTime);
      this.previousTime = now;
      this.sceneManager.updateCurrentScene(deltaTime);
      this.draw();
    }

    draw()
    {
      this.ctx.clearRect(0,0,canvas.height, canvas.height);
      this.sceneManager.renderCurrentScene(this.ctx);
    }

    keyDownHandler(game , e)
    {
        // A 65
        // D 68
        // W 87
        // S 83
        // R 82
        // Down 40
        // Up 38
        // Left 37
        // Right 39
        // SpaceBar = 32

        if(e.keyCode === 65)//LEFT
        {
            game.player.tempX = game.player.posX;
            game.player.posX -= game.player.moveSpeed;
        }

        if(e.keyCode === 68)//RIGHT
        {
            game.player.tempX = game.player.posX;
            game.player.posX += game.player.moveSpeed;
        }

        if(e.keyCode === 38)//UP
        {
            if(game.playerFall === false)
            {
                game.playerJump = true;
            }
        }
        if(e.keyCode === 82)//R
        {
            game.playerFall = false;
            game.playerJump = false;
        }

        if([65,68,38,82, 40, 39].indexOf(event.keyCode) > -1)
            {
                 e.preventDefault();
            }

        }

    gamepadHandler(game , e)
    {
      var gamepad = event.gamepad;
      // Note:
      // gamepad === navigator.getGamepads()[gamepad.index]

      if (connecting)
      {
        game.gamepads[gamepad.index] = gamepad;
        console.log("connecting");
      }

      else
      {
        delete game.gamepads[gamepad.index];
        console.log("Disconnecting");
      }

      game.gamepads = navigator.getGamepads[0];

      var buttons =  game.gamepads.buttons;

      // button: X
      if(e.buttons[0].pressed === true)
      {
        console.log("button pressed");
      }

      // button: A
      if(buttons[1].pressed === true)
      {
        console.log("button pressed");
      }

      // button: B
      if(buttons[2].pressed === true)
      {
        console.log("button pressed");
      }

      // button: Y
      if(buttons[3].pressed === true)
      {
        console.log("button pressed");
      }

      // button: L
      if(buttons[4].pressed === true)
      {
        console.log("button pressed");
      }

      // button: R
      if(buttons[5].pressed === true)
      {
        console.log("button pressed");
      }

      // button: Select
      if(buttons[8].pressed === true)
      {
        console.log("button pressed");
      }

      // button: Start
      if(buttons[9].pressed === true)
      {
        console.log("button pressed");
      }

    }
}
