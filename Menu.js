class Menu extends Scene
{

    constructor(sceneTitle, sceneManager, context)
    {
        super(sceneTitle, sceneManager, context);//Calls the scene parent constructor from Scene
        this.ctx = context;
        this.playSprite = new Sprite(this.ctx, this.menuPlayButtonOptions);
    }

    render(ctx)
    {
        ctx.clearRect(0,0,canvas.height, canvas.width);
        ctx.font = "50px serif";
        ctx.fillText(this.title, 10,50);

        document.body.style.backgroundColor = "#87CEEB" //SKY BLUE
        this.playSprite.render();
    }

    update(deltaTime)
    {
        this.playSprite.update(deltaTime);
    }
}
