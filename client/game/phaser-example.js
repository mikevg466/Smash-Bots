import { LocalPlayer, RemotePlayer, Platform } from './SpriteObjects';
import GameManager from './GameObjects/GameManager';
import store from '../store';

// let game
export function runGame(localPlayerNum, remotePlayerNums) {

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
<<<<<<< HEAD
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
=======
    const playerList = [
      { xCoord: 200, yCoord: 200 },
      { xCoord: 500, yCoord: 200 },
      { xCoord: 800, yCoord: 200 },
      { xCoord: 1100, yCoord: 200 },
    ];

    if(localPlayerNum){
      const { xCoord, yCoord } = playerList[localPlayerNum - 1];
      gameManager.addPlayer('localPlayer', LocalPlayer, 'smashbot', xCoord, yCoord, localPlayerNum);
    }
    remotePlayerNums
      .forEach(playerNum => {
        const { xCoord, yCoord } = playerList[playerNum - 1];
        gameManager.addPlayer('remote' + playerNum, RemotePlayer, 'smashbot', xCoord, yCoord, playerNum);
      });
>>>>>>> c1062bc508f62b4b6794fbb51a75343d0c0bd09a

    // ------ Add Platforms -------
    gameManager.addSprite('platform', Platform, 'platform', 500, 650);

    // ------ Set Collisions -------


  }


  // ------ Update -------
  function update(){
    // make a method:
    const players = [];
    localPlayerNum && players.push('localPlayer');
    remotePlayerNums.forEach(playerNum => players.push('remote' + playerNum))
    gameManager.addCollisions(players, 'platform');

    // gameManager.game.physics.arcade.overlap(gameManager.localPlayer.sprite, gameManager.remote1.sprite, overlapCallback); // default. change to collide when player attacks.

    gameManager.update();
  }
<<<<<<< HEAD
  function collideCallback(){
    // console.log('collided');
  }
  function overlapCallback(){
     //console.log('overlapped');
  }
  function render() {

    gameManager.game.debug.bodyInfo(gameManager.slayer.sprite);
=======

  // ------ Render -------
  function render() {


    gameManager.game.debug.bodyInfo(gameManager.localPlayer.sprite);
>>>>>>> c1062bc508f62b4b6794fbb51a75343d0c0bd09a

    gameManager.game.debug.body(gameManager.localPlayer.sprite);
    // game.debug.body(sprite2);

    // game.debug.bodyInfo(weapon.sprite);
    // game.debug.body(weapon.sprite)

  }
}
