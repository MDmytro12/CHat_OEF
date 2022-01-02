import {
  DISABLE_AUDIO_TYPE,
  DISABLE_DOCUMENT_TYPE,
  DISABLE_IMAGE_TYPE,
  ENABLE_AUDIO_TYPE,
  ENABLE_DOCUMENT_TYPE,
  ENABLE_IMAGE_TYPE,
  IMAGE_TOGGLE,
  SEND_MESSAGE_IMAGE,
  SET_ALL_MESSAGES,
  SET_MSG_AUDIO,
  SET_MSG_DOCUMENT,
  SET_MSG_IMAGE,
} from '../constants/types';

const initialState = {
  imageTyping: false,
  documentTyping: false,
  audioTyping: false,
  image: {},
  document: {},
  audio: {},
  allMessages: [],
  toggle: false,
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
    case SET_MSG_IMAGE:
      return {
        ...state,
        image: payload.image,
      };
    case SET_MSG_AUDIO:
      return {
        ...state,
        audio: payload.audio,
      };
    case SET_MSG_DOCUMENT:
      return {
        ...state,
        document: payload.document,
      };
    case SET_ALL_MESSAGES:
      return {
        ...state,
        allMessages: payload.allMessages,
      };
    case IMAGE_TOGGLE:
      return {
        ...state,
        toggle: !payload,
      };
    default:
      return state;
  }
};
