//------- ACTIONS -------
const START_GAME = 'START_GAME';
const END_GAME = 'END_GAME';

// ------ ACTION CREATORS -------
export const startGame = () => ({ type: START_GAME });
export const endGame = () => ({ type: END_GAME });

// ------- INIT STATE --------
const initState = {
  isGamePlaying: false,

  player1XPos: 0,
  player2XPos: 0,
  player3XPos: 0,
  player4XPos: 0,

  player1YPos: 0,
  player2YPos: 0,
  player3YPos: 0,
  player4YPos: 0,

  player1Health: 0,
  player2Health: 0,
  player3Health: 0,
  player4Health: 0,

  player1CharacterGraphic: '',
  player2CharacterGraphic: '',
  player3CharacterGraphic: '',
  player4CharacterGraphic: '',

  player1WeaponGraphic: '',
  player2WeaponGraphic: '',
  player3WeaponGraphic: '',
  player4WeaponGraphic: '',
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

    default:
      break;
  }
  return newState;
}


// -------- DISPATCHERS -----------
