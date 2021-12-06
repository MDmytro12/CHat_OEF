import {DIALOG_ERROR, DIALOG_PENDING, DIALOG_SUCCESS} from '../constants/types';

const initialState = {
  allDialogs: [],
  isLoading: false,
};

export const dialogReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case DIALOG_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case DIALOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case DIALOG_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
