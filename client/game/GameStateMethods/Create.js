
export default class Create{
  constructor(game, background){

    game.add.tileSprite(0, 0, 2000, 600, background);

    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);

    game.physics.p2.gravity.y = 350;
    game.physics.p2.world.defaultContactMaterial.friction = 0.3;
    game.physics.p2.world.setGlobalStiffness(1e5);
    var playerCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();
  }

}
