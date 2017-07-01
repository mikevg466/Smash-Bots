import Player from './Player';

export default class RemotePlayer extends Player{
  constructor(game, spriteName, xCoord, yCoord){
    super(game, spriteName, xCoord, yCoord);

    // ------ Animations -------
    this.setAnimation(
      'left',
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
      60
    );
    this.setAnimation(
      'turn',
      [14],
      20
    );
    this.setAnimation(
      'right',
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
      60
    );

    this.direction = {
      up: false,
      down: false,
      left: false,
      right: true,
    }
  }

  jump(){
    // this.sprite.body.velocity.y = -320
  }

}
