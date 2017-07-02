import Player from './Player';

export default class LocalPlayer extends Player{
  constructor(game, spriteName, xCoord, yCoord){
    super(game, spriteName, xCoord, yCoord);
    this.controls = {
      left: {
        keys: ["LEFT"],
      },
      right: {
        keys: ["RIGHT"],
      },
      attack:{
        keys:["L"],
        timeCount: 0,
      },
      jump:{
        keys:["SPACEBAR"],
      }
    }
  }

  move(direction){
    switch(direction){
      case 'left':
        this.sprite.body.velocity.x = -500;
        this.setDirection('left');
        this.sprite.animations.play('move');
        break;

      case 'right':
        this.sprite.body.velocity.x = 500;
        this.setDirection('right');
        this.sprite.animations.play('move');
        break;

      default:
        this.sprite.body.velocity.x = 0;
        this.sprite.animations.play();
        break;
    }
  }

  attack(swingRightTrue){
    let hitBox1, hitBox2;
    if (this.sprite.children[0].name === 'hitBoxes'){
      hitBox1 = this.sprite.children[0][0];
      hitBox2 = this.sprite.children[0][1];
    }
    if (swingRightTrue){
      this.game.physics.arcade.collide(hitBox1, enemy1);
    } else {
      this.game.physics.arcade.collide(hitBox2, enemy1);
    }
    this.sprite.animations.play('swing');
  }

  jump(){
    this.sprite.body.velocity.y = -320;
  }

  // attack(){
  //   if (this.direction.right) this.sprite.animations.play('swingRight');
  //   else this.sprite.animations.play('swingLeft');
  // }

}
