import { combineReducers } from 'redux';
import user from './user';
import item from './item';
import game from './game';
import lobby from './lobby';

export default combineReducers({
   user,
   item,
   game,
   lobby,
  });
