import { Standing, Running, Jumping, Falling, Attack1, Attack2, Attack3, Hit} from "./playerStates.js";
import { FloatingMessage } from "./floatingMessages.js";
import { Fireball, Blackhole } from "./effects.js";
import { Kopek } from "./kopek.js";

export  class Player{
    constructor(game){
        this.game = game;
        this.width = 64;
        this.height= 64;
        this.x =0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.image2 = document.getElementById('kopek');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame ;
        this.fps = 15;
        this.frameInterval= 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0 ;
        this.maxSpeed = 5;
        this.ammoTimer=0;
        this.ammoInterval = 100;
        this.states = [new Standing(this.game), new Running(this.game),new Jumping(this.game), new Falling(this.game), new Attack1(this.game), new Attack2(this.game), new Attack3(this.game), new Hit(this.game)];

        
    }
    update(input , deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        //yatay hareket
        this.x += this.speed;
        if(input.includes('ArrowRight') && this.currentState !== this.states[7]) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft') && this.currentState !== this.states[7]) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if(this.x < 0) this.x = 0;
        if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        // dikey hareket
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        //animasyonlar
        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }else {
            this.frameTimer += deltaTime;
        }


        //köpek cansatın alma 
        if(input.includes('q') || input.includes('Q')){
            if(this.game.kopekcan <5){
            if(this.game.score >= 200){
            this.game.kopekcan += 1;
            this.game.score -= 200;
            playSoundtakeheart();
            this.game.floatingMessages.push(new FloatingMessage('♥', 120, 350, 105,115));
            }}}
        // karadelik atma
            if(input.includes('w') || input.includes('W') ){
                if(this.game.score >= 20){
                if(this.ammoTimer > this.ammoInterval){
                   this.game.effects.push(new Fireball(this.game , this.game.player.x, this.game.player.y));
                   this.ammoTimer = 0;
                   this.game.score -= 20 ;
                   playSoundblackhole();
               } else {
                   this.ammoTimer += deltaTime ;
       }}}
        // alev topu atma
            if(input.includes('e') || input.includes('E') ){
                if(this.game.score >= 20){
                if(this.ammoTimer > this.ammoInterval){
                this.game.effects.push(new Blackhole(this.game , this.game.player.x, this.game.player.y));
                this.ammoTimer = 0;
                this.game.score -= 20 ;
                playSoundfire();
            } else {
                this.ammoTimer += deltaTime ;
               
        }}}
    
    }

    // Oyuncuyu çiz
    draw(context){
        if(this.game.debug) context.strokeRect(this.x, this.y, this.weight, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);

    }

    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed ;
        this.currentState.enter();


    }
    // Çarpışmayı kontrol et
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
                if(this.currentState === this.states[4] || this.currentState === this.states[5] || this.currentState === this.states[6] ){
                    this.game.score +=10 ;
                    playSoundtakekill();
                    this.game.floatingMessages.push(new FloatingMessage('+10', enemy.x, enemy.y, 120,50));
                } else{
                    this.setState(7,0);
                    this.game.score -= 30;
                    this.game.can--;
                    playSoundtakendamage();
                    if(this.game.can <= 0) {
                    this.game.gameOver = true;
                    }
                }
            
            }

        });

        // eklentilerin karakter ile etkileşimi
        this.game.eklentiler.forEach(eklenti => {
            if(
                eklenti.x < this.x + this.width &&
                eklenti.x + eklenti.width > this.x &&
                eklenti.y < this.y + this.height &&
                eklenti.y + eklenti.height >this.y
            ){
                //collision bulunursa
                eklenti.markedForDeletion = true;
                if(this.currentState === this.states[4] || this.currentState === this.states[5] || this.currentState === this.states[6] || this.currentState === this.states[1] || this.currentState === this.states[2] || this.currentState === this.states[3] || this.currentState === this.states[0]){
                    this.game.can++;
                    playSoundtakeheart();
                    if(this.game.can >7){
                        this.game.can -=1;
                    }
                    
                    this.game.floatingMessages.push(new FloatingMessage('♥', eklenti.x, eklenti.y, 110,115));
                } 
            
            }
           
        });
    }
}
// etkileşimde çalacak sesleri ekler
const audio = document.getElementById("hasaralma");

function playSoundtakendamage() {
    audio.play();
}

const audio2 = document.getElementById("cansatinalma");

function playSoundtakeheart() {
    audio2.play();
}

const audio3 = document.getElementById("fireball");

function playSoundfire() {
    audio3.play();
}

const audio4 = document.getElementById("blackhole");

function playSoundblackhole() {
    audio4.play();
}

const audio5 = document.getElementById("kill");

function playSoundtakekill() {
    audio5.play();
}