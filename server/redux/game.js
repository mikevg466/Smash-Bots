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
  
  function getPlayerIndex(arr=newState.players){
    var playerIndex;
    arr.forEach((player,index) => {
      if(player.id === action.player.id){
        playerIndex = index
      }
    })
    return playerIndex
  }

  switch (action.type) {

    case ADD_PLAYER:
      const playersArrCopy = newState.players.slice(0)
      playersArrCopy.push(action.player);
      newState.players = playersArrCopy
      break;

    case REMOVE_PLAYER:
      const playerRemovedArr = newState.players.slice(0).splice(getPlayerIndex(),1)
      newState.players = playerRemovedArr
      break;

    case UPDATE_PLAYER:
      const playerUpdatedArr = newState.players.slice(0).splice(getPlayerIndex(),1, action.player)
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

// const me = () =>
//   dispatch =>
//     axios.get('/auth/me')
//       .then(res => dispatch(getUser(res.data || defaultUser)))
//       .catch(console.error.bind(console));

// export const auth = (email, password, username, method) =>
//   dispatch =>
//     axios.post(`/auth/${method}`, { email, password, username })
//       .then(res => {
//         dispatch(getUser(res.data));
//         browserHistory.push('/');
//       })
//       .catch(error =>
//         dispatch(getUser({ error })));

// export const logout = () =>
//   dispatch =>
//     axios.post('/auth/logout')
//       .then(res => {
//         dispatch(removeUser());
//         browserHistory.push('/login');
//       })
//       .catch(console.error.bind(console));

// export const fetchUser = user =>
//   dispatch =>
//     axios.get(`/api/users/${user.id}`)
//       .then(res => {
//         dispatch(getUser(res.data));
//       })
//       .catch(console.error.bind(console));

// export const equipWeapon = (user, weapon) =>
//   dispatch =>
//     axios.post(`/api/users/${user.id}/items`, weapon)
//       .then(res => {
//         dispatch(getUser(res.data));
//       })
//       .catch(console.error.bind(console));

// export const equipArmor = (user, armor) =>
//   dispatch =>
//     axios.post(`/api/users/${user.id}/armor`, armor)
//       .then(res => {
//         dispatch(getUser(res.data));
//       })
//       .catch(console.error.bind(console));

// export const purchaseItem = (user, item) =>
//   dispatch =>
//     axios.post(`/api/users/${user.id}/items`, item)
//       .then(res => {
//         dispatch(getUser(res.data));
//       })
//       .catch(console.error.bind(console));
