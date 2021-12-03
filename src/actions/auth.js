import {
  AUTH_LOGIN,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SUCCESS,
  AUTH_PENDING,
  AUTH_REGISTER,
  AUTH_REGISTER_ERROR,
  AUTH_REGISTER_SUCCESS,
  USER_SET_USER_ID,
} from '../constants/types';

export const aLogin = ({login, password, navigation}) => ({
  type: AUTH_LOGIN,
  payload: {
    login,
    password,
    navigation,
  },
});

export const aLofinSuccess = () => ({type: AUTH_LOGIN_SUCCESS});

export const aLoginError = () => ({type: AUTH_LOGIN_ERROR});

export const aLoginPending = () => ({type: AUTH_PENDING});

export const aRegister = ({login, username, password, navigation}) => {
  return {
    type: AUTH_REGISTER,
    payload: {
      login,
      username,
      password,
      navigation,
    },
  };
};

export const aRegisterError = () => ({type: AUTH_REGISTER_ERROR});

export const aRegisterSuccess = () => ({type: AUTH_REGISTER_SUCCESS});

export const aExit = () => ({type: USER_EXIT});
