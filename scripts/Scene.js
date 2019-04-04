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
        this.sceneTitles = {Tutorial: "Tutorial Screen", Menu: "Menu Screen", Gameplay: "Gameplay Screen"};
        this.page1Options = {filename: 'Sprite/Player Controls.png', x:0, y:0, width:1024, height:720};
        this.page2Options = {filename: 'Sprite/Claw Controls.png', x:0, y:0, width:1024, height:720};
        this.playerImageOptions = {filename: 'Sprite/pinkJump.png', x:50, y:50, width:993, height:294, fps:80, numberOfFrames:3};
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
