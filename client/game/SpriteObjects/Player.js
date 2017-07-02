import Sprite from './Sprite';
// import Weapon from './Weapon';

export default class Player extends Sprite{
  constructor(game, spriteName, xCoord, yCoord){
    super(game, spriteName, xCoord, yCoord);

    // ------ Animations -------
    this.setAnimation(
      'left',
      [6, 7, 8, 9],
      10
    );
    this.setAnimation(
      'right',
      [6, 7, 8, 9],
      10
    );
    this.setAnimation(
      'swingLeft',
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
      60
    );
    this.setAnimation(
      'swingRight',
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
      60
    );

    // default controls
    this.controls = {
      left: {
        keys: null,
      },
      right: {
        keys: null
      },
      attack:{
        keys: null,
        timeCount: 0,
      },
      jump:{
        keys: null,
      }
    }

    this.direction = {
      up: false,
      down: false,
      left: false,
      right: true,
    };

    this.lives = 3;
    this.jumpCounter = 2;

    this.setAnchor(0.5, 0.5);
    this.setPhysics(true);
    // this.loadPolygon('smashbot000');
    this.setDefault();

    this.setGravity(500);
    this.sprite.events.onKilled.add(function(){
        this.lives -= 1;
        if (this.lives > 0){
          this.sprite.reset(this.xCoord, this.yCoord)
        }
    }, this);
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
    switch (direction){
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
    return {x: this.sprite.x, y: this.sprite.y};
  }

  resetJumps(){
    this.jumpCounter = 2;
  }
}


//onfloor = false
//oncollision => if(i)