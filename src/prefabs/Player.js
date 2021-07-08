class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.terminalV = -24; //Terminal velocity
        this.vSpeed = 0; // Vertical speed; positive numbers are upwards
        this.floorUnderBackHeight = 360; //Stored floor height at origin
        this.floorUnderFrontHeight = 360; //Stored floor height towards right side
        /**
         * I have absolutely no idea what i did to make this function able
         * to be called outside this class, but it works.
         * This function calls instance functions that update the stored
         * floor heights.
         * @param {*} side 0 for back, 1 for front
         * @param {*} platBack naming this platback was leftover from when i was just testing this
         */ 
        this.evaluateFloor = function(side, platBack){
            if (side == 0){
                this.evaluateFloorUnderBack(platBack);
            }
            else if (side == 1){
                this.evaluateFloorUnderFront(platBack);
            }
        }       
    }

    evaluateFloorUnderBack(platBack){
        this.floorUnderBackHeight = platBack - 32;
    }
    evaluateFloorUnderFront(platFront){
        this.floorUnderFrontHeight = platFront - 32;
    }

    /**
     * This function handles flor collision.
     * @returns true if the player is grounded and false if they're airborne
     */
    checkFloor() {
        //if we're already standing on a floor
        if(this.y == this.floorUnderBackHeight || this.y == this.floorUnderFrontHeight){
            return true;
        }
        //if we aren't standing on a floor just yet, but our projected
        //next position would cause us to fall through the floor in front
        else if(((this.y + (this.vSpeed / 4)) < this.floorUnderFrontHeight) && (this.y > this.floorUnderFrontHeight) && this.vSpeed < 0){
            this.y = this.floorUnderFrontHeight; //snap us to the floor's height
            this.vSpeed = 0;
            return true;
        }
        //if we aren't standing on a floor just yet, but our projected
        //next position would cause us to fall through the floor in back
        else if(((this.y + (this.vSpeed / 4)) < this.floorUnderBackHeight) && (this.y > this.floorUnderBackHeight) && this.vSpeed < 0){
            this.y = this.floorUnderBackHeight; //snap us to that floor's height
            return true;
        }
        else{
            return false;
        }
    }

    update() {
        //we're only moving vertically, the BG is doing the horizontal movement for us
        if (!this.checkFloor()) {
            if(this.vSpeed < this.terminalV){
                this.vSpeed = this.terminalV;
            }
            if(keyJump.isDown){
                this.vSpeed -= 1; //gravity is 3x as weak if we're holding jump
                this.terminalV = -18; //and terminal velocity is 75% as fast
            }
            else{
                this.vSpeed -= 3;
                this.terminalV = -24;
            }
        }
        else{
            this.vSpeed = 0; //we don't want to drop like a rock the instant we walk off a platform
            if(Phaser.Input.Keyboard.JustDown(keyJump)){
                this.vSpeed = 32;
            }
        }

        if(Phaser.Input.Keyboard.JustDown(keyJump)){
            /** 
             * I don't know why, I don't want to know why,
             * I shouldn't have to know why, but without this dummy check
             * the player can press jump again to buffer a jump
            */
        }
        if(this.vSpeed > 0){
            this.texture = 'jump'; //Failed attempt to get the jump animation to work
        }
        this.y -= (this.vSpeed / 4); 
    }

    reset() {

    }
}