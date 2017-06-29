export const client = io();

// ------ LISTENERS -------
export const onInitGame = callbackFunc =>
  client.on('initGame', state => {
    callbackFunc(state);
  });

export const onAddChatMessage = callbackFunc =>
  client.on('addChatMessage', (msg, clientId) => {
    console.log('HERE');
    console.log(msg);
    callbackFunc(msg, clientId);
  });

export const onUpdate = callbackFunc =>
  client.on('update', curRooms => {
    callbackFunc(curRooms);
  });



// ------ EMITTERS -------
export const emitChatMessage = message =>
  client.emit('chatMessage', message);

export const emitJoin = (room, weapon, armor) =>
  client.emit('join', room, weapon, armor);
