import { LocalPlayer, RemotePlayer, Platform } from './SpriteObjects';
import GameManager from './GameObjects/GameManager';
import { updateLocalState, setWinner } from '../redux/game';
import { emitPlayerStateChanges } from '../sockets/client';
import store from '../store';

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
    this.atlasJSONs = {
      smashbotHammer: {
        png: 'ourAssets/smashbot/robot_hammer_swing.png',
        json: 'ourAssets/smashbot/robot_hammer_swing.json'
      },
      smashbotSword: {
        png: 'ourAssets/smashbot/robot_sword_swing.png',
        json: 'ourAssets/smashbot/robot_sword_swing.json'
      },
      smashbotLightsaber: {
        png: 'ourAssets/smashbot/robot_lightsaber_swing.png',
        json: 'ourAssets/smashbot/robot_lightsaber_swing.json' 
      },
      smashbotFlyswatter: {
        png: 'ourAssets/smashbot/robot_flyswatter_swing.png',
        json: 'ourAssets/smashbot/robot_flyswatter_swing.json' 
      },
      explodingSmashbot: {
        png: 'ourAssets/smashbot/robot_explosion_short.png',
        json: 'ourAssets/smashbot/robot_explosion_short.json'
      }
    };

    gameManager.preload(images, this.atlasJSONs);
  }


  // ------ Create -------
  function create() {
    // ------ Initialize -------
    console.log(store.getState(), "<<<<<<<<<<+++++++++++++++++++++++==============")

    gameManager.create('background');

    // ------ Add Players -------
    const playerList = [
      { xCoord: 200, yCoord: 200 },
      { xCoord: 500, yCoord: 400 },
      { xCoord: 800, yCoord: 400 },
      { xCoord: 1100, yCoord: 200 },
    ];

    const storeState = store.getState();

    if (localPlayerNum){
      const { xCoord, yCoord } = playerList[localPlayerNum - 1];
      // TODO: Hard Coding Four weapons for now, but this can be modularized later 
      //        for adding more weapons:
      let weaponSprite;
      switch(storeState.game.localPlayer.clientWeapon.id){
        case 2:
          weaponSprite = 'smashbotSword';
          break;
        
        case 3:
          weaponSprite = 'smashbotLightsaber';
          break;

        case 4:
          weaponSprite = 'smashbotFlyswatter';
          break;

        default:
          weaponSprite = 'smashbotHammer';
          break;
      }

      gameManager.addPlayer('localPlayer', LocalPlayer, weaponSprite, xCoord, yCoord, localPlayerNum);
    }
    remotePlayerNums
      .forEach(playerNum => {
        const { xCoord, yCoord } = playerList[playerNum - 1];
      // TODO: Hard Coding Four weapons for now, but this can be modularized later: =>
      let weaponSprite;
      switch(storeState.game.remotePlayers[playerNum].clientWeapon.id){
        case 2:
          weaponSprite = 'smashbotSword';
          break;
        
        case 3:
          weaponSprite = 'smashbotLightsaber';
          break;

        case 4:
          weaponSprite = 'smashbotFlyswatter';
          break;

        default:
          weaponSprite = 'smashbotHammer';
          break;
      }

        gameManager.addPlayer(`remote${playerNum}`, RemotePlayer, weaponSprite, xCoord, yCoord, playerNum);
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
  }


  // ------ Update -------
  function update(){
    // manage collisions/ local player and platforms:
    const players = [];
    localPlayerNum && players.push('localPlayer');
    remotePlayerNums.forEach(playerNum => players.push(`remote${playerNum}`));
    const localPlayerList = [];
    localPlayerNum && localPlayerList.push('localPlayer');

    gameManager.addCollisions(localPlayerList, 'platformMain');
    gameManager.addCollisions(localPlayerList, 'platformSmall1');
    gameManager.addCollisions(localPlayerList, 'platformSmall2');
    gameManager.addCollisions(localPlayerList, 'platformSmall3');

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
    console.log('damage', damage);
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
        player.sprite.body.velocity.setTo(vectorX, -1000);
        setTimeout(() => player.regainControl(), 200);
        // player.sprite.body.moveTo(200, 200, flyAngle);
        break;
      case 2:
        player.sprite.body.velocity.setTo(vectorX, -1000);
        setTimeout(() => player.regainControl(), 400);
        // player.sprite.body.moveTo(200, 300, flyAngle);
        break;
      case 1:
        player.sprite.body.velocity.setTo(vectorX, -1000);
        setTimeout(() => player.regainControl(), 600);
        // player.sprite.body.moveTo(200, 400, flyAngle);
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
    gameManager.game.debug.body(hitBoxR);
    gameManager.game.debug.body(hitBoxL);
  }

  // function winAnimation() {
  //   const p1 = new Player(gameManager.game, 'smashbot', 200, 200);
  //   p1.play('move');
  // }

}
