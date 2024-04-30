import { Standing, Running, Hit} from "./kopekdurumu.js";
import { FloatingMessage } from "./floatingMessages.js";

export  class Kopek{
    constructor(game){
        this.game = game;
        this.width = 49.12;
        this.height= 35;
        this.x =100;
        this.y = 335;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('kopek');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame ;
        this.fps = 15;
        this.frameInterval= 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0 ;
        this.maxSpeed = 5;
        this.states = [new Standing(this.game), new Running(this.game),new Hit(this.game)];

        
    }
    update(input , deltaTime){
        // Çarpışma kontrolü
        this.checkCollision();
        // Mevcut durumun girişini işle
        this.currentState.handleInput(input);
        //yatay hareket
        this.x += this.speed;
        // Ekran sınırlarını kontrol et
        if(this.x < 0) this.x = 0;
        if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        //animasyonlar
        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }else {
            this.frameTimer += deltaTime;
        }
            



    }
    draw(context){
        // Hata ayıklama modunda karakterin sınırlarını göster
        if(this.game.debug) context.strokeRect(this.x, this.y, this.weight, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    // Yerde mi kontrolü
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    // Durumu ayarla
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed ;
        // Yeni duruma geçişin girişini işle
        this.currentState.enter();


    }
    // Çarpışma kontrolü
    checkCollision(){
        // düşmanların karakter ile etkileşimi
        this.game.enemies.forEach(enemy => {
            if(
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height >this.y
            ){
                //collision bulunursa
                enemy.markedForDeletion = true;
                if(this.currentState === this.states[0] || this.currentState === this.states[1]  ){
                    this.setState(2,0.5);
                    this.game.kopekcan--;
                     // Hasar sesini çal
                    playSoundtakendamage();
                    // Canı 0 ise oyunu sonlandır
                    if(this.game.kopekcan <= 0) this.game.gameOver = true;
                    
                } 
            
            }

        });
    }
}

// Hasar sesini oynat
const audio = document.getElementById("kopekhasar");

function playSoundtakendamage() {
    audio.play();
}


