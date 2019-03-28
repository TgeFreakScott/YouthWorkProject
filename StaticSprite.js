
/**
 * This class holds variables needed to create a sprite that doesn't move
 */
class staticSprite
{
     /**
     * constructor for game class.
     */
    constructor(context, imageOptions)
    {
        this.loaded = false;
        this.x = imageOptions.x;
        this.y = imageOptions.y;
        this.width = imageOptions.width;
        this.height = imageOptions.height;
        this.ctx = context;
        this.spriteSheet = new Image();
        var spriteClass = this;
        this.spriteSheet.addEventListener('load', function() {
            spriteClass.loaded = true;
        }, false);
        this.spriteSheet.src = imageOptions.filename; // Set source path
    }

    /**
    * This draws the Sprite.
    */
    render()
    {
        if(this.loaded == true)
        {
            this.ctx.drawImage(this.spriteSheet, this.x, this.y);
        }
    }
}
