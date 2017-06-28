import { combineReducers } from 'redux';
import user from './user';
import item from './item';
import game from './game';

export default combineReducers({
   user,
   item,
   game,
   lobby,
  });
