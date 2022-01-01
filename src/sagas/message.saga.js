import axios from 'axios';
import {Alert} from 'react-native';
import {call, put, takeEvery} from 'redux-saga/effects';
import {
  disableAudioType,
  disableDocumentType,
  disableImgTyping,
  setMsgAudio,
  setMsgDocument,
  setMsgImage,
} from '../actions/message';
import {ERROR_INTERNET_CONNECTION} from '../constants/error';
import {
  LINK_SEND_AUDIO,
  LINK_SEND_DOCUMENT,
  LINK_SEND_IMAGE,
} from '../constants/links';
import {
  SEND_MESSAGE_AUDIO,
  SEND_MESSAGE_DOCUMENT,
  SEND_MESSAGE_IMAGE,
} from '../constants/types';

// send image

const fetchSendImage = ({token, formData}) =>
  axios({
    method: 'POST',
    url: LINK_SEND_IMAGE,
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data: formData,
  });

function* sendImageWatcher() {
  yield takeEvery(SEND_MESSAGE_IMAGE, sendImageWorker);
}

function* sendImageWorker({payload}) {
  try {
    let formData = new FormData();

    formData.append('userId', payload.userId);
    formData.append('partnerId', payload.partnerId);
    formData.append('dialogId', payload.dialogId);
    formData.append('img', payload.img);

    yield call(() =>
      fetchSendImage({
        formData,
        token: payload.token,
      }),
    );

    yield put(disableImgTyping());
    yield put(setMsgImage({}));
  } catch (err) {
    console.log('ERROR image : ', err);
    Alert.alert('Помилка підключення!', ERROR_INTERNET_CONNECTION, [
      {
        text: 'Зрозуміло',
      },
    ]);
  }
}

// send document

const fetchSendDocument = ({token, formData}) =>
  axios({
    method: 'POST',
    url: LINK_SEND_DOCUMENT,
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data: formData,
  });

function* sendDocumentWatcher() {
  yield takeEvery(SEND_MESSAGE_DOCUMENT, sendDocumentWorker);
}

function* sendDocumentWorker({payload}) {
  try {
    let formData = new FormData();

    formData.append('userId', payload.userId);
    formData.append('partnerId', payload.partnerId);
    formData.append('dialogId', payload.dialogId);
    formData.append('pdf', payload.document);

    yield call(() =>
      fetchSendDocument({
        formData,
        token: payload.token,
      }),
    );

    yield put(disableDocumentType());
    yield put(setMsgDocument({}));
  } catch (err) {
    console.log('ERROR document', err);
    Alert.alert('Помилка підключення!', ERROR_INTERNET_CONNECTION, [
      {
        text: 'Зрозуміло',
      },
    ]);
  }
}

// send image

const fetchSendAudio = ({token, formData}) =>
  axios({
    method: 'POST',
    url: LINK_SEND_AUDIO,
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data: formData,
  });

function* sendAudioWatcher() {
  yield takeEvery(SEND_MESSAGE_AUDIO, sendAudioWorker);
}

function* sendAudioWorker({payload}) {
  try {
    let formData = new FormData();

    formData.append('userId', payload.userId);
    formData.append('partnerId', payload.partnerId);
    formData.append('dialogId', payload.dialogId);
    formData.append('audio', payload.audio);

    yield call(() =>
      fetchSendAudio({
        formData,
        token: payload.token,
      }),
    );

    yield put(disableAudioType());
    yield put(setMsgAudio({}));
  } catch (err) {
    console.log('ERROR audio : ', err);
    Alert.alert('Помилка підключення!', ERROR_INTERNET_CONNECTION, [
      {
        text: 'Зрозуміло',
      },
    ]);
  }
}

export {sendImageWatcher, sendAudioWatcher, sendDocumentWatcher};
