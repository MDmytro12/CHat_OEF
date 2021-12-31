import {
  DISABLE_AUDIO_TYPE,
  DISABLE_DOCUMENT_TYPE,
  DISABLE_IMAGE_TYPE,
  ENABLE_AUDIO_TYPE,
  ENABLE_DOCUMENT_TYPE,
  ENABLE_IMAGE_TYPE,
  SEND_MESSAGE_IMAGE,
} from '../constants/types';

const initialState = {
  imageTyping: false,
  documentTyping: false,
  audioTyping: false,
};

export const messageReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ENABLE_IMAGE_TYPE:
      return {
        ...state,
        imageTyping: true,
      };
    case DISABLE_IMAGE_TYPE:
      return {
        ...state,
        imageTyping: false,
      };
    case DISABLE_DOCUMENT_TYPE:
      return {
        ...state,
        documentTyping: false,
      };
    case ENABLE_DOCUMENT_TYPE:
      return {
        ...state,
        documentTyping: true,
      };
    case ENABLE_AUDIO_TYPE:
      return {
        ...state,
        audioTyping: true,
      };
    case DISABLE_AUDIO_TYPE:
      return {
        ...state,
        audioTyping: false,
      };
    default:
      return state;
  }
};
