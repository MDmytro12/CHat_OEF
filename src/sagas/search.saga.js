import axios from 'axios';
import {takeEvery, put, call} from 'redux-saga/effects';
import {
  searchError,
  searchPending,
  searchSuccess,
  setSearchData,
} from '../actions/search';
import {
  ERROR_ID_NOT_EXISTS,
  ERROR_INTERNET_CONNECTION,
} from '../constants/error';
import {LINK_SEARCH_USER} from '../constants/links';
import {FIND_USER_BY_ID} from '../constants/types';

const findUserFetch = ({token, searchUserId, userId}) =>
  axios.post(
    LINK_SEARCH_USER,
    {
      searchUserId,
      userId,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  );

function* searchUserWatcher() {
  yield takeEvery(FIND_USER_BY_ID, searchUserByIdWorker);
}

function* searchUserByIdWorker({payload}) {
  try {
    yield put(searchPending());

    const userData = yield call(() => findUserFetch(payload));

    yield put(setSearchData(userData.data));

    yield put(searchSuccess());
  } catch (err) {
    yield put(searchError());
    if (err?.response?.status && err.response.status === 400) {
      alert(ERROR_ID_NOT_EXISTS);
      return;
    }
    if (err.message === 'Network Error') {
      alert(ERROR_INTERNET_CONNECTION);
      return;
    }
  }
}

export {searchUserWatcher};
