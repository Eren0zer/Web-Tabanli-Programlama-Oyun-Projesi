// InputHandler sınıfı, klavye girişlerini işlemek ve oyun durumunu güncellemek için kullanılır
export class InputHandler{
    constructor(game){
        this.game = game;
        // Basılı tuşların listesi
        this.keys = [];

        // Klavye tuşuna basıldığında
        window.addEventListener('keydown', e=> {
            // İzin verilen tuşlar kontrol edilir ve tuş basıldığında listeye eklenir
            if((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter' ||
                e.key === '1' ||
                e.key === '2' ||
                e.key === '3' ||
                e.key === 'q' ||
                e.key === 'w' ||
                e.key === 'e' ||
                e.key === 'Q' ||
                e.key === 'W' ||
                e.key === 'E'
                 // Tuş daha önce basılmadıysa listeye eklenir
                )   && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                      // 'd' tuşu hitbox modunu değiştirir
                }else if (e.key === 'd') this.game.debug = !this.game.debug;
                 else if (e.key === 'D') this.game.debug = !this.game.debug;


            
        });
                // Klavye tuşu serbest bırakıldığında

        window.addEventListener('keyup', e=> {
            
        // İzin verilen tuşlar kontrol edilir ve tuş serbest bırakıldığında listeden çıkarılır

            if(e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter' ||
                e.key === '1' ||
                e.key === '2' ||
                e.key === '3' ||
                e.key === 'q' ||
                e.key === 'w' ||
                e.key === 'e' ||
                e.key === 'Q' ||
                e.key === 'W' ||
                e.key === 'E' ){
                this.keys.splice(this.keys.indexOf(e.key), 1);
                }

        });


    }

}