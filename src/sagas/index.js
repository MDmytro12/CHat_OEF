import {all} from '@redux-saga/core/effects';
import {loginWatcher, registerWatcher} from './auth';
import {createDialogWatcher} from './dialog.saga';
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
  ]);
}
