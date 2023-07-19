import {OPENKEYS, SELECTEDKEYS} from '../constant'
import {initOpenKeys, initSelectedKeys} from '@/utils/menu'

// 菜单展开项
export const openKeys =  (preState=initOpenKeys, action) => {
    const {type, data} = action
    switch (type) {
        case OPENKEYS:
            return data;
        default:
            return preState;
    }
}

// 菜单选中项
export const selectedKeys =  (preState=initSelectedKeys, action) => {
    const {type, data} = action
    switch (type) {
        case SELECTEDKEYS:
            return data;
        default:
            return preState;
    }
}