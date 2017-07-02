//------- ACTIONS -------
const START_GAME = 'START_GAME';
const END_GAME = 'END_GAME';
const UPDATE_PLAYERS_STATE = 'UPDATE_PLAYERS_STATE';
const SET_PLAYER = 'SET_PLAYER';
const INIT_PLAYERS = 'INIT_PLAYERS';
const UPDATE_LOCAL_STATE = 'UPDATE_LOCAL_STATE';

// ------ ACTION CREATORS -------
export const startGame = () => ({ type: START_GAME });
export const endGame = () => ({ type: END_GAME });
export const updatePlayersState = (localPlayer, remotePlayers) => ({
  type: UPDATE_PLAYERS_STATE,
  localPlayer,
  remotePlayers
});
export const updateLocalState = (localPlayer, remotePlayers) => ({
  type: UPDATE_LOCAL_STATE,
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
  localPlayer: {
    xCoord: 100,
    yCoord: 100
  }

  remotePlayers = {
    playerNumber: {
      number: 1,
      damage: 100,
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
  playerStateChanges: {},
};

const defaultPlayer = {
  damage: 0,
  xCoord: 0,
  yCoord: 0
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
      const updatedPlayer = Object.assign({}, newState.localPlayer);
      updatedPlayer.damage = action.localPlayer.damage;
      newState.localPlayer = updatedPlayer;
      newState.remotePlayers = action.remotePlayers;
      break;

    case UPDATE_LOCAL_STATE:
      const stateChanges = {};
      // position changes
      const { xCoord, yCoord, number } = action.localPlayer;
      stateChanges[number] = {};
      stateChanges[number].xCoord = xCoord;
      stateChanges[number].yCoord = yCoord;
      // damage changes
      Object.keys(action.remotePlayers)
        .forEach(playerNum => {
          stateChanges[playerNum] = {};
          stateChanges[playerNum].damage = action.remotePlayers[playerNum].damage;
        });
      newState.playerStateChanges = stateChanges;
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
    dispatch(processPlayers(players, updatePlayersState));

export const processPlayers = ( players, actionCreator ) =>
  (dispatch, getState) => {
    for(key in players){
      for(defaults in defaultPlayer){
        players[key][defaults] = defaultPlayer[defaults];
      }
    }
    const playerNumber = getState().game.playerNumber;
    const localPlayer = players[playerNumber];
    const remotePlayers = players;
    delete remotePlayers[playerNumber];
    dispatch(actionCreator(localPlayer || {}, remotePlayers || {}));
  }
