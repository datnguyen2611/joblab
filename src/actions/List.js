import axios from 'axios';  
import {
  REQUESTED_INIT_LIST,
  INIT_LIST,
  INIT_LIST_SUCCESS,
  INIT_LIST_FAILED,
  
  /*REQUESTED_INIT_COUNTRY,
  INIT_COUNTRY,
  INIT_COUNTRY_SUCCESS,
  INIT_COUNTRY_FAILED,
  
  REQUESTED_INIT_DIALCODE,
  INIT_DIALCODE,
  INIT_DIALCODE_SUCCESS,
  INIT_DIALCODE_FAILED,
  
  REQUESTED_INIT_COMPANY,
  INIT_COMPANY,
  INIT_COMPANY_SUCCESS,
  INIT_COMPANY_FAILED,
  
  REQUESTED_INIT_INDUSTRY,
  INIT_INDUSTRY,
  INIT_INDUSTRY_SUCCESS,
  INIT_INDUSTRY_FAILED,
  
  REQUESTED_INIT_JOBTYPE,
  INIT_JOBTYPE,
  INIT_JOBTYPE_SUCCESS,
  INIT_JOBTYPE_FAILED*/
} from 'constants/ActionTypes';


export const requestInitList = () => {
  return { type: REQUESTED_INIT_LIST }
};

export const initList = () => {
  return {
    type: INIT_LIST,
  };
};

export const initListSuccess  = (data) => {
  return {
    type: INIT_LIST_SUCCESS,
    data: data
  };
};

export const initListError  = () => {
  return {
    type: INIT_LIST_FAILED
  };
};



/*//Country List
export const requestInitCountry = () => {
  return { type: REQUESTED_INIT_COUNTRY }
};

export const initCountry  = () => {
  return {
    type: INIT_COUNTRY,
  };
};

export const initCountrySuccess  = (data) => {
  return {
    type: INIT_COUNTRY_SUCCESS,
    data: data
  };
};

export const initCountryError  = () => {
  return {
    type: INIT_COUNTRY_FAILED
  };
};
///////////////////////////////////////////////////////////

//Industry List
export const requestInitIndustry = () => {
  return { type: REQUESTED_INIT_INDUSTRY }
};

export const initIndustry  = () => {
  return {
    type: INIT_INDUSTRY,
  };
};

export const initIndustrySuccess  = (data) => {
  return {
    type: INIT_INDUSTRY_SUCCESS,
    data: data
  };
};

export const initIndustryError  = () => {
  return {
    type: INIT_INDUSTRY_FAILED
  };
};
///////////////////////////////////////////////////////////

//Job Type List
export const requestInitJobType = () => {
  return { type: REQUESTED_INIT_JOBTYPE }
};

export const initJobType  = () => {
  return {
    type: INIT_JOBTYPE,
  };
};

export const initJobTypeSuccess  = (data) => {
  return {
    type: INIT_JOBTYPE_SUCCESS,
    data: data
  };
};

export const initJobTypeError  = () => {
  return {
    type: INIT_JOBTYPE_FAILED
  };
};
///////////////////////////////////////////////////////////


//Dial Code List
export const requestInitDialCode = () => {
  return { type: REQUESTED_INIT_DIALCODE }
};

export const initDialCode  = () => {
  return {
    type: INIT_DIALCODE,
  };
};

export const initDialCodeSuccess  = (data) => {
  return {
    type: INIT_DIALCODE_SUCCESS,
    data: data
  };
};

export const initDialCodeError  = () => {
  return {
    type: INIT_DIALCODE_FAILED
  };
};

///////////////////////////////////////////////////////////
//Company List
export const requestInitCompany = () => {
  return { type: REQUESTED_INIT_COMPANY }
};

export const initCompany  = () => {
  return {
    type: INIT_COMPANY,
  };
};

export const initCompanySuccess  = (data) => {
  return {
    type: INIT_COMPANY_SUCCESS,
    data: data
  };
};

export const initCompanyError  = () => {
  return {
    type: INIT_COMPANY_FAILED
  };
};*/