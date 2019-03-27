Class Menu extends Scene
{

    constructor(sceneTitle, sceneManager)
    {
        super(sceneTitle);//Calls the scene parent constructor from Scene

    }

    render(ctx)
    {
        ctx.clearRect(0,0,canvas.height, canvas.width);
        ctx.font = "50px serif";
        ctx.fillText(this.title, 10,50);

        document.body.style.backgroundColor = "#87CEEB" //SKY BLUE
    }

    update(deltaTime)
    {

    }
}
