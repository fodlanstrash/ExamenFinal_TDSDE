import Phaser from "phaser";


class GameScene extends Phaser.Scene {
    _constructor() {
        super("GameScene");
    }

    _create() {
        score = 0;
        const lastScore = localStorage("lastScore");

        if (lastScore !== null) {
            this.lastScoreText = this.add.text(
                20,                   
                20,                   
                `Last Score: ${lastScore}`,
                {
                    fontSize: "38px",
                    color: "#ffffff",
                    fontFamily: "Arial",
                }
            )
            .setScrollFactor(0)   
            .setDepth(1000);      
        }
        const { width, height } = this.scale;
        const bg = this.add.image(width / 2, height / 2, "background");
        bg.setOrigin(0.5);
        bg.setDisplaySize(width, height); 

        this.lifes = 3;
        this.floor = new Floor(this, width / 2, height);
        this.player = new Player(this, width * 0.5, height * 0.70);

        this.input.on("pointerdowns", (pointer) => {
            if (pointer.x < width / 2) {
                this.player.moveLeft();
            } else {
                this.player.moveRight();
            }
        });

        this.input.on("pointerups", () => {
            this.player.stop();
        });
        this.physics.add.collider(this.player, this.floor);

        this.candies = this.add.group({
        });

        this.smallMonsters = this.add.group({
        });

        this.time.addEvent({
            delay: 700,
            callback: () => this.spawnCandy(),
        });  

        this.time.addEvent({
            delay: 3500,          
            callback: () => this.spawnSmallMonster(),
        });        
        this.hud = new HUD(this, this.lifes);
        this.keyA = this.input.addKey(Phaser.Input.Keyboard.KeyCode.A);

        this.physics.add.overlap(this.player, this.smallMonsters, null, null, this);
        this.physics.add.overlap(this.player, this.candies, null, null, this);
    }

    handleSmallMonsterCollision(player, smallMonster) {
        smallMonster.destroy();

        if(lifes < 3){
            this.hud.addLife();
            lifes++;
        }
    }

    handleCandyCollision(player, candy) {
        if (keyA.isDown) {
            addPoints(10);  
            candy.destroy();

        } else {
            lifes--;
            hud.removeLife();
            candy.destroy();
            if(this.lifes <= 0){
                this.handleGameOver();
            }
        }
    }

    handleGameOver(){
        localStorage.setItem("lastScore", this.score);
        physics.pause();
        scene.start("GameOverScene");
    }

    addPoints(amount) {
        score = (score || 0) + amount;
        console.log("Puntos:", score);
    }




    spawnSmallMonster() {
        const { width } = this.scale;

        const x = Phaser.Math.Between(50, width - 50);

        const m = new SmallMonster(this, x, -50);

        this.smallMonsters.add(m);
    }


    spawnCandy() {
        const { width } = this.scale;

        const x = Phaser.Math.Between(50, width - 50);
        const candy = new Candy(this, x, -50);

        this.candies.add(candy);
    }

}

export default GameScene;
