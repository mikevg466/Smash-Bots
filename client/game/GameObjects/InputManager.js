//game = this.game, option = {......}
export default class InputManager{
  constructor(game){
    this.game = game,
    this.player = null;
  }

  init(player){
    this.player = player;
  }

  update(){
    const controls = this.player.controls;
    if (controls.left.keys && this.isDown(controls.left.keys[0])){
      this.player.move('left');
    }
    else if (controls.right.keys && this.isDown(controls.right.keys[0])){
      this.player.move('right');

    }
    else {
      this.player.stop();
    }

    let key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.U)
    key1.onDown.add((U) => {
      if (key1.justDown) {
      this.player.jumpCounter -= 1;
      }
      if (this.player.jumpCounter >= 0 ) {
        this.player.jump()
        console.log(this.player.jumpCounter)
      }
    })
  }

  isDown(keyCode){
    return this.game.input.keyboard.isDown(Phaser.Keyboard[keyCode]);
  }
}
