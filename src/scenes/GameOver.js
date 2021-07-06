class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
        let song;
    }

    init() {

    }
    preload() {
        // any asset for this scene
        this.load.image('gameOver', './assets/GameOver.png');
    }
    create() {
        this.background = this.add.image(game.config.width/2, game.config.height/2, 'gameOver');        

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('menuScene');
        }
    }
}

