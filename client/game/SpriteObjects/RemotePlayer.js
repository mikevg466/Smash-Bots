import Player from './Player';

export default class RemotePlayer extends Player{
  constructor(game, spriteName, xCoord, yCoord, playerNumber){
    super(game, spriteName, xCoord, yCoord, playerNumber);

    // ------ Animations -------
    this.setAnimation(
      'move',
      [6, 7, 8, 9],
      10, true
    );
    this.setAnimation(
      'swing',
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 27, 27, 27, 27, 27, 27, 6],
      60, false
    );
    this.setAnimation(
      'fly',
      [18], 60, true
    );

    this.direction = {
      up: false,
      down: false,
      left: false,
      right: true,
    };

    this.sprite.events.onKilled.add(function(){
      this.lives -= 1;
      if (this.lives > 0){
        this.sprite.reset(this.xCoord, this.yCoord);
        //this.regainControl()
        // this.game.input.enabled = true;
      // } else if (this.lives === 0){
      //   this.explodePlayer();
      }
    }, this);

  }

  jump(){
    // this.sprite.body.velocity.y = -320
  }
  attack(){

  }

}
