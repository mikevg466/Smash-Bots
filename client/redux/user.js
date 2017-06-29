import axios from 'axios';
import { browserHistory } from 'react-router';

//------- ACTIONS -------
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

// ------ ACTION CREATORS -------

const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

// ------- INIT STATE --------
const initState = {
  id: 0,
  username: '',
  email: '',
  password: '',
  gold: 0,
  level: 0,
  exp: 0,
  items: [],
  weapon: {},
  armor: {}
};


// ------- REDUCERS ------------
export default function (state = initState, action) {
  const newState = Object.assign({}, state );
  switch (action.type) {

    case GET_USER:
      if(action.user)
        Object.keys(newState).forEach(key => {
          newState[key] = action.user[key] || newState[key];
        });
      break;

    case REMOVE_USER:
      return initState;

    default:
      break;
  }
  return newState;
}


// -------- DISPATCHERS -----------
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => dispatch(getUser(res.data || initState)))
      .catch(console.error.bind(console));

export const auth = (email, password, username, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, username })
      .then(res => {
        dispatch(getUser(res.data));
        browserHistory.push('/');
      })
      .catch(error =>
        dispatch(getUser({ error })));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(res => {
        dispatch(removeUser());
        browserHistory.push('/login');
      })
      .catch(console.error.bind(console));

export const fetchUser = user =>
  dispatch =>
    axios.get(`/api/users/${user.id}`)
      .then(res => {
        dispatch(getUser(res.data));
      })
      .catch(console.error.bind(console));

export const equipWeapon = (user, weapon) =>
  dispatch =>
    axios.post(`/api/users/${user.id}/weapon`, weapon)
      .then(res => {
        dispatch(getUser(res.data));
      })
      .catch(console.error.bind(console));

export const equipArmor = (user, armor) =>
  dispatch =>
    axios.post(`/api/users/${user.id}/armor`, armor)
      .then(res => {
        dispatch(getUser(res.data));
      })
      .catch(console.error.bind(console));

export const purchaseItem = (user, item) =>
  dispatch => {
    if(user.gold >= item.price) {
      return axios.post(`/api/users/${user.id}/items`, item)
        .then(res => {
          dispatch(getUser(res.data));
        })
        .catch(console.error.bind(console));
    }
  }
