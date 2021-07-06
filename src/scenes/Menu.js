class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    init() {

    }
    preload() {
        // any asset for this scene
        this.load.image('menu', './assets/MenuScreen.png');
    }
    create() {
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
        this.background = this.add.image(game.config.width/2, game.config.height/2, 'menu');        

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

