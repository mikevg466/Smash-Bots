export const client = io();


// ------ LISTENERS -------
export const onAddChatMessage = callbackFunc =>
  client.on('addChatMessage', (msg, clientId) => {
    callbackFunc(msg, clientId);
  });

export const onUpdate = callbackFunc =>
  client.on('update', curRooms => {
    callbackFunc(curRooms);
  });

export const onPlayerAssignment = callbackFunc =>
  client.on('playerAssignment', (playerNumber) => {
    callbackFunc(playerNumber);
  });

export const onInitGame = callbackFunc =>
  client.on('initGame', () => {
    callbackFunc();
  });

export const onInitPlayers = callbackFunc =>
  client.on('initPlayers', (players) => {
    callbackFunc(players);
  });

export const onStopGame = callbackFunc =>
  client.on('stopGame', () => {
    callbackFunc();
export const onPlayerStateUpdates = callbackFunc =>
  client.on('playerStateUpdates', state => {
    callbackFunc(state);
  });


// ------ EMITTERS -------
export const emitChatMessage = message =>
  client.emit('chatMessage', message);

export const emitJoin = (room, weapon, armor) =>
  client.emit('join', room, weapon, armor);

export const emitRoomMounted = () =>
  client.emit('roomMounted')

export const emitStartGame = () =>
  client.emit('startGame');
    
export const emitEndGame = () =>
  client.emit('endGame')

export const emitPlayerStateChanges = state =>
  client.emit('playerStateChanges', state);

