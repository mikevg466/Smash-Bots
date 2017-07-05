import Player from './Player';
// import GameManager from './GameObjects/GameManager';

export default class LocalPlayer extends Player{
  constructor(game, spriteName, xCoord, yCoord, playerNumber){
    super(game, spriteName, xCoord, yCoord, playerNumber);
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
    const hitBoxR = this.sprite.children[0];
    const hitBoxL = this.sprite.children[1];
    if (swingRightTrue){
      //this.game.physics.arcade.collide(hitBoxR, enemy1);
    } else {
      // this.game.physics.arcade.collide(hitBoxL, enemy1);
    }
    this.sprite.animations.play('swing');
  }

  jump(){
    this.sprite.body.velocity.y = -320;
  }

}
