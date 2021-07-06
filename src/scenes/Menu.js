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
      /*  let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5, bottom: 5
            },
            fixedWidth: 0
            
        }*/

        var menu = this.add.image(640, 480, 'menu');

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

