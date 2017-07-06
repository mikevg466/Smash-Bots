const gameRedux = {}
module.exports = gameRedux

//------- ACTIONS -------
const ADD_PLAYERS = 'ADD_PLAYERS';          // when PLAYER connects to room
const REMOVE_PLAYER = 'REMOVE_PLAYER';    // when PLAYER disconnects from room
const LOAD_PLAYERS = 'LOAD_PLAYERS';      // initial load of all PLAYERs
const UPDATE_PLAYER = 'UPDATE_PLAYER';    // update a PLAYER during game
const UPDATE_PLAYERS = 'UPDATE_PLAYERS';  

// ------ ACTION CREATORS -------
gameRedux.addPlayers = players => ({ type: ADD_PLAYERS, players });
gameRedux.updatePlayers = players => ({ type: UPDATE_PLAYERS, players});


// ------- INIT STATE --------
const initialState = {
  players: {}
}


// ------- REDUCERS ------------
gameRedux.reducers = (state = initialState, action) => {
  const newState = Object.assign({}, state );

  switch (action.type) {

    case ADD_PLAYERS:
      newState.players = action.players
      break;

    case UPDATE_PLAYERS:
      Object.keys(action.players).forEach(playerNumber => {
        for(let key in action.players[playerNumber]){
          newState.players[playerNumber][key] = action.players[playerNumber][key]
        }
      })
      break;

    default:
      return newState;
  }
  return newState
}


// -------- DISPATCHERS -----------


