/**
 * This class holds variables needed to create a sprite
 */
class Sprite
{
     /**
     * constructor for game class.
     */
    constructor(context, imageOptions)
    {
        this.loaded = false;
        this.x = imageOptions.x;
        this.y = imageOptions.y;
        this.frameindex = 0;
        this.tickCount = 0;
        this.fps = imageOptions.fps;
        this.ticksPerFrame = 1000 / this.fps;
        this.numberOfFrames = imageOptions.numberOfFrames;
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
     * This function updates variables in the Sprite class,
     * and makes the frame move across the sprite sheet.
     * @param {float} deltaTime
     */
    update(deltaTime)
    {
        if(this.loaded == true)
        {
            this.tickCount += 1;
            if (this.tickCount > this.ticksPerFrame)
            {
                this.tickCount = 0;
                if (this.frameIndex < this.numberOfFrames - 1)
                {
                    // Go to the next frame
                    this.frameIndex += 1;
                }
                else if (deltaTime)
                {
                    this.frameIndex = 0;
                }
            }
        }
    }
    /**
    * This draws the Sprite.
    */
    render()
    {
        if(this.loaded == true)
        {
            this.ctx.drawImage(this.spriteSheet, this.frameIndex * this.width/ this.numberOfFrames, 0, this.width/ this.numberOfFrames, this.height, this.x, this.y, this.width/ this.numberOfFrames, this.height);
        }
    }
}
