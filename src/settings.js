module.exports = {
  /**
   * @description 基础url
   */
    BASE_URL_API: process.env.NODE_ENV === 'production' ? '/' : '/api/',  // 跨域代理
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  CookieExpires: 1,
  /**
   * @description token key
   */
  TokenKey: 'TOKEN',
  /**
   * @description token key
   */
  UserKey: 'USER',
  /**
   * @description 请求超时时间，毫秒（默认1小时）
   */
  timeout: 1000*60*60,
  /**
   * 是否显示菜单
   */
  ShowMenu: true,
  /**
   * 是否显示面包屑
   */
  ShowBreAdcrumb: true,
  /**
   * 是否显示选项卡
   */
  ShowTabs: true,
   /**
   * 是否显示折叠按钮
   */
  ShowFold: true,
}
