const combineReducers = require('redux').combineReducers;
const game = require('./game').reducers;
const lobby = require('./lobby').reducers;

module.exports = combineReducers({
   game,
   lobby
  });
