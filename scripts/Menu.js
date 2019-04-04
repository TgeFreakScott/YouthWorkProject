class Menu extends Scene
{
    constructor(sceneTitle, sceneManager, context)
    {
        super(sceneTitle, sceneManager, context);//Calls the scene parent constructor from Scene
        this.haveEvents = 'ongamepadconnected' in window;
        this.controllers = {};
        this.playSprite = new Sprite(this.ctx, this.playerImageOptions);
        this.canvas = document.getElementById("mycanvas");
        this.connectHandlerBind = this.connecthandler.bind(null, this);
        this.disconnectHandlerBind = this.disconnecthandler.bind(null, this);
        window.addEventListener("gamepadconnected", this.connectHandlerBind, false);
        window.addEventListener("gamepaddisconnected", this.disconnectHandlerBind, false);
    }

    update(deltaTime)
    {
        super.update(deltaTime);
        this.updateStatus();
        this.playSprite.update(deltaTime);
    }

    render()
    {
        super.render();
        this.ctx.font = "50px serif";
        this.ctx.fillText(this.title, 10,50);
        document.body.style.backgroundColor = "#7EC0EE" //SKY BLUE
        this.playSprite.render();
    }

    connecthandler(game,e)
    {
      game.addgamepad(e.gamepad);
    }

    disconnecthandler(game,e)
    {
      game.removegamepad(e.gamepad);
    }

    removegamepad(gamepad)
    {
        var d = document.getElementById("controller" + gamepad.index);
        document.body.removeChild(d);
        delete controllers[gamepad.index];
    }

    addgamepad(gamepad)
    {
        this.controllers[gamepad.index] = gamepad;

        var d = document.createElement("div");
        d.setAttribute("id", "controller" + gamepad.index);

        var t = document.createElement("h1");
        t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
        d.appendChild(t);

        var b = document.createElement("div");
        b.className = "buttons";
        for (var i = 0; i < gamepad.buttons.length; i++)
        {
            var e = document.createElement("span");
            e.className = "button";
            //e.id = "b" + i;
            e.innerHTML = i;
            b.appendChild(e);
        }

        d.appendChild(b);

        var a = document.createElement("div");
        a.className = "axes";

        for (var i = 0; i < gamepad.axes.length; i++)
        {
          var p = document.createElement("progress");
          p.className = "axis";
          //p.id = "a" + i;
          p.setAttribute("max", "2");
          p.setAttribute("value", "1");
          p.innerHTML = i;
          a.appendChild(p);
        }

        d.appendChild(a);

        // See https://github.com/luser/gamepadtest/blob/master/index.html
        var start = document.getElementById("start");
        if (start)
        {
          start.style.display = "none";
        }

        document.body.appendChild(d);
    }

    updateStatus()
    {
        if (!this.haveEvents)
        {
            this.scangamepads();
        }
        var i = 0;
        var j = 0;

        for (j in this.controllers)
        {
            var controller = this.controllers[j];
            if (controller.axes[0] === -1)
            {
              this.playSprite.x -= 5;
            }

            else if (controller.axes[0] === 1)
            {
              this.playSprite.x += 5;
            }

            if (controller.axes[1] === -1)
            {
              this.playSprite.y -= 5;
            }

            else if (controller.axes[1] === 1)
            {
              this.playSprite.y += 5;
            }
            if (this.buttonPressed(controller.buttons[1]))
            {
                this.sceneManager.goToScene(this.sceneTitles.Gameplay);
                window.removeEventListener("gamepadconnected", this.connectHandlerBind, false);
                window.removeEventListener("gamepaddisconnected", this.disconnectHandlerBind, false);
            }
        }
    }

    buttonPressed(b)
    {
        if (typeof(b) == "object")
        {
            return b.pressed;
        }
        return b == 1.0;
    }

    scangamepads()
    {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
        for (var i = 0; i < gamepads.length; i++)
        {
          if (gamepads[i])
          {
            if (gamepads[i].index in this.controllers)
            {
              this.controllers[gamepads[i].index] = gamepads[i];
            }
            else
            {
              this.addgamepad(gamepads[i]);
            }
          }
        }
    }
}
