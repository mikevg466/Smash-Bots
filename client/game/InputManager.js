var InputManager = { //game = this.game, option = {......}

    context: null,

    controls: {
        left: {
            keys: ["LEFT"],
            state: 0,   //this property is for server multiplayer check button press
            },
        right: {
            keys: ["RIGHT"],
            state: 0,
            },
        atack:{
            keys:["F"],
            state: 0,
            timeCount: 0,
            },
        jump:{
            keys:["SPACEBAR"],
            state: 0,
            timeCount: 0,
            }
    },

    player: null,

    //METHODS
    init: function(game, player){ 
        console.log("who me", player)
        this.context = game;
        this.player = player;
    },

    update: function (player){
        if (this.isDown(this.controls.left.keys[0])){
            this.player.move('left');
        }
        else if (this.isDown(this.controls.right.keys[0])){
            this.player.move('right');
        }
        else {
            this.player.stop();
        }

        // if (this.isDown(this.controls.jump.keys[0])) {
        //     this.player.stop();

        // }
        

    },
    isDown: function(keyCode){
        return this.context.input.keyboard.isDown(Phaser.Keyboard[keyCode]);
    },

}

export default InputManager;