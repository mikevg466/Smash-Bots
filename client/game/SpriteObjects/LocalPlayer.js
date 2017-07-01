import Player from './Player';

export default class LocalPlayer extends Player{
  constructor(game, spriteName, xCoord, yCoord){
    super(game, spriteName, xCoord, yCoord);
    this.controls = {
      left: {
        keys: ["LEFT"],
        state: 0,   //this property is for server multiplayer check button press
      },
      right: {
        keys: ["RIGHT"],
        state: 0,
      },
      attack:{
        keys:["F"],
        state: 0,
        timeCount: 0,
      },
      jump:{
        keys:["SPACEBAR"],
        state: 0,
        timeCount: 0,
      }
    }
  }

  move(direction){
    switch(direction){
      case 'left':
        this.sprite.body.velocity.x = -500;
        this.setDirection('left');
        this.sprite.animations.play('left');
        break;

      case 'right':
        this.sprite.body.velocity.x = 500;
        this.setDirection('right');
        this.sprite.animations.play('right');
        break;

      default:
        this.sprite.body.velocity.x = 0;
        this.sprite.animations.stop();
        break;
    }
  }

  jump(){
    this.sprite.body.velocity.y = -320
  }

}
