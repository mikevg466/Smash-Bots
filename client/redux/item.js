import axios from 'axios';
import { browserHistory } from 'react-router';

//------- ACTIONS -------
const LOAD_ITEMS = 'LOAD_ITEMS';
const SELECT_ITEM = 'SELECT_ITEM';


// ------ ACTION CREATORS -------
const loadItems = items => ({ type: LOAD_ITEMS, items });
const selectItem = (item) => ({ type: SELECT_ITEM, item });


// ------- INIT STATE --------
const initState = {
  itemsList: [],
  selectedItem: {},
};


// ------- REDUCERS ------------
export default function (state = initState, action) {
  const newState = Object.assign({}, state )
  switch (action.type) {
    case LOAD_ITEMS:
      newState.itemsList = action.items;
      break;

    case SELECT_ITEM:
      newState.selectedItem = action.item;
      break;

    default:
      return newState;
  }
  return newState;
}


// -------- DISPATCHERS -----------
export const fetchItems = () =>
  dispatch =>
    axios.get('/api/items')
      .then(res => dispatch(loadItems(res.data || [] )))
      .catch(console.error.bind(console));

export const fetchItem = (itemId) =>
  dispatch =>
    axios.get(`/api/items/${itemId}`)
      .then(res => dispatch(selectItem(res.data || {} )))
      .catch(console.error.bind(console));
