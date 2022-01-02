import axios from 'axios';
import {Alert} from 'react-native';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {
  disableAudioType,
  disableDocumentType,
  disableImgTyping,
  setAllMessages,
  setMsgAudio,
  setMsgDocument,
  setMsgImage,
} from '../actions/message';
import {ERROR_INTERNET_CONNECTION} from '../constants/error';
import {
  LINK_GET_ALL_MESSAGES,
  LINK_SEND_AUDIO,
  LINK_SEND_DOCUMENT,
  LINK_SEND_IMAGE,
  LINK_SEND_NEW_MESSAGE,
  LINK_SET_MESSAGE_READED,
} from '../constants/links';
import {
  GET_ALL_MESSAGES,
  SEND_MESSAGE_AUDIO,
  SEND_MESSAGE_DOCUMENT,
  SEND_MESSAGE_IMAGE,
  SEND_NEW_MESSAGE,
  SET_MESSAGE_READED,
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
    Alert.alert('Помилка підключення!', ERROR_INTERNET_CONNECTION, [
      {
        text: 'Зрозуміло',
      },
    ]);
  }
}

// msg readed

const fetchReaded = ({dialogId, msgId}) =>
  axios.post(LINK_SET_MESSAGE_READED, {dialogId, msgId});

function* sendReadedWatcher() {
  yield takeEvery(SET_MESSAGE_READED, sendReadedWorker);
}

function* sendReadedWorker({payload}) {
  try {
    yield call(() =>
      fetchReaded({
        msgId: payload.msgId,
        dialogId: payload.dialogId,
      }),
    );
  } catch (err) {}
}

// msg new

const fetchNewMessage = ({newMsg}) =>
  axios.post(LINK_SEND_NEW_MESSAGE, {newMsg}).catch(err => console.log(err));

function* sendNewMessageWatcher() {
  yield takeEvery(SEND_NEW_MESSAGE, sendNewMessageWorker);
}

function* sendNewMessageWorker({payload}) {
  try {
    let n = yield call(() => fetchNewMessage(payload));
  } catch (err) {}
}

// msg all get messages

const fetchGetAllMessages = ({dialogId}) =>
  axios.post(LINK_GET_ALL_MESSAGES, {dialogId}).catch(err => console.log(err));

function* sendGetAllMessagesWatcher() {
  yield takeEvery(GET_ALL_MESSAGES, sendGetAllMessagesWorker);
}

function* sendGetAllMessagesWorker({payload}) {
  try {
    const allMsgs = yield call(() => fetchGetAllMessages(payload));

    yield put(setAllMessages(allMsgs.data.allMessages));
  } catch (err) {}
}

export {
  sendImageWatcher,
  sendAudioWatcher,
  sendDocumentWatcher,
  sendReadedWatcher,
  sendNewMessageWatcher,
  sendGetAllMessagesWatcher,
};
