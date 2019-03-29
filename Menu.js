class Menu extends Scene
{

    constructor(sceneTitle, sceneManager, context)
    {
        super(sceneTitle, sceneManager, context);//Calls the scene parent constructor from Scene
        this.playSprite = new Sprite(this.ctx, this.playerImageOptions);
        this.canvas = document.getElementById("mycanvas");
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
}
