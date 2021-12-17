import axios from 'axios';
import {takeEvery, put, call} from 'redux-saga/effects';
import {
  dialogError,
  dialogPending,
  dialogSuccess,
  getAllDialog,
  setAllDialogs,
} from '../actions/dialog';
import {searchError} from '../actions/search';
import {
  ERROR_DIALOG_ALREADY_EXISTS,
  ERROR_INTERNET_CONNECTION,
} from '../constants/error';
import {
  LINK_CREATE_DIALOG,
  LINK_DELETE_DIALOF_BY_ID,
  LINK_GET_ALL_DIALOGS,
} from '../constants/links';
import {DELETE_DIALOG_SUCCESS} from '../constants/success';
import {
  CREATE_DIALOG,
  DIALOG_DELETE_BY_ID,
  GET_ALL_DIALOGS,
} from '../constants/types';

// createDialog

const fetchCreateDialog = ({token, userId, partnerId}) =>
  axios.post(
    LINK_CREATE_DIALOG,
    {partnerId, userId},
    {headers: {Authorization: token}},
  );

function* createDialogWatcher() {
  yield takeEvery(CREATE_DIALOG, createDialogWorker);
}

function* createDialogWorker({payload}) {
  try {
    yield put(dialogPending());
    yield call(() => fetchCreateDialog(payload));

    yield put(dialogSuccess());
    yield put(getAllDialog(payload.token));

    payload.navigation.navigate('DialogItem', {
      prevScreen: 'DialogItem',
      text: 'Діалог створено ',
    });
  } catch (err) {
    yield put(searchError());
    yield put(dialogError());
    if (err?.response && err.response.status === 405) {
      alert(ERROR_DIALOG_ALREADY_EXISTS);
      return;
    }
    alert(ERROR_INTERNET_CONNECTION);
  }
}

// get all dialogs

const fetchGetAllDialogs = ({token, userId}) =>
  axios.post(LINK_GET_ALL_DIALOGS, {userId}, {headers: {Authorization: token}});

function* getAllDialogsWatcher() {
  yield takeEvery(GET_ALL_DIALOGS, getAllDialogWorker);
}

function* getAllDialogWorker({payload}) {
  try {
    yield put(dialogPending());
    const {data} = yield call(() => fetchGetAllDialogs(payload));
    yield put(setAllDialogs(data.dialogs));

    yield put(dialogSuccess());
  } catch (err) {
    yield put(dialogError());
    alert(ERROR_INTERNET_CONNECTION);
  }
}

// delete dialog by id

const fetchDeleteDialogById = ({token, dialogId}) =>
  axios.post(
    LINK_DELETE_DIALOF_BY_ID,
    {
      dialogId,
    },
    {headers: {Authorization: token}},
  );

function* deleteDialogByIdWatcher() {
  yield takeEvery(DIALOG_DELETE_BY_ID, deleteDialogByIdWorker);
}

function* deleteDialogByIdWorker({payload}) {
  try {
    yield put(dialogPending());
    const res = yield call(() => fetchDeleteDialogById(payload));

    if (res.status === 200) {
      alert(DELETE_DIALOG_SUCCESS);
      yield put(getAllDialog(payload.token));
      yield put(dialogSuccess());
    }
  } catch (err) {
    yield put(dialogError());
    console.log('ERROR : ', err.message);
    alert(ERROR_INTERNET_CONNECTION);
  }
}
export {createDialogWatcher, getAllDialogsWatcher, deleteDialogByIdWatcher};
