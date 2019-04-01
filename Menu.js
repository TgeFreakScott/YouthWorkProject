class Menu extends Scene
{

    constructor(sceneTitle, sceneManager, context)
    {
        super(sceneTitle, sceneManager, context);//Calls the scene parent constructor from Scene
        this.playSprite = new Sprite(this.ctx, this.playerImageOptions);
        this.canvas = document.getElementById("mycanvas");
        this.keyDownBind = this.keyDownHandler.bind(null, this);
        document.addEventListener("keydown", this.keyDownBind, false);
    }

    update(deltaTime)
    {
        super.update(deltaTime);
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
          game.playSprite.x -= 5;
        }

        if(e.keyCode === 68)//RIGHT
        {
          game.playSprite.x += 5;
        }

        if(e.keyCode === 87)//UP
        {
          game.playSprite.y -= 5;
        }
        if(e.keyCode === 83)//R
        {
          game.playSprite.y += 5;
        }

        if([65,68,38,82, 40, 39].indexOf(event.keyCode) > -1)
            {
                 e.preventDefault();
            }

        }
}
