const game = new Phaser.Game(2000, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('atari', 'assets/sprites/block.png');
    game.load.image('background', 'assets/games/starstruck/background2.png');
    game.load.image('thorHammer', 'ourAssets/weapons/hammer_thors.png');
    game.load.atlasJSONArray('smashbot', 'ourAssets/smashbot/basic_movement_no_weapon_final.png', 'ourAssets/smashbot/basic_movement_no_weapon_final.json');
    game.load.physics('physicsData', 'ourAssets/smashbot/physics_data_smashbot.json');

}

let player,
    thorHammer,
    thorHammerPoly,
    cursors,
    attackButton,
    facing = 'right',
    jumpTimer = 0,
    yAxis = p2.vec2.fromValues(0, 1);

function create() {

    const bg = game.add.tileSprite(0, 0, 2000, 600, 'background');

    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);

    game.physics.p2.gravity.y = 350;
    game.physics.p2.world.defaultContactMaterial.friction = 0.3;
    game.physics.p2.world.setGlobalStiffness(1e5);

    //  Add a smashbot sprite and its animations
    player = game.add.sprite(200, 200, 'smashbot');
    //  Enable physics. This creates a default rectangular body.
    game.physics.p2.enable(player, true);
    player.body.clearShapes();
    player.body.loadPolygon('physicsData', 'smashbot000');
    //player.scale.setTo(0.8);
    player.anchor.setTo(0.5);
    player.animations.add('right', [0, 1], 5, true); // arm out
    player.animations.add('left', [14, 15], 5, true); // arm out
    //player.animations.add('right', [7, 8, 9], 10, true); // arm in the air
    //player.animations.add('left', [21, 22, 23], 10, true); // arm in the air
    //player.animations.add('swingRight', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 60, true);
    //player.animations.add('swingLeft', [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 60, true);

    thorHammer = game.add.sprite(280, 203.5, 'thorHammer');
    //thorHammer = player.addChild(game.make.sprite(280, 203.5, 'thorHammer'));
    // player.addChild(thorHammer)
    thorHammer.anchor.setTo(0, 1);
    //thorHammer.alignIn(player, Phaser.CENTER, -58, -8);
    thorHammer.alignTo(player, Phaser.TOP_RIGHT, 160, 0);
    game.physics.p2.enable(thorHammer, true);
    thorHammer.body.clearShapes();
    thorHammer.body.loadPolygon('physicsData', 'hammer_thors_all');
    thorHammer.body.static = true;

    player.body.fixedRotation = true;
    player.body.damping = 0.5;

    const playerMaterial = game.physics.p2.createMaterial('playerMaterial', player.body);
    //const weaponMaterial = game.physics.p2.createMaterial('weaponMaterial', thorHammer.body);
    const worldMaterial = game.physics.p2.createMaterial('worldMaterial');
    const boxMaterial = game.physics.p2.createMaterial('worldMaterial');

    //  4 trues = the 4 faces of the world in left, right, top, bottom order
    game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

    //  A stack of boxes - you'll stick to these
    for (let i = 1; i < 4; i++) {
        const box = game.add.sprite(300, 645 - (95 * i), 'atari');
        game.physics.p2.enable(box);
        box.body.mass = 6;
        // box.body.static = true;
        box.body.setMaterial(boxMaterial);
    }

    //  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
    //  those 2 materials collide it uses the following settings.
    const groundPlayerCM = game.physics.p2.createContactMaterial(playerMaterial, worldMaterial, { friction: 0.0 });
    //const groundWeaponCM = game.physics.p2.createContactMaterial(weaponMaterial, worldMaterial, { friction: 0.0 });
    const groundBoxesCM = game.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.6 });
    //const playerWeaponCM = game.physics.p2.createContactMaterial(playerMaterial, weaponMaterial, { friction: 0.0 });

    const text = game.add.text(20, 20, 'move with arrow, space to jump', { fill: '#ffffff' });

    cursors = game.input.keyboard.createCursorKeys();
    attackButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update() {
    //thorHammer.y = player.y;
    if (cursors.left.isDown) {
        player.body.moveLeft(200);
        thorHammer.body.moveLeft(200);


        if (facing !== 'left') {
            player.animations.play('left');
            facing = 'left';
        }
    } else if (cursors.right.isDown) {
        player.body.moveRight(200);
        thorHammer.body.moveRight(200);

        if (facing !== 'right') {
            player.animations.play('right');
            facing = 'right';
        }
    } else {
        player.body.velocity.x = 0;
        thorHammer.body.velocity.x = 0;

        if (facing !== 'idle') {
            player.animations.stop();

            facing === 'left' ? player.frame = 14 : player.frame = 0;

            facing = 'idle';
        }
    }

    if (cursors.up.isDown && game.time.now > jumpTimer && checkIfCanJump()) {
        player.body.moveUp(300);
        //thorHammer.body.moveUp(300);
        jumpTimer = game.time.now + 750;
    }

}

function checkIfCanJump() {

    let result = false;

    for (let i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        let c = game.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === player.body.data || c.bodyB === player.body.data) {
            let d = p2.vec2.dot(c.normalA, yAxis);

            if (c.bodyA === player.body.data) {
                d *= -1;
            }

            if (d > 0.5) {
                result = true;
            }
        }
    }

    return result;

}

    function render() {

    // Sprite debug info
    game.debug.spriteInfo(player, 232, 132);
    //game.debug.spriteBounds(player);

}
