import { LocalPlayer, RemotePlayer, Platform } from './SpriteObjects';
import GameManager from './GameObjects/GameManager';
import { processLocalState } from '../redux/game';
import { emitPlayerStateChanges } from '../sockets/client';
import store from '../store';

// let game
export function runGame(localPlayerNum, remotePlayerNums) {

  // ------ Init Game -------
  const gameManager = new GameManager(
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

    gameManager.preload(images, atlasJSONs);
  }


  // ------ Create -------
  function create() {
    // ------ Initialize -------
    gameManager.create('background');

    // ------ Add Players -------
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

    // ------ Add Platforms -------
    gameManager.addSprite('platform', Platform, 'platform', 500, 650);

    // ------ Set Collisions -------


  }


  // ------ Update -------
  function update(){
    // manage collisions
    const players = [];
    localPlayerNum && players.push('localPlayer');
    remotePlayerNums.forEach(playerNum => players.push('remote' + playerNum))
    gameManager.addCollisions(players, 'platform');
    // gameManager.game.physics.arcade.overlap(gameManager.localPlayer.sprite, gameManager.remote1.sprite, overlapCallback); // default. change to collide when player attacks.

    gameManager.update();

    // handle position changes
    const localPlayerState = {
      xCoord: gameManager.localPlayer.sprite.position.x,
      yCoord: gameManager.localPlayer.sprite.position.y,
      number: gameManager.localPlayer.playerNumber
    };
    // TODO: update remote player damage if collision occurs
    const remotePlayersState = {};



    store.dispatch(updateLocalState(localPlayerState, remotePlayersState));
    emitPlayerStateChanges(store.getState().game.playerStateChanges);
  }

  // ------ Render -------
  function render() {


    gameManager.game.debug.bodyInfo(gameManager.localPlayer.sprite);

    gameManager.game.debug.body(gameManager.localPlayer.sprite);
    // game.debug.body(sprite2);

    // game.debug.bodyInfo(weapon.sprite);
    // game.debug.body(weapon.sprite)

}
 }
