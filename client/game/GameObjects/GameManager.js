import { Create, Preload, Update } from './StateMethods';
import InputManager from './InputManager';


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

  update(){
    this.onUpdate();
  }

  addSprite(name, objType, spriteName, xCoord, yCoord){
    const curInputManager = new InputManager(this.game);
    this[name] = new objType(this.game, spriteName, xCoord, yCoord);
    curInputManager.init(this[name]);
    this.inputManagerList.push(curInputManager);
    return this[name]; // returns sprite.
  }

}
