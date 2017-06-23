const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const store = new SequelizeStore({ db });
const PORT = process.env.PORT || 2407;
const app = express();
const socketio = require('socket.io');
const Room = require('./room');
const uuid = require('uuid');
module.exports = app;

if (process.env.NODE_ENV === 'development') require('../secrets');

passport.serializeUser((user, done) =>
  done(null, user.id));

passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
    .then(user => done(null, user))
    .catch(done));

const createApp = () => app
  .use(morgan('dev'))
  .use(express.static(path.join(__dirname, '..', 'public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(session({
    secret: process.env.SESSION_SECRET || 'my best friend is Cody',
    store,
    resave: false,
    saveUninitialized: false
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use('/auth', require('./auth'))
  .use('/api', require('./api'))
  .use((req, res, next) =>
    path.extname(req.path).length > 0 ? res.status(404).send('Not found') : next())
  .use('*', (req, res) =>
    res.sendFile(path.join(__dirname, '..', 'public/index.html')))
  .use((err, req, res, next) =>
    res.status(err.status || 500).send(err.message || 'Internal server error.'));

let server;
const syncDb = () =>
  db.sync();
const listenUp = () => {
  const appServer = app.listen(PORT, () =>
    console.log(`Check it out on port ${PORT}`));
  server = socketio(appServer);
};


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

const makeSocketServer = () => {
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
      server.sockets.emit('update', findRoomsOnServer());
      broadcastDebugMsg(client.id + ' has disconnected from the server');
    });

    // using join for both join and host
    //   use default roomId so that if they are not joining an existing room
    //    they are creating a new room
    client.on('join', (roomID = 'room-' + uuid.v4()) => {
      // join or create room
      client.join(roomID);
      server.sockets.emit('update', findRoomsOnServer());
    });

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

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  store.sync()
    .then(syncDb)
    .then(createApp)
    .then(listenUp)
    .then(makeSocketServer);
} else {
  createApp(app);
}
