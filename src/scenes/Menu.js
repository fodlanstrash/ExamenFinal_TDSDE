import Phaser from "phaser";

class MenuScene extends Phaser.Scene {
    _constructor() {
        super("MenuScene");
    }

    _create() {

        const { width, height } = this.scale;

        const bg = this.add.image(width / 2, height / 2, "backsground");
        bg.setOrigin(0.5, 0.5);
        bg.setDisplaySize(width, height);

        this.add.image(width / 2, height * 0.20, "titles")
            .setOrigin(0.5, 0.5)
            .setScale(0.9);

        this.add.image(width / 2, height * 0.53, "monsters")
            .setOrigin(0.5, 0.5)
            .setScale(0.9);

        const startBtn = this.add.image(width / 2, height * 0.78, "startBtns", 0)
            .setOrigin(0.5)
            .setScale(1)

        startBtn.on("pointerovesr", () => {
            startBtn.setFrame(1);
        });

        startBtn.on("pointerouts", () => {
            startBtn.setFrame(0);
        });

        startBtn.on("pointerdowns", () => {
            startBtn.setFrame(2);
            this.time.delayedCall(120, () => {
                this.scene.start("GameScene");
            });
        });
    }
}

