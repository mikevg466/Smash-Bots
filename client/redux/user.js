import axios from 'axios';
import { browserHistory } from 'react-router';

//------- ACTIONS -------
const GET_USER = 'GET_USER';
const LOAD_USER = 'LOAD_USER';
const REMOVE_USER = 'REMOVE_USER';
const EQUIP_WEAPON = 'EQUIP_WEAPON';
const EQUIP_ARMOR = 'EQUIP_ARMOR';
const PURCHASE_ITEM = 'PURCHASE_ITEM';

// ------ ACTION CREATORS -------

const getUser = user => ({ type: GET_USER, user });
const loadUser = user => ({ type: LOAD_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const equip_Weapon = weapon => ({ type: EQUIP_WEAPON, weapon });
const equip_Armor = armor => ({ type: EQUIP_ARMOR, armor });
const purchase_Item = item => ({ type: PURCHASE_ITEM, item });


// ------- INIT STATE --------
const defaultUser = {
  username: '',
  email: '',
  password: '',
  gold: 0,
  level: 0,
  exp: 0,
  purchasedItems: [],
  equippedWeapon: {},
  equippedArmor: {}
};


// ------- REDUCERS ------------
export default function (state = defaultUser, action) {
  const newState = Object.assign({}, state );
  switch (action.type) {
    case GET_USER:
      return action.user;
    case LOAD_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case EQUIP_WEAPON:
      newState.equippedWeapon = action.weapon;
      return newState;
    case EQUIP_ARMOR:
      newState.equippedArmor = action.armor;
      return newState;
    case 'PURCHASE_ITEM':
      newState.purchasedItems.push(action.item);
      return newState;
    default:
      return newState;
  }
}


// -------- DISPATCHERS -----------
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => dispatch(getUser(res.data || defaultUser)))
      .catch(console.error.bind(console));

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
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
    axios.get(`/users/${user.id}`)
      .then(res => {
        dispatch(loadUser(res.data));
      })
      .catch(console.error.bind(console));

export const equipWeapon = weapon =>
  dispatch =>
    axios.get(`/items/${weapon.id}`)
      .then(res => {
        dispatch(equip_Weapon(res.data));
      })
      .catch(console.error.bind(console));

export const equipArmor = armor =>
  dispatch =>
    axios.get(`/items/${armor.id}`)
      .then(res => {
        dispatch(equip_Armor(res.data));
      })
      .catch(console.error.bind(console));

export const purchaseItem = item =>
  dispatch =>
    axios.get(`/items/${item.id}`)
      .then(res => {
        dispatch(purchase_Item(res.data));
      })
      .catch(console.error.bind(console));
