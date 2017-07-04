//game = this.game, option = {......}
let moving = false;
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
      moving = true;
      if (controls.attack.keys && this.isDown(controls.attack.keys[0])) {
        this.player.attack(false);
      } else {
        this.player.move('left');
      }
    }
    else if (controls.right.keys && this.isDown(controls.right.keys[0])){
      moving = true;
      if (controls.attack.keys && this.isDown(controls.attack.keys[0])) {
        this.player.attack(true);
      } else {
        this.player.move('right');
      }
    }
    // else if (moving) {
    //   this.player.stop();
    //   moving = false;
    //   console.log('=====>', moving)
    // }


    const jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.U);
    jumpKey.onDown.add((U) => {
      if (jumpKey.justDown) {
      this.player.jumpCounter -= 1;
      }
      if (this.player.jumpCounter >= 0 ) {
        this.player.jump()
      }
    });

    const attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
    attackKey.onDown.add((L) => {
      const swingRightTrue = this.player.direction.right;
      this.player.attack(swingRightTrue);
    });
  }

  isDown(keyCode){
    return this.game.input.keyboard.isDown(Phaser.Keyboard[keyCode]);
  }
}
