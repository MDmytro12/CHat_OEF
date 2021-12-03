import {
  USER_CHANGE_AVATAR,
  USER_EXIT,
  USER_GET_AVATAR,
  USER_GET_USERINFO,
  USER_SET_AVATAR,
  USER_SET_TOKEN,
  USER_SET_USERINFO,
  USER_SET_USER_ID,
} from '../constants/types';

export const setUserId = userId => ({
  type: USER_SET_USER_ID,
  payload: {
    userId,
  },
});

export const setUserToken = token => ({
  type: USER_SET_TOKEN,
  payload: {
    token,
  },
});

export const getUserInfo = (userId, token) => ({
  type: USER_GET_USERINFO,
  payload: {token, userId},
});

export const setUserInfo = userInfo => ({
  type: USER_SET_USERINFO,
  payload: userInfo,
});

export const getUserAvatar = (userId, token) => ({
  type: USER_GET_AVATAR,
  payload: {userId, token},
});

export const setUserAvatar = uri => {
  return {type: USER_SET_AVATAR, payload: {uri}};
};

export const changeUserAvatar = (userId, token, img) => ({
  type: USER_CHANGE_AVATAR,
  payload: {userId, token, img},
});

export const userExit = () => ({type: USER_EXIT});
