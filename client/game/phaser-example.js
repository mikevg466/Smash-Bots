import { LocalPlayer, RemotePlayer, InputManager } from './SpriteObjects';
import { Preload, Create } from './GameStateMethods';
import store from '../store';

// let game
export function runGame() {

  // ------ Init Game -------
  var game = new Phaser.Game(
    window.innerWidth,
    window.innerHeight,
    Phaser.CANVAS,
    'phaser-example',
    {preload, create, update}
  );
  const inputManager = new InputManager(game);
  let weapon,
    sayer,
    jumpTimer,
    jumpButton,
    secondJumpButton,
    yAxis,
    fireButton,
    slayer,
    enemy1,
    enemy2,
    enemy3,
    platform


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
      // smashbot: {
      //   png: 'ourAssets/smashbot/basic_movement_no_weapon_final.png',
      //   json:'ourAssets/smashbot/basic_movement_no_weapon_final.json'
      // }
      smashbot: {
        png: 'ourAssets/smashbot/robot_hammer_swing.png',
        json:'ourAssets/smashbot/robot_hammer_swing.json'
      }
    };
    // const physics = {
    //   physicsData: 'ourAssets/smashbot/physics_data_smashbot.json'
    // }

    const PreLoadObj = new Preload(game);
    PreLoadObj.loadImages(images);
    PreLoadObj.loadAtlasJSONArrays(atlasJSONs);
    //PreLoadObj.loadPhysics(physics);
  }




  // ------ Create -------
  function create() {
    // ------ Initialize -------
    const CreateObj = new Create(game, 'background');

    // ------ Add Players -------
    enemy1 = new RemotePlayer(game, 'smashbot', 300, 200);
    enemy2 = new RemotePlayer(game, 'smashbot', 450, 200);
    enemy3 = new RemotePlayer(game, 'smashbot', 600, 200);
    slayer = new LocalPlayer(game, 'smashbot', 150, 200);

    // ------ Set Inputs -------
    inputManager.init(slayer);

    // ------ Add Weapon -------
    weapon = game.add.weapon(2000, 'bullet')
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletAngleOffset = 0;
    weapon.bulletSpeed = 2000;
    weapon.fireRate = 60;
    weapon.bulletAngleVariance = 20;
    weapon.trackSprite(slayer.sprite, 0, 0, true);

    //sayer = game.add.sprite(100, 100, 'smashbot');
    // sayer.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 60, true);
    // sayer.animations.add('turn', [14], 20, true);
    // sayer.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 60, true);
    // game.physics.arcade.enable(sayer);
    // sayer.body.fixedRotation = true;
    // sayer.body.damping = 0.5;

    // ------ Add Platforms -------
    platform = game.add.sprite(500, 650, 'platform');
    game.physics.arcade.enable(platform);
    platform.body.allowGravity = false;
    platform.body.immovable = true;
    platform.scale.setTo(2, 1.2);
    platform.anchor.setTo(0.5, 0.5);


    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    secondJumpButton = game.input.keyboard.addKey(Phaser.Keyboard.F);

  }


  // ------ Update -------
  function update(){
    // make a method:
    game.physics.arcade.collide(slayer.sprite, platform, collideCallback); // optional: add callback
    game.physics.arcade.collide(enemy1.sprite, platform, collideCallback);
    game.physics.arcade.collide(enemy2.sprite, platform, collideCallback);
    game.physics.arcade.collide(enemy3.sprite, platform, collideCallback);
    game.physics.arcade.overlap(slayer.sprite, enemy1.sprite, overlapCallback); // default. change to collide when player attacks.
    // game.physics.arcade.collide(player, enemy1, emitHit);

      inputManager.update();
      // slayer1.update();
      if (fireButton.isDown) {
          weapon.fire();
      }
  }
  function collideCallback(){
    // console.log('collided');
  }
    function overlapCallback(){
     //console.log('overlapped');
  }
 }
