import {
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SUCCESS,
  AUTH_PENDING,
  AUTH_REGISTER_ERROR,
  AUTH_REGISTER_SUCCESS,
  USER_EXIT,
} from '../constants/types';

const initialState = {
  isAuth: false,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
      };
    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
      };
    case AUTH_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case USER_EXIT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
