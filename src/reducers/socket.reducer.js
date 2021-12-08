import {SET_SOCKET_IO_CONNECTION} from '../constants/types';

const initialState = {
  socketIO: null,
};

export const socketIOReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_SOCKET_IO_CONNECTION:
      return {
        ...state,
        socketIO: payload.socket,
      };
    default:
      return {
        ...state,
      };
  }
};
