import Weapon from './weapon'

var Player = function(game, spriteName, xcoord, ycoord){ //game = context
    // var pos = this.getRandomResetPosition();
    //Sprite
    this.sprite = game.add.sprite(xcoord, ycoord, spriteName);
    //Weapon

    this.weapon = new Weapon (game, 'thorHammer', this, xcoord, ycoord)
    //Size and Physics

    // this.sprite.scale.setTo(0.75, 0.75)
    this.sprite.anchor.setTo(0.5, 0.5);
    game.physics.p2.enable(this.sprite, true);
    this.sprite.body.loadPolygon('physicsData', 'smashbot000');
    this.sprite.body.fixedRotation = true;
    this.sprite.body.damping = 0.5;
    
    //Animations
    this.sprite.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 60, true);
    this.sprite.animations.add('turn', [14], 20, true);
    this.sprite.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 60, true);


    //World Collision + Death Logic
    this.sprite.body.collideWorldBounds = false;
    this.sprite.checkWorldBounds = true;
    this.sprite.outOfBoundsKill = true;
    this.sprite.events.onKilled.add(function(){
        this.sprite.reset(xcoord, ycoord);
        // this.sprite.gravity();
    }, this);
    // game.physics.p2.gravity.y = 350;
    // this.sprite.body.gravity.y= 500
    
    // var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', this.sprite.body);

    // this.weapon = new Weapon(game, 'smashbot', this);
    // this.attackTime = 2000;
    // this.kills = 0;

    this.direction = {
        up: false,
        down: false,
        left: false,
        right: true,
    }
    // this.sprite.body.fo.y = 300;
    // this.gravity();
}

// Player.prototype.init = function(){
//     this.gravity();
// }

// Player.prototype.addChild = function(sprite){
//     this.sprite.addChild(sprite);
// }


Player.prototype.setDirection = function(direction){ //left, right, up, down
    switch(direction){
        case 'left':
            this.direction.left = true;
            this.direction.right = false;
            this.sprite.scale.x = -1;
            break;

        case 'right':
            this.direction.right = true;
            this.direction.left = false;
            this.sprite.scale.x = 1;
            break;
    }
}

Player.prototype.move = function(direction){ //direction: left | right
    switch(direction){
        case 'left':
            this.sprite.body.moveLeft(500);
            this.setDirection('left');
            this.sprite.animations.play('left');
            break;

        case 'right':
            this.sprite.body.moveRight(500);
            this.setDirection('right');
            this.sprite.animations.play('right');
            break;
        
        default:
            this.sprite.body.velocity.x = 0;
            this.sprite.animations.stop();
            break;
        
    }
}

Player.prototype.jump = function(){
    this.sprite.body.moveUp(300)
}

Player.prototype.getDirection = function(){
    for( var key in this.direction){
        if (this.direction[key]){
            return key;
        }
    }
    return null;
}

// Player.prototype.attack = function(){
//     //animation
//     this.weapon.attack(this.getDirection());
//     AudioManager.sword.play();
// }

Player.prototype.update = function(){
    this.weapon.update();
}

// Player.prototype.onFloor = function(){
//     return this.sprite.body.onFloor();
// }

Player.prototype.stop = function(){
    this.sprite.body.velocity.x = 0;
    this.sprite.animations.stop();
}

Player.prototype.getPosition = function(){
    return {x: this.sprite.x ,y: this.sprite.y}
}

// Player.prototype.kill = function(){
//     this.sprite.kill();
//     var pos = this.getRandomResetPosition();
//     this.sprite.reset(pos.x, pos.y);
//     // AudioManager.death.play();
// }

// Player.prototype.getRandomResetPosition = function(){
//     var resuPosition = [{x:30, y:30},
//                       {x:game.world.width-30, y:30},
//                       {x:30, y:game.world.height-30},
//                       {x:game.world.width-30, y:game.world.height-30},
//                      ];

//     var num = Math.floor(Math.random() * resuPosition.length);
//     return resuPosition[num];
// }

export default Player;