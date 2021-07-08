class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('falling', './assets/Falling.png'); //unused asset
        this.load.image('menu', './assets/MenuScreen.png');
        this.load.image('jump', './assets/Jump.png'); //unused asset
        this.load.image('spike', './assets/Spike.png'); //unused asset
        this.load.image('bg', './assets/bg.png');
        this.load.image('plat', './assets/plat.png');
        this.load.spritesheet('running', './assets/Running.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 7});
    }

    create() {
        this.starfield = this.add.tileSprite(0, 0, 16, 16, 'bg').setOrigin(0,0);

        // green UI background is a leftover from rocket patrol
        this.add.rectangle(0, borderUISize + borderPadding, 
            game.config.width, 
            borderUISize * 2, 0x00FF00).setOrigin(0,0);
        
        // I think this white border looks ugly as-is
        /*this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);*/

        this.pl1 = new Player(this, game.config.width / 2, game.config.height / 2, 'running', 0).setOrigin(0, 0);
        const playerAnimation = this.anims.create({
            key: 'running1',
            frames: this.anims.generateFrameNumbers('running'),
            frameRate: 12
        });
        this.pl1.play({ key: 'running1', repeat: -1 });

        /**
         * The platforms befave similarly to a treadmill - they move to the
         * left and return to the right side of the screen when they
         * hit the edge.
         * Each platform is 1/20 of the screen's width, but all 21 platforms
         * are visible at the same time since the leftmost and rightmost
         * platforms are partially offscreen.
         * The platforms all start at their lowest possible height to give
         * the player some time to think before the randomness kicks in.
         */
        this.plats = new Array(21); 
        for (let i = 0; i < 21; i++){
            this.plats[i] = new Plat(this, 32 * i, 392, 'plat', 0).setOrigin(0, 0);
        }

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.p1Score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5, bottom: 5
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        this.gameOver = false; //This is a relic from rocket patrol

        
    }

    update() {

        //how not to handle jump animations
        /*if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.pl1.alpha = 0;
            this.pl1 = new Player(this, game.config.width / 2, game.config.height / 2, 'jump').setOrigin(0.5, 0);
        }*/
        //please for the love of god, don't implement it like this

        /**
         * This game's collision works by having the player store the height
         * of the floor below them, and treating that floor as if it extends
         * throughout the whole space. Naturally, we need to update the
         * stored floor height or else we'd fall through existing platforms
         * and walk on air.
         * Platforms move 4 pixels per frame, meaning they will return to
         * their previous position after 120 frames. Additionally, their
         * x-position will always be a multiple of 4, meaning I can choose
         * to update the player's stored floor height whenever their x-
         * position is the same as the player's.
         * The player stores two floor heights. One is of the floor at
         * their back side, and one is of the floor 16 pixels to the right
         * of their back side.
         * Collision checking between the player and their stored floor
         * heights is handled entirely in the player class.
         */
        if(true) {
            this.pl1.update();
            for(let i = 0; i < 21; i++){
                this.plats[i].update();
                if(this.plats[i].x == this.pl1.x){
                    this.pl1.evaluateFloor(0, this.plats[i].y);
                    this.p1Score++; //Increases the player's score per platform
                    this.scoreLeft.text = this.p1Score;
                }
                if(this.plats[i].x == this.pl1.x + 16){
                    this.pl1.evaluateFloor(1, this.plats[i].y);
                }
            }
        }
        if(this.pl1.y > game.config.height){
            this.scene.start("gameOverScene"); //Game over when the player falls offscreen
        }
    }
}