/**
 * id: 菜单主键id children为[]时，id与path需保持一致
 * name: 菜单名称
 * path: 路由跳转路径
 * children: 子菜单
 */
export const menuJson = [
  {
    id: "/home",
    name: "首页",
    path: "/home",
    children: [],
  },
  {
    id: "/layout",
    name: "Layout 布局",
    path: "/layout",
    children: [],
  },
  {
    id: "2",
    name: "表单页面",
    path: "/",
    children: [
      {
        id: "/basicForm",
        name: "基础表单",
        path: "/basicForm",
        children: [],
      },
      {
        id: "/customVerif",
        name: "自定义校验",
        path: "/customVerif",
        children: [],
      }
    ],
  },
  {
    id: "3",
    name: "列表页面",
    path: "/",
    children: [
      {
        id: "/basicTable",
        name: "基础列表",
        path: "/basicTable",
        children: [],
      },
      {
        id: "/complexTable",
        name: "复杂表格",
        path: "/complexTable",
        children: [],
      },
    ],
  },
  {
    id: "/rotation",
    name: "走马灯",
    path: "/rotation",
    children: [],
  }
]

// 返回菜单第一层级id，用于antd中展开项
export const getMenuFirstLevelId = () => {
  let arr = []
  menuJson.forEach(item=>{
      arr.push(item.id)
  })
  return arr
}
// 递归获取第一项
const OpenFisrt = initOpenFisrt()

// 默认展开项
export const initOpenKeys = OpenFisrt.OpenKeys

// 默认选中项
export const initSelectedKeys = OpenFisrt.SelectedKeys

// 默认显示面包屑
export const initBreadcrumb = OpenFisrt.Breadcrumb

// 默认显示选项卡
export const initTabs = OpenFisrt.Tabs

// 登录进入首页或路由地址为'/',默认打开菜单第一项
function initOpenFisrt() {
  let OpenKeys = [],
      SelectedKeys = [],
      Breadcrumb = []
  recursionGetFisrt(menuJson[0], OpenKeys, SelectedKeys, Breadcrumb)
  return {
    OpenKeys,
    SelectedKeys,
    Breadcrumb,
    Tabs: [{
      title: Breadcrumb[Breadcrumb.length-1],
      key: SelectedKeys[0],
      closable: false,
      openKeys: OpenKeys,
      selectedKeys: SelectedKeys,
      breadcrumb: Breadcrumb
    }]
  }
}
function recursionGetFisrt (data, OpenKeys, SelectedKeys, Breadcrumb) {
    let children = data.children
    Breadcrumb.push(data.name)
    if(children && children.length && children.length > 0){
      OpenKeys.push(data.id)
      recursionGetFisrt(children[0], OpenKeys, SelectedKeys, Breadcrumb)
    }else{
      SelectedKeys.push(data.id)
    }
}


// 用于监听浏览器前进后退，根据id获取当前展开项
export const getOpenKeysForId = (id) => {
  return recursionData(menuJson, id).arr
}
// 递归数据
const recursionData = (data, id) => {
  let arr = [], isFind = false
  for(var i in data){
    let cld = data[i].children
    arr = []
    if(cld.length && cld.length > 0){
      arr.push(data[i].id)
      let o = recursionData(cld, id)
      arr = [...arr, ...o.arr]
      if(o.isFind) return {isFind: o.isFind, arr}
    }else{
      if(data[i].path == id){
        isFind = true
        break
      }
    }
  }
  return {isFind, arr}
}

// 更新面包屑显示文字
export const getKeyPathTitle = (keyPath) => {
  let title = []
  keyPath.forEach(item => {
      let str = returnName(menuJson, item)
      // 如果没有找到，则显示404
      title.push(str || '404')
  })
  // 返回菜单名称
  return title
}

// 递归查询每一层级的name值
const returnName = (data, value)=>{
  let name = ''
  for(var i in data){
      if(data[i].id == value){
          name = data[i].name
      }
      if(!name && data[i].children.length > 0){
          name = returnName(data[i].children, value)
      }
      if(name) {
          break
      }
  }
  return name
}