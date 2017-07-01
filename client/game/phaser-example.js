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
    enemy3



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

    const PreLoadObj = new Preload(game);
    PreLoadObj.loadImages(images);
    PreLoadObj.loadAtlasJSONArrays(atlasJSONs);
    PreLoadObj.loadPhysics(physics);
  }




  // ------ Create -------
  function create() {
    // ------ Initialize -------
    const CreateObj = new Create(game, 'background');

    // ------ Add Players -------
    slayer = new LocalPlayer(game, 'smashbot', 500, 200);
    enemy1 = new RemotePlayer(game, 'smashbot', 1000, 200);
    enemy2 = new RemotePlayer(game, 'smashbot', 1500, 200);
    enemy3 = new RemotePlayer(game, 'smashbot', 2000, 200);

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

    // ------ Add Platforms -------
    sayer = game.add.sprite(100, 100, 'smashbot');
    sayer.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 60, true);
    sayer.animations.add('turn', [14], 20, true);
    sayer.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 60, true);
    game.physics.p2.enable(sayer);
    sayer.body.fixedRotation = true;
    sayer.body.damping = 0.5;

    // ------ Set Collisions -------
    var playerCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    slayer.sprite.body.setCollisionGroup(playerCollisionGroup);
    sayer.body.setCollisionGroup(playerCollisionGroup);
    slayer.sprite.body.collides([playerCollisionGroup]);
    sayer.body.collides([playerCollisionGroup]);

    var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
    // var boxMaterial = game.physics.p2.createMaterial('worldMaterial');

    //  4 trues = the 4 faces of the world in left, right, top, bottom order
    game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);


    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    secondJumpButton = game.input.keyboard.addKey(Phaser.Keyboard.F);

  }


  // ------ Update -------
  function update(){


      inputManager.update();
      // slayer1.update();
      if (fireButton.isDown) {
          weapon.fire();
      }



      if (jumpButton.isDown && game.time.now > jumpTimer && checkIfCanJump())
      {
          slayer.sprite.body.moveUp(300);
          jumpTimer = game.time.now + 750;
         //thorHammer.body.moveUp(300);
      }


      if (secondJumpButton.isDown && game.time.now > jumpTimer && checkIfCanJump2())
      {
          sayer.body.moveUp(300);
          jumpTimer = game.time.now + 750;
      }


      function checkIfCanJump() {

          var result = false;

          for (var i=0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
          {
              var c = game.physics.p2.world.narrowphase.contactEquations[i];

              if (c.bodyA === slayer.sprite.body.data || c.bodyB === slayer.sprite.body.data)
              {
                  var d = p2.vec2.dot(c.normalA, yAxis);

                  if (c.bodyA === slayer.sprite.body.data)
                  {
                      d *= -1;
                  }

                  if (d > 0.5)
                  {
                      result = true;
                  }
              }
          }

          return result;

      }

      function checkIfCanJump2() {

          var result = false;
          for (var i=0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
          {
              var c = game.physics.p2.world.narrowphase.contactEquations[i];

              if (c.bodyA === sayer.body.data || c.bodyB === sayer.body.data)
              {
                  var d = p2.vec2.dot(c.normalA, yAxis);

                  if (c.bodyA === sayer.body.data)
                  {
                      d *= -1;
                  }

                  if (d > 0.5)
                  {
                      result = true;
                  }
              }
          }

          return result;
      }

  }

 }
