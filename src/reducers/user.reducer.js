import {
  TOGGLE_SCREEN,
  USER_EXIT,
  USER_SET_AVATAR,
  USER_SET_TOKEN,
  USER_SET_USERINFO,
  USER_SET_USER_ID,
} from '../constants/types';

const initialState = {
  userId: null,
  token: null,
  avatar:
    'https://st4.depositphotos.com/1000507/24488/v/600/depositphotos_244889634-stock-illustration-user-profile-picture-isolate-background.jpg',
  username: null,
  online: false,
  toggle: false,
};

export const userReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case USER_SET_USER_ID:
      return {
        ...state,
        userId: payload.userId,
        online: true,
      };
    case USER_SET_TOKEN:
      return {
        ...state,
        token: payload.token,
      };
    case USER_SET_USERINFO:
      return {
        ...state,
        ...payload,
      };
    case USER_SET_AVATAR:
      return {
        ...state,
        avatar: payload.uri,
      };
    case USER_EXIT:
      return {
        token: null,
        userId: null,
        username: null,
        online: false,
        avatar:
          'https://st4.depositphotos.com/1000507/24488/v/600/depositphotos_244889634-stock-illustration-user-profile-picture-isolate-background.jpg',
      };
    case TOGGLE_SCREEN:
      return {
        ...state,
        toggle: !payload.toggle,
      };
    default:
      return state;
  }
};
