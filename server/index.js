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


const makeSocketServer = () => {
  var rooms = {};
  var players = {};


  server.on('connection', function (player) {
      players[player.id] = {id: player.id, room: null, isHost: false, color: '#' + ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6)};
      player.emit('update', rooms);
      broadcastDebugMsg(player.id + ' has joined the server');


      player.on('disconnect', function() {

          if (players[player.id].isHost) {
              var room = findRoomByID(player.id, rooms);
              delete rooms[room.id];
              server.sockets.emit('update', rooms);
          }

          broadcastDebugMsg(player.id + ' has disconnected from the server');
          delete players[player.id];

      });

      player.on('join', function(roomID, callback) {
          // join existing room
          if (connectPlayerToRoom(roomID, player.id, false)) {
              callback(roomID);
          }
      });

      player.on('host', function(data, callback) {
          // create new room ID on host
          var newRoomID = uuid.v4();
          if (connectPlayerToRoom(newRoomID, player.id, true)) {
              callback(newRoomID);
          }
      });

      player.on('chatMessage', function(msg) {
          // find out which room the player is in
          var room = findRoomByID(player.id, rooms);
          console.log('Player Id', player.id);
          console.log('Message: ', msg);
          console.log('Room List:', rooms);
          console.log('Room Found:', room);
          server.sockets.in(room.id).emit('addChatMessage', msg, player.id, players[player.id].color);
          //server.to(room.id).emit('addChatMessage', msg, player.id, players[player.id].color);
      });

      function connectPlayerToRoom(roomID, playerID, isHost) {
          // if the player is already a host, or already connected to a room
          if (players[playerID].isHost || players[playerID].room) {
              return false;
          }

          player.join(roomID, function(err) {
              if (!err) {

                  players[player.id].isHost = isHost;
                  players[player.id].room = roomID;
                  //rooms[roomID] = new Room(roomID, playerID, isHost);

                  if (isHost) {
                      rooms[roomID] = new Room(roomID, playerID);
                      broadcastDebugMsg(playerID + ' has created room: ' + roomID);
                  } else {
                      rooms[roomID].addPlayer(playerID);
                      broadcastDebugMsg(player.id + ' has joined room: ' + roomID);

                  }

                  server.sockets.emit('update', rooms);

              } else {
                  // handle error message

              }
          });


          return true;
      }

      function broadcastDebugMsg(msg) {
          server.sockets.emit('debugMessage', msg);
      }

      function findRoomByID(playerID, rooms) {
          var key, room;
          for (key in rooms) {
              if (rooms.hasOwnProperty(key)) {
                  room = rooms[key];
                  //if (room.hostID === hostID) {
                  //    return room;
                  //}
                  console.log('Cur Room Iter', room);
                  for (var i = 0; i < room.players.length; i++) {
                      if (room.players[i] === playerID) {
                          return room;
                      }
                  }
              }
          }
          return null;
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

// server.on('connection', (player) => {
//   console.log(':) Player connected. Id:', player.id);
//   players.push(createPlayer(player.id));
//   console.log('players:', players.length);

//   server.emit('playerNumChange', players.length);

//   player.on('startGame', () => {
//     //console.log(animateGameFn, '!!!!');
//     scores = [];
//     server.emit('startGame');  //  io emits to all players
//   });
// });
