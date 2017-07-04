
export default function Update(gameState){
  this.inputManagerList
    .forEach(inputManager => inputManager.update(gameState))
}
