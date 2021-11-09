import axios from "axios";

import {
  INIT_LIST,
  INIT_LIST_SUCCESS,
  INIT_LIST_FAILED,
  
  /*INIT_COUNTRY,
  INIT_COUNTRY_SUCCESS,
  INIT_COUNTRY_FAILED,
  
  INIT_DIALCODE,
  INIT_DIALCODE_SUCCESS,
  INIT_DIALCODE_FAILED,
  
  INIT_COMPANY,
  INIT_COMPANY_SUCCESS,
  INIT_COMPANY_FAILED,
  
  INIT_INDUSTRY,
  INIT_INDUSTRY_SUCCESS,
  INIT_INDUSTRY_FAILED,
  
  INIT_JOBTYPE,
  INIT_JOBTYPE_SUCCESS,
  INIT_JOBTYPE_FAILED,*/
} from "constants/ActionTypes";

const INIT_STATE = {
  initList: {
    listLoading: false,
    listError: false,
    countryList : [],
    dialList : [],
    industryList : [],
    industry_tree_list : [],
    specialityList : [],
    languageList : [],
    searchList : [],
    companyList : [],
    institutionList : [],
    yearList : [],
    jobCategoryList : [],
  },
  /*initCountry: {
    countryLoading: false,
    countryError: false,
  },
  initIndustry: {
    industryLoading: false,
    industryError: false,
  },
  initJobType: {
    jobTypeLoading: false,
    jobTypeError: false,
  },
  initCountry: {
    countryLoading: false,
    countryError: false,
  },
  initDialCode: {
    dialCodeLoading: false,
    dialCodeError: false,
  },
  initCompany: {
    companyLoading: false,
    companyError: false,
  }*/
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_LIST:
      return {...state, 
        listLoading: true,
        listError: false,
      };
    case INIT_LIST_SUCCESS:
       return {...state, 
        listLoading: false,
        listError: false,
        ...action.data 
       };
    case INIT_LIST_FAILED:
      return {...state, 
        userLoading:false, 
        userError: true, 
        ...action.data 
      }; 
      
    /*case INIT_COUNTRY:
      return Object.assign({}, state, {
        initCountry: {
          countryLoading: true,
          countryError: false,
        }
      })
    case INIT_COUNTRY_SUCCESS:
      var obj = Object.assign({}, action.data, {
          countryLoading: false,
          countryError: false,
      })
      return Object.assign({}, 
      state, 
      {initCountry: obj});
      
    case INIT_COUNTRY_FAILED:
      
      return Object.assign({}, state, {
        initCountry: {
          countryLoading: false,
          countryError: true,
        }
      });
    //////////////////////////////////////////////////
    
    case INIT_INDUSTRY:
      return Object.assign({}, state, {
        initIndustry: {
          industryLoading: true,
          industryError: false,
        }
      })
    case INIT_INDUSTRY_SUCCESS:
      obj = Object.assign({}, action.data, {
          industryLoading: false,
          industryError: false,
      })
      return Object.assign({}, 
      state, 
      {initIndustry: obj});
      
    case INIT_INDUSTRY_FAILED:
      
      return Object.assign({}, state, {
        initIndustry: {
          industryLoading: false,
          industryError: true,
        }
      });
      //////////////////////////////////////////////////
    
    case INIT_JOBTYPE:
      return Object.assign({}, state, {
        initJobType: {
          jobTypeLoading: true,
          jobTypeError: false,
        }
      })
    case INIT_JOBTYPE_SUCCESS:
      obj = Object.assign({}, action.data, {
          jobTypeLoading: false,
          jobTypeError: false,
      })
      return Object.assign({}, 
      state, 
      {initJobType: obj});
      
    case INIT_JOBTYPE_FAILED:
      
      return Object.assign({}, state, {
        initJobType: {
          jobTypeLoading: false,
          jobTypeError: true,
        }
      });
      
    //////////////////////////////////////////////////
    
    case INIT_DIALCODE:
      return Object.assign({}, state, {
        initDialCode: {
          dialCodeLoading: true,
          dialCodeError: false,
        }
      })
    case INIT_DIALCODE_SUCCESS:
      obj = Object.assign({}, action.data, {
          dialCodeLoading: false,
          dialCodeError: false,
      })
      return Object.assign({}, 
      state, 
      {initDialCode: obj});
      
    case INIT_DIALCODE_FAILED:
      
      return Object.assign({}, state, {
        initDialCode: {
          dialCodeLoading: false,
          dialCodeError: true,
        }
      });

    //////////////////////////////////////////////////
    
    case INIT_COMPANY:
      return Object.assign({}, state, {
        initCompany: {
          companyLoading: true,
          companyError: false,
        }
      })
    case INIT_COMPANY_SUCCESS:
      obj = Object.assign({}, action.data, {
          companyLoading: false,
          companyError: false,
      })
      return Object.assign({}, 
      state, 
      {initCompany: obj});
      
    case INIT_COMPANY_FAILED:
      
      return Object.assign({}, state, {
        initCompany: {
          companyLoading: false,
          companyError: true,
        }
      });*/
    default:
      return state;
  }
}
