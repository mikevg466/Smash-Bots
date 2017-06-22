function Room(id, playerID) {
    this.id = id;
    this.hostID = playerID;
    this.players = [];
    this.addPlayer(playerID);

}

Room.prototype.addPlayer = function(playerID) {
    this.players.push(playerID);
};

module.exports = Room;
