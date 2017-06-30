var Weapon = function(game, spriteName, player, xcoord, ycoord){ //game = context
    this.context = game;
    this.player = player;
    this.isAttack = false; 
    this.atackTime = player.attackTime;
    this.spritePos = {x: xcoord,
                    y: ycoord}

    this.sprite = game.add.sprite(this.xcoord, this.ycoord, spriteName);
    // this.sprite.animations.add('attack',[2,4]);
    this.sprite.anchor.setTo(0.5, 1);

    game.physics.p2.enable(this.sprite, true);
    // this.sprite.body.clearShapes();
    // this.sprite.body.loadPolygon('physicsData', 'hammer_thors_all');



    
}

Weapon.prototype.update = function(){
    // console.log("====>", this.player.getPosition())
    // console.log("PLAYER>", this.sprite.y)

    this.sprite.x = this.player.sprite.x;
    this.sprite.y = this.player.sprite.y + 7;
    this.refreshDirection(this.player.getDirection());
    // this.move(this.player.get(position))
    
}

// Weapon.prototype.attack = function(direction){

//     this.refreshDirection(direction)

//     var that = this;

//     this.sprite.animations.play('attack', 80);

//     this.sprite.events.onAnimationComplete.add(function(sprite){
//         sprite.frame = 0;
//     }, this);
// }

Weapon.prototype.refreshDirection = function(direction){
    if(direction == 'left')
        this.sprite.scale.x = -1;

    if(direction == 'right')
        this.sprite.scale.x = 1;
}

export default Weapon;