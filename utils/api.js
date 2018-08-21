//API lists
import ajax from "./ajax";
const domain = ""; //http://10.32.173.133:8080/mockjsdata/4
// const domainServiceSelect = "http://10.32.173.133:8080/mockjsdata/9";
const domainServiceSelect = "";
//const domainOrder = "http://10.32.173.133:8080/mockjsdata/7";
const domainOrder = "";
//获取商品详情
/* 
* url: /service/mdse/detail
* get
* ops: {
    skuCode: '',
    storeId: ''
}
*/
export function  productDetail (ops, config={}) {
    return ajax.get(`${domain}/service/mdse/detail`, ops, config)
}

//获取券信息
/* 
* url: /service/mdse/prmt/ticketInfo(后端未开发，模拟测试用)
* get
* ops: {
    skuCode: '',
    storeId: ''
}
*/
export function ticketInfo(ops, config={}) {
    return ajax.get(`${domain}/service/mdse/prmt/ticketInfo`, ops, config)
}

//获取客户体验列表信息
/* 
* url: /service/mdse/experience
* get
* ops: {
    spuCode: ''
}
*/
export function expInfo (ops, config={}) {
    return ajax.get(`${domain}/service/mdse/experience`, ops, config)
}

/*——————————————————————————————————提交订单api管理———————start—————————————————————————*/
//订单初始化
export const getInitOrder = (opt) => {
    return ajax.post(`${domain}/service/sorder/initOrder`,opt)
};
//获取选择套餐卡
export const getMyCardsList = (opt) => {
    return ajax.get(`${domain}/service/usercard/cards`,opt)
};
//获取优惠券
export const getMyCouponsList = (opt) => {
    return ajax.get(`${domain}/service/usercoupon/coupons`,opt,{})
};
//提交订单
export const confirmOrder = (opt) => {
    return ajax.post(`${domain}/service/sorder/confirmOrder`,opt,{})
};
//切换卡券
export const changeCouponAndCard = (opt) => {
    return ajax.post(`${domain}/service/sorder/changeCouponAndCard`,opt,{'loading':false,'showErrorToast':false})
};


/*——————————————————————————————————提交订单api管理———————end———————————————————————————*/








//测试内容
export function api_testConet (uri, config={}) {
    return ajax.get(uri, config)
}

export const test = (data = {}, config = {}) =>
   ajax.get("https://gateway.fangkuaiyi.com/mobile/home/getTailData?tradername=yw_app&trader=h5&closesignature=yes&signature_method=md5&timestamp=1529390172002&signature=****&siteid=9",data );

//获取车辆信息
export function getCarInfo (ops, config = {}) {
	return ajax.post(`${domainServiceSelect}/service/vehicle/getUserDefaultVehicle/1`, ops, config)
}
//获取选择服务
export function getSelectService (ops, config = {}) {
	return ajax.get(`${domainServiceSelect}/service/catalog`, ops, config);
}
//获取二级服务
export function getSelectSubService (ops, config = {}) {
	return ajax.get(`${domainServiceSelect}/service/catalog/title`, ops, config);
}
//获取具体商品
export function getGoods (ops, config = {}) {
	return ajax.get(`${domainServiceSelect}/service/catalog/item`, ops, config);
}
//获取机油列表
export function getProductList (ops, config = {}) {
	return ajax.post(`${domainServiceSelect}/service/mdse/list`, ops, config);
}
//获取商品目录有效属性
export function getSelectCate (ops, config = {}) {
	return ajax.post(`${domainServiceSelect}/service/mdse/validattrs`, ops, config);
}
//获取机油销售属性
export function getSelectOps (ops, config = {}) {
    return ajax.get(`${domainServiceSelect}/service/mdse/attrs`, ops, config);
}

//获取轮胎列表
export function getTyreList (ops, config = {}) {
	return ajax.get(`${domainServiceSelect}/service/mdse/tires`, ops, config);
}
// 获取总价
export function getTotalPrice (ops, config = {}) {
	return ajax.post(`${domainServiceSelect}/service/prmt/shoppingcart/price`, ops, config);
}
// 获取迷你首页未匹配的销售目录和商品
export function getMiniCatalog(ops, config = {}) {
	return ajax.get(`${domainServiceSelect}/service/catalog/item/detail`, ops, config);
}

/**
 * 获的订单详情
 * @returns {*}
 */
export function getOrderDetail(ops, config={}) {
    return ajax.post(`${domainOrder}/service/orderInfo/orderDetail`, ops, config);
}
/**
 * 取消订单
 * @returns {*}
 */
export function orderCancel(ops, config={}) {
    return ajax.post(`${domainOrder}/service/orderInfo/orderCancel`, ops, config);
}
/**
 * 申请退款
 * @returns {*}
 */
export function orderRefund(ops, config={}) {
    return ajax.post(`${domainOrder}/service/orderInfo/refundService`, ops, config);
}
/**
 * 发送工单到邮件
 * @returns {*}
 */
export function sendWorkorderEmail(ops, config={}) {
    return ajax.post(`${domainOrder}/service/orderInfo/sendEmailForSettlement`, ops, config);
}
/**
 * 获得订单支付参数
 * @returns {*}
 */
export function payInit(ops, config={}) {
    return ajax.post(`${domainOrder}/service/sorder/payInit`, ops, config);
}
/**
 * 获取订单单列表
 * @returns {*}
 */
export function getOrderList(ops, config={}) {
    return ajax.post(`${domainOrder}/service/orderInfo/orderList`, ops, config);
}
/**
 * 获取预约时间
 * @returns {*}
 */
export function getAppointTime(ops, config={}) {
    return ajax.post(`${domain}/service/reservation/items`, ops, config);
}

export function log(ops, config={}) {
    return ajax.get(`http://10.47.62.17:7001/log`, ops, config)
}