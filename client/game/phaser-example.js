import { LocalPlayer, RemotePlayer } from './SpriteObjects';
import GameManager from './GameObjects/GameManager';
import store from '../store';

let slayer,
  enemy1,
  enemy2,
  enemy3,
  platform,
  hitBoxes,
  hitBox1;

export function runGame() {

  // ------ Init Game -------
  var gameManager = new GameManager(
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
      hitBox: 'ourAssets',
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
    enemy1 = gameManager.addSprite('enemy1', RemotePlayer, 'smashbot', 450, 200);
    enemy2 = gameManager.addSprite('enemy2', RemotePlayer, 'smashbot', 750, 200);
    enemy3 = gameManager.addSprite('enemy3', RemotePlayer, 'smashbot', 1050, 200);
    slayer = gameManager.addSprite('slayer', LocalPlayer, 'smashbot', 150, 200);

    // ------ Add Platforms -------
    // TODO: separate out platforms as it's own class and call through gameManager.addSprite
    platform = gameManager.game.add.sprite(500, 650, 'platform');
    gameManager.game.physics.arcade.enable(platform);
    platform.body.immovable = true;
    platform.scale.setTo(2, 1.2);
    platform.anchor.setTo(0.5, 0.5);

    // ------ Add HitBoxes -------
    // make the player
    // create a group for all the player’s hitboxes
    hitBoxes = gameManager.game.add.group();
    // give all the hitboxes a physics body (using arcade physics)
    hitBoxes.enableBody = true;
    // make the hitboxes children of the player. They will now move with the player
    slayer.sprite.addChild(hitBoxes);
    // create a “hitbox” (really just an empty sprite with a physics body)
    hitBox1 = hitBoxes.create(0, 0, null); // 'hitBox'
    // set the size of the hitbox, and its position relative to the player
    hitBox1.body.setSize(50, 50, slayer.sprite.width, slayer.sprite.height / 2);
    // add some properties to the hitbox. These can be accessed later for use in calculations
    hitBox1.name = 'punch';
    hitBox1.damage = 50;
    hitBox1.knockbackDirection = 0.5;
    hitBox1.knockbackAmt = 600;
    console.log('slayer', hitBox1);

    // ------ Set Collisions -------


  }


  // ------ Update -------
  function update(){
    // make a method:
    gameManager.game.physics.arcade.collide(slayer.sprite, platform, collideCallback); // optional: add callback
    gameManager.game.physics.arcade.collide(enemy1.sprite, platform, collideCallback);
    gameManager.game.physics.arcade.collide(enemy2.sprite, platform, collideCallback);
    gameManager.game.physics.arcade.collide(enemy3.sprite, platform, collideCallback);
    gameManager.game.physics.arcade.overlap(slayer.sprite, enemy1.sprite, overlapCallback); // default. change to collide when player attacks.

    gameManager.update();
  }
  function collideCallback(){
    // console.log('collided');
  }
  function overlapCallback(){
    //console.log('overlapped');
  }
  // activate a hitbox by name
  function enableHitBox(hitBoxName) {
    // search all the hitboxes
    for (var i = 0; i < hitBoxes.children.length; i++){
    // if we find the hitbox with the “name” specified
      if (hitBoxes.children[i].name === hitBoxName){
        hitBoxes.children[i].reset(0,0);  // reset it
      }
    }
  }
  // disable all active hitboxes
  function disableAllHitBoxes() {
    hitBoxes.forEachExists(function(hitBox) {
      hitBox.kill();
    });
  }

  // ------ Render -------
  function render() {

    //game.debug.bodyInfo(slayer.sprite);
    gameManager.game.debug.body(slayer.sprite);
    //gameManager.game.debug.body(hitBox1);
    // game.debug.body(sprite2);
    // game.debug.bodyInfo(weapon.sprite);
    // game.debug.body(weapon.sprite)

  }
}
