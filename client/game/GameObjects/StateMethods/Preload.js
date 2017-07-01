
export default function Preload(imageObj, jsonArraysObj, physicsObj){
  imageObj && Object.keys(imageObj)
    .forEach(key => this.game.load.image(key, imageObj[key]))

  jsonArraysObj && Object.keys(jsonArraysObj)
    .forEach(key => this.game.load.atlasJSONArray(key, jsonArraysObj[key].png, jsonArraysObj[key].json))

}
