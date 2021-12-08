import {SET_SOCKET_IO_CONNECTION} from '../constants/types';

export const setSocketIo = socket => ({
  type: SET_SOCKET_IO_CONNECTION,
  payload: {socket},
});
