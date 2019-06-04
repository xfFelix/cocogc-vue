import axios from 'axios'

import { baseUrl } from '@/config'
axios.defaults.timeout = 30000;
axios.defaults.baseURL = baseUrl;
axios.defaults.headers['Content-Type'] = 'application/json';
if (process.env.NODE_ENV === 'production') {
  axios.defaults.withCredentials = true;
}

//拦截器
var _this = this;
axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(config => {
  return config;
}, error => {
  return Promise.reject(error)
})



var urlEncode = function (param, key, encode) {
  if (param === null) return ''
  var paramStr = ''
  var t = typeof (param)
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += '&' + key + '=' + ((encode === null || encode) ? encodeURIComponent(param) : param)
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
      paramStr += urlEncode(param[i], k, encode)
    }
  }
  return paramStr
}

export default async (url = '', data = {}, type = 'GET') => {
  type = type.toLowerCase()
  // url = baseUrl + url

  return new Promise((resolve, reject) => {
    var request = null
    if (type === 'post' || type === 'put' || type === 'patch') {
      request = axios({
        method: type,
        url: url,
        data: data
      })
    } else if (type === 'form') {
      var transform = urlEncode(data)
      request = axios({
        method: 'post',
        url: url,
        data: transform,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    } else {
      request = axios({
        method: type,
        url: url,
        params: data,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    request.then(response => {
      // loading
      // 如果http状态码正常，则直接返回数据
      // debugger
      if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {

        resolve(response.data)
      }
      if (response && response.status === 500) {
        resolve({
          header: { code: 500, message: '服务器错误' }
        })
      }
      // 异常状态下，把错误信息返回去
      resolve({
        header: { code: -404, message: '网络异常' }
      })
    }).catch((error) => {

      reject(error)
    })
  })
}

