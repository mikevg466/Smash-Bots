import Sprite from './Sprite';

export default class Player extends Sprite{
  constructor(game, spriteName, xCoord, yCoord){
    super(game, spriteName, xCoord, yCoord);

    // ------ Animations -------
    this.setAnimation(
      'left',
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      60
    );
    this.setAnimation(
      'turn',
      [14],
      20
    );
    this.setAnimation(
      'right',
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      60
    );

    // default controls
    this.controls = {
      left: {
        keys: null,
        state: 0,   //this property is for server multiplayer check button press
      },
      right: {
        keys: null,
        state: 0,
      },
      attack:{
        keys: null,
        state: 0,
        timeCount: 0,
      },
      jump:{
        keys: null,
        state: 0,
        timeCount: 0,
      }
    }

    this.direction = {
      up: false,
      down: false,
      left: false,
      right: true,
    }

    this.setAnchor(0.5, 0.5);
    this.setPhysics(false);
    // this.loadPolygon('smashbot000');
    this.setDefault();
    this.setGravity(500)
  }

  // default move
  move(direction){
    switch(direction){
      case 'left':
        this.setDirection('left');
        this.sprite.animations.play('left');
        break;

      case 'right':
        this.setDirection('right');
        this.sprite.animations.play('right');
        break;

      default:
        this.sprite.body.velocity.x = 0;
        this.sprite.animations.stop();
        break;
    }
  }

  setGravity(num){
    this.sprite.body.gravity.y = num;
  }

  setDirection(direction){
    switch(direction){
      case 'left':
        this.direction.left = true;
        this.direction.right = false;
        this.sprite.scale.x = -1;
        break;

      case 'right':
        this.direction.right = true;
        this.direction.left = false;
        this.sprite.scale.x = 1;
        break;
    }
  }

  getDirection(){
    for( var key in this.direction){
      if (this.direction[key]){
        return key;
      }
    }
    return null;
  }

  stop(){
    this.sprite.body.velocity.x = 0;
    this.sprite.animations.stop();
  }

  getPosition(){
    return {x: this.sprite.x , y: this.sprite.y}
  }

}
