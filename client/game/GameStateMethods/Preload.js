
export default class Preload{
  constructor(game){
    this.game = game;
  }

  loadImages(imageObj){
    Object.keys(imageObj)
      .forEach(key => this.game.load.image(key, imageObj[key]))
  }

  loadAtlasJSONArrays(jsonArraysObj){
    Object.keys(jsonArraysObj)
      .forEach(key => this.game.load.atlasJSONArray(key, jsonArraysObj[key].png, jsonArraysObj[key].json))
  }

  loadPhysics(physicsObj){
    Object.keys(physicsObj)
      .forEach(key => this.game.load.physics(key, physicsObj[key]))
  }
}
