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
        this.sceneManager.addScene(new Menu("Menu", this.sceneManager));
        this.sceneManager.addScene(new Gameplay("Gameplay", this.sceneManager));
        this.sceneManager.goToScene("Title");
        this.sceneManager.renderCurrentScene(this.ctx);
    }

    init()
    {
        document.addEventListener("keydown",this.keyDownHandler.bind(null, this));

        var gamepads = {};
        var button = document.querySelector("#button");
        var axis = document.querySelector("#axis");

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

    GamePad()
    {
      //var gamepads = {};
      gamepads = navigator.getGamepads[0];
      var button = document.querySelector("#button");
      var axis = document.querySelector("#axis");
      axis.innerHTML = "X Axis State: " + Math.floor(gamepads.axes[0] + "Y: "+ Math.floor(gamepads.axes[1]));

      var buttons =  gamepads.buttons;

      if(buttons[0].pressed == true)
      {
        console.log("button pressed");
      }

    }
}
