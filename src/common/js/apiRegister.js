import Vue from 'vue'
import { jyAppApi, acApi, acjlWebYeji, imageUrl, acjlWebKehu, gjglApi, acjlWebIndex, sjzxApi, hrApi, xmjyApi, ldjlApi, khzxApi } from '@/config/ip'

const REGIST_API_HANDLE = (apis = {}) => {
  for (let i in apis) {
    Vue.prototype[i] = apis[i]
  }
}
// 首页
export const indexHandle = () => {
  let needApis = { jyAppApi, acApi, acjlWebYeji, imageUrl, acjlWebKehu, gjglApi, acjlWebIndex, sjzxApi, hrApi, xmjyApi, ldjlApi }
  REGIST_API_HANDLE(needApis)
}
// 客户
export const customerHandle = () => {
  let needApis = { jyAppApi, acApi, acjlWebKehu, imageUrl, hrApi, khzxApi }
  REGIST_API_HANDLE(needApis)
}
// 业绩
export const yejiHandle = () => {
  let needApis = { acApi, hrApi, sjzxApi, acjlWebKehu, acjlWebYeji, imageUrl }
  REGIST_API_HANDLE(needApis)
}
