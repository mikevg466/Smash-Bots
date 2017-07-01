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
    if (controls.jump.keys && this.isDown(controls.jump.keys[0])){
      this.player.jump();
    }
  }

  isDown(keyCode){
    return this.game.input.keyboard.isDown(Phaser.Keyboard[keyCode]);
  }
}
