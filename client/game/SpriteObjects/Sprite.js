
export default class Sprite{
  constructor(game, spriteName, xCoord, yCoord){
    this.sprite = game.add.sprite(this.xCoord, this.yCoord, spriteName);
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
    this.game.physics.p2.enable(this.sprite, hasPhysics);
  }

  loadPolygon(polygon){
    this.sprite.body.clearShapes();
    this.sprite.body.loadPolygon('physicsData', polygon);
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
    this.sprite.events.onKilled.add(function(){
        this.sprite.reset(this.xCoord, this.yCoord);
    }, this);
  }

}
