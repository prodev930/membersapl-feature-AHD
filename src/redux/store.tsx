import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import rootSaga from './rootSaga';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
