
//------- ACTIONS -------
const ADD_PLAYERS = 'ADD_PLAYERS';          // when PLAYER connects to room
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
  players: {}
}


// ------- REDUCERS ------------
module.exports = function (state = initialState, action) {
  const newState = Object.assign({}, state );

  switch (action.type) {

    case ADD_PLAYERS:
      newState.players = action.players
      break;

    case UPDATE_PLAYER:
      var playerNumber = action.player.number
      newState.players.playerNumber = action.player
      break;

    case UPDATE_PLAYERS:
      const newPlayersObj = action.players
      newState.players = newPlayersObj;
      break;

    default:
      return newState;
  }
  return newState
}


// -------- DISPATCHERS -----------
