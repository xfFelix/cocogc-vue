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
  var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
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
    if (s != 'undefined' || s != null) {
        if (s.length < 6 || s.length > 20) {
            return false;
        }
    }
    if (!s.match(/([a-z])+/)) {
        return false;
    }
    if (!s.match(/([0-9])+/)) {
        return false;
    }
    return true;
}

//获取用户token
export const getToken = () => {
    var token = localStorage.getItem("yeyun_token");
    if (IsEmpty(token)) {
        token = Vue.prototype.$cookies.get("yeyun_token");
        if (!IsEmpty(token)) {
            localStorage.setItem("yeyun_token", token);
        }
    } else {
        Vue.prototype.$cookies.set("yeyun_token", token,30,null,".cocogc.cn");
    }
    return token;
}

//获取用户token
export const setToken = (token) => {
  if (token) {
    Vue.prototype.$cookies.set("yeyun_token", token,30,null,".cocogc.cn");
    localStorage.setItem("yeyun_token", token);
  } else {
    console.error('token为空')
  }
}


export const delToken = () => {
  localStorage.removeItem("yeyun_token");
  Vue.prototype.$cookies.remove("yeyun_token");
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

export const IsHkMobile = mobile => {
  var reg=/^(5|6|8|9)\\d{7}$/;
  if(reg.test(mobile)){
    return true;
  }else{
    return false;
  }
}
