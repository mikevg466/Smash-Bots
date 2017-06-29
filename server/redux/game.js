const axios = require('axios');

//------- ACTIONS -------
const ADD_PLAYER = 'ADD_PLAYER';          // when PLAYER connects to room
const REMOVE_PLAYER = 'REMOVE_PLAYER';    // when PLAYER disconnects from room
const LOAD_PLAYERS = 'LOAD_PLAYERS';      // initial load of all PLAYERs
const UPDATE_PLAYER = 'UPDATE_PLAYER';    // update a PLAYER during game
const UPDATE_PLAYERS = 'UPDATE_PLAYERS';  

// ------ ACTION CREATORS -------

const addPlayer = player => ({ type: ADD_PLAYER, player });
const removePlayer = (player) => ({ type: REMOVE_PLAYER, player });
const loadPlayers = () => ({ type: LOAD_PLAYERS });
const updatePlayer = player => ({ type: UPDATE_PLAYER, player});
const updatePlayers = players => ({ type: UPDATE_PLAYERS, players});


// ------- INIT STATE --------
const initialState = {
  isPlaying: false,
  players: []
}


// ------- REDUCERS ------------
module.exports = function (state = initialState, action) {
  const newState = Object.assign({}, state );

  switch (action.type) {

    case ADD_PLAYER:
      const playersArrCopy = newState.players.slice(0)
      playersArrCopy.push(action.player);
      newState.players = playersArrCopy
      break;

    case REMOVE_PLAYER:
      const playerRemovedArr = newState.players
        .slice(0)
        .splice(
          newState.players.findIndex(player => player.id === action.player.id),
          1
        )
      newState.players = playerRemovedArr
      break;

    case UPDATE_PLAYER:
      const playerUpdatedArr = newState.players
        .slice(0)
        .splice(
          newState.players.findIndex(player => player.id === action.player.id),
          1, action.player
        )
      newState.players = playerUpdatedArr
      break;

    case UPDATE_PLAYERS:
      const newPlayersArr = action.players
      newState.players = newPlayersArr;
      break;

    default:
      return newState;
  }
  return newState
}


// -------- DISPATCHERS -----------
