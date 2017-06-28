const axios = require('axios');

//------- ACTIONS -------
const ADD_USER = 'ADD_USER';          // when user connects to room
const REMOVE_USER = 'REMOVE_USER';    // when user disconnects from room
const LOAD_USERS = 'LOAD_USERS';      // initial load of all users
const UPDATE_USER = 'UPDATE_USER';    // update a user during game

// ------ ACTION CREATORS -------

const addUser = user => ({ type: ADD_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const loadUsers = () => ({ type: LOAD_USERS });
const updateUser = user => ({ type: UPDATE_USER});


// ------- INIT STATE --------
const initialState = {
  currentUsers: []
}


// ------- REDUCERS ------------
module.exports = function (state = initialState, action) {
  const newState = Object.assign({}, state );
  switch (action.type) {
    case ADD_USER:
      const updatedCurrentUsers = newState.currentUsers.slice(0);
      updatedCurrentUsers.push(action.user);
      newState.currentUsers = updatedCurrentUsers
      break;
    case REMOVE_USER:
      newState.currentUsers = newState.currentUsers.slice(0).splice(newState.currentUsers.indexOf(action.user),1)
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
