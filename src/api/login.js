
import request from '@/axios/index.js'
import Config from '@/settings.js'

const config_url = Config.BASE_URL_CONFIG;

export let login = (username,password) => {
  return request({
    url: config_url + 'login',
          method: 'post',
          data: {
            Username: username,
            Password: password
          }
  })
}
export let logout = () => {
  return request({
    url: config_url + 'logout',
    method: 'get',
  })
}