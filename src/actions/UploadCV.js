import {
  REQUESTED_UPLOAD_CV,
  UPLOAD_CV,
  UPLOAD_CV_SUCCESS,
  UPLOAD_CV_FAILED,
} from 'constants/ActionTypes';


export const requestUploadCV = (file) => {
  return { 
    type: REQUESTED_UPLOAD_CV, 
    cvFile: file
  }
};

export const cvUpload  = () => {
  return {
    type: UPLOAD_CV
  };
};

export const cvUploadSuccess  = (data) => {
  return {
    type: UPLOAD_CV_SUCCESS,
    data: data
  };
};

export const cvUploadError  = () => {
  return {
    type: UPLOAD_CV_FAILED
  };
};