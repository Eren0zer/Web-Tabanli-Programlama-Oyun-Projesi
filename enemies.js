class Enemy{
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0;
        this.markedForDeletion = false;

    }
    update(deltaTime){
        //hareket
        this.x -= this.speedX  ;
        // durunca ve hareket edince farklı hareket
        this.y += this.speedY;
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
    draw(context){
         // Hata ayıklama modunda sınırları göster
        if(this.game.debug) context.strokeRect(this.x , this.y , this.width, this.height);
        // Resmi çiz
        context.drawImage(this.image, this.frameX * this.width, 0 , this.width, this.height ,this.x , this.y , this.width , this.height)

    }
}

// Uçan düşman sınıfı, Enemy sınıfından türetilmiştir
export class FlyingEnemy extends Enemy{
    constructor(game) {
        super();
        this.game = game;
        this.width = 55.2;
        this.height = 40;
        this.x = 800;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random()+1.4 ;
        this.speedY = 0;
        this.maxFrame = 4;
        this.image = document.getElementById('enemy_fly');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime){
        super.update(deltaTime);
        // Açıyı güncelle
        this.angle += this.va;
        // Y ekseninde sallanma hareketi
        this.y += Math.sin(this.angle);


    }
}

export class FlyingEnemy2 extends Enemy{
    constructor(game) {
        super();
        this.game = game;
        this.width = 23.75;
        this.height = 22;
        this.x = 800;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random()+ 2 ;
        this.speedY = 0;
        this.maxFrame = 3;
        this.image = document.getElementById('enemy_fly2');
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);


    }
}

export class GroundEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 35.8;
        this.height = 40;
        this.x = 800;
        this.y =  327;
        this.speedX = 1.5;
        this.speedY = 0;
        this.maxFrame = 8;
        this.image = document.getElementById('enemy_ground');


    }
}

export class GroundEnemy2 extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 32.16;
        this.height = 60;
        this.x = 800;
        this.y =  308;
        this.speedX = 1.5;
        this.speedY = 0;
        this.maxFrame = 11;
        this.image = document.getElementById('enemy_ground2');


    }
}

export class ClimbingEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 31.25;
        this.height = 40;
        this.x = 700;
        this.y = Math.random() *700 * 0.2;
        this.image = document.getElementById('enemy_climb');
        this.speedX = 0.5;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 3;

    }
    update(deltaTime){
        super.update(deltaTime);
        if(this.y >this.game.height - this.height - this.game.groundMargin) this.speedY *= -1;
        if(this.y < -this.height) this.markedForDeletion = true;
    }
    draw(context){
        super.draw(context);
        context.beginPath();
        context.moveTo(this.x + this.width/2 ,0);
        context.strokeStyle = "green";
        context.lineTo(this.x + this.width/2, this.y +10);
        context.stroke();
    }
}