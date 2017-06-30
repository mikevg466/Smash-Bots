import Slayer from './player'
import InputManager from './InputManager'
import store from '../store'

// let game
 export function runGame() {
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('chick', 'assets/sprites/budbrain_chick.png');
    game.load.atlasJSONArray('smashbot', 'ourAssets/smashbot/basic_movement_no_weapon_final.png', 'ourAssets/smashbot/basic_movement_no_weapon_final.json');
    // game.load.atlasJSONArray('smashbot', 'ourAssets/basic_movement_no_weapon.png', 'ourAssets/basic_movement_no_weapon.json');
    game.load.image('atari', 'assets/sprites/block.png');
    game.load.image('background', 'assets/games/starstruck/background2.png');
    // game.load.spritesheet('dude', 'ourAssets/basic_movement_no_weapon.png', 32, 48);
    game.load.image('bullet', 'assets/sprites/bullet.png');
    game.load.image('weapon', store.getState().game.localPlayer.weaponGraphic)
    game.load.image('thorHammer', 'ourAssets/weapons/hammer_thors.png');
    game.load.physics('physicsData', 'ourAssets/smashbot/physics_data_smashbot.json');


}

var weapon;
var sprite;
var sayer;
var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var secondJumpButton;
var LEFT
var yAxis = p2.vec2.fromValues(0, 1);
var fireButton;
var slayer;
let thorHammer,
    thorHammerPoly,
    attackButton;
var slayer1

function create() {

    const bg = game.add.tileSprite(0, 0, 2000, 600, 'background');

    

    // var bounds = new Phaser.Rectangle(100, 100, 400, 400);
    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);

    game.physics.p2.gravity.y = 350;
    game.physics.p2.world.defaultContactMaterial.friction = 0.3;
    game.physics.p2.world.setGlobalStiffness(1e5);

//     //  Add a smashbot sprite and its animations
//     player = game.add.sprite(200, 200, 'smashbot');
//     //  Enable physics. This creates a default rectangular body.
//     game.physics.p2.enable(player, true);
//     player.body.clearShapes();
//     player.body.loadPolygon('physicsData', 'smashbot000');
//     //player.scale.setTo(0.8);
//     player.anchor.setTo(0.5);
//     player.animations.add('right', [0, 1], 5, true); // arm out
//     player.animations.add('left', [14, 15], 5, true); // arm out
//     //player.animations.add('right', [7, 8, 9], 10, true); // arm in the air
//     //player.animations.add('left', [21, 22, 23], 10, true); // arm in the air
//     //player.animations.add('swingRight', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 60, true);
//     //player.animations.add('swingLeft', [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 60, true);

//     thorHammer = game.add.sprite(280, 203.5, 'thorHammer');
//     //thorHammer = player.addChild(game.make.sprite(280, 203.5, 'thorHammer'));
//     // player.addChild(thorHammer)
//     thorHammer.anchor.setTo(0, 1);
//     //thorHammer.alignIn(player, Phaser.CENTER, -58, -8);
//     thorHammer.alignTo(player, Phaser.TOP_RIGHT, 160, 0);
//     game.physics.p2.enable(thorHammer, true);
//     thorHammer.body.clearShapes();
//     thorHammer.body.loadPolygon('physicsData', 'hammer_thors_all');
//     thorHammer.body.static = true;
    var playerCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();
    
    // var playerCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();
    
    slayer1 = new Slayer(game, 'smashbot', 400, 200);
    var slayer2 = new Slayer(game, 'smashbot', 600, 200);
    var slayer3 = new Slayer(game, 'smashbot', 800, 200);
    slayer = new Slayer(game, 'smashbot', 1000, 200);

    //console.log('create slayer', slayer)
    InputManager.init(this, slayer);
 
    weapon = game.add.weapon(2000, 'bullet')
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletAngleOffset = 0;
    weapon.bulletSpeed = 2000;
    weapon.fireRate = 60;
    weapon.bulletAngleVariance = 20;
    weapon.trackSprite(slayer.sprite, 0, 0, true);

    sayer = game.add.sprite(100, 100, 'smashbot');
    sayer.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 60, true);
    sayer.animations.add('turn', [14], 20, true);
    sayer.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 60, true);

    //  Enable if for physics. This creates a default rectangular body.
    game.physics.p2.enable(sayer);
    
    sayer.body.fixedRotation = true;
    sayer.body.damping = 0.5;

    slayer.sprite.body.setCollisionGroup(playerCollisionGroup);
    sayer.body.setCollisionGroup(playerCollisionGroup);
    slayer.sprite.body.collides([playerCollisionGroup]);
    sayer.body.collides([playerCollisionGroup]);

    // var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', player.body);
    // var spriteMaterial2 = game.physics.p2.createMaterial('spriteMaterial', sayer.body);

//    const playerMaterial = game.physics.p2.createMaterial('playerMaterial', player.body);
    //const weaponMaterial = game.physics.p2.createMaterial('weaponMaterial', thorHammer.body);
    var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
    var boxMaterial = game.physics.p2.createMaterial('worldMaterial');

    //  4 trues = the 4 faces of the world in left, right, top, bottom order
    game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

    //  A stack of boxes - you'll stick to these

    //TODO: set anchor after 59
    for (var i = 1; i < 4; i++)
    {
        const box = game.add.sprite(300, 645 - (95 * i), 'atari');
        game.physics.p2.enable(box);
        box.body.mass = 6;
        // box.body.static = true;
        box.body.setMaterial(boxMaterial);
    }

    //  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
    //  those 2 materials collide it uses the following settings.
    // const groundPlayerCM = game.physics.p2.createContactMaterial(playerMaterial, worldMaterial, { friction: 0.0 });
    //const groundWeaponCM = game.physics.p2.createContactMaterial(weaponMaterial, worldMaterial, { friction: 0.0 });
    // const groundBoxesCM = game.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.6 });
    //const playerWeaponCM = game.physics.p2.createContactMaterial(playerMaterial, weaponMaterial, { friction: 0.0 });

    // var groundPlayerCM = game.physics.p2.createContactMaterial(spriteMaterial, spriteMaterial2, worldMaterial, { friction: 0.0 });
    // var groundBoxesCM = game.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.6 });

    //  Here are some more options you can set:

    // contactMaterial.friction = 0.0;     // Friction to use in the contact of these two materials.
    // contactMaterial.restitution = 0.0;  // Restitution (i.e. how bouncy it is!) to use in the contactChecking tests626actMaterial generate.
    // contactMaterial.relaxation = 0;     // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
    // contactMaterial.frictionStiffness = 1e7;    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
    // contactMaterial.frictionRelaxation = 3;     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
    // contactMaterial.surfaceVelocity = 0.0;        // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.

    var text = game.add.text(20, 20, 'move with arrow, space to jump', { fill: '#ffffff' });


//     cursors = game.input.keyboard.createCursorKeys();
//     attackButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    secondJumpButton = game.input.keyboard.addKey(Phaser.Keyboard.F);   

}

function update() {

//     //thorHammer.y = player.y;
//     if (cursors.left.isDown) {
//         player.body.moveLeft(200);
//         thorHammer.body.moveLeft(200);


//         if (facing !== 'left') {
//             player.animations.play('left');
//             facing = 'left';
//         }
//     } else if (cursors.right.isDown) {
//         player.body.moveRight(200);
//         thorHammer.body.moveRight(200);

//         if (facing !== 'right') {
//             player.animations.play('right');
//             facing = 'right';
//         }
//     } else {
//         player.body.velocity.x = 0;
//         thorHammer.body.velocity.x = 0;

//         if (facing !== 'idle') {
//             player.animations.stop();

//             facing === 'left' ? player.frame = 14 : player.frame = 0;


    InputManager.update();
    slayer.update();
    slayer1.update();
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

//     // function render() {

//     // // Sprite debug info
//     // game.debug.spriteInfo(player, 232, 132);
//     // //game.debug.spriteBounds(player);

// }
 }