
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

    if (s!='undefined' || s!=null) {
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