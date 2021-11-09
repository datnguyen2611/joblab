import axios from "axios";

import {
  INIT_USER,
  INIT_USER_SUCCESS,
  INIT_USER_FAILED,
  //UPDATE_USER
} from "constants/ActionTypes";

const INIT_STATE = {
  userLoading: false,
  userError: false,
  isLoggedin:false,
  userType: '',
  userData: {
    /*name: {
      firstName: '',
      lastName: ''
    }*/
  },
  candidateData: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_USER:
      //{ ...state, selectedClass: action.classId };
      /*
      return Object.assign({
        isLoggedin:false, 
        userError: false,
        userLoading:true 
      }, state)
      */
      return {...state, 
        userLoading: true, 
        userError: false,
        isLoggedin: false,
      };
        
    case INIT_USER_SUCCESS:
      /*
      return Object.assign({
        userError: false, 
        userLoading:false
      }, state, action.data);
      */
      return {...state,
        userLoading: false, 
        userError: false, 
        ...action.data 
      };
      
    case INIT_USER_FAILED:
      /*
      return Object.assign({
        userLoading:false, 
        userError: true
      }, state);
      */
      return {...state, 
        userLoading:false, 
        userError: true
      };
   
    /*
    case INIT_USER:
      console.log("Run index.js reducer INIT_USER");
      var initData = initState();
      console.log(initData);
      return Object.assign({}, state, {
        initData: initData
      })
   
    case UPDATE_USER:
      console.log("Run index.js reducer UPDATEUSER");
      console.log(action.payload);
      initData = Promise.resolve(action.payload);
      
      return Object.assign({}, state, {
        initData: initData
      });
       */
    default:
      return state;
  }
}

/*
function initState() {
  console.log("initState triggered");
  var data = axios.post('/api/redux/getUserData')
    .then(res => {
      return res.data;
    })
    .catch(function (err) {
      console.log(err);
      return {isLoggedin:false};
    });
  return data;
}

*/

/*function updateState() {
  console.log("updateState triggered");
  var data = axios.post('/api/redux/getUserData')
    .then(res => {
      console.log("After axios:" + res.data);
       console.log(res.data);
      return res.data;
    })
    .catch(function (err) {
      console.log(err);
      return {isLoggedin:false};
    });
  return data;
}*/
