let baseUrl = '';
let routerMode = 'hash';
let pathname = (window.location.href).split('/');

if (process.env.NODE_ENV == 'development') {
  baseUrl = '/api/'
}else if(process.env.NODE_ENV == 'production'){
  let path = (pathname[3].indexOf("pre") !== -1) ? "pre_h5server/" : "h5server/";
  baseUrl = 'http://yzmall.dev.legendpoker.cn' + path
}


export {
  baseUrl,
  routerMode
}


