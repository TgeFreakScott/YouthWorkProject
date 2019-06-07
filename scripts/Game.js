class GameS
{
  constructor()
    {
        this.canvas = {};
        this.initCanvas();
        this.boundRecursiveUpdate = this.update.bind(this);
        this.boundDraw = this.draw.bind(this);
        this.sceneManager = new ScreenManager(this.ctx, this.canvas);
        this.tutorial = new Tutorial("Tutorial Screen", this.sceneManager, this.ctx);
        this.menu = new Menu("Menu Screen", this.sceneManager, this.ctx);
        this.gamePlay = new Gameplay("Gameplay Screen", this.sceneManager, this.ctx);
        this.sceneManager.addScene(this.tutorial);
        this.sceneManager.addScene(this.menu);
        this.sceneManager.addScene(this.gamePlay);
        this.sceneManager.goToScene(this.menu.title);
        this.sceneManager.renderCurrentScene(this.ctx);
    }

    initCanvas()
    {
        this.canvas = document.getElementById("canvas");
        this.canvas.id = "canvas";
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerWidth;
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.init();
    }

    init()
    {

    }

    update()
    {
      window.requestAnimationFrame(this.boundRecursiveUpdate);

      this.now = Date.now();//takes time from computer
      this.deltaTime = (this.now - this.previousTime);
      this.previousTime = this.now;
      this.sceneManager.updateCurrentScene(this.deltaTime);
      this.boundDraw();
    }

    draw()
    {
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
      this.sceneManager.renderCurrentScene(this.ctx);
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
