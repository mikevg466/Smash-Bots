import { LocalPlayer, RemotePlayer } from './SpriteObjects';
import GameManager from './GameObjects/GameManager';
import store from '../store';

// let game
export function runGame() {

  // ------ Init Game -------
  var gameManager = new GameManager(
    window.innerWidth,
    window.innerHeight,
    Phaser.CANVAS,
    'phaser-example',
    {preload, create, update, render}
  );

  // ------ PreLoad -------
  function preload() {
    const images = {
      chick: 'assets/sprites/budbrain_chick.png',
      atari: 'assets/sprites/block.png',
      background: 'assets/games/starstruck/background2.png',
      platform: 'ourAssets/platform_wood.png',
      bullet: 'assets/sprites/bullet.png',
      weapon: store.getState().game.localPlayer.weaponGraphic,
      thorHammer: 'ourAssets/weapons/hammer_thors.png',
    };
    const atlasJSONs = {
      smashbot: {
        png: 'ourAssets/smashbot/robot_hammer_swing.png',
        json:'ourAssets/smashbot/robot_hammer_swing.json'
      }
    };

    gameManager.preload(images, atlasJSONs, physics);
  }


  // ------ Create -------
  function create() {
    // ------ Initialize -------
    gameManager.create('background');

    // ------ Add Players -------
    gameManager.addSprite('slayer', LocalPlayer, 'smashbot', 500, 200);
    gameManager.addSprite('enemy1', RemotePlayer, 'smashbot', 1000, 200);
    gameManager.addSprite('enemy2', RemotePlayer, 'smashbot', 1500, 200);
    gameManager.addSprite('enemy3', RemotePlayer, 'smashbot', 2000, 200);

    // ------ Add Platforms -------
    // TODO: separate out platforms as it's own class and call through gameManager.addSprite
    const platform = gameManager.game.add.sprite(500, 650, 'platform');
    gameManager.game.physics.arcade.enable(platform);
    platform.body.immovable = true;
    platform.scale.setTo(2, 1.2);
    platform.anchor.setTo(0.5, 0.5);

    // ------ Set Collisions -------


  }


  // ------ Update -------
  function update(){
    // make a method:
    gameManager.game.physics.arcade.collide(slayer.sprite, platform, collideCallback); // optional: add callback
    gameManager.game.physics.arcade.collide(enemy1.sprite, platform, collideCallback);
    gameManager.game.physics.arcade.collide(enemy2.sprite, platform, collideCallback);
    gameManager.game.physics.arcade.collide(enemy3.sprite, platform, collideCallback);
    gameManager.game.physics.arcade.overlap(slayer.sprite, enemy1.sprite, overlapCallback); // default. change to collide when player attacks.

    gameManager.update();
  }
  function collideCallback(){
    // console.log('collided');
  }
    function overlapCallback(){
     //console.log('overlapped');
  }
  function render() {
    

    game.debug.bodyInfo(slayer.sprite);

    game.debug.body(slayer.sprite);
    // game.debug.body(sprite2);

    // game.debug.bodyInfo(weapon.sprite);
    // game.debug.body(weapon.sprite)

}
 }
