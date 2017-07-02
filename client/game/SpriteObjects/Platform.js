import Sprite from './Sprite';

export default class Platform extends Sprite{
  constructor(game, spriteName, xCoord, yCoord){
    super(game, spriteName, xCoord, yCoord);

    // defaults
    this.setAnchor(0.5, 0.5);
    this.setSize(2, 1.2);
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.immovable = true;
  }

}
