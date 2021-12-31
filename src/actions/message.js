import {
  DISABLE_AUDIO_TYPE,
  DISABLE_DOCUMENT_TYPE,
  DISABLE_IMAGE_TYPE,
  ENABLE_AUDIO_TYPE,
  ENABLE_DOCUMENT_TYPE,
  ENABLE_IMAGE_TYPE,
  SEND_MESSAGE_AUDIO,
  SEND_MESSAGE_DOCUMENT,
  SEND_MESSAGE_IMAGE,
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
