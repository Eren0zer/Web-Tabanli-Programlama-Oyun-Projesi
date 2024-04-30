import { FloatingMessage } from "./floatingMessages.js";

class Particle{
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0;


    }
    update(deltaTime){// Parçacığın güncellenmesi
        // Çarpışmaları kontrol et
        this.checkCollision();
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY ;

        // Animasyon çerçevesi zamanlayıcısını güncelle
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }else {
            this.frameTimer += deltaTime;
        }
                //ekrandan çıktıklarını kontrol et
                if( this.x + this.width <0) this.markedForDeletion = true;
    }
    draw(context) {
         // Hata ayıklama modunda sınırları göster
        if(this.game.debug) context.strokeRect(this.x , this.y , this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, 0 , this.width, this.height ,this.x , this.y , this.width , this.height)

    }
}


// Fireball sınıfı, Particle sınıfından türetilmiştir
export class Fireball extends Particle{
    constructor(game, x, y){
        super();
        this.game = game;
        this.width = 24.37;
        this.height = 30;
        this.maxFrame = 7;
        this.image = document.getElementById('saldiri');
        this.x = x + 45 ;
        this.y = y + 15;
        this.speedX =  -7;
        this.speedY = 0; 
        
        

    };
 

     // Çarpışmaları kontrol et
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
                this.game.score +=10 ;  
                this.game.floatingMessages.push(new FloatingMessage('+10', enemy.x, enemy.y, 120,50));
                
            
            }

        });
    }

}   
// Blackhole sınıfı, Particle sınıfından türetilmiştir
export class Blackhole extends Particle{
    constructor(game, x, y){
        super();
        this.game = game;
        this.width = 66.6;
        this.height = 40;
        this.maxFrame = 7;
        this.image = document.getElementById('saldiri2');
        this.x = x + 45 ;
        this.y = y + 15;
        this.speedX =  -7;
        this.speedY = 0; 
        
        

    };
 

  
    checkCollision(){
        // düşmanların büyüler ile etkileşimi
        this.game.enemies.forEach(enemy => {
            if(
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height >this.y 
                
            ){
                //collision bulunursa
                enemy.markedForDeletion = true;       
                this.game.score +=10 ;  
                this.game.floatingMessages.push(new FloatingMessage('+10', enemy.x, enemy.y, 120,50));
                
            
            }

        });
    }

}