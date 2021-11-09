import {requestUploadCV, cvUpload, cvUploadSuccess, cvUploadError} from 'actions/UploadCV';
import { put,call } from 'redux-saga/effects';
import axios from "axios";

export function* fetchCVInfo(cvFile) {
  try {
    //const action = yield takeLatest(requestUploadCV);
    //action.payload
    yield put(cvUpload());
    const data = yield call((cvFile) => {
      return uploadCV(cvFile)
      }
    );
    yield put(cvUploadSuccess(data));
  } catch (error) {
    yield put(cvUploadError());
  }
}

function uploadCV(cvFile) {
  console.log("uploadCV triggered");
  const formData = new FormData();
  if (cvFile != null) {
    formData.append('cvFile', cvFile);
    var data = axios.post('/api/candidates/set/resume/upload', formData)
    .then(res => {
      return res.data;
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  return data;
}
