import Sprite from './Sprite';

export default class Weapon extends Sprite{
  constructor(game, spriteName, player){
    super(game, spriteName, player);
   
    this.context = game;
    this.player = player;
    this.isAttack = false;
    this.attackTime = player.attackTime;
    this.spritePos = {x: 0,
                      y: 0}

    // this.sprite.animations.add('attack',[2,4]);
    this.sprite.anchor.setTo(0, 0.75);

    game.physics.arcade.enable(this.sprite);
    //  console.log("<======", this.sprite)
    }

    update(){
        
    this.sprite.x = this.player.sprite.x;
    this.sprite.y = this.player.sprite.y;
    this.refreshDirection(this.player.getDirection());
     console.log("<======", this.sprite)
    }

// Weapon.prototype.attack = function(direction){

//     this.refreshDirection(direction)

//     var that = this;

//     this.sprite.animations.play('attack', 80);

//     this.sprite.events.onAnimationComplete.add(function(sprite){
//         sprite.frame = 0;
//     }, this);
// }

    refreshDirection(direction){
    if(direction == 'left')
        this.sprite.scale.x = -1;

    if(direction == 'right')
        this.sprite.scale.x = 1;
    }
}