import {
  DISABLE_IMAGE_TYPE,
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
    default:
      return state;
  }
};
