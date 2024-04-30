class eklenti{
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0;
        this.markedForDeletion = false;

    }
    update(deltaTime){
         // Hareket işlemi
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
        context.drawImage(this.image, this.frameX * this.width, 0 , this.width, this.height ,this.x , this.y , this.width , this.height)

    }
}


export class ArtiCan extends eklenti{
    constructor(game) {
        super();
        this.game = game;
        this.width = 29;
        this.height = 29;
        this.x = 800;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random()+1.1 ;
        this.speedY = 0;
        this.maxFrame = 0;
        this.image = document.getElementById('eklentican');
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
