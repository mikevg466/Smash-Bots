var InputManager = { //game = this.game, option = {......}

    //VARIABLES
    context: null,

    controls:{
        left:{
            keys:["LEFT"],
            state: 0,   //this property is for server multiplayer check button press
            },
        right:{
            keys:["RIGHT"],
            state: 0,
            },
        up:{
            keys:["UP"],
            state: 0,
            },
        down:{
            keys:["DOWN"],
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

    players: null,

    //METHODS
    init : function(game, player){ //game = "phaser game context" = this.game;
        this.context = game;
        this.players = player;
    },

    update : function(){ //update in state.update
        var player;
        for(var index in this.players){
            player = this.players[index];
            if(this.isDown(this.controls.left.keys[index])){
                player.move("left");
            }
            else if(this.isDown(this.controls.right.keys[index])){
                player.move("right");
            }
            else{
                player.stop();
            }

            if(this.isDown(this.controls.up.keys[index])){
                player.setDirection('up');
            }
            else if(this.isDown(this.controls.down.keys[index])){
                player.setDirection('down');
            }
            else{
                player.setDirection('stop');
            }

            this.controls.jump.timeCount += game.time.elapsed;
            if(this.isDown(this.controls.jump.keys[index])
               && this.controls.jump.timeCount > 500
               && (player.onFloor() || player.sprite.body.blocked.left || player.sprite.body.blocked.right)){

                    player.jump();
                    this.controls.jump.timeCount = 0;
            }

            this.controls.atack.timeCount += game.time.elapsed;
            if(this.isDown(this.controls.atack.keys[index])){
                if(this.controls.atack.timeCount > player.attackTime)
                {
                    player.attack();
                    CollisionManager.playerAttackCollision(player);
                    this.controls.atack.timeCount = 0;
                }
            }
        }

    },

    isDown: function(keyCode){
        return this.context.input.keyboard.isDown(Phaser.Keyboard[keyCode]);
    },

    //other
    setOptions : function(options, object){ //object-> objecto JS o 'default'=this que quiere replazar, option->un {}, que replaza los propiedades del objeto JS
        if(options===undefined) return;
        var object = object || this;

        for(var key in options){
            var new_values = options[key];
            if (key in object){
                this[key]=new_values;
            }
        }
    }
}