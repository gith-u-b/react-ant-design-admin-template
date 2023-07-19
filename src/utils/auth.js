import React from 'react'
import Cookies from 'js-cookie'
import Config from '@/settings'


const TokenKey = Config.TokenKey
const UserKey = Config.UserKey
const EXPIRESTIME = 12 * 30 * 24 * 3600 * 1000
export function getToken () {
  let token = ''
  if(token == ''){
    token = Cookies.get(TokenKey)
  }
  let Token = token
  return Token
}

export function getUser() {
  return Cookies.get(UserKey)
}

export function setToken(token) {
  Cookies.set(TokenKey, token, {expires: EXPIRESTIME})
  return
}
export function setUser(user){
  Cookies.set(UserKey, user, {expires: EXPIRESTIME})
  return
}

export function removeToken(){
  Cookies.remove(TokenKey)
  Cookies.remove(UserKey)
  localStorage.clear()
  sessionStorage.clear()
  return
}
