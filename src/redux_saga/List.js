import { put,call } from 'redux-saga/effects';
import {
  initList, initListSuccess, initListError, 
  /*initCountry, initCountrySuccess, initCountryError, 
  initDialCode, initDialCodeSuccess, initDialCodeError,
  initCompany, initCompanySuccess, initCompanyError,
  initIndustry, initIndustrySuccess, initIndustryError,
  initJobType, initJobTypeSuccess, initJobTypeError,*/
} from 'actions/List';
import axios from "axios";

export function* fetchListInfo() {
  try {
    yield put(initList());
    const data = yield call(() => {
      return initState()
      }
    );
    yield put(initListSuccess(data));
  } catch (error) {
    yield put(initListError());
  }
}

function initState() {
  var data = axios.post('/api/redux/initList')
    .then(res => {
      return res.data;
    })
    .catch(function (err) {
      console.log(err);
      return {isSuccess:false};
    });
  return data;
}


/////////////////////////////////////////////////////////////

/*export function* fetchCountryInfo() {
  try {
    yield put(initCountry());
    const data = yield call(() => {
      return initCountryList()
      }
    );
    yield put(initCountrySuccess(data));
  } catch (error) {
    yield put(initCountryError());
  }
}

function initCountryList() {
  var data = axios.post('/api/redux/initCountry')
    .then(res => {
      return res.data;
    })
    .catch(function (err) {
      console.log(err);
      return {isSuccess:false};
    });
  return data;
}

/////////////////////////////////////////////////////////////

export function* fetchIndustryInfo() {
  try {
    yield put(initIndustry());
    const data = yield call(() => {
      return initIndustryList()
      }
    );
    yield put(initIndustrySuccess(data));
  } catch (error) {
    yield put(initIndustryError());
  }
}

function initIndustryList() {
  var data = axios.post('/api/redux/initIndustry')
    .then(res => {
      return res.data;
    })
    .catch(function (err) {
      console.log(err);
      return {isSuccess:false};
    });
  return data;
}

/////////////////////////////////////////////////////////////

export function* fetchJobTypeInfo() {
  try {
    yield put(initJobType());
    const data = yield call(() => {
      return initJobTypeList()
      }
    );
    yield put(initJobTypeSuccess(data));
  } catch (error) {
    yield put(initJobTypeError());
  }
}

function initJobTypeList() {
  var data = axios.post('/api/redux/initJobCategory')
    .then(res => {
      return res.data;
    })
    .catch(function (err) {
      console.log(err);
      return {isSuccess:false};
    });
  return data;
}

//////////////////////////////////////////////////////////////////
export function* fetchDialCodeInfo() {
  try {
    yield put(initDialCode());
    const data = yield call(() => {
      return initDialCodeList()
      }
    );
    yield put(initDialCodeSuccess(data));
  } catch (error) {
    yield put(initDialCodeError());
  }
}

function initDialCodeList() {
  var data = axios.post('/api/redux/initDialCode')
    .then(res => {
      return res.data;
    })
    .catch(function (err) {
      console.log(err);
      return {isSuccess:false};
    });
  return data;
}

//////////////////////////////////////////////////////////////////
export function* fetchCompanyInfo() {
  try {
    yield put(initCompany());
    const data = yield call(() => {
      return initCompanyList()
      }
    );
    yield put(initCompanySuccess(data));
  } catch (error) {
    yield put(initCompanyError());
  }
}

function initCompanyList() {
  var data = axios.post('/api/redux/initCompany')
    .then(res => {
      return res.data;
    })
    .catch(function (err) {
      console.log(err);
      return {isSuccess:false};
    });
  return data;
}*/
