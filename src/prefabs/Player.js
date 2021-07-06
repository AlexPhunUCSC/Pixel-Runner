class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.terminalV = 24;
        this.vSpeed = 0;
        this.floorUnderHeight = 180;
        
    }
    checkFloor() {
        if(this.y < this.floorUnderHeight){
            return false;
        }
        else if(this.y = this.floorUnderHeight){
            return true;
        }
        else if((this.y - 4) < this.floorUnderHeight){
            this.y = this.floorUnderHeight;
            return true;
        }
        else{
            return false;
        }
    }
    evaluateFloorUnder(){
        //TODO
    }

    update() {
        //we're only moving vertically, the BG is doing the horizontal movement for us
        if (!this.checkFloor()) {
            if(this.vSpeed > this.terminalV){
                this.vSpeed = this.terminalV;
            }
            if(keyJump.isDown){
                this.vSpeed -= 1;
            }
            else{
                this.vSpeed -= 3;
            }
        }
        else if(this.checkFloor()){
            this.vSpeed = 0;
            if(Phaser.Input.Keyboard.JustDown(keyJump)){
                this.vSpeed = 32;
            }
        }
        this.y -= (this.vSpeed / 4);
    }



    reset() {

    }
}