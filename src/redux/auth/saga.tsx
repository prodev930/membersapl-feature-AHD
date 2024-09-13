import {put, takeLatest} from 'redux-saga/effects';

import {saveToken, saveInfoUser} from './action';
import {saveIdCompany} from '../chat/action';
import {typeAuth} from './type';
import {GlobalService, loginApi, logOutApi, getUserInfoApi} from '@services';
import {NavigationUtils} from '@navigation';
import {ROUTE_NAME} from '@routeName';

interface ResponseGenerator {
  result?: any;
  data?: any;
}

export function* loginSaga(action: any) {
  try {
    GlobalService.showLoading();
    const result: ResponseGenerator = yield loginApi(action?.payload);
    yield put(saveInfoUser(result?.data?.user_info));
    yield put(saveToken(result?.data?.token));
    yield NavigationUtils.navigate(ROUTE_NAME.SELECT_COMPANY);
  } catch (error) {
  } finally {
    GlobalService.hideLoading();
  }
}

export function* logOutSaga() {
  try {
    GlobalService.showLoading();
    yield logOutApi();
    yield put(saveToken(null));
    yield put(saveIdCompany(null));
    yield put(saveInfoUser(null));
    yield NavigationUtils.navigate(ROUTE_NAME.LOGIN);
  } catch (error) {
  } finally {
    GlobalService.hideLoading();
  }
}

export function* getUserInfoSaga(action: any) {
  try {
    const result: ResponseGenerator = yield getUserInfoApi(action?.payload);
    yield put(saveInfoUser(result?.data?.user));
  } catch (error) {
  } finally {
  }
}

export function* authSaga() {
  yield takeLatest(typeAuth.LOGIN, loginSaga);
  yield takeLatest(typeAuth.LOGOUT, logOutSaga);
  yield takeLatest(typeAuth.GET_USER_INFO, getUserInfoSaga);
}
