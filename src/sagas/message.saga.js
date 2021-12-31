import axios from 'axios';
import {call, takeEvery} from 'redux-saga/effects';
import {LINK_SEND_IMAGE} from '../constants/links';
import {SEND_MESSAGE_IMAGE} from '../constants/types';

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

    const result = yield call(() =>
      fetchSendImage({
        formData,
        token: payload.token,
      }),
    );

    console.log('SUCCESSFUL : ', result.data);
  } catch (err) {
    console.log('ERROR : ', err);
  }
}

export {sendImageWatcher};
