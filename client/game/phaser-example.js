import { LocalPlayer, RemotePlayer, Platform } from './SpriteObjects';
import GameManager from './GameObjects/GameManager';
import { updateLocalState } from '../redux/game';
import { emitPlayerStateChanges } from '../sockets/client';
import store from '../store';
// import throttle from 'lodash.throttle';

let hitBoxR,
  hitBoxL;

export function runGame(localPlayerNum, remotePlayerNums) {

  // ------ Init Game -------
  const gameManager = new GameManager(
    window.innerWidth,
    window.innerHeight,
    Phaser.CANVAS,
    'phaser-example',
    {preload, create, update, render}
  );

  let totalLives;
  let gameText;

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
      hitBoxT: 'ourAssets/transparent_box.png',
      gameText: 'assets/fonts/retrofonts/mmegadeth_tlb.png'
    };
    const atlasJSONs = {
      smashbot: {
        png: 'ourAssets/smashbot/robot_hammer_swing.png',
        json: 'ourAssets/smashbot/robot_hammer_swing.json'
      },
      explodingSmashbot: {
        png: 'ourAssets/smashbot/robot_explosion_short.png',
        json: 'ourAssets/smashbot/robot_explosion_short.json'
      }
    };

    gameManager.preload(images, atlasJSONs);
  }


  // ------ Create -------
  function create() {
    // ------ Initialize -------
    gameManager.create('background');

    // ------ Add Players -------

//     enemy1.sprite.body.velocity.setTo(100, 5);
//     console.log(enemy1.sprite.body.velocity)

    const playerList = [
      { xCoord: 200, yCoord: 200 },
      { xCoord: 500, yCoord: 200 },
      { xCoord: 800, yCoord: 200 },
      { xCoord: 1100, yCoord: 200 },
    ];

    if (localPlayerNum){
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

    // ------ Add HitBoxes -------

  hitBoxR = gameManager.localPlayer.sprite.addChild(gameManager.game.make.sprite(150, -50, 'hitBoxT'));
  hitBoxL = gameManager.localPlayer.sprite.addChild(gameManager.game.make.sprite(-150, -50, 'hitBoxT'));
  gameManager.game.physics.arcade.enable([hitBoxR, hitBoxL], true);
  //hitBoxR.body.setSize(68, 166, slayer.sprite.width / 6 - 50, 0);
  //hitBoxL.body.setSize(68, 166, -(slayer.sprite.width / 6), 0);
  hitBoxR.body.setSize(68, 166, gameManager.localPlayer.sprite.width / 6 - 50, 0);
  hitBoxL.body.setSize(68, 166, -(gameManager.localPlayer.sprite.width / 6), 0);
  const assignHitBoxProperties = (hitBox, name) => {
    hitBox.name = name;
    hitBox.damage = 50;
    hitBox.knockbackDirection = 0.5;  // TODO: should not be a constant
    hitBox.knockbackAmt = 600;
  };
  assignHitBoxProperties(hitBoxR, 'hitBoxR');
  assignHitBoxProperties(hitBoxL, 'hitBoxL');



    // ------ Set Collisions -------


  }


  // ------ Update -------
  function update(){

//     // adding smashbot collisions
//     //gameManager.game.physics.arcade.overlap(slayer.sprite, enemy1.sprite, overlapCallback); // default. change to collide when player attacks.
//     gameManager.game.physics.arcade.collide(slayer.sprite, enemy1.sprite, collideCallback);
//     gameManager.game.physics.arcade.collide(slayer.sprite, enemy2.sprite, collideCallback);
//     gameManager.game.physics.arcade.collide(slayer.sprite, enemy3.sprite, collideCallback);
//     gameManager.game.physics.arcade.collide(slayer.sprite, enemy3.sprite, collideCallback);

//     gameManager.game.physics.arcade.overlap(hitBoxR, enemy1.sprite,
//     overlapCallbackHit);
//     gameManager.game.physics.arcade.overlap(hitBoxR, enemy2.sprite,
//     overlapCallbackHit);
//     gameManager.game.physics.arcade.overlap(hitBoxR, enemy3.sprite, overlapCallbackHit);
//     gameManager.game.physics.arcade.overlap(hitBoxL, enemy1.sprite,
//     overlapCallbackHit);
//     gameManager.game.physics.arcade.overlap(hitBoxL, enemy2.sprite,
//     overlapCallbackHit);
//     gameManager.game.physics.arcade.overlap(hitBoxL, enemy3.sprite, overlapCallbackHit);

    // manage collisions
    const players = [];
    localPlayerNum && players.push('localPlayer');
    remotePlayerNums.forEach(playerNum => players.push('remote' + playerNum));
    gameManager.addCollisions(players, 'platform');
    players.forEach(player => gameManager.addCollisions(players, player));

    // gameManager.game.physics.arcade.overlap(gameManager.localPlayer.sprite, gameManager.remote1.sprite, overlapCallback); // default. change to collide when player attacks.

    gameManager.update();

    let arrayLives = [];
    gameManager.inputManagerList.forEach(inputManager => arrayLives.push(inputManager.player.lives));

    let totalLives = arrayLives.reduce((acc, cur) => acc + cur, 0);
    if (totalLives === 1) {
      const winner = gameManager.inputManagerList.filter(inputManager => inputManager.player.lives === 1);
      console.log(winner[0].player.playerNumber);
      gameManager.endGame();
    }
    console.log(totalLives);

    // handle position changes
    const localPlayerState = localPlayerNum  ? {
      xCoord: gameManager.localPlayer.sprite.position.x,
      yCoord: gameManager.localPlayer.sprite.position.y,
      number: gameManager.localPlayer.playerNumber
    } :
    {};
    // TODO: update remote player damage if collision occurs
    const remotePlayersState = {};

    // throttle(() => {
      store.dispatch(updateLocalState(localPlayerState, remotePlayersState));
      emitPlayerStateChanges(store.getState().game.playerStateChanges);
      const remotePlayerState = store.getState().game.remotePlayers;
      remotePlayerNums.forEach(playerNum => {
        const { xCoord, yCoord } = remotePlayerState[playerNum];
        gameManager['remote' + playerNum].sprite.position.set(xCoord, yCoord);
      });
    // }, 15);


    // if player is hit, player flies off screen:
    // flyOffScreenIfIt() // TODO: connect with store.

    // if player has enough health, player will stop flying.
    const localPlayer = gameManager.localPlayer;
    //stopFlying(localPlayer.health);

    // explode player (once offscreen) if it was their finalHit and final life.
    // if (localPlayer.finalHit === true && localPlayer.lives === 1) {
    if (localPlayer.finalHit === true) {
      localPlayer.checkWorldBounds = true;
      localPlayer.events.onOutOfBounds.add(explodePlayer);
    }

  }

  function collideCallback(){
    //console.log('collided');
  }
  function overlapCallbackHit(hitBox, enemy){
    console.log('overlap')
    if (enemy.isFlying) return;
    enemy.isFlying = true;
    let randomY = Math.random() * 200 - 100;
    if (hitBox.name === 'hitBoxR') {
      setVelocity(enemy, 100, randomY);
    } else {
      setVelocity(enemy, -100, randomY);
    }
  }
  // function isFirstHit(hitBox, enemy){

  // }

  function setVelocity(enemy, x, y){
    enemy.body.gravity.y = 0;
    console.log(enemy.body.velocity)
    enemy.body.velocity.setTo(x, y);
    console.log(enemy.body.velocity)
  }

  function overlapCallback(){
    //console.log('overlapped');
  }



  function flyOffScreenIfHit() {
    const player = gameManager.localPlayer.sprite;
    //const hitTrue = store.getState().game.localPlayer.hit; // pseudo code
    let hitTrue = true; // TODO connect to store.
    let flyRightTrue = false;
    let finalHit = true;
    gameManager.localPlayer.finalHit = true;
    if (hitTrue) {
      player.body.gravity.y = 0;
      if (flyRightTrue) {
        player.body.velocity.setTo(200, -200);
      } else {
        player.body.velocity.setTo(-200, -200);
      }
      player.animations.play('fly');
      //stopFlying('3');
    }
  }

  function regainGravity() {
    const player = gameManager.localPlayer.sprite;
    player.body.velocity.setTo(0, 0);
    player.body.gravity.y = 500;
  }

  function stopFlying(health) {
    console.log('HITTTTTTT')
    let flyRightTrue = false;
    //let angle = flyRightTrue ? 90 : 270;
    const player = gameManager.localPlayer.sprite;
    // let health = ____;
    player.body.onMoveComplete.add(regainGravity);
    switch(health){
      case '3':
      player.body.moveTo(1000, 50);
      console.log('MEEEEEEEE')
        break;
      case '2':
      player.body.moveTo(1000, 150);
        break;
      case '1':
      player.body.moveTo(1000, 250);
        break;
      case '0':
        break;
    }
  }

  function explodePlayer() {
    const position = gameManager.localPlayer.getPosition();
    const explodingSmashbot = gameManager.game.add.sprite(position.x, position.y,'explodingSmashbot');
    explodingSmashbot.animations.add('explode', [0, 1, 2, 3]);
    explodingSmashbot.animations.play('explode', 5, false, true);
  }


  // ------ Render -------
  function render() {

    // gameManager.game.debug.bodyInfo(slayer.sprite, 100, 100);
    // gameManager.game.debug.body(slayer.sprite);
    // gameManager.game.debug.body(hitBoxR);
    // gameManager.game.debug.body(hitBoxL);

    // gameManager.game.debug.body(enemy1.sprite);
    // gameManager.game.debug.body(enemy2.sprite);
    // gameManager.game.debug.body(enemy3.sprite);

  }

  setTimeout(flyOffScreenIfHit, 3000);
  //const testMove = () => stopFlying('3');
  //setTimeout(testMove, 3000);
}
