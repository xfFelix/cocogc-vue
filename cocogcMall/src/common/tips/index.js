import ToastComponent from './tips.vue'

const Tips = {};

// 注册Toast
Tips.install = function (Vue) {
    // 生成一个Vue的子类
    // 同时这个子类也就是组件
    const ToastConstructor = Vue.extend(ToastComponent)
    // 生成一个该子类的实例
    const instance = new ToastConstructor();

    // 将这个实例挂载在我创建的div上
    // 并将此div加入全局挂载点内部
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    // 通过Vue的原型注册一个方法
    // 让所有实例共享这个方法 
    Vue.prototype.$tips = (msg) => {
        instance.message = msg;

        // setTimeout(() => {
        //     instance.show = false;
        // }, duration);
        console.log(msg)
        console.log("11111111111111111111111111111111111")
        instance.show = true;
        // if (msg == 'register') {
        //     instance.showType = 1
        // } else if (msg == ) {
        //     instance.showType = 2
        // }


        switch (msg) {
            case '手机号码错误':
                instance.showType = 1;
                break;
            case '请输入图片验证码':
                instance.showType = 2;
                break;
            case '短信验证码错误':
                instance.showType = 3;
                break;
            case '密码格式错误':
                instance.showType = 4;
                break;
            case '登录手机号码错误':
                instance.showType = 5;
                break;
            case '登录密码错误':
                instance.showType = 6;
                break;
            case '密码设置不一致':
                instance.showType = 7;
                break;
            default:
                instance.showType = 10;
                instance.showMsg = msg;
        }



    }
}

// console.log(Toast)
export default Tips