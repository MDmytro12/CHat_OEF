import {
  DISABLE_IMAGE_TYPE,
  ENABLE_IMAGE_TYPE,
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
