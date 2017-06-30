const uuid = require('uuid');
const serverReduxStore = require('../store');   // ****

// server rooms is always empty
// server.sockets.adapter.rooms has rooms but also has clientID's with no way to distinguish
// client.rooms has rooms but also it's own id also with no real way to distinguish besides
//      looking to see if roomId === client.id

// example:
// server.sockets.adapter.rooms = {
//    123812903: 123812903,
//    654654742: 654654742,
//    457456345: 457456345,
//    room-12412432: room-12412432,
//    room-43534513: room-43534513
// }

// example:
// client.rooms = {
//    457456345: 457456345,
//    room-12412432: room-12412432,
//}

const socketServer = {};
socketServer.makeSocketServer = server => {
  // create helper function to find all rooms on server adapter that starts with lobby-
  //    this is used for every update call so helper is DRY
  const findRoomsOnServer = () => {
    let rooms = server.sockets.adapter.rooms ? Object.keys(server.sockets.adapter.rooms) : [];
    rooms = rooms.filter(room => room.length > 5 && room.slice(0, 5) === 'room-');
    return rooms
  }

  const findRoomForClient = client => {
    const rooms = client.rooms ? Object.keys(client.rooms) : [];
    const room = rooms.find(room => room.length > 5 && room.slice(0, 5) === 'room-');
    return room;
  }

  server.on('connection', client => {
    client.emit('update', findRoomsOnServer());
    broadcastDebugMsg(client.id + ' has joined the server');

    // disconnect updates room list for clients but does not need to leave
    //  as empty rooms do not appear.  Still need to look into if this leaves
    //   any leftover data when we create actual game state in rooms
    client.on('disconnect', () => {
      serverReduxStore.dispatch({
        type: 'REMOVE_CLIENT',
        client: {
          id: client.id
        }
      })
      client.leave(findRoomForClient(client));
      server.sockets.emit('update', findRoomsOnServer());
      broadcastDebugMsg(client.id + ' has disconnected from the server');
    });

    // using join for both join and host
    //   use default roomId so that if they are not joining an existing room
    //    they are creating a new room
    client.on('join', (roomId, clientWeapon, clientArmor) => {
      const curRoomId = roomId || 'room-' + uuid.v4();
      // put new state to ReduxStore **
      serverReduxStore.dispatch({
        type: 'ADD_CLIENT',
        client: {
          id: client.id,
          clientWeapon,
          clientArmor
        }
      })
      // =========================================== delete this later ================
      console.log(serverReduxStore.getState().lobby.clients)
      // =============================^^^^^^^^^^^^^^ delete this later ^^^^^^^^^^^^^^^^=====

      // join or create room
      client.join(curRoomId);
      server.sockets.emit('update', findRoomsOnServer());
    });


      // -assign Player information to players
      // -add updated player to store
      // -emit updated players to clients
      // const playersAmount = serverReduxStore.getState().users.players.length

    client.on('startGame', () => {
      var playerExample = {
        health: 100,
        weaponGraphic: ['spite1','sprite2', 'sprite3', 'sprite4'],
        characterGraphic: ['spite1','sprite2', 'sprite3', 'sprite4']
      }
      
      const clientsAsPlayers = {}
      serverReduxStore.getState().lobby.clients.forEach((player,index) => {
        player.number = index+1
        player.health = playerExample.health
        player.characterGraphic = playerExample.characterGraphic[index]
        player.weaponGraphic = playerExample.weaponGraphic[index]
        clientsAsPlayers[player.number] = player
      })
      serverReduxStore.dispatch({
        type: 'ADD_PLAYERS',
        players: clientsAsPlayers
      })
      server.sockets.emit('initPlayers', clientsAsPlayers)

      for(playerNumberKey in clientsAsPlayers){
        server.to(clientsAsPlayers[playerNumberKey].id).emit('playerAssignment', +playerNumberKey)
      }

      server.sockets.emit('initGame')

    })

    client.on('clientStateChange', (playerState) => {
      // update global state
      serverReduxStore.dispatch({
        type: 'UPDATE_PLAYER',
        player: playerState
      })

    })

    // server.sockets.emit('globalStateChange', () => {   //Throttle?
    //   // send global state to everyone constantly
    // })


    // chatMessage uses new findRoomForClient helper method that find's the room
    //   for the client that starts with "lobby-",  this removes the rooms that
    //    are based on the clientId
    client.on('chatMessage', msg => {
      // find out which room the client is in
      server.to(findRoomForClient(client)).emit('addChatMessage', msg, client.id);
    });

    function broadcastDebugMsg(msg) {
      server.sockets.emit('debugMessage', msg);
    }
  });
}


module.exports = socketServer;
