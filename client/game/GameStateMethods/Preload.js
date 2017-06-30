
export default class Preload(game){
  constructor(){
    this.game = game;
  }

  loadImages(imageObj){
    Object.keys(imageObj)
      .forEach(key => this.game.load.image(key, imageObj[key]);
  }

  loadAtlasJSONArrays(jsonArraysObj){
    Object.keys(imageObj)
      .forEach(key => this.game.load.atlasJSONArray(key, imageObj[key].png, imageObj[key].json);
  }

  loadPhysics(physicsObj){
    Object.keys(physicsObj)
      .forEach(key => this.game.load.physics(key, physicsObj[key]))
  }
}
