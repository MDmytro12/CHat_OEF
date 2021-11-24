import {AUTH_LOGIN_ERROR, AUTH_LOGIN_SUCCESS} from '../constants/types';

const initialState = {
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
      };
    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
};

export default authReducer;
