import {takeEvery, put, call} from 'redux-saga/effects';
import {AUTH_LOGIN, AUTH_PENDING, AUTH_REGISTER} from '../constants/types';
import axios from 'axios';
import {LINK_LOGIN, LINK_REGISTER} from '../constants/links';
import {aLofinSuccess, aLogin} from '../actions/auth';
import {setUserId, setUserToken} from '../actions/user';

// login saga

const fetchLogin = payload => {
  return axios.post(LINK_LOGIN, {
    ...payload,
  });
};

function* loginWatcher() {
  yield takeEvery(AUTH_LOGIN, loginWorker);
}

function* loginWorker({payload}) {
  try {
    const response = yield call(() => fetchLogin(payload));

    yield put(setUserId(response.data.userId));
    yield put(setUserToken(response.data.token));
    yield put(aLofinSuccess());

    payload.navigation.navigate('AccountRoute');
  } catch (err) {
    payload.navigation.navigate('Error', {
      prevScreen: 'Login',
      text: 'При авторизації сталася ',
    });
  }
}

// register saga

const fetchRegister = registerData => axios.post(LINK_REGISTER, registerData);

function* registerWatcher() {
  yield takeEvery(AUTH_REGISTER, registerWorker);
}

function* registerWorker({payload}) {
  try {
    yield call(() => fetchRegister(payload));

    payload.navigation.navigate('Success', {
      prevScreen: 'Login',
      text: 'Реєстрація пройшла ',
    });
  } catch (err) {
    payload.navigation.navigate('Error', {
      prevScreen: 'Registry',
      text: 'Під час реєстрації сталася ',
      data: err.data.message,
    });
  }
}

export {loginWatcher, registerWatcher};
