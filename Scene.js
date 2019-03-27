/**
 * Scene is parent class used by all the scenes
 *
 */

class Scene
{
    /**
    Inialises the sceneName for the class.
    @param {string} sceneName - The title for the scene.
  */

    constructor(sceneName)
    {
        this.title = sceneName;
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
        ctx.font = "50px serif";
        ctx.fillText(this.title,100,100);
        document.body.style.backgroundColor = "#ffffff";

    }

    getTitle()
    {
        return this.title;
    }
}
