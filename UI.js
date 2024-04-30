export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Pixelify Sans';
        this.canImage = document.getElementById('can');
        this.kopekcanImage = document.getElementById('kopekcan');
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'DeepPink';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText('Score: ' + this.game.score , 20, 50);
        //timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time:' + (this.game.time * 0.001).toFixed(1), 20 ,80);
        //canlar
        for ( let i= 0; i<this.game.can ; i++){
            context.drawImage(this.canImage, 24 *i +20,93,20,20);

        }
        for ( let i= 0; i<this.game.kopekcan ; i++){
            context.drawImage(this.kopekcanImage, 20 *i +20,117,15,15);

        }
        // oyunu yeniden başlatma butonu


        //game over mesajı
        if(this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if(this.game.score > this.game.winningScore){
            playSoundwin();
            context.fillText('MUHTESEM ', 350, this.game.height * 0.5 -20);
            context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
            context.fillText('Daha iyisini yapabilir misin?', 350, this.game.height * 0.5 +20);
             // Yeniden başlat butonu oluşturma
                var restartButton = document.createElement("button");
                // Sayfa yüklendiğinde ve ekran boyutu değiştiğinde butonun konumunu güncelle
                window.addEventListener("load", adjustButtonPosition);
                window.addEventListener("resize", adjustButtonPosition);

                // Butonun konumunu ayarlama fonksiyonu
                function adjustButtonPosition() {
                    var screenWidth = window.innerWidth;
                    var screenHeight = window.innerHeight;
                    var buttonWidth = restartButton.offsetWidth;
                    var buttonHeight = restartButton.offsetHeight;

                    // Butonun konumunu ayarla
                    var buttonLeft = (screenWidth - buttonWidth) / 2;
                    var buttonTop = (screenHeight - buttonHeight) / 2;

                    // Butonu yeni konumuna taşı
                    restartButton.style.position = "absolute";
                    restartButton.style.left = buttonLeft  + "px";
                    restartButton.style.top = buttonTop + 60 +"px";
                }

                var screenWidth = window.innerWidth;
                var screenHeight = window.innerHeight;
                var buttonWidth = restartButton.offsetWidth;
                var buttonHeight = restartButton.offsetHeight;

                // Butonun konumunu ayarla
                var buttonLeft = (screenWidth - buttonWidth) / 2;
                var buttonTop = (screenHeight - buttonHeight) / 2;
                restartButton.innerHTML = "Yeniden Başlat";
                restartButton.style.position = "absolute";
                restartButton.style.top = buttonTop + 45 +"px"; // Butonu biraz aşağıya kaydır
                restartButton.style.right = buttonLeft -65 + "px"; // Butonu ortalamak için sabit bir değer
                restartButton.textAlign = 'center';
                restartButton.style.backgroundColor = 'black'; //arka planı
                restartButton.style.color = 'deeppink'; // Yazı rengi
                restartButton.style.fontFamily = 'Pixelify Sans';
                restartButton.style.borderRadius = '10px'; // Kenar yuvarlatma
                restartButton.style.width = '120px'; // Buton genişliği
                restartButton.style.height = '25px'; // Buton yüksekliği
                //restartButton.style.padding = '10px 20px'; // Kenar boşlukları (üst ve alt, sağ ve sol)
                restartButton.onmouseover = function() {
                    restartButton.style.backgroundColor = 'deeppink'; // Arka plan rengini değiştir
                    restartButton.style.color = 'black'; // Yazı rengini değiştir
                    
                };
                
                // Butondan çıkma olayı
                restartButton.onmouseout = function() {
                    restartButton.style.backgroundColor = 'black'; // Başlangıç arka plan rengini geri yükle
                    restartButton.style.color = 'deeppink'; // Başlangıç yazı rengini geri yükle
                };
                
                restartButton.onclick = function() {
                    location.reload(); // Sayfayı yeniden yükle
                };
                document.body.appendChild(restartButton);

                
            } else {
                playSounddeath();
                context.fillText('Kaybettin', 350, this.game.height * 0.5 -20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Daha dikkatli olmalısın', 350, this.game.height * 0.5 +20);

                 // Yeniden başlat butonu oluşturma
                var restartButton = document.createElement("button");
                // Sayfa yüklendiğinde ve ekran boyutu değiştiğinde butonun konumunu güncelle
                window.addEventListener("load", adjustButtonPosition);
                window.addEventListener("resize", adjustButtonPosition);

                // Butonun konumunu ayarlama fonksiyonu
                function adjustButtonPosition() {
                    var screenWidth = window.innerWidth;
                    var screenHeight = window.innerHeight;
                    var buttonWidth = restartButton.offsetWidth;
                    var buttonHeight = restartButton.offsetHeight;

                    // Butonun konumunu ayarla
                    var buttonLeft = (screenWidth - buttonWidth) / 2;
                    var buttonTop = (screenHeight - buttonHeight) / 2;

                    // Butonu yeni konumuna taşı
                    restartButton.style.position = "absolute";
                    restartButton.style.left = buttonLeft  + "px";
                    restartButton.style.top = buttonTop + 60 +"px";
                }

                var screenWidth = window.innerWidth;
                var screenHeight = window.innerHeight;
                var buttonWidth = restartButton.offsetWidth;
                var buttonHeight = restartButton.offsetHeight;

                // Butonun konumunu ayarla
                var buttonLeft = (screenWidth - buttonWidth) / 2;
                var buttonTop = (screenHeight - buttonHeight) / 2;
                restartButton.innerHTML = "Yeniden Başlat";
                restartButton.style.position = "absolute";
                restartButton.style.top = buttonTop + 45 +"px"; // Butonu biraz aşağıya kaydır
                restartButton.style.right = buttonLeft -65 + "px"; // Butonu ortalamak için sabit bir değer
                restartButton.textAlign = 'center';
                restartButton.style.backgroundColor = 'black'; //arka planı
                restartButton.style.color = 'deeppink'; // Yazı rengi
                restartButton.style.fontFamily = 'Pixelify Sans';
                restartButton.style.borderRadius = '10px'; // Kenar yuvarlatma
                restartButton.style.width = '120px'; // Buton genişliği
                restartButton.style.height = '25px'; // Buton yüksekliği
                //restartButton.style.padding = '10px 20px'; // Kenar boşlukları (üst ve alt, sağ ve sol)
                restartButton.onmouseover = function() {
                    restartButton.style.backgroundColor = 'deeppink'; // Arka plan rengini değiştir
                    restartButton.style.color = 'black'; // Yazı rengini değiştir
                    
                };
                
                // Butondan çıkma olayı
                restartButton.onmouseout = function() {
                    restartButton.style.backgroundColor = 'black'; // Başlangıç arka plan rengini geri yükle
                    restartButton.style.color = 'deeppink'; // Başlangıç yazı rengini geri yükle
                };
                
                restartButton.onclick = function() {
                    location.reload(); // Sayfayı yeniden yükle
                };
                document.body.appendChild(restartButton);
        
                
            }
        }
        context.restore();
    }
}

const audio = document.getElementById("death");
const audio2 = document.getElementById("win");
//oyunu kazandığınızda ve kaybettiğinizdeki ses fonksiyonları
function playSounddeath() {
    audio.play();
}

function playSoundwin() {
    audio2.play();
}