class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('falling', './assets/Falling.png');
        this.load.image('menu', './assets/MenuScreen.png');
        this.load.image('jump', './assets/Jump.png');
        this.load.image('spike', './assets/Spike.png');
        this.load.image('bg', './assets/bg.png');
        this.load.image('plat', './assets/plat.png');
        this.load.spritesheet('running', './assets/Running.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 7});
    }

    create() {
        //this.add.text(20, 20, "Rocket Patrol Play");

        this.starfield = this.add.tileSprite(0, 0, 16, 16, 'bg').setOrigin(0,0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, 
            game.config.width, 
            borderUISize * 2, 0x00FF00).setOrigin(0,0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);

        //this.pl1 = new Player(this, game.config.width / 2, game.config.height / 2, 'running').setOrigin(0.5, 0);
        /*this.p1Rocket = new Rocket(this, 
            game.config.width / 2, 
            game.config.height - (borderUISize + borderPadding), 
            'rocket').setOrigin(0.5, 0);
        // add spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);*/

        this.pl1 = new Player(this, game.config.width / 2, game.config.height / 2, 'running', 0).setOrigin(0.5, 0);
        this.plats = new Array(21);
        for (let i = 0; i < 21; i++){
            this.plats[i] = new Plat(this, 32 * i, 360, 'plat', 0).setOrigin(0, 0);
        }
        //this.plat1 = new Plat(this, game.config.width / 2, game.config.height * 3 / 4, 'plat', 0).setOrigin(0, 0);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //player animation attempt start
        this.pl1 = this.add.sprite(game.config.width/2 - borderPadding*1, game.config.height/1.75, 'running');
        const playerAnimation = this.anims.create({
            key: 'running1',
            frames: this.anims.generateFrameNumbers('running'),
            frameRate: 12
        });
        this.pl1.play({ key: 'running1', repeat: -1 });
        //player animation attempt end

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

        this.gameOver = false;

        
    }

    update() {

        //jump animation
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.pl1.alpha = 0;
            this.pl1 = new Player(this, game.config.width / 2, game.config.height / 2, 'jump').setOrigin(0.5, 0);
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 2;
        if(!this.gameOver) {
            this.pl1.update();
            //this.plat1.update();
            for(let i = 0; i < 21; i++){
                this.plats[i].update();
            }
        }
        
        // check collisions
        //TODO
    }

    checkCollision(Player, platform) {
        //TODO
    }
}