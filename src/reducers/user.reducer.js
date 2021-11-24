import {USER_SET_TOKEN, USER_SET_USER_ID} from '../constants/types';

const initialState = {
  userId: null,
  token: null,
};

export const userReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case USER_SET_USER_ID:
      return {
        ...state,
        userId: payload.userId,
      };
    case USER_SET_TOKEN:
      return {
        ...state,
        token: payload.token,
      };
    default:
      return state;
  }
};
