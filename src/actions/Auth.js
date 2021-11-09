import axios from 'axios';  
import {
  REQUESTED_INIT_USER,
  INIT_USER,
  INIT_USER_SUCCESS,
  INIT_USER_FAILED,
  UPDATE_USER,
} from 'constants/ActionTypes';


export const requestInitUser = () => {
  return { type: REQUESTED_INIT_USER }
};

export const initUser  = () => {
  return {
    type: INIT_USER,
  };
};

export const initUserSuccess  = (data) => {
  return {
    type: INIT_USER_SUCCESS,
    data: data
  };
};

export const initUserError  = () => {
  return {
    type: INIT_USER_FAILED
  };
};

/*
export const updateUser = (payload) => {
  return {
    type: UPDATE_USER,
    payload: payload
  };
};


export function updateUserStatus() {  
  return axios.post('/api/redux/getUserData')
    .then(response => {
      console.log("updateUserStatus");
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    })
}
*/

export function userSignOut() {
  return axios.get('/api/auth/logout')
    .then(response => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    })
}; 