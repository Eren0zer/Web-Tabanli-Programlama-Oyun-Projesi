// Durumlar nesnesi, karakter durumlarını belirten sabitleri içerir
const states = {
    STANDING : 0,
    RUNNING : 1,
    HIT : 2,


}

// Durum sınıfı, karakterin durumlarını yönetir
class State {
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class Standing extends State {
    constructor(game){
        super('STANDING', game); // Durum STANDING olarak atanır
    }//Durum değiştiğinde çalışır
    enter(){
        // Karakterin durumunu ayarla
        this.game.kopek.frameX = 0;
        this.game.kopek.maxFrame = 1;
        this.game.kopek.frameY = 1;
    }

    handleInput(input){
        //Kullanıcının girişine yanıt verir
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.game.kopek.setState(states.RUNNING, 1);
        } 
    }
}
// Durum: Koşuyor
export class Running extends State {
    constructor(game){
        super('RUNNING', game);
        
    }
    enter(){
        
        this.game.kopek.frameX = 0;
        this.game.kopek.maxFrame = 7;
        this.game.kopek.frameY = 0;
        
    }   

    handleInput(input){

        if(input.includes('ArrowDown')){
            this.game.kopek.setState(states.STANDING , 0);
        } 
    

    }
}

// Durum: Hasar Alıyor
export class Hit extends State {
    constructor(game){
        super('HIT',game);
    }
    enter(){
        
        this.game.kopek.frameX = 0;
        this.game.kopek.maxFrame = 7;
        this.game.kopek.frameY = 2;
    }

    handleInput(input){
        // Karakterin animasyonu belirli bir noktaya ulaştığında
        if(this.game.kopek.frameX >= 5 ){
            // Koşma durumuna geç
            this.game.kopek.setState(states.RUNNING,1);
        } 
    }
}
