import {
  fetchUserInfo,
} from 'redux_saga/Auth';

import {
  fetchListInfo,
  /*fetchCountryInfo,
  fetchDialCodeInfo,
  fetchCompanyInfo,
  fetchIndustryInfo,
  fetchJobTypeInfo*/
} from 'redux_saga/List';

import {
  fetchCVInfo,
} from 'redux_saga/UploadCV';

import createSagaMiddleware from 'redux-saga';
import {takeEvery, all} from 'redux-saga/effects';

import {
  REQUESTED_INIT_USER,
  REQUESTED_INIT_LIST,
  /*REQUESTED_INIT_COUNTRY,
  REQUESTED_INIT_DIALCODE,
  REQUESTED_INIT_COMPANY,
  REQUESTED_INIT_INDUSTRY,
  REQUESTED_INIT_JOBTYPE,*/
  REQUESTED_UPLOAD_CV,
} from "constants/ActionTypes";

//create saga
export const sagaMiddleware = createSagaMiddleware();


export function* rootSaga() {
  yield all([
    watchFetchUserData(),
    watchFetchListData(),
    /*watchFetchCountryData(),
    watchFetchDialCodeData(),
    watchFetchCompanyData(),
    watchFetchIndustryData(),
    watchFetchJobTypeData(),*/
    watchFetchCVData(),
  ])
}


//watching actions
function* watchFetchUserData() {
  yield takeEvery(REQUESTED_INIT_USER, fetchUserInfo);
}
function* watchFetchListData() {
  yield takeEvery(REQUESTED_INIT_LIST, fetchListInfo);
}
/*function* watchFetchCountryData() {
  yield takeEvery(REQUESTED_INIT_COUNTRY, fetchCountryInfo);
}
function* watchFetchDialCodeData() {
  yield takeEvery(REQUESTED_INIT_DIALCODE, fetchDialCodeInfo);
}
function* watchFetchCompanyData() {
  yield takeEvery(REQUESTED_INIT_COMPANY, fetchCompanyInfo);
}
function* watchFetchIndustryData() {
  yield takeEvery(REQUESTED_INIT_INDUSTRY, fetchIndustryInfo);
}
function* watchFetchJobTypeData() {
  yield takeEvery(REQUESTED_INIT_JOBTYPE, fetchJobTypeInfo);
}*/
function* watchFetchCVData() {
  yield takeEvery(REQUESTED_UPLOAD_CV, fetchCVInfo());
}