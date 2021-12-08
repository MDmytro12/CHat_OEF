import {takeEvery, put, call} from 'redux-saga/effects';
import {AUTH_LOGIN, AUTH_REGISTER} from '../constants/types';
import axios from 'axios';
import {LINK_LOGIN, LINK_REGISTER} from '../constants/links';
import {
  aLofinSuccess,
  aLoginError,
  aLoginPending,
  aRegisterError,
  aRegisterSuccess,
} from '../actions/auth';
import {setUserId, setUserToken} from '../actions/user';
import {ERROR_INTERNET_CONNECTION} from '../constants/error';

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
    yield put(aLoginPending());

    const response = yield call(() => fetchLogin(payload));

    yield put(setUserId(response.data.userId));
    yield put(setUserToken(response.data.token));

    yield put(aLofinSuccess());

    payload.navigation.navigate('AccountRoute');
  } catch (err) {
    yield put(aLoginError());
    if (err.message === 'Network Error') {
      alert(ERROR_INTERNET_CONNECTION);
      return;
    }
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
    yield put(aLoginPending());

    yield call(() => fetchRegister(payload));

    payload.navigation.navigate('Success', {
      prevScreen: 'Login',
      text: 'Реєстрація пройшла ',
    });
    yield put(aRegisterSuccess());
  } catch (err) {
    yield put(aRegisterError());
    if (err.message === 'Network Error') {
      alert(ERROR_INTERNET_CONNECTION);
      return;
    }
    payload.navigation.navigate('Error', {
      prevScreen: 'Registry',
      text: 'Під час реєстрації сталася ',
      data: err.data.message,
    });
  }
}

export {loginWatcher, registerWatcher};
