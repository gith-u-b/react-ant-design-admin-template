import {BREADCRUMB} from '../constant'
import {initBreadcrumb} from '@/utils/menu'

// 面包屑默认显示菜单第一项
export default (preState=initBreadcrumb, action) => {
    const {type, data} = action
    switch (type) {
        case BREADCRUMB:
            return data;
        default:
            return preState;
    }
}