import Sprite from './Sprite';
// import Weapon from './Weapon';

export default class Player extends Sprite{
  constructor(game, spriteName, xCoord, yCoord){
    super(game, spriteName, xCoord, yCoord);

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

    // default controls
    this.controls = {
      left: {
        keys: null,
      },
      right: {
        keys: null
      },
      attack: {
        keys: null,
        timeCount: 0,
      },
      jump: {
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

    this.setAnchor(0.27, 0.5);
    this.setPhysics(true);
    this.setDefault();
    this.sprite.body.setSize(68, 166, 44, 94); // hitBox

    this.setGravity(500);
    this.sprite.events.onKilled.add(function(){
      this.lives -= 1;
      if (this.lives > 0){
        this.sprite.reset(this.xCoord, this.yCoord);
      }
    }, this);
  }

  // default move
  move(direction){
    switch(direction){
      case 'left':
        this.setDirection('left');
        this.sprite.animations.play('move');
        break;

      case 'right':
        this.setDirection('right');
        this.sprite.animations.play('move');
        break;

      // default:
      //   this.sprite.body.velocity.x = 0;
      //   // this.sprite.animations.stop();
      //   break;
    }
  }

  // attack(){
  //   this.sprite.animations.play('swing');
  // }

  setGravity(num){
    this.sprite.body.gravity.y = num;
  }

  setDirection(direction){
    switch (direction){
      case 'left':
        this.direction.left = true;
        this.direction.right = false;
        this.sprite.scale.x = -1;
        if (this.sprite.children[0].name === 'hitBoxes') this.sprite.children[0].scale.x = -1;
        break;

      case 'right':
        this.direction.right = true;
        this.direction.left = false;
        this.sprite.scale.x = 1;
        if (this.sprite.children[0].name === 'hitBoxes') this.sprite.children[0].scale.x = 1;
        break;
    }
  }

  getDirection(){
    for ( var key in this.direction){
      if (this.direction[key]){
        return key;
      }
    }
    return null;
  }

  stop(){
    this.sprite.body.velocity.x = 0;
  }


  getPosition(){
    return {x: this.sprite.x, y: this.sprite.y};
  }

  resetJumps(){
    //when player collides with floor call this method
    //this.jumpCounter = 2
  }
}
