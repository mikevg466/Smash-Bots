import Sprite from './Sprite';
// import Weapon from './Weapon';

export default class Player extends Sprite{
  constructor(game, spriteName, xCoord, yCoord, playerNumber){
    super(game, spriteName, xCoord, yCoord);
    this.playerNumber = playerNumber;
    this.game = game;

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
    };

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
    this.sprite.events.onOutOfBounds.add(function(){
      this.finalPosition = this.getPosition();
    }, this);
    this.sprite.events.onKilled.add(function(){
      this.lives -= 1;
      if (this.lives > 0){
        this.sprite.reset(this.xCoord, this.yCoord);
        this.setGravity(500);
        this.game.input.enabled = true;
      // } else if (this.lives === 0){
      //   this.explodePlayer();
      }
    }, this);
  }

  // default move
  move(direction){
    console.log('remote ', this.playerNumber, ' direction', direction);
    switch(direction){
      case 'left':
        this.setDirection('left');
        this.sprite.animations.play('move');
        break;

      case 'right':
        this.setDirection('right');
        this.sprite.animations.play('move');
        break;

      case 'swing':
        this.sprite.animations.play('swing');
        break;

      // default:
      //   this.sprite.body.velocity.x = 0;
      //   this.sprite.animations.stop();
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
        // if (this.sprite.children[0].name === 'hitBoxes') this.sprite.children[0].scale.x = -1;
        break;

      case 'right':
        this.direction.right = true;
        this.direction.left = false;
        this.sprite.scale.x = 1;
        // if (this.sprite.children[0].name === 'hitBoxes') this.sprite.children[0].scale.x = 1;
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
    this.jumpCounter = 2;
  }

  explodePlayer() {
    const position = this.getPosition();
    this.sprite.kill();
    const explodingSmashbot = this.game.add.sprite(position.x - 300, position.y - 300, 'explodingSmashbot');
    explodingSmashbot.animations.add('explode', [0, 1, 2, 3]);
    explodingSmashbot.animations.play('explode', 5, false, true);
  }
  
  updateAnimationState(){
  }
}
