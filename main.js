import { Player } from './player.js';
import { Kopek } from './kopek.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy, GroundEnemy2 , FlyingEnemy2} from './enemies.js';
import { UI } from './UI.js';
import { ArtiCan } from './eklentiler.js';

// Sayfa tamamen yüklendiğinde çalışacak olan event listener
window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.widht = 700;
    canvas.height = 400;

    class Game {
        constructor(widht, height){
            this.widht = widht;
            this.height= height;
            this.groundMargin = 30;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this); // Arkaplan
            this.player = new Player(this); // Oyuncu
            this.kopek = new Kopek(this); // Köpek karakteri
            this.input = new InputHandler(this); // Kullanıcı girişi
            this.UI = new UI(this); // Kullanıcı arayüzü
            this.enemies = []; // Düşmanlar
            this.effects = []; // Efektler
            this.eklentiler = []; // Ekstra nesneler
            this.floatingMessages = []; // Uçan mesajlar
            this.eklentiTimer = 0;
            this.eklentiInterval = 1000;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.winningScore = 400;
            this.time = 90000;
            this.maxTime= 0;
            this.gameOver = false;
            this.can = 5;
            this.kopekcan = 4;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.kopek.currentState = this.kopek.states[0];
            this.kopek.currentState.enter();
        }
        // Oyun durumunu güncelle
        update(deltaTime){
            // Zamanı azalt
            this.time -= deltaTime;
            // Zaman bittiğinde oyunu bitir
            if(this.time < this.maxTime ) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            this.kopek.update(this.input.keys, deltaTime);
            // Düşmanları ekle
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime ;
            }
            // Ekstra nesneleri ekle
            if(this.eklentiTimer > this.eklentiInterval){
                this.addEklenti();
                this.eklentiTimer = 0;
            } else {
                this.eklentiTimer += deltaTime ;
            }
            // Düşmanları güncelle
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            });
            // Uçan mesajları güncelle
            this.floatingMessages.forEach(message => {
                message.update();

             });
            // Efektleri güncelle
            this.effects.forEach((particle, index) => {
                particle.update(deltaTime);  
            });
            // Ekstra nesneleri güncelle
            this.eklentiler.forEach(eklenti => {
                eklenti.update(deltaTime);
            });
            // Silinmesi gereken nesneleri filtrele
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);
            this.effects = this.effects.filter(particle => !particle.markedForDeletion);
            this.eklentiler = this.eklentiler.filter(eklenti => !eklenti.markedForDeletion);

        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.kopek.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            // Efektleri çiz
            this.effects.forEach(particle => {
                particle.draw(context);
            });
            // Uçan mesajları çiz
            this.floatingMessages.forEach(message => {
            message.draw(context);
            });
            // Ekstra nesneleri çiz
            this.eklentiler.forEach(eklenti => {
                eklenti.draw(context);
            });
            // Kullanıcı arayüzünü çiz
            this.UI.draw(context);
        }
        addEnemy(){
             // Belirli olasılıklarla farklı düşmanları ekle
            if(this.speed > 0 && Math.random() < 0.2) this.enemies.push(new GroundEnemy(this));
            else if(this.speed > 0 && Math.random() < 0.5)  this.enemies.push(new ClimbingEnemy(this));
            if(this.speed >= 0 && Math.random() < 0.6) this.enemies.push(new FlyingEnemy(this));
            if(this.speed >= 0 && Math.random() < 0.6) this.enemies.push(new FlyingEnemy2(this));
            if(this.speed > 0 && Math.random() < 0.2) this.enemies.push(new GroundEnemy2(this));

        }

         // Ekstra nesne ekle
        addEklenti(){
            
            if(this.speed > 0 && Math.random() < 0.07) this.eklentiler.push(new ArtiCan(this));
        }

        
    }
    // Oyunu başlat
    const game = new Game(canvas.widht, canvas.height);
    let lastTime = 0;
    // Oyunu animasyonla güncelle
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.widht, canvas.height); // Canvas'ı temizle
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver) requestAnimationFrame(animate); // Oyun devam ediyorsa animasyonu sürdür

    }
    animate(0);// Animasyonu başlat

});