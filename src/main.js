import Phaser from "phaser";
const config = {
    type: Phaser.AUTO,
    width: 720,
    height: 1280,
    parent: "game-container",
    backgroundColor: "#000000",
    scale: {
        mode: Phaser.Scale.FIT,       
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 720,    
        height: 1280  
    },
    
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 800 },
            debug: true
        }
    },

    scene: [
        PreloadScene,
        MenuScene,
        GameScene,
        GameOverScene
    ]
};
 new Phaser.Game(config);

