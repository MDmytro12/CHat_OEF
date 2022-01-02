import {IP, PORT} from '../constants/config';

export const LINK_LOGIN = `http://${IP}:${PORT}/api/auth/login`;
export const LINK_REGISTER = `http://${IP}:${PORT}/api/auth/register`;
export const LINK_GET_USER_INFO = `http://${IP}:${PORT}/api/user/gui`;
export const LINK_GET_USER_AVATAR = `http://${IP}:${PORT}/api/user/gua`;
export const LINK_CHANGE_AVATAR = `http://${IP}:${PORT}/api/user/cua`;
export const LINK_SEARCH_USER = `http://${IP}:${PORT}/api/user/gubi`;
export const LINK_CREATE_DIALOG = `http://${IP}:${PORT}/api/dialog/cd`;
export const LINK_SOCKET_IO = `http://${IP}:${PORT}`;
export const LINK_GET_ALL_DIALOGS = `http://${IP}:${PORT}/api/dialog/gad`;
export const LINK_DELETE_DIALOF_BY_ID = `http://${IP}:${PORT}/api/dialog/ddbi`;
export const LINK_SEND_IMAGE = `http://${IP}:${PORT}/api/msg/img`;
export const LINK_SEND_DOCUMENT = `http://${IP}:${PORT}/api/msg/pdf`;
export const LINK_SEND_AUDIO = `http://${IP}:${PORT}/api/msg/audio`;
export const LINK_SET_MESSAGE_READED = `http://${IP}:${PORT}/api/msg/sr`;
export const LINK_SEND_NEW_MESSAGE = `http://${IP}:${PORT}/api/msg/cn`;
export const LINK_GET_ALL_MESSAGES = `http://${IP}:${PORT}/api/msg/gam`;
