class Scene
{
    /**
    Inialises the sceneName for the class.
    @param {string} sceneName - The title for the scene.
    **/

    constructor(sceneName,sceneManager, context)
    {
        this.title = sceneName;
        this.sceneManager = sceneManager;
        this.playerImageOptions = {filename: 'pacman-spritesheet.png', x:0, y:0, width:106, height:106, fps:6000, numberOfFrames:5};
        this.ctx = context;
    }

    start()
    {
        console.log("starting :" + this.title);
    }

    stop()
    {
        console.log("stopping: " + this.title);
    }

    update(deltaTime)
    {


    }
    render(canvas)
    {
        //var context = document.getElementById("myCanvas").getContext("2d");
        this.ctx.font = "50px serif";
        this.ctx.fillText(this.title,100,100);
        document.body.style.backgroundColor = "#ffffff";

    }

    getTitle()
    {
        return this.title;
    }
}
