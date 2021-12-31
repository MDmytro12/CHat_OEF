import {SET_DELIVERY, SET_SOCKET_IO_CONNECTION} from '../constants/types';

export const setSocketIo = socket => ({
  type: SET_SOCKET_IO_CONNECTION,
  payload: {socket},
});

export const setDelivery = delivery => ({
  type: SET_DELIVERY,
  payload: delivery,
});
