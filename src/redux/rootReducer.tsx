import {combineReducers} from 'redux';
import auth from './auth/reducer';
import chat from './chat/reducer';

//Khai báo các root reducer ở đây
const appReducer = combineReducers({
  auth,
  chat,
});

export type RootState = ReturnType<typeof appReducer>;
export default appReducer;
