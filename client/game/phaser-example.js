
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.atlasJSONArray('smashbot', 'ourAssets/basic_movement_no_weapon.png', 'ourAssets/basic_movement_no_weapon.json');
    game.load.image('atari', 'assets/sprites/block.png');
    game.load.image('background', 'assets/games/starstruck/background2.png');
    game.load.spritesheet('dude', 'ourAssets/basic_movement_no_weapon.png', 32, 48);

}

var sprite;

var sayer
var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var secondJumpButton;
var yAxis = p2.vec2.fromValues(0, 1);

function create() {

    var bg = game.add.tileSprite(0, 0, 2000, 600, 'background');

    // var bounds = new Phaser.Rectangle(100, 100, 400, 400);
    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    // game.physics.startSystem(Phaser.Physics.ARCADE)

    game.physics.p2.gravity.y = 350;
    game.physics.p2.world.defaultContactMaterial.friction = 0.3;
    game.physics.p2.world.setGlobalStiffness(1e5);
    

    //  Add a sprite
    player = game.add.sprite(500, 500, 'smashbot');
    player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 60, true);
    player.animations.add('turn', [14], 20, true);
    player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 60, true);
    player.scale.setTo(0.75, 0.75);

    sayer = game.add.sprite(100, 100, 'smashbot');
    sayer.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 60, true);
    sayer.animations.add('turn', [14], 20, true);
    sayer.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 60, true);

    //  Enable if for physics. This creates a default rectangular body.
    game.physics.p2.enable(player);
    game.physics.p2.enable(sayer);

    player.body.fixedRotation = true;
    player.body.damping = 0.5;
    

    sayer.body.fixedRotation = true;
    sayer.body.damping = 0.5;

    var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', player.body);
    var spriteMaterial2 = game.physics.p2.createMaterial('spriteMaterial', sayer.body);


    var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
    var boxMaterial = game.physics.p2.createMaterial('worldMaterial');

    //  4 trues = the 4 faces of the world in left, right, top, bottom order
    game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

    //  A stack of boxes - you'll stick to these
    for (var i = 1; i < 4; i++)
    {
        var box = game.add.sprite(300, 645 - (95 * i), 'atari');
        game.physics.p2.enable(box);
        box.body.mass = 6;
        // box.body.static = true;
        box.body.setMaterial(boxMaterial);
    }

    //  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
    //  those 2 materials collide it uses the following settings.

    var groundPlayerCM = game.physics.p2.createContactMaterial(spriteMaterial, spriteMaterial2, worldMaterial, { friction: 0.0 });
    var groundBoxesCM = game.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.6 });

    //  Here are some more options you can set:

    // contactMaterial.friction = 0.0;     // Friction to use in the contact of these two materials.
    // contactMaterial.restitution = 0.0;  // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
    // contactMaterial.stiffness = 1e3;    // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
    // contactMaterial.relaxation = 0;     // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
    // contactMaterial.frictionStiffness = 1e7;    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
    // contactMaterial.frictionRelaxation = 3;     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
    // contactMaterial.surfaceVelocity = 0.0;        // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.

    var text = game.add.text(20, 20, 'move with arrow, space to jump', { fill: '#ffffff' });


    player.body.collideWorldBounds = false;
    player.checkWorldBounds = true;
    player.outOfBoundsKill = true;
    player.events.onKilled.add(function(){
        player.reset(200, 200);
    });
    // game.physics.p2.checkCollision.bottom = false;
    // game.physics.p2.checkCollision.top    = false;
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    secondJumpButton = game.input.keyboard.addKey(Phaser.Keyboard.F);

}

function update() {

    if (cursors.left.isDown)
    {
        player.body.moveLeft(500);

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(500);

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        player.body.velocity.x = 0;

        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }

    if (jumpButton.isDown && game.time.now > jumpTimer && checkIfCanJump())
    {
        player.body.moveUp(300);
        jumpTimer = game.time.now + 750;
    }
    
    if (secondJumpButton.isDown && game.time.now > jumpTimer && checkIfCanJump2())
    {
        sayer.body.moveUp(300);
        jumpTimer = game.time.now + 750;
    }

}

function checkIfCanJump() {

    var result = false;

    for (var i=0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
    {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === player.body.data || c.bodyB === player.body.data)
        {
            var d = p2.vec2.dot(c.normalA, yAxis);

            if (c.bodyA === player.body.data)
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
