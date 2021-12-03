import axios from 'axios';
import {takeEvery, call, put} from 'redux-saga/effects';
import {setUserAvatar, setUserInfo} from '../actions/user';
import {ERROR_INTERNET_CONNECTION} from '../constants/error';
import {
  LINK_CHANGE_AVATAR,
  LINK_GET_USER_AVATAR,
  LINK_GET_USER_INFO,
} from '../constants/links';
import {
  USER_CHANGE_AVATAR,
  USER_GET_AVATAR,
  USER_GET_USERINFO,
} from '../constants/types';

const fetchUserInfo = ({token, userId}) =>
  axios.get(LINK_GET_USER_INFO, {
    headers: {authorization: 'token'},
    params: {userId},
  });

function* getUserInfoWatcher() {
  yield takeEvery(USER_GET_USERINFO, getUserInfoWorker);
}

function* getUserInfoWorker({payload}) {
  try {
    const data = yield call(() => fetchUserInfo(payload));

    yield put(
      setUserInfo({
        username: data.data.username,
      }),
    );
  } catch (err) {
    alert(ERROR_INTERNET_CONNECTION);
  }
}

// get user avatar

const fetchUserAvatar = ({token, userId}) =>
  axios.post(LINK_GET_USER_AVATAR, {userId}, {headers: {authorization: token}});

function* getUserAvatarWatcher() {
  yield takeEvery(USER_GET_AVATAR, getUserAvatarWorker);
}

function* getUserAvatarWorker({payload}) {
  try {
    const data = yield call(() => fetchUserAvatar(payload));
    yield put(setUserAvatar(data.data.uri));
  } catch (err) {
    alert(ERROR_INTERNET_CONNECTION);
  }
}

// change user avatar

const changeUserAvatar = ({token, formData}) =>
  axios({
    method: 'post',
    url: LINK_CHANGE_AVATAR,
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data: formData,
  });

function* changeUserAvatarWatcher() {
  yield takeEvery(USER_CHANGE_AVATAR, changeUserAvatarWorker);
}

function* changeUserAvatarWorker({payload}) {
  try {
    let formData = new FormData();
    formData.append('userId', payload.userId);
    formData.append('image', payload.img);
    payload = {
      token: payload.token,
      formData,
    };
    const data = yield call(() => changeUserAvatar(payload));
    yield put(setUserAvatar(data.data.uri));
  } catch (err) {
    alert(ERROR_INTERNET_CONNECTION);
  }
}

export {getUserInfoWatcher, getUserAvatarWatcher, changeUserAvatarWatcher};
