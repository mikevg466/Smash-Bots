import { Create, Preload, Update } from './StateMethods';
import InputManager from './InputManager';
import { emitEndGame } from '../../sockets/client';


export default class GameManager{
  constructor(width, height, renderer, parent, state, transparent, antialias, physicsConfig){
    this.game = new Phaser.Game(
      width,
      height,
      renderer,
      parent,
      state,
      transparent,
      antialias,
      physicsConfig
    );
    this.inputManagerList = [];
    this.onCreate = Create.bind(this);
    this.onPreload = Preload.bind(this);
    this.onUpdate = Update.bind(this);
  }

  preload(imageObj, jsonArraysObj, physicsObj){
    this.onPreload(imageObj, jsonArraysObj, physicsObj);
  }

  create(background){
    this.onCreate(background);
  }

  update(gameState){
    this.onUpdate(gameState);
  }

  addPlayer(name, objType, spriteName, xCoord, yCoord, playerNumber){
    this[name] = new objType(this.game, spriteName, xCoord, yCoord, playerNumber);
    const curInputManager = new InputManager(this.game);
    curInputManager.init(this[name]);
    this.inputManagerList.push(curInputManager);
    return this[name]; // returns sprite.
  }
  endGame() {
    this.game.cache.destroy();
    this.game.destroy();
    emitEndGame();
  }

  addSprite(name, objType, spriteName, xCoord, yCoord, xScale, yScale){
    this[name] = new objType(this.game, spriteName, xCoord, yCoord, xScale, yScale);
  }

  addCollisions(aObjNameList, bObjName){
    aObjNameList.forEach(aObjName =>
      this.game.physics.arcade.collide(this[aObjName].sprite, this[bObjName].sprite, () => this.collideCallback(this[aObjName]))
    );
  }


  // optional callbacks
  collideCallback(player){
      player.jumpCounter = 2
  }

  overlapCallback(){
     //console.log('overlapped');
  }

}
