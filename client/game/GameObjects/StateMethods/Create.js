
export default function Create(background){
  this.game.add.tileSprite(0, 0, 2000, 2000, background);
  this.game.physics.startSystem(Phaser.Physics.ARCADE)
}
