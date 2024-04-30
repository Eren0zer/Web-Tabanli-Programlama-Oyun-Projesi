class Layer {
    constructor(game, width, height, speedModifier, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    update(){// Katmanın güncellenmesi
        // Eğer katmanın x konumu -width değerinden küçükse, x'i sıfırla,
        // aksi takdirde x'i hız * hız modifier kadar azalt
        if(this.x < -this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;
    }
    draw(context){
        // İki kopya resmi çizmek için, birincisi x konumunda, ikincisi x + width konumunda çizilir
        context.drawImage(this.image, this.x  , this.y, this.width, this.height);
        context.drawImage(this.image, this.x +this.width , this.y, this.width, this.height);

    }
}

export class Background{
    constructor(game){
        this.game = game ;
        this.width = 1620;
        this.height = 590;
        this.layer5image = document.getElementById('layer5');
        this.layer5 = new Layer(this.game, this.width, 400, 0.4,this.layer5image);
        console.log(layer5)
        this.backgroundLayers = [this.layer5]; 
    }   // Arka planın güncellenmesi
    update(){
          // Her bir arka plan katmanının güncellenmesi
        this.backgroundLayers.forEach(layer => {
            layer.update();

        });
    } // Arka planın çizilmesi
    draw(context){
         // Her bir arka plan katmanının çizilmesi
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);

        });
    }
}