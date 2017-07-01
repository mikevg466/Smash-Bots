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
    {preload, create, update}
  );


  // ------ PreLoad -------
  function preload() {
    const images = {
      chick: 'assets/sprites/budbrain_chick.png',
      atari: 'assets/sprites/block.png',
      background: 'assets/games/starstruck/background2.png',
      bullet: 'assets/sprites/bullet.png',
      weapon: store.getState().game.localPlayer.weaponGraphic,
      thorHammer: 'ourAssets/weapons/hammer_thors.png',
    };
    const atlasJSONs = {
      smashbot: {
        png: 'ourAssets/smashbot/basic_movement_no_weapon_final.png',
        json:'ourAssets/smashbot/basic_movement_no_weapon_final.json'
      }
    };
    const physics = {
      physicsData: 'ourAssets/smashbot/physics_data_smashbot.json'
    }

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
    const sayer = gameManager.game.add.sprite(100, 100, 'smashbot');
    gameManager.game.physics.arcade.enable(sayer);
    sayer.body.fixedRotation = true;
    sayer.body.damping = 0.5;

    // ------ Set Collisions -------


  }


  // ------ Update -------
  function update(){
      gameManager.update();
  }

 }
