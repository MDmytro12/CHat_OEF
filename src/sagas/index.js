import {all} from '@redux-saga/core/effects';
import {loginWatcher, registerWatcher} from './auth';
import {
  createDialogWatcher,
  deleteDialogByIdWatcher,
  getAllDialogsWatcher,
} from './dialog.saga';
import {
  sendAudioWatcher,
  sendDocumentWatcher,
  sendImageWatcher,
} from './message.saga';
import {searchUserWatcher} from './search.saga';
import {
  changeUserAvatarWatcher,
  getUserAvatarWatcher,
  getUserInfoWatcher,
} from './user';

export function* allWatchers() {
  yield all([
    loginWatcher(),
    registerWatcher(),
    getUserInfoWatcher(),
    getUserAvatarWatcher(),
    changeUserAvatarWatcher(),
    searchUserWatcher(),
    createDialogWatcher(),
    getAllDialogsWatcher(),
    deleteDialogByIdWatcher(),
    sendImageWatcher(),
    sendAudioWatcher(),
    sendDocumentWatcher(),
  ]);
}
