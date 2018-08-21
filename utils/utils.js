import { getEnv, toast,getHeader, getUserInfo, getGPS } from "./common";


/**
 * 获得车享各平台域名地址
 * @type {Promise<{hJiaChexiang: string, memberChexiang: string, mCarChexiang: string, paiChexiang: string}>}
 */
export const origins = getOrigins();

/**
 *格式化时间 可定制 今天，昨天，明天，显示
 * @param fmt 'yyyy/MM/dd EE hh:mm:ss' 例子 2018/06/27 明天 14:06:22
 * @param date 格式化时间
 * @param currDate 服务器时间
 * @returns {String}
 */
export const dateFtt = (fmt, date, currDate) => {
    let o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    let getDateStr = function (date, addDayCount) {
        let dd = new Date(date.getTime());//date 为引用类型
        dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期
        let y = dd.getFullYear();
        let m = dd.getMonth() + 1;//获取当前月份的日期
        let d = dd.getDate();
        return y + "-" + m + "-" + d;
    }
    //yyyy
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    //周几
    if (/(EE)/.test(fmt)) {
        let EE = '',
            dateStr = '';
        currDate = currDate || new Date();
        dateStr = getDateStr(date, 0);
        if (dateStr == getDateStr(currDate, 0)) {
            EE = '(今天)';
        } else if (dateStr == getDateStr(currDate, 1)) {
            EE = '(明天)';
        } else {
            let  weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                 weekIndex = date.getDay();
            EE = weekArr[weekIndex];
        }
        fmt = fmt.replace(RegExp.$1, EE);
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

/**
 * 邮箱判断
 * @param val
 * @returns {boolean}
 */
export const isEmail = (val) => {
    let reg = /^([a-zA-Z0-9_-]|[\.])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    val = val || '';
    return reg.test(val);
};
/**
 *字符串base64编码解码
 *Base64.encode("www.chexiang.com")// 编码
 *Base64.decode("d3d3Ljc4b2EuY29t") //解码
 */
export const Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}

export let getWebViewUserInfo = async () => {
    let G = global;
    if(!G.webViewUserInfo){
        let userInfo = (await getUserInfo()).data;
        let gps = (await getGPS()).data;
        let header =G.HEADER?G.HEADER:(await getHeader()).data;
        let webViewUserInfo = {
            userId: userInfo.userId, // 必填，用户id（加密）未登录可以不填
            custName: userInfo.userName, //可选 用户名
            mobilePhone: "",// 可选 用户手机号
            localX: gps.longitude,  //必填 经度
            localY: gps.latitude,  //必填 纬度
            cityName: gps.currentCityName, //必填 选择的城市名称
            sourceType: "2",  //必填：1、为车享汇，2:车享宝，APP端填2
            equId: header.deviceId,       //必填 设备id
            carMdmId: "",   //可选 carId
            assetId: "",    //可选 资产Id
            carYear: "",    //可选 车辆年份
            areaCode: gps.currentCityCode //必填 选择的城市Code
        }
        G.webViewUserInfo = "userInfo="+ Base64.encode(encodeURIComponent(JSON.stringify(webViewUserInfo)))
    }
    return  Promise.resolve(G.webViewUserInfo)
    
}
/**
 * 防止重复点击包装函数
 */
export const NoDoublePress = {
    lastPressTime: 0,
    onPress(callback){
        let curTime = new Date().getTime();
        if (curTime - this.lastPressTime > 1000) {
            this.lastPressTime = curTime;
            callback();
        }
    },
}
