class ScreenManager
{
  constructor(ctx,canvas)
      {

        this.ctx = ctx;
        this.canvas = canvas;
        this.currScene = null;
        this.dictScene = {};
        this.listScene = [];
        this.index = -1;

      }

      addScene(scene)
      {

        var title = scene.getTitle();
        this.dictScene[title] = scene;
        this.listScene.push(title);

      }

      goToScene(title)
      {
        this.currScene = this.dictScene[title];
        this.index = Object.keys(this.dictScene).indexOf(title);

        this.currScene.start();
        this.ctx.clearRect(0,0,this.canvas.height, this.canvas.width);

      }
      goToNextScene(title)
      {
        if(this.index >= this.listScene.length -1)
        {
          this.index = 0;
        }
        else{
          this.index++;
        }

        this.currScene.stop();
        var title = this.listScene[this.index];
        this.currScene = this.dictScene[title];
        this.currScene.start();

      }

      updateCurrentScene(deltaTime)
      {
        this.currScene.update(deltaTime);
      }

      renderCurrentScene()
      {
        this.currScene.render(this.ctx);
      }
}
