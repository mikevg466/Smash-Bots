
export default class Sprite{
  constructor(game, spriteName, xCoord, yCoord){
    this.sprite = game.add.sprite(xCoord, yCoord, spriteName);
    this.game = game;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
  }

  setSize(x, y){
    this.sprite.scale.setTo(x, y);
  }

  setAnchor(x, y){
    this.sprite.anchor.setTo(x, y);
  }
  setPhysics(hasPhysics){
    this.game.physics.arcade.enable(this.sprite, hasPhysics);
  }

  setAnimation(name, framesArray, frameRate){
    this.sprite.animations.add(name, framesArray, frameRate, true);
  }

  setDefault(){
    this.sprite.body.fixedRotation = true;
    this.sprite.body.damping = 0.5;
    this.sprite.body.collideWorldBounds = false;
    this.sprite.checkWorldBounds = true;
    this.sprite.outOfBoundsKill = true;
  }

}
