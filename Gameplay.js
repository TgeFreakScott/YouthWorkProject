class Gameplay extends Scene
{

    constructor(sceneTitle, sceneManager, context)
    {
        super(sceneTitle, sceneManager, context);//Calls the scene parent constructor from Scene
        this.ctx = context;
    }

    render()
    {
        this.ctx.clearRect(0,0,canvas.height, canvas.width);
        this.ctx.font = "50px serif";
        this.ctx.fillText(this.title, 10,50);

        document.body.style.backgroundColor = "#FFB6C1" //LIGHT PINK
    }

    update(deltaTime)
    {

    }
}
