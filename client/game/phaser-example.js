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
  let platform;

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

    gameManager.preload(images, atlasJSONs);
  }


  // ------ Create -------
  function create() {
    // ------ Initialize -------
    gameManager.create('background');

    // ------ Add Players -------
    const state = store.getState()
    // assign player coordinates
    var slayerPlayerNumber = state.game.playerNumber
    var enemy1PlayerNumber = Object.keys(state.game.remotePlayers)[0]
    var enemy2Playernumber = Object.keys(state.game.remotePlayers)[1]
    var enemy3Playernumber = Object.keys(state.game.remotePlayers)[2]

    const xCoords = [250, 500, 750, 1000]
    const yCoords = [200, 200, 200, 200]

    const slayerX = xCoords[slayerPlayerNumber-1]
    const slayerY = yCoords[slayerPlayerNumber-1]

    const enemy1X = xCoords[enemy1PlayerNumber-1]
    const enemy1Y = yCoords[enemy1PlayerNumber-1]

    // const enemy2X = xCoords[enemy2PlayerNumber-1]
    // const enemy2Y = yCoords[enemy2PlayerNumber-1]

    // const enemy3X = xCoords[enemy3PlayerNumber-1]
    // const enemy3Y = yCoords[enemy3PlayerNumber-1]

    gameManager.addSprite('slayer', LocalPlayer, 'smashbot', slayerX, slayerY);
    gameManager.addSprite('enemy1', RemotePlayer, 'smashbot', enemy1X, enemy1Y);
    gameManager.addSprite('enemy2', RemotePlayer, 'smashbot', 750, 200);
    gameManager.addSprite('enemy3', RemotePlayer, 'smashbot', 1000, 200);

    // ------ Add Platforms -------
    // TODO: separate out platforms as it's own class and call through gameManager.addSprite
    platform = gameManager.game.add.sprite(500, 650, 'platform');
    gameManager.game.physics.arcade.enable(platform);
    platform.body.immovable = true;
    platform.scale.setTo(2, 1.2);
    platform.anchor.setTo(0.5, 0.5);

    // ------ Set Collisions -------


  }


  // ------ Update -------
  function update(){
    // make a method:
    gameManager.game.physics.arcade.collide(gameManager.slayer.sprite, platform, collideCallback); // optional: add callback
    gameManager.game.physics.arcade.collide(gameManager.enemy1.sprite, platform, collideCallback);
    gameManager.game.physics.arcade.collide(gameManager.enemy2.sprite, platform, collideCallback);
    gameManager.game.physics.arcade.collide(gameManager.enemy3.sprite, platform, collideCallback);
    gameManager.game.physics.arcade.overlap(gameManager.slayer.sprite, gameManager.enemy1.sprite, overlapCallback); // default. change to collide when player attacks.

    gameManager.update();
  }
  function collideCallback(){
    // console.log('collided');
  }
  function overlapCallback(){
     //console.log('overlapped');
  }
  function render() {

    gameManager.game.debug.bodyInfo(gameManager.slayer.sprite);

    gameManager.game.debug.body(gameManager.slayer.sprite);
    // game.debug.body(sprite2);

    // game.debug.bodyInfo(weapon.sprite);
    // game.debug.body(weapon.sprite)

  }
}
