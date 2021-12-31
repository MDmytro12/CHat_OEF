import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import {dialogReducer} from './dialog.reducer';
import {messageReducer} from './message.reducer';
import {searchReducer} from './search.reduser';
import {socketIOReducer} from './socket.reducer';
import {userReducer} from './user.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  search: searchReducer,
  dialog: dialogReducer,
  socketIO: socketIOReducer,
  message: messageReducer,
});

export default rootReducer;
