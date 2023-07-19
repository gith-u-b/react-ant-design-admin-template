// 汇总所有reducers
import {combineReducers} from 'redux';

// 引入组件服务的reducers
import {openKeys, selectedKeys} from './menu'
import breadcrumb from './breadcrumb';
import tabsView from './tabsView';
// 汇总所有的reducer变为一个总的reducer
export default combineReducers({
    openKeys,
    selectedKeys,
    breadcrumb,
    tabsView
})