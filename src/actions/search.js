import {
  FIND_USER_BY_ID,
  SEARCH_ERROR,
  SEARCH_PENDING,
  SEARCH_SUCCESS,
  SET_FINDED_DATA,
} from '../constants/types';

export const searchPending = () => ({type: SEARCH_PENDING});

export const searchError = () => ({type: SEARCH_ERROR});

export const searchSuccess = () => ({type: SEARCH_SUCCESS});

export const searchUserById = (searchUserId, userId, token) => ({
  type: FIND_USER_BY_ID,
  payload: {searchUserId, userId, token},
});

export const setSearchData = data => ({
  type: SET_FINDED_DATA,
  payload: {...data},
});
