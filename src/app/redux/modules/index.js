import { combineReducers } from 'redux';
import user from './user/reducer';
import rooms from './rooms/reducer';

const rootReducer = combineReducers({
  user,
  rooms
});

export default rootReducer;