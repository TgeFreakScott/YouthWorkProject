class Game
{
  constructor()
    {
        this.boundRecursiveUpdate = this.update.bind(this);

        this.canvas = document.getElementById("myCanvas");
        canvas.id = "myCanvas";
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth;
        this.ctx = canvas.getContext("2d");
        document.body.appendChild(canvas); 
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

}

