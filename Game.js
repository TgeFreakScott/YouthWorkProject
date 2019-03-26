class game
{
    constructor()
    {
        this.init();
    }
    init()
    {
        this.canvas = document.getElementById("myCanvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerWidth;
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
    }
}

