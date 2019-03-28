class Menu extends Scene
{

    constructor(sceneTitle, sceneManager, context)
    {
        super(sceneTitle, sceneManager, context);//Calls the scene parent constructor from Scene
        this.ctx = context;
        this.playSprite = new Sprite(this.ctx, this.playerImageOptions);
    }

    render()
    {
        this.ctx.clearRect(0,0,canvas.height, canvas.width);
        this.ctx.font = "50px serif";
        this.ctx.fillText(this.title, 10,50);
        document.body.style.backgroundColor = "#87CEEB" //SKY BLUE
        this.playSprite.render();
    }

    update(deltaTime)
    {
        this.playSprite.update(deltaTime);
    }
}

//WHY?!
//HOW COULD YOU?
//YOU WERE THE CHOSEN ONE!!!!!!!!!!! ;)
//.......ew
