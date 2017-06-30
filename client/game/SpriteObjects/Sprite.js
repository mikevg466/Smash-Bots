
export default class Sprite(game, spriteName, xCoord, yCoord){
  constructor(){
    this.sprite = game.add.sprite(this.xcoord, this.ycoord, spriteName);

    this.sprite.body.fixedRotation = true;
    this.sprite.body.damping = 0.5;
    this.sprite.body.collideWorldBounds = false;
    this.sprite.checkWorldBounds = true;
    this.sprite.outOfBoundsKill = true;
    this.sprite.events.onKilled.add(function(){
        this.sprite.reset(xcoord, ycoord);
    }, this);
  }

  setSize(x, y){
    this.sprite.scale.setTo(x, y);
  }

  setAnchor(x, y){
    this.sprite.anchor.setTo(x, y);
  }
  setPhysics(hasPhysics){
    game.physics.p2.enable(this.sprite, hasPhysics);
  }

  loadPolygon(polygon){
    this.sprite.body.clearShapes();
    this.sprite.body.loadPolygon('physicsData', polygon);
  }

  setAnimation(name, framesArray, frameRate){
    this.sprite.animations.add(name, framesArray, frameRate, true);
  }

}
