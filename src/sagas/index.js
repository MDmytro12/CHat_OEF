import {all} from '@redux-saga/core/effects';
import {loginWatcher, registerWatcher} from './auth';

export function* allWatchers() {
  yield all([loginWatcher(), registerWatcher()]);
}
