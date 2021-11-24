import {USER_SET_TOKEN, USER_SET_USER_ID} from '../constants/types';

export const setUserId = ({userId}) => ({
  type: USER_SET_USER_ID,
  payload: {
    userId,
  },
});

export const setUserToken = ({token}) => ({
  type: USER_SET_TOKEN,
  payload: {
    token,
  },
});
