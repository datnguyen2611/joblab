import { combineReducers } from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Settings';
import Auth from './Auth';
import List from './List';
import Status from './Status';
import UploadCV from './UploadCV';

export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  //chatData: ChatData,
  //contacts: Contact,
  //mail: Mail,
  //toDo: ToDo,
  auth: Auth,
  list: List,
  status: Status,
  uploadcv: UploadCV,
})
