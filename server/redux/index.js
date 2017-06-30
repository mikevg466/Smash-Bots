const combineReducers = require('redux').combineReducers;
const game = require('./game');
const lobby = require('./lobby');

module.exports = combineReducers({
   game,
   lobby
  });
