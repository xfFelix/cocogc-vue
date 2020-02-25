import Vue from 'vue';
/*
    是否为空
*/
export const IsEmpty = str => {
    if (str == null || str == "" || str == undefined) return true;
    return false;
}

export const IsMobile = mobile => {
  return IsChinaMobile(mobile) || IsHKMobile(mobile);
}

export const IsChinaMobile =  (mobile)=> {
  var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (reg.test(mobile)) {
      return true
  } else {
      return false
  }
}

export const IsHKMobile = (mobile) => {
  var reg = /^[5,6,8,9][0-9]{7}$/;
  if (reg.test(mobile)) {
    return true;
  } else {
    return false;
  }
}


// 密码检测
export const CheckPass = (s) => {
   let reg=/^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i;
    if (s != 'undefined' || s != null) {
        if (s.length < 6 || s.length > 20) {
            return false;
        }
    }
    return reg.test(s);
}

//获取用户token
export const getToken = () => {
    var token = ''
    try {
      token = JSON.parse(localStorage.getItem("yeyun_token"))
    } catch (e) {
      token = localStorage.getItem("yeyun_token")
      localStorage.setItem('yeyun_token', JSON.stringify(token))
      token = JSON.parse(localStorage.getItem("yeyun_token"))
    }
    try {
      if (IsEmpty(token)) {
          token = JSON.parse(Vue.prototype.$cookies.get("yeyun_token"))
          if (!IsEmpty(token)) {
              localStorage.setItem("yeyun_token", JSON.stringify(token));
          }
      } else {
          Vue.prototype.$cookies.set("yeyun_token", JSON.stringify(token),30,null,".cocogc.cn");
      }
    } catch (e) {
      console.error('Cookie: 无效的token')
    }
    return token;
}

//设置用户token
export const setToken = (token) => {
  if (token) {
    Vue.prototype.$cookies.set("yeyun_token", JSON.stringify(token),30,null,".cocogc.cn");
    localStorage.setItem("yeyun_token", JSON.stringify(token));
  } else {
    console.error('token为空')
  }
}


export const delToken = () => {
  localStorage.removeItem("yeyun_token");
  Vue.prototype.$cookies.set("yeyun_token",'',-1, null,".cocogc.cn");
  // Vue.prototype.$cookies.remove("yeyun_token", null,".cocogc.cn");
}

//检测数组是否包含
export const arrayContains = (arr, obj) => {
  if (arr)
  {
    var i = arr.length;
    while (i--) {
      if (arr[i] == obj) {
        return true;
      }
    }
  }
  return false;
}

export function getParam () {
  var args = {}
  var end = location.hash.indexOf('?') + 1
  var query = location.hash.substring(end)
  var pairs = query.split('&')
  for (var i = 0; i < pairs.length; i += 1) {
    var pos = pairs[i].indexOf('=')
    if (pos === -1) {
      continue
    }
    var argname = pairs[i].substring(0, pos)
    var value = pairs[i].substring(pos + 1)
    args[argname] = unescape(value)
  }
  if (!Object.keys(args).length) {
    query = location.search.substring(1)
    pairs = query.split('&')
    for (var i = 0; i < pairs.length; i += 1) {
      var pos = pairs[i].indexOf('=')
      if (pos === -1) {
        continue
      }
      var argname = pairs[i].substring(0, pos)
      var value = pairs[i].substring(pos + 1)
      args[argname] = unescape(value)
    }
  }
  return args
}

export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

