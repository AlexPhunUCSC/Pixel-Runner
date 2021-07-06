let config = {
    type: Phaser.CANVAS,
<<<<<<< HEAD
    width: 640 ,
    height: 480,
=======
    width: 320,
    height: 240,
>>>>>>> 2d7de293d4ed9a469a2ecc6dd4d85a53d8f7acd3
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keySPACE, keyR, keyJump;
