
export class FloatingMessage {
    constructor(value, x, y, targetX, targetY){
        this.value = value;
        this.x= x;
        this.y= y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.markedForDeletion = false;
        this.timer = 0;
    }
    update(){
          // Yumuşak geçiş efektiyle hedefe doğru kaydırma
        this.x += (this.targetX - this.x) * 0.03;
        this.y += (this.targetY - this.y) * 0.03;
        this.timer++ ;
        // Belirli bir süre sonra silinme işaretini ayarlama
        if(this.timer >100) this.markedForDeletion = true;
    }
    // Çizme fonksiyonu
    draw(context){
        context.font = '20px Pixelify Sans';
        context.fillStyle = 'black';
         // Mesajı çizme
        context.fillText(this.value, this.x , this.y);
        context.fillStyle = 'DeepPink';
        // Gölgeli mesajı çizme
        context.fillText(this.value, this.x -2, this.y-2);
    }
}