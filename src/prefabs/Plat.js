class Plat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    update() {
        this.x -= 4;
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    /**
     * This function is entirely responsible for level generation.
     * Platforms are uniformly distributed from 0 pixels above starting
     * starting height to 80 pixels, in increments of 16 pixels.
     * 16 pixel-increments are so that the player knows they can't gain
     * height without jumping.
     */
    reset() {
        this.x = game.config.width;
        this.y = 392 - (16 * (Math.floor(Math.random() * 6))); 
    }
}