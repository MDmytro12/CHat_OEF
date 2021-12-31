import {SET_DELIVERY, SET_SOCKET_IO_CONNECTION} from '../constants/types';

const initialState = {
  socketIO: null,
  delivery: null,
};

export const socketIOReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_SOCKET_IO_CONNECTION:
      return {
        ...state,
        socketIO: payload.socket,
      };
    case SET_DELIVERY:
      return {
        ...state,
        delivery: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
