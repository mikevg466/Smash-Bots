var Weapon = function(game, spriteName, player){ //game = context
    this.context = game;
    this.player = player;
    this.isAttack = false; //mira si esta atakando o no
    this.atackTime = player.attackTime;
    this.spritePos = {x: 0,
                      y: 0}

    this.sprite = game.add.sprite(this.spritePos.x, this.spritePos.y,spriteName);
    this.sprite.animations.add('attack',[2,4]);
    this.sprite.anchor.setTo(0.5, 1);

    game.physics.arcade.enable(this.sprite);
}

Weapon.prototype.update = function(){
    this.sprite.x = this.player.sprite.x;
    this.sprite.y = this.player.sprite.y + 7;
    this.refreshDirection(this.player.getDirection());
}

Weapon.prototype.attack = function(direction){

    this.refreshDirection(direction)

    var that = this;

    this.sprite.animations.play('attack', 80);

    this.sprite.events.onAnimationComplete.add(function(sprite){
        sprite.frame = 0;
    }, this);
}

Weapon.prototype.refreshDirection = function(direction){
    if(direction == 'left')
        this.sprite.scale.x = -1;

    if(direction == 'right')
        this.sprite.scale.x = 1;
}