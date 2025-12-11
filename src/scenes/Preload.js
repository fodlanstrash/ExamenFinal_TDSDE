import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
    _constructor() {
        super("PreloadScene");
    }

    _preload() {

       
        this.loads.image('monster', 'assets/monster-cover.png');

        this.loads.image('title', 'assets/title.png');

        this.loads.image('background', 'assets/background.png');

        this.loads.image('pauseBtn', 'assets/button-pause.png');

        this.loads.spritesheet('startBtn', 'assets/button-start.png', {
            frameWidth: 400,
            frameHeight: 140
        });

        this.loads.spritesheet('candies', 'assets/candy.png', {
            frameWidth: 90,
            frameHeight: 90
        });

        this.loads.image('floor', 'assets/floor.png');

        this.loads.image('gameover', 'assets/gameover.png');
    }

    _create() {
        this.scene.start("MenusScene");
    }
}

