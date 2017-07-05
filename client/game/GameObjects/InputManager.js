
export default class InputManager{
  constructor(game){
    this.game = game,
    this.player = null;
  }


  init(player){
    this.player = player;
  }

  update(gameState){
    const animation = gameState.remotePlayers[this.player.playerNumber] ?
      gameState.remotePlayers[this.player.playerNumber].animation :
      this.player.animation;
    this.player.move(animation);
//   update(){
//     const controls = this.player.controls;
//     const attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
//     attackKey.onDown.add((L) => {
//       const swingRightTrue = this.player.direction.right;
//       this.player.attack(swingRightTrue);
//     });
//     if (controls.left.keys && this.isDown(controls.left.keys[0])){
//       // moving = true;
//       this.player.move('left')
//       // this.player.sprite.animations.play('swing')
//       // console.log("^^^^^^", attackKey.onDown)
//       // if (attackKey.onDown) {
//       //   this.player.sprite.animations.play('swing')
//       // }
//     }
//     //   if (controls.attack.keys && this.isDown(controls.attack.keys[0])) {
//     //     this.player.attack(false);
//     //   } else {
//     //     this.player.move('left');
//     //   }
//     // }
//     else if (controls.right.keys && this.isDown(controls.right.keys[0])){
//       // moving = true;
//       // console.log("********", controls)
//       this.player.move('right');
//     }

//     //   if (controls.attack.keys && this.isDown(controls.attack.keys[0])) {
//     //     this.player.attack(true);
//     //   } else {
//     //     this.player.move('right');
//     //   }
//     // }
//     else {
//       // console.log('hi', moving)
//       this.player.stop();
//       // moving = false;
//       // console.log('=====>', moving)
//     }

//     if (controls.attack.keys && this.isDown(controls.attack.keys[0])) {
//       this.player.sprite.animations.play('swing')
//     }


//     const jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.U);
//     jumpKey.onDown.add((U) => {
//       if (jumpKey.justDown) {
//       this.player.jumpCounter -= 1;
//       }
//       if (this.player.jumpCounter >= 0 ) {
//         this.player.jump()
//       }
//     });

//   }

//   isDown(keyCode){
//     return this.game.input.keyboard.isDown(Phaser.Keyboard[keyCode]);
  }
  
}
