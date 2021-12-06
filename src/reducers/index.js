import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import {dialogReducer} from './dialog.reducer';
import {searchReducer} from './search.reduser';
import {userReducer} from './user.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  search: searchReducer,
  dialog: dialogReducer,
});

export default rootReducer;
