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
        this.ctx = context;
        this.playerImageOptions = {filename: 'PacMan.png', x:50, y:50, width:573, height:105, fps:80, numberOfFrames:5};
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
        this.ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
    }

    getTitle()
    {
        return this.title;
    }
}
