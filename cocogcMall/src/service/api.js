const register = 'user/register';   //注册
const regsms = 'user/regsms';   //注册短信验证码

const login = 'user/login';   //登录
const forget = 'user/forget';   //忘记密码
const sms = 'user/sms';   //忘记密码（短信）


const info = 'user/info';   //信息
const cards = 'user/cards';   //银行卡信息



const categories = 'api/categories';
const goodsInfo = 'api/goodsInfo';


const goodsGroups = 'api/goodsGroups';
const selectOrders = 'api/selectOrders';  //订单列表
const previewOrder = 'api/previewOrder';  //订单预览
const findOrder = 'api/findOrder';  //查找订单
const saveOrder = 'api/saveOrder';  //保存订单



const selectAddresses = 'api/selectAddresses';  //地址列表
const removeAddress = 'api/removeAddress';  //删除地址
const updateAddress = 'api/updateAddress';  //地址更新
const selectCities = 'api/selectCities';  //城市列表
const goodsDetailInfo = 'api/goodsDetailInfo'; //商品详情
const add2Cart = 'api/add2Cart'; //放入购物车
const selectCarts = 'api/selectCarts'; //购物车
const totalCarts = 'api/totalCarts'; //购物车商品数
const removeCarts = 'api/removeCarts'; //删除购物车商品
const updateCart = 'api/updateCart'; //更新购物车商品

const price = 'query/price'; //积分区间
const salesVolume = 'query/salesVolume'; //销量排序
const order = 'query/order'; //价格排序
const guessLike = 'query/guessLike'; //猜你喜欢列表
const queryOrderTrack = 'api/queryOrderTrack'; //物流地址
const newsList = 'news/newsList'; //新闻列表



const keyword = 'query/keyword'; //商品列表查询
const sendSms = 'api/sendSms' // 发送验证码
const previewOrderByCart = 'api/previewOrderByCart' // 通过购物车进入预览订单
const saveOrderByCart = 'api/saveOrderByCart' // 通过购物车下单
const selectDefaultAddresses = 'api/selectDefaultAddresses' // 获取默认地址
const searchHint = '/query/type/keyword' // 搜索提示
const getOrderTotals = 'api/selectOrderTotals' //订单未完成数量
const searchItem = '/query/categoryId'

const confirmReceived = 'api/confirmReceived' //确认收货
const userSms = 'user/sms'
const bindMobile = 'user/bindMobile'




export default {
  register,
  regsms,
  login,
  forget,
  sms,
  info,
  goodsGroups,
  categories,
  selectOrders,
  selectAddresses,
  updateAddress,
  selectCities,
  goodsDetailInfo,
  goodsInfo,
  previewOrder,
  findOrder,
  removeAddress,
  add2Cart,
  selectCarts,
  totalCarts,
  removeCarts,
  updateCart,
  saveOrder,
  price,
  salesVolume,
  order,
  sendSms,
  previewOrderByCart,
  saveOrderByCart,
  keyword,
  cards,
  guessLike,
  queryOrderTrack,
  selectDefaultAddresses,
  newsList,
  searchHint,
  getOrderTotals,
  searchItem,
  confirmReceived,
  userSms,
  bindMobile
}
