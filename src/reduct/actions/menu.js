import {OPENKEYS, SELECTEDKEYS} from '../constant'

// 同步action对象
// 菜单展开项
export const updateOpenkeys = data => ({type: OPENKEYS, data})

// 菜单选中项
export const updateSelectedkeys = data => ({type: SELECTEDKEYS, data})


// export const updateOpenkeys = (data) => {
//     console.log(data)
//     return {
//         type: OPENKEYS, 
//         data
//     }
// }