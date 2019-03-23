import Vue from 'vue';

/*
    是否为空
*/
export const IsEmpty = str => {
    if (str == null || str == "" || str == undefined) return true;
    return false;
}

export const IsMobile = mobile => {
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
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
        Vue.prototype.$cookies.set("yeyun_token", token,30);
    }
    return token;
}

//获取用户token
export const setToken = (token) => {
  if (token) {
    Vue.prototype.$cookies.set("yeyun_token", token,30);
    localStorage.setItem("yeyun_token", token);
  } else {
    console.error('token为空')
  }
}

