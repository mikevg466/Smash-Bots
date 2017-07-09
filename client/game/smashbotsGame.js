import { LocalPlayer, RemotePlayer, Platform } from './SpriteObjects';
import GameManager from './GameObjects/GameManager';
import { updateLocalState, setWinner } from '../redux/game';
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
    'smashbotsGame',
    {preload, create, update, render}
  );

  let totalLives;
  let gameText;

  // ------ PreLoad -------
  function preload() {
    const images = {
      chick: 'assets/sprites/budbrain_chick.png',
      atari: 'assets/sprites/block.png',
      // background: 'assets/games/starstruck/background2.png',
      background: 'assets/pics/TheEnd_by_Iloe_and_Made.jpg',
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
    gameManager.game.load.audio('boden', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg');

    gameManager.preload(images, atlasJSONs);
  }


  // ------ Create -------
  function create() {
    // ------ Initialize -------
    gameManager.create('background');

    const music = gameManager.game.add.audio('boden');

    music.play();
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
        gameManager.addPlayer(`remote${playerNum}`, RemotePlayer, 'smashbot', xCoord, yCoord, playerNum);
      });


    // ------ Add Platforms -------
    // parameters are (platformName, ObjType, spriteName, xCoord, yCoord, xScale, yScale)
    gameManager.addSprite('platformMain', Platform, 'platform', 650, 700, 1.5, 1.2);
    gameManager.addSprite('platformSmall1', Platform, 'platform', 150, 500, 0.35, 0.4);
    gameManager.addSprite('platformSmall2', Platform, 'platform', 575, 200, 0.5, 0.4);
    gameManager.addSprite('platformSmall3', Platform, 'platform', 1200, 475, 0.7, 0.4);


    // ------ Add HitBoxes -------

  hitBoxR = gameManager.localPlayer.sprite.addChild(gameManager.game.make.sprite(50, -25, 'hitBoxT'));
  hitBoxL = gameManager.localPlayer.sprite.addChild(gameManager.game.make.sprite(-40, -25, 'hitBoxT'));
  gameManager.game.physics.arcade.enable([hitBoxR, hitBoxL], true);
  //hitBoxR.body.setSize(68, 166, slayer.sprite.width / 6 - 50, 0);
  //hitBoxL.body.setSize(68, 166, -(slayer.sprite.width / 6), 0);
  hitBoxR.body.setSize(34, 83, gameManager.localPlayer.sprite.width / 6 - 50, 0);
  hitBoxL.body.setSize(34, 83, -(gameManager.localPlayer.sprite.width / 6), 0);
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
  // function enableHitbox(hitboxName){
  //   function enableHitbox(hitboxName){
  //   // search all the hitboxes
  //   for (var i = 0; i < gameManager.localPlayer.sprite.children.length; i++){
  //     // if we find the hitbox with the “name” specified
  //     // if(gameManager.localPlayer.sprite.children[i].name === hitboxName){
  //       // reset it
  //       gameManager.localPlayer.sprite.children[i].reset(0,0);
  //     // }
  //   }
  // }
  // disable all active hitboxesfunction




  // ------ Update -------
  function update(){
//     // adding smashbot collisions
//     //gameManager.game.physics.arcade.overlap(slayer.sprite, enemy1.sprite, overlapCallback); // default. change to collide when player attacks.
//     gameManager.game.physics.arcade.collide(slayer.sprite, enemy1.sprite, collideCallback);
//     gameManager.game.physics.arcade.collide(slayer.sprite, enemy2.sprite, collideCallback);
//     gameManager.game.physics.arcade.collide(slayer.sprite, enemy3.sprite, collideCallback);
//     gameManager.game.physics.arcade.collide(slayer.sprite, enemy3.sprite, collideCallback);
    // gameManager.game.physics.arcade.overlap(hitBoxR, enemy2.sprite,
    // overlapCallbackHit);
    // gameManager.game.physics.arcade.overlap(hitBoxR, enemy3.sprite, overlapCallbackHit);

    // gameManager.game.physics.arcade.overlap(hitBoxL, enemy2.sprite,
    // overlapCallbackHit);
    // gameManager.game.physics.arcade.overlap(hitBoxL, enemy3.sprite, overlapCallbackHit);

    // gameManager.game.physics.arcade.overlap(hitBoxR, gameManager.remote1.sprite,
    // overlapCallbackHit);
//     gameManager.game.physics.arcade.overlap(hitBoxR, enemy2.sprite,
//     overlapCallbackHit);
//     gameManager.game.physics.arcade.overlap(hitBoxR, enemy3.sprite, overlapCallbackHit);
//     gameManager.game.physics.arcade.overlap(hitBoxL, enemy1.sprite,
//     overlapCallbackHit);
//     gameManager.game.physics.arcade.overlap(hitBoxL, enemy2.sprite,
//     overlapCallbackHit);
//     gameManager.game.physics.arcade.overlap(hitBoxL, enemy3.sprite, overlapCallbackHit);

    // manage collisions/ IF people bump into each other or platform:
    const players = [];
    localPlayerNum && players.push('localPlayer');

    remotePlayerNums.forEach(playerNum => players.push(`remote${playerNum}`));
    gameManager.addCollisions(players, 'platformMain');
    gameManager.addCollisions(players, 'platformSmall1');
    gameManager.addCollisions(players, 'platformSmall2');
    gameManager.addCollisions(players, 'platformSmall3');
    players.forEach(player => gameManager.addCollisions(players, player));

    // gameManager.game.physics.arcade.overlap(gameManager.localPlayer.sprite, gameManager.remote1.sprite, overlapCallback); // default. change to collide when player attacks.

    gameManager.update(store.getState().game);

    //ENDING THE GAME
    if (store.getState().game.activePlayers <= 1) {
      let winner = '';
      players.forEach(player => {
        if(gameManager[player].lives) winner = `Player ${gameManager[player].playerNumber}`;
      });
      console.log(`${winner} Wins!`);
      store.dispatch(setWinner(winner));
      gameManager.endGame();
    }

    // throttle(() => {
      // handle position changes
      const localPlayerState = localPlayerNum  ? {
        xCoord: gameManager.localPlayer.sprite.position.x,
        yCoord: gameManager.localPlayer.sprite.position.y,
        number: gameManager.localPlayer.playerNumber,
        animation: gameManager.localPlayer.animation,
        lives: gameManager.localPlayer.lives,
      } :
      {};

      // Remote Player Collisions
      remotePlayerNums.forEach(playerNumber => {
        gameManager.game.physics.arcade.overlap(hitBoxR, gameManager[`remote${playerNumber}`].sprite, overlapCallbackHit);
        gameManager.game.physics.arcade.overlap(hitBoxL, gameManager[`remote${playerNumber}`].sprite, overlapCallbackHit);
      });

      const origRemoteState = store.getState().game.remotePlayers;
      const remotePlayersState = {};
      remotePlayerNums.forEach(playerNumber => {
        // if(gameManager[`remote${playerNumber}`].sprite.isHit && !origRemoteState[playerNumber].isHit){
        if(gameManager[`remote${playerNumber}`].sprite.isHit){
          remotePlayersState[playerNumber] = {
            isHit: gameManager[`remote${playerNumber}`].sprite.isHit,
            flyRight: gameManager[`remote${playerNumber}`].sprite.flyRight,
            damage: origRemoteState[playerNumber].damage - 1
          };
          gameManager[`remote${playerNumber}`].sprite.isHit = false
        }
      });
      //disables hitboxes if theyre active, so theyll immediately be disabled after a swing
      if (gameManager.localPlayer.sprite.children[0].alive)
        gameManager.localPlayer.sprite.children.forEach(hitbox => hitbox.kill());


      store.dispatch(updateLocalState(localPlayerState, remotePlayersState));
      //emit to server
      emitPlayerStateChanges(store.getState().game.playerStateChanges);
      const { localPlayer, remotePlayers } = store.getState().game;
      if(localPlayer.isHit){
        flyWhenHit(localPlayer.flyRight, localPlayer.damage);
      }
      remotePlayerNums.forEach(playerNum => {
        const { xCoord, yCoord } = remotePlayers[playerNum];
        gameManager[`remote${playerNum}`].sprite.position.set(xCoord, yCoord);
      });
    //  }, 33);

    // if player is hit, player flies off screen:
    // flyWhenHit() // TODO: connect with store.

    //Sets up overlap hitboxes
  }

  function collideCallback(){
    // console.log('collided');
  }

  //sends enemy flying
  function overlapCallbackHit(hitBox, enemy){
    enemy.isHit = true
    if  (hitBox.name === "hitBoxR") {
      enemy.flyRight = true
    }
    if  (hitBox.name === "hitBoxL") {
      enemy.flyRight = false
      }
  }

  function regainControl() {
    const player = gameManager.localPlayer;
    if (player.lives === 0 && player.damage === 0) {
      player.explodePlayer();
    } else {
      player.sprite.body.velocity.setTo(0, 0);
      player.setGravity(1200);
      gameManager.game.input.enabled = true;
    }
  }

  function flyWhenHit(flyRightTrue, damage) {
    const player = gameManager.localPlayer;
    player.damage = damage;
    const flyAngle = flyRightTrue ? 680 : 600;
    const vectorX = flyRightTrue ? 200 : -200;
    player.sprite.animations.play('fly');
    player.setGravity(0);
    gameManager.game.input.enabled = false;
    player.sprite.body.onMoveComplete.add(regainControl, this);
    switch(damage){
      case 3:
        player.sprite.body.moveTo(200, 200, flyAngle);
        break;
      case 2:
        player.sprite.body.moveTo(200, 300, flyAngle);
        break;
      case 1:
        player.sprite.body.moveTo(200, 400, flyAngle);
        break;
      default:
        if (player.lives === 0) {
          player.sprite.body.moveTo(200, 300, flyAngle);
        } else {
          player.sprite.body.velocity.setTo(vectorX, -1000);
          // player.sprite.body.moveTo(200, 2000, flyAngle)
        }
    }

    emitPlayerStateChanges({
      [player.playerNumber]: {
        isHit: false,
        flyRight: false,
      }
    });
  }


  // ------ Render -------
  function render() {

    gameManager.game.debug.bodyInfo(gameManager.localPlayer.sprite, 100, 100);
    gameManager.game.debug.body(gameManager.localPlayer.sprite)
    // gameManager.game.debug.body(slayer.sprite);
    gameManager.game.debug.body(hitBoxR);
    gameManager.game.debug.body(hitBoxL);

    // gameManager.game.debug.body(enemy1.sprite);
    // gameManager.game.debug.body(enemy2.sprite);
    // gameManager.game.debug.body(enemy3.sprite);

  }

// function winAnimation() {
//   const p1 = new Player(gameManager.game, 'smashbot', 200, 200);
//   p1.play('move');
// }


  //setTimeout(flyWhenHit, 3000);
}
