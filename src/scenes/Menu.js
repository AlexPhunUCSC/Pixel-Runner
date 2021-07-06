class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    init() {

    }
    preload() {
        // load audio
        this.load.audio('sfx_run', './assets/run.wav');

        this.load.audio('sfx_click', './assets/click.wav');

        this.load.audio('sfx_bgm', './assets/bgm.wav');
    }
    create() {
        this.song = this.sound.add("sfx_bgm",{volume: 0.5});
        this.this.song.play();




        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5, bottom: 5
            },
            fixedWidth: 0
            
        }
        //this.add.text(game.config.width/2, game.config.height/2 - (borderUISize + borderPadding), 'Pixel Runner', menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/2, 'Use Spacebar to Jump', menuConfig).setOrigin(0.5);
        //menuConfig.backgroundColor = "#00FF00";
        //menuConfig.color = "#000";
        //this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding), 'Press Spacebar to Start', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            game.settings = {
                characterSpeed: 3,
            }
            this.sound.play('sfx_click');
            this.scene.start('playScene');
        }
    }
}

