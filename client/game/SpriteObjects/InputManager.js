//game = this.game, option = {......}
let key1;
export default class InputManager{
  constructor(game){
    this.game = game,
    this.controls = {
      left: {
        keys: ["LEFT"],
        state: 0,   //this property is for server multiplayer check button press
      },
      right: {
        keys: ["RIGHT"],
        state: 0,
      },
      attack:{
        keys:["F"],
        state: 0,
        timeCount: 0,
      },
      jump:{
        keys:["SPACEBAR"],
        state: 0,
        timeCount: 0,
      }
    }
    this.player = null;
  }

  init(player){
    this.player = player;
  }

  update(player){
    if (this.isDown(this.controls.left.keys[0])){
      this.player.move('left');
    }
    else if (this.isDown(this.controls.right.keys[0])){
      this.player.move('right');
    }
    // else if (this.justDown(this.controls.jump.keys[0])){
    //   this.player.jump();
    // }
    else {
      this.player.stop();
    }
    // if (this.addKey(this.controls.jump.keys[0])){

    // }


    // key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.U)
    // key1.onDown.add((U) => {
    //   if (key1.justDown) {
    //   this.controls.jump.jumpCount -= 1;
    //   }
    //   if (this.controls.jump.jumpCount >= 0 ) {
    //     this.player.jump()
    //     console.log(this.controls.jump.jumpCount)
    //   }
    // })
    
    key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.U)
    key1.onDown.add((U) => {
      if (key1.justDown) {
      this.player.jumpCounter -= 1;
      }
      if (this.player.jumpCounter >= 0 ) {
        this.player.jump()
        console.log(this.player.jumpCounter)
      }
    })


    // this.controls.jump.timeCount += this.game.time.elapsed;
    // if (this.onDown(this.controls.jump.keys[0])
    //   && this.controls.jump.jumpCount < 2 ) {
    //   this.player.jump();
    // }
    // if (this.onDown(this.controls.jump.keys[0]){
    //   this.controls.jump.jumpCount += 1;
    // }
  }

  isDown(keyCode){
    return this.game.input.keyboard.isDown(Phaser.Keyboard[keyCode]);
  }
  // justDown(keyCode){
  //   return this.game.input.keyboard.justDown(Phaser.Keyboard[keyCode]);
  // }

  // addKey(keyCode){
  //   return this.game.input.keyboard.addKey(Phaser.Keyboard[keyCode])
  // }
  // onDown(keyCode){
  //   return this.game.input.keyboard.onDown(Phaser.Keyboard[keyCode])
  // }
}
