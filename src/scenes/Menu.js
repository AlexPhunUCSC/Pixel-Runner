class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
        let song;
        let allsound;
    }

    init() {

    }
    preload() {
        // any asset for this scene
        this.load.image('menu', './assets/MenuScreen.png');
        this.load.audio('sfx_bgm', './assets/bgm.wav');
    }
    create(){    
        var allsound = this.sound.getAll();
        if((allsound[0]) == null){
            this.song = this.sound.add('sfx_bgm',{volume: 0.5, loop: true});
        }
        allsound = null;
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
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    }
    update() {
        var allsound = this.sound.getAll();
        if(allsound[0].isPlaying == false){
            this.song.play();
        }
        allsound = null;
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');
        }
        if (Phaser.input.Keyboard(keyH)){
            this.scene.start('helpScene');
        }
    }
}

