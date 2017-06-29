//------- ACTIONS -------
const START_GAME = 'START_GAME';
const END_GAME = 'END_GAME';
const UPDATE_PLAYERS_STATE = 'UPDATE_PLAYERS_STATE';
const SET_PLAYER = 'SET_PLAYER';
const INIT_PLAYERS = 'INIT_PLAYERS';

// ------ ACTION CREATORS -------
export const startGame = () => ({ type: START_GAME });
export const endGame = () => ({ type: END_GAME });
export const updatePlayersState = players => ({ type: UPDATE_PLAYERS_STATE, players });
export const setPlayer = playerNumber => ({ type: SET_PLAYER, playerNumber });
export const initPlayers = players => ({ type: INIT_PLAYERS, players });

// ------- INIT STATE --------

// from game.players server state
/*
  EXAMPLE format:

  players = [
    {
      isPlayer: true
      number: 1,
      xPos: -300,
      yPos: 0,
      health: 100,
      characterGraphic: 'spritePath',
      weaponGraphic: 'spritePath'
    }, {}
  ]

 */

const initState = {
  isGamePlaying: false,
  players: [],
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
      newState.players = action.players;
      break;

    case UPDATE_PLAYERS_STATE:
      const updatedPlayerState = newState.players.map(player => {
        if(player.isPlayer){
          player.health = action.players
            .find(recievedPlayer =>
              recievedPlayer.number === player.number
            ).health;
          return player;
        }
        const newPlayer = action.players.find(recievedPlayer =>
          recievedPlayer.number === player.number
        )
        newPlayer.isPlayer = false;
        return newPlayer;
      })
      newState.players = updatedPlayerState;
      break;

    case SET_PLAYER:
      const updatedPlayers = newState.players.map(player => {
        if(player.number === action.playerNumber) player.isPlayer = true;
        return player;
      });
      newState.players = updatedPlayers;
      break;

    default:
      break;
  }
  return newState;
}


// -------- DISPATCHERS -----------
export const processInitPlayers = players =>
  dispatch =>
    dispatch(initPlayers(players
      .map(player => {
        player.isPlayer = false;
        return player;
      })
    ));
