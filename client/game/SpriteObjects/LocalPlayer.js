import Player from './Player';

export default class LocalPlayer extends Player{
<<<<<<< HEAD
  constructor(game, spriteName, xCoord, yCoord){
    super(game, spriteName, xCoord, yCoord);
    console.log(xCoord,yCoord)
=======
  constructor(game, spriteName, xCoord, yCoord, playerNumber){
    super(game, spriteName, xCoord, yCoord, playerNumber);
>>>>>>> c1062bc508f62b4b6794fbb51a75343d0c0bd09a
    this.controls = {
      left: {
        keys: ["LEFT"],
      },
      right: {
        keys: ["RIGHT"],
      },
      attack:{
        keys:["F"],
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
