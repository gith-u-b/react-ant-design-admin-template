// 引入createStore 创建redux最为核心的store对象
import {createStore, applyMiddleware} from 'redux';

// 引入所有reducers
import reducer from './reducers';

// 引入redux-thunk 用于支持异步
import thunk from 'redux-thunk'

// 引入redux-devtools-extension 用于redux开发者工具
import {composeWithDevTools} from 'redux-devtools-extension'

// 本地存储
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
    key: 'healthRoot',
    storage: storage
};

const _reducers = persistReducer(persistConfig, reducer)

const store = createStore(_reducers, composeWithDevTools(applyMiddleware(thunk)))

export const persistor = persistStore(store)

export default store