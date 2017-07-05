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
    remotePlayerNums.forEach(playerNum => players.push('remote' + playerNum));
    gameManager.addCollisions(players, 'platform');
    players.forEach(player => gameManager.addCollisions(players, player));

    // gameManager.game.physics.arcade.overlap(gameManager.localPlayer.sprite, gameManager.remote1.sprite, overlapCallback); // default. change to collide when player attacks.

    gameManager.update(store.getState().game);

    //ENDING THE GAME
    let arrayLives = [];
    gameManager.inputManagerList.forEach(inputManager => arrayLives.push(inputManager.player.lives));

    let totalLives = arrayLives.reduce((acc, cur) => acc + cur, 0);
    if (totalLives === 1) {
      const winner = gameManager.inputManagerList.filter(inputManager => inputManager.player.lives === 1);
      console.log(winner[0].player.playerNumber);
      gameManager.endGame();
    }

    console.log(totalLives);

    // throttle(() => {
      // handle position changes
      const localPlayerState = localPlayerNum  ? {
        xCoord: gameManager.localPlayer.sprite.position.x,
        yCoord: gameManager.localPlayer.sprite.position.y,
        number: gameManager.localPlayer.playerNumber,
        animation: gameManager.localPlayer.animation,
      } :
      {};
      // TODO: update remote player damage if collision occurs
      const remotePlayersState = {};


      store.dispatch(updateLocalState(localPlayerState, remotePlayersState));
      //emit to server
      emitPlayerStateChanges(store.getState().game.playerStateChanges);
      // ^^^^^^^^^^ from Player -> Server
      // =========================================================================
      // then we expect to have the changes to remote players here:
      const remotePlayerState = store.getState().game.remotePlayers;
      // ^^^^^^^^^^ from Server -> Player
      remotePlayerNums.forEach(playerNum => {
        const { xCoord, yCoord } = remotePlayerState[playerNum];
        gameManager['remote' + playerNum].sprite.position.set(xCoord, yCoord);
      });
    // }, 15);

    // if player is hit, player flies off screen:
    // flyWhenHit() // TODO: connect with store.

    //Sets up overlap hitboxes
    if (gameManager.remote1) {
    gameManager.game.physics.arcade.overlap(hitBoxR, gameManager.remote1.sprite, overlapCallbackHit);
    gameManager.game.physics.arcade.overlap(hitBoxL, gameManager.remote1.sprite, overlapCallbackHit);
    }
    if (gameManager.remote2) {
    gameManager.game.physics.arcade.overlap(hitBoxR, gameManager.remote2.sprite, overlapCallbackHit);
    gameManager.game.physics.arcade.overlap(hitBoxL, gameManager.remote2.sprite, overlapCallbackHit);
    }
    if (gameManager.remote3) {
    gameManager.game.physics.arcade.overlap(hitBoxR, gameManager.remote3.sprite, overlapCallbackHit);
    gameManager.game.physics.arcade.overlap(hitBoxL, gameManager.remote3.sprite, overlapCallbackHit);
    }
    if (gameManager.remote4) {
    gameManager.game.physics.arcade.overlap(hitBoxL, gameManager.remote4.sprite, overlapCallbackHit);
    gameManager.game.physics.arcade.overlap(hitBoxL, gameManager.remote4.sprite, overlapCallbackHit);
    }

    //disables hitboxes if theyre active, so theyll immediately be disabled after a swing
    if (gameManager.localPlayer.sprite.children[0].alive) {
      gameManager.localPlayer.sprite.children.forEach(function(hitbox) {        
        hitbox.kill(); 
      })
    }
  }

  function collideCallback(){
    // console.log('collided');
  }

  //sends enemy flying
  function overlapCallbackHit(hitBox, enemy){
    console.log('overlap')

    enemy.isHit = true
    enemy.body.velocity.x = -5000;
    if  (hitBox.name === "hitBoxR" && gameManager.localPlayer.direction === 'right') {
      enemy.flyRight = true
      enemy.body.velocity.x = 5000;
    }
    if  (hitBox.name === "hitBoxL" && gameManager.localPlayer.direction === 'left') {
      enemy.flyRight = false
      enemy.body.velocity.x = -5000;
      }
  }

  function regainControl() {
    const player = gameManager.localPlayer;
    if (player.lives === 0 && player.health === 0) {
      player.explodePlayer();
    } else {
      player.sprite.body.velocity.setTo(0, 0);
      player.setGravity(500);
      gameManager.game.input.enabled = true;
    }
  }

  function flyWhenHit() {
    const player = gameManager.localPlayer;
    //const hitTrue = store.getState().game.localPlayer.hit; // pseudo code
    let hitTrue = true; // TODO connect to store.
    let flyRightTrue = false;
    //player.lives = 0;
    player.health = 3;
    if (hitTrue) {
      const flyAngle = flyRightTrue ? 680 : 600;
      const vectorX = flyRightTrue ? 200 : -200;
      player.sprite.animations.play('fly');
      player.setGravity(0);
      gameManager.game.input.enabled = false;
      player.sprite.body.onMoveComplete.add(regainControl, this);
      switch(player.health){
        case 3:
          player.sprite.body.moveTo(1000, 200, flyAngle);
          break;
        case 2:
          player.sprite.body.moveTo(1000, 300, flyAngle);
          break;
        case 1:
          player.sprite.body.moveTo(1000, 400, flyAngle);
          break;
        default:
          if (player.lives === 0) {
            player.sprite.body.moveTo(1000, 300, flyAngle);
          } else {
            player.sprite.body.velocity.setTo(vectorX, -200);
          }
      }
    }
  }


  // ------ Render -------
  function render() {

    gameManager.game.debug.bodyInfo(gameManager.localPlayer.sprite, 100, 100);
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
