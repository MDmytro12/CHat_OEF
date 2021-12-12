import {
  FIND_USER_BY_ID,
  SEARCH_CLEAR_DATA,
  SEARCH_ERROR,
  SEARCH_PENDING,
  SEARCH_SUCCESS,
  SET_FINDED_DATA,
} from '../constants/types';

let intialState = {
  isLoading: false,
  searchedList: [],
  searchedUserId: null,
};

export const searchReducer = function (state = intialState, {type, payload}) {
  switch (type) {
    case SEARCH_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_ERROR:
      return {
        isLoading: false,
        searchedList: [],
        searchedUserId: null,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case SET_FINDED_DATA:
      return {
        ...state,
        searchedList: [{...payload}],
      };
    case SEARCH_CLEAR_DATA:
      return {
        ...intialState,
      };
      break;
    default:
      return {
        ...state,
      };
  }
};
