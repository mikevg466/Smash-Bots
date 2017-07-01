//game = this.game, option = {......}
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
    else {
      this.player.stop();
    }
    if (this.isDown(this.controls.jump.keys[0])){
      this.player.jump();
    }
  }

  isDown(keyCode){
    return this.game.input.keyboard.isDown(Phaser.Keyboard[keyCode]);
  }
}
