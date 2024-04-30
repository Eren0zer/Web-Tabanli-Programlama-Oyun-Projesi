
const states = {
    STANDING : 0,
    RUNNING : 1,
    JUMPING : 2,
    FALLING : 3,
    ATTACK1 : 4,
    ATTACK2 : 5,
    ATTACK3 : 6,
    HIT : 7,

}


class State {
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}
// Zıplama sesi
const audio = document.getElementById("jump");

function playSoundJump() {
    audio.play();
}
// Saldırı 1 sesi
const audio2 = document.getElementById("sword1");

function playSoundattack1() {
    audio2.play();
}
// Saldırı 2 sesi
const audio3 = document.getElementById("sword2");

function playSoundattack2() {
    audio3.play();
}
// Saldırı 3 sesi
const audio4 = document.getElementById("sword3");

function playSoundattack3() {
    audio4.play();
}

// Durum: STANDING (Dik Durma)
export class Standing extends State {
    constructor(game){
        super('STANDING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 12;
        this.game.player.frameY = 0;
    }

    handleInput(input){
         // Yön tuşlarına göre durumu ayarlama
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING, 0.7);
        } else if(input.includes('1')){
            this.game.player.setState(states.ATTACK1,1);
        } else if(input.includes('2')){
            this.game.player.setState(states.ATTACK2,1);
        } else if(input.includes('3')){
            this.game.player.setState(states.ATTACK3,1);
        }
    }
}
// Durum: RUNNING (Koşma)
export class Running extends State {
    constructor(game){
        super('RUNNING', game);
        
    }
    enter(){
        
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 7;
        this.game.player.frameY = 1;
        
    }   

    handleInput(input){

        if(input.includes('ArrowDown')){
            this.game.player.setState(states.STANDING , 0);
        } else if (input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING, 0.7);
        } else if(input.includes('1')){
            this.game.player.setState(states.ATTACK1,1);
        } else if(input.includes('2')){
            this.game.player.setState(states.ATTACK2,1);
        } else if(input.includes('3')){
            this.game.player.setState(states.ATTACK3,1);
        }
    

    }
}

export class Jumping extends State {
    constructor(game){
        super('JUMPING', game);
    }
    enter(){
          // Yerden zıplama kontrolü
        if(this.game.player.onGround()) this.game.player.vy -=24;
        
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 7;
        this.game.player.frameY = 5;
        playSoundJump();
    }

    handleInput(input){
        if(this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING, 0.7);
        } else if(input.includes('1')){
            this.game.player.setState(states.ATTACK1,1);
        } else if(input.includes('2')){
            this.game.player.setState(states.ATTACK2,1);
        } else if(input.includes('3')){
            this.game.player.setState(states.ATTACK3,1);
        }

    }
}

export class Falling extends State {
    constructor(game){
        super('FALLING',game);
    }
    enter(){
        
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 7;
        this.game.player.frameY = 1;
    }

    handleInput(input){
        if(this.game.player.onGround()){
            this.game.player.setState(states.RUNNING,1);
        } else if(input.includes('1')){
            this.game.player.setState(states.ATTACK1,1);
        } else if(input.includes('2')){
            this.game.player.setState(states.ATTACK2,1);
        } else if(input.includes('3')){
            this.game.player.setState(states.ATTACK3,1);
        }

    }
}

export class Attack1 extends State {
    constructor(game){
        super('ATTACK1',game);
    }
    enter(){
        
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 9;
        this.game.player.frameY = 2;
        playSoundattack1();
        
    }

    handleInput(input){
        if(!input.includes('1') && this.game.player.onGround()){
            this.game.player.setState(states.STANDING,1);
        } else if(!input.includes('1') && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING,0.7);
        }
    }
}

export class Attack2 extends State {
    constructor(game){
        super('ATTACK2',game);
    }
    enter(){
        
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 9;
        this.game.player.frameY = 3;
        playSoundattack2();
    }

    handleInput(input){
        if(!input.includes('2') && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING,1);
        } else if(!input.includes('2') && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING,0.7);
        }
    }
}

export class Attack3 extends State {
    constructor(game){
        super('ATTACK3',game);
    }
    enter(){
        
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 9;
        this.game.player.frameY = 4;
        playSoundattack3();
    }

    handleInput(input){
        if(!input.includes('3') && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING,1);
        } else if(!input.includes('3') && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING,0.7);
        }
    }
}

export class Hit extends State {
    constructor(game){
        super('HIT',game);
    }
    enter(){
        
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 5;
        this.game.player.frameY = 6;
    }

    handleInput(input){
        if(this.game.player.frameX >= 3 && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING,1);
        } else if(this.game.player.frameX >= 3 && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING,0.7);
        }
    }
}


