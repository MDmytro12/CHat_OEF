import {IP, PORT} from '../constants/config';

export const LINK_LOGIN = `http://${IP}:${PORT}/api/auth/login`;
export const LINK_REGISTER = `http://${IP}:${PORT}/api/auth/register`;
export const LINK_GET_USER_INFO = `http://${IP}:${PORT}/api/user/gui`;
export const LINK_GET_USER_AVATAR = `http://${IP}:${PORT}/api/user/gua`;
export const LINK_CHANGE_AVATAR = `http://${IP}:${PORT}/api/user/cua`;
export const LINK_SEARCH_USER = `http://${IP}:${PORT}/api/user/gubi`;
export const LINK_CREATE_DIALOG = `http://${IP}:${PORT}/api/dialog/cd`;
