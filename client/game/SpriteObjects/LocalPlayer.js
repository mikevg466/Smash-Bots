import Player from './Player';
import store from '../../store';
import { setAnimation } from '../../redux/game';
// import GameManager from './GameObjects/GameManager';

export default class LocalPlayer extends Player{
  constructor(game, spriteName, xCoord, yCoord, playerNumber){
    super(game, spriteName, xCoord, yCoord, playerNumber);
    this.animation = '';
    this.controls = {
      left: {
        keys: ["LEFT"],
      },
      right: {
        keys: ["RIGHT"],
      },
      attack:{
        keys:["L"],
        timeCount: 0,
      },
      jump:{
        keys:["SPACEBAR"],
      }
    }
  }

  move(direction){
    switch(direction){
      case 'left':
        this.sprite.body.velocity.x = -500;
        this.setDirection('left');
        this.sprite.animations.play('move');
        break;

      case 'right':
        this.sprite.body.velocity.x = 500;
        this.setDirection('right');
        this.sprite.animations.play('move');
        break;

      default:
        this.sprite.body.velocity.x = 0;
        this.sprite.animations.stop();
        // this.sprite.animations.play();
        break;
    }
  }

  attack(swingRightTrue){
    const hitBoxR = this.sprite.children[0];
    const hitBoxL = this.sprite.children[1];
    if (swingRightTrue){
      //this.game.physics.arcade.collide(hitBoxR, enemy1);
    } else {
      // this.game.physics.arcade.collide(hitBoxL, enemy1);
    }
    this.sprite.animations.play('swing');
  }

  jump(){
    this.sprite.body.velocity.y = -320;
  }


  updateAnimationState(){
    const controls = this.controls;
    if (controls.left.keys && this.isDown(controls.left.keys[0])){
      this.animation = 'left';
    }
    else if (controls.right.keys && this.isDown(controls.right.keys[0])){
      this.animation = 'right';
    }
    else {
      this.animation = 'stop';
    }


    const jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.U);
    jumpKey.onDown.add((U) => {
      if (jumpKey.justDown) {
      this.jumpCounter -= 1;
      }
      if (this.jumpCounter >= 0 ) {
        this.jump()
      }
    });

    const attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
    attackKey.onDown.add((L) => {
      const swingRightTrue = this.direction.right;
      this.attack(swingRightTrue);
    });
  }

  isDown(keyCode){
    return this.game.input.keyboard.isDown(Phaser.Keyboard[keyCode]);
  }

}
