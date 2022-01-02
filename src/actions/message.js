import {
  DISABLE_AUDIO_TYPE,
  DISABLE_DOCUMENT_TYPE,
  DISABLE_IMAGE_TYPE,
  ENABLE_AUDIO_TYPE,
  ENABLE_DOCUMENT_TYPE,
  ENABLE_IMAGE_TYPE,
  GET_ALL_MESSAGES,
  SEND_MESSAGE_AUDIO,
  SEND_MESSAGE_DOCUMENT,
  SEND_MESSAGE_IMAGE,
  SEND_NEW_MESSAGE,
  SET_ALL_MESSAGES,
  SET_MESSAGE_READED,
  SET_MSG_AUDIO,
  SET_MSG_DOCUMENT,
  SET_MSG_IMAGE,
} from '../constants/types';

export const sendMessageImg = (img, userId, partnerId, dialogId, token) => ({
  type: SEND_MESSAGE_IMAGE,
  payload: {
    img,
    userId,
    partnerId,
    dialogId,
    token,
  },
});

export const enableImageTyping = () => ({type: ENABLE_IMAGE_TYPE});

export const disableImgTyping = () => ({type: DISABLE_IMAGE_TYPE});

export const sendMessageDocument = (
  document,
  userId,
  partnerId,
  dialogId,
  token,
) => ({
  type: SEND_MESSAGE_DOCUMENT,
  payload: {
    document,
    userId,
    partnerId,
    dialogId,
    token,
  },
});

export const enableDocumentType = () => ({type: ENABLE_DOCUMENT_TYPE});

export const disableDocumentType = () => ({type: DISABLE_DOCUMENT_TYPE});

export const sendMessageAudio = (
  audio,
  userId,
  partnerId,
  dialogId,
  token,
) => ({
  type: SEND_MESSAGE_AUDIO,
  payload: {
    audio,
    userId,
    partnerId,
    dialogId,
    token,
  },
});

export const disableAudioType = () => ({type: DISABLE_AUDIO_TYPE});

export const enableAudioType = () => ({type: ENABLE_AUDIO_TYPE});

export const setMsgImage = image => ({
  type: SET_MSG_IMAGE,
  payload: {
    image,
  },
});

export const setMsgAudio = audio => ({
  type: SET_MSG_AUDIO,
  payload: {
    audio,
  },
});

export const setMsgDocument = document => ({
  type: SET_MSG_DOCUMENT,
  payload: {
    document,
  },
});

export const setMessageReaded = (msgId, dialogId) => ({
  type: SET_MESSAGE_READED,
  payload: {msgId, dialogId},
});

export const sendNewMessage = newMsg => ({
  type: SEND_NEW_MESSAGE,
  payload: {newMsg},
});

export const setAllMessages = allMessages => ({
  type: SET_ALL_MESSAGES,
  payload: {allMessages},
});

export const getAllMessages = dialogId => ({
  type: GET_ALL_MESSAGES,
  payload: {dialogId},
});
