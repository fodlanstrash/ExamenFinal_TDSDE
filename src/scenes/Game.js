import Phaser from "phaser";
import Floor from "../prefabs/Floor.js";
import Player from "../prefabs/Player.js";
import HUD from "../prefabs/HUD.js";
import Candy from "../prefabs/Candy.js";
import SmallMonster from "../prefabs/SmallMonster.js";

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        this.score = 0;
        const lastScore = localStorage.getItem("lastScore");

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
        
        this.targetX = this.player.x;
        this.moveSpeed = 250; // píxeles por segundo
        this.stopDistance = 5; // distancia mínima para detener movimiento

        // Input para click-to-move en eje X
        this.input.on("pointerdown", (pointer) => {
            this.targetX = pointer.x;
        });

        // Colisión del jugador con el piso
        this.physics.add.collider(this.player, this.floor);

        // Grupos de objetos
        this.candies = this.add.group({});
        this.smallMonsters = this.add.group({});

        // Generador de candies
        this.time.addEvent({
            delay: 700,
            callback: () => this.spawnCandy(),
            loop: true,
        });  

        // Generador de monstruos pequeños
        this.time.addEvent({
            delay: 3500,          
            callback: () => this.spawnSmallMonster(),
            loop: true,
        });        

        // HUD y input
        this.hud = new HUD(this, this.lifes);
        // Registrar tecla A usando el teclado del sistema de input
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        // Colisiones con callbacks
        this.physics.add.overlap(
            this.player, 
            this.smallMonsters, 
            this.handleSmallMonsterCollision, 
            null, 
            this
        );
        this.physics.add.overlap(
            this.player, 
            this.candies, 
            this.handleCandyCollision, 
            null, 
            this
        );
    }

    update() {
        // Movimiento click-to-move en eje X
        const distanceToTarget = Math.abs(this.targetX - this.player.x);

        if (distanceToTarget > this.stopDistance) {
            // Determinar dirección
            const direction = this.targetX > this.player.x ? 1 : -1;
            
            // Mover hacia el objetivo
            this.player.setVelocityX(direction * this.moveSpeed);
            this.player.flipX = direction < 0;
        } else {
            // Detener cuando está cerca del objetivo
            this.player.setVelocityX(0);
        }
    }

    handleSmallMonsterCollision(player, smallMonster) {
        smallMonster.destroy();

        if (this.lifes < 3) {
            this.hud.addLife();
            this.lifes++;
        }
    }

    handleCandyCollision(player, candy) {
        if (this.keyA.isDown) {
            // Tecla A presionada: atrapar caramelo, sumar puntos
            this.addPoints(10);  
            candy.destroy();
        } else {
            // Tecla A no presionada: choque, resta vida
            this.lifes--;
            this.hud.removeLife();
            candy.destroy();
            
            if (this.lifes <= 0) {
                this.handleGameOver();
            }
        }
    }

    handleGameOver() {
        localStorage.setItem("lastScore", this.score);
        this.physics.pause();
        this.scene.start("GameOverScene");
    }

    addPoints(amount) {
        this.score = (this.score || 0) + amount;
        console.log("Puntos:", this.score);
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
