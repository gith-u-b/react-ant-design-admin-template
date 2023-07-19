// 入口文件
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {persistor} from './reduct/store'
import {PersistGate} from 'redux-persist/lib/integration/react';
import { ConfigProvider } from 'antd';
import App from './App'
// import enEN from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import store from './reduct/store'
import './assets/css/common.css';
import md5 from 'js-md5'
import PubSub from 'pubsub-js';
React.$md5 = md5
React.$PubSub = PubSub
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);