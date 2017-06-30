//------- ACTIONS -------
const START_GAME = 'START_GAME';
const END_GAME = 'END_GAME';
const UPDATE_PLAYERS_STATE = 'UPDATE_PLAYERS_STATE';
const SET_PLAYER = 'SET_PLAYER';
const INIT_PLAYERS = 'INIT_PLAYERS';

// ------ ACTION CREATORS -------
export const startGame = () => ({ type: START_GAME });
export const endGame = () => ({ type: END_GAME });
export const updatePlayersState = (localPlayer, remotePlayers) => ({
  type: UPDATE_PLAYERS_STATE,
  localPlayer,
  remotePlayers
});
export const setPlayer = playerNumber => ({ type: SET_PLAYER, playerNumber });
export const initPlayers = (localPlayer, remotePlayers) => ({
  type: INIT_PLAYERS,
  localPlayer,
  remotePlayers
});

// ------- INIT STATE --------

// from game.players server state
/*
  EXAMPLE format:

  players = {
    playerNumber: {
      number: 1,
      xPos: -300,
      yPos: 0,
      health: 100,
      characterGraphic: 'spritePath',
      weaponGraphic: 'spritePath'
    },
    playerNumber: {.....}
  }

 */

const initState = {
  isGamePlaying: false,
  playerNumber: 0,
  localPlayer: {},
  remotePlayers: {},
};


// ------- REDUCERS ------------
export default function (state = initState, action) {
  const newState = Object.assign({}, state );

  switch (action.type) {

    case START_GAME:
      newState.isGamePlaying = true;
      break;

    case END_GAME:
      newState.isGamePlaying = false;
      break;

    case INIT_PLAYERS:
      newState.localPlayer = action.localPlayer;
      newState.remotePlayers = action.remotePlayers;
      break;

    case UPDATE_PLAYERS_STATE:
      const updatedPlayer = Object.assign({}, action.localPlayer);
      updatedPlayer.health = action.localPlayer.health;
      newState.localPlayer = updatedPlayer;
      newState.remotePlayers = action.remotePlayers;
      break;

    case SET_PLAYER:
      newState.playerNumber = action.playerNumber;
      break;

    default:
      break;
  }
  return newState;
}


// -------- DISPATCHERS -----------
export const processInitPlayers = players =>
  dispatch =>
    dispatch(processPlayers(players, initPlayers));

export const processPlayerUpdate = players =>
  dispatch =>
    dispatch(processPlayers(players, updatePlayersState))

export const processPlayers = ( players, actionCreator ) =>
  (dispatch, getState) => {
    const playerNumber = getState().game.playerNumber;
    console.log('playerNumber', playerNumber);
    console.log('gameState', getState().game);
    const localPlayer = players[playerNumber];
    console.log(localPlayer);
    const remotePlayers = players;
    delete remotePlayers[playerNumber];
    dispatch(actionCreator(localPlayer || {}, remotePlayers || {}));
  }
