import {initUser, initUserSuccess, initUserError} from 'actions/Auth';
import { put,call } from 'redux-saga/effects';
import axios from "axios";

export function* fetchUserInfo() {
  try {
    yield put(initUser());
    const data = yield call(() => {
      return initState()
      }
    );
    yield put(initUserSuccess(data));
  } catch (error) {
    yield put(initUserError());
  }
}

function initState() {
  console.log("initState triggered");
  var data = axios.post('/api/redux/initUser')
    .then(res => {
      return res.data;
    })
    .catch(function (err) {
      console.log(err);
      return {isLoggedin:false};
    });
  return data;
}
