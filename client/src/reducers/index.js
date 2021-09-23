import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import players from './players';
import teams from './teams';

export default combineReducers({
  alert,
  auth,
  players,
  teams,
});
