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
    }

    init()
    {
        document.addEventListener("keydown",this.keyDownHandler.bind(null, this));
    }

    update()
    {
        this.draw();
    }

    draw()
    {
        this.ctx.clearRect(0,0,canvas.width, canvas.height);
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
}

