import {TABSVIEW} from '../constant'
import {initTabs} from '@/utils/menu'

// 面包屑默认显示菜单第一项
export default (preState=initTabs, action) => {
    const {type, data} = action
    switch (type) {
        case TABSVIEW:
            return data;
        default:
            return preState;
    }
}