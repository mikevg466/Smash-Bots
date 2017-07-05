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
    // gameManager.game.physics.arcade.overlap(hitBoxR, enemy2.sprite,
    // overlapCallbackHit);
    // gameManager.game.physics.arcade.overlap(hitBoxR, enemy3.sprite, overlapCallbackHit);
    
    // gameManager.game.physics.arcade.overlap(hitBoxL, enemy2.sprite,
    // overlapCallbackHit);
    // gameManager.game.physics.arcade.overlap(hitBoxL, enemy3.sprite, overlapCallbackHit);

    // manage collisions
    const players = [];
    localPlayerNum && players.push('localPlayer');
    remotePlayerNums.forEach(playerNum => players.push('remote' + playerNum))
    gameManager.addCollisions(players, 'platform');
    players.forEach(player => gameManager.addCollisions(players, player));

    // gameManager.game.physics.arcade.overlap(gameManager.localPlayer.sprite, gameManager.remote1.sprite, overlapCallback); // default. change to collide when player attacks.

    gameManager.update();

    let arrayLives = [];
    gameManager.inputManagerList.forEach(inputManager => arrayLives.push(inputManager.player.lives))

    let totalLives = arrayLives.reduce((acc, cur) => acc + cur, 0)
    if (totalLives === 1) {
      var winner = gameManager.inputManagerList.filter(inputManager => inputManager.player.lives === 1);
      console.log(winner[0].player.playerNumber);
      gameManager.endGame();
    }
    console.log(totalLives)

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
        const { xCoord, yCoord } = remotePlayerState[playerNum]
        gameManager['remote' + playerNum].sprite.position.set(xCoord, yCoord);
      });
    // }, 15);
  
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
    console.log("hi", hitbox) 
  })
  }
  }

  function collideCallback(){
    // console.log('collided');
  }

  //sends enemy flying
  function overlapCallbackHit(hitBox, enemy){
    console.log('overlap')
    enemy.isHit = true;
    enemy.body.velocity.x = -5000;
  }
    //   disableAllHitboxes();
    // enableHitbox();
    // console.log(enemy);
    // enemy.isHit = false;
    // console.log(enemy);
    // if (enemy.isFlying) return;
    // enemy.isFlying = true;
    // let randomY = Math.random() * 200 - 100;
    // enemy.body.moves = true;
    // if (hitBox.name === 'hitBoxR') {
    //   setVelocity(enemy, 100, randomY);
    // } else {
    //   setVelocity(enemy, -100, randomY);
    // }
  // }

  // function isFirstHit(hitBox, enemy){

  // }

  function setVelocity(enemy, x, y){
    console.log(enemy.body.velocity)
    enemy.body.velocity.setTo(x, y);
    console.log(enemy.body.velocity)
  }

  function overlapCallback(){
    //console.log('overlapped');
  }
  // function disableAllHitboxes() {
  //   console.log(gameManager)
  //   gameManager.localPlayer.sprite.children.forEach(function(hitbox) {          
  //     hitbox.kill();     
  //   });}
  // disableAllHitboxes();
  

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
}
// }
