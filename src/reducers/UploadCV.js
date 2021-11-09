import {
  UPLOAD_CV,
  UPLOAD_CV_SUCCESS,
  UPLOAD_CV_FAILED,
} from 'constants/ActionTypes';

const INIT_STATE = {
  uploadLoading: false,
  uploadError: false,
  newCareer: [],
  newEducation: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPLOAD_CV:
      return {...state, 
        uploadLoading: true, 
        uploadError: false,
      };
        
    case UPLOAD_CV_SUCCESS:
      return {...state,
        uploadLoading: false, 
        uploadError: false, 
        ...action.data 
      };
      
    case UPLOAD_CV_FAILED:
      return {...state, 
        uploadLoading:false, 
        uploadError: true
      };
      
    default:
      return state;
  }
};
