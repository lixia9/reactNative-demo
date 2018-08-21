import { NativeModules,AsyncStorage,Platform ,DeviceEventEmitter} from 'react-native';
const { NativeManager } = NativeModules;

const JSONToString = (json)=>{
  return JSON.stringify(json)
}
const EVENT_KEY_LIST={}
let callbackId=0;
const BASE_ACTION= async(name,param={})=>{
      param.callbackId = callbackId;
      callbackId++;
      if(NativeManager){
            try{
                 return new Promise(async(resolve, reject)=>{
                       setTimeout(async () => {
                        var data =  await NativeManager.callNative(name,Platform.OS === 'ios'?param:JSON.stringify(param));
                        if(name==="toNativeAction"&&param.action==="login"){
                          const HEADER = await getHeader()
                          if(HEADER.resultCode==0){
                            global.HEADER =HEADER.data;
                          }
                        }
                         if(data) {
                          resolve(JSON.parse(data));
                         }      
                       }, 20);
               
                 })
              }catch(e){
                 
              }
      }
}
export const  closeRNView=(param)=>{return BASE_ACTION("closeRNView",param)}
export const  toNativeAction=(param)=>{return BASE_ACTION("toNativeAction",param)}
export const  getEnv=(param)=>{return BASE_ACTION("getEnv",param)}
export const  isLogin=(param)=>{return BASE_ACTION("isLogin",param)}
export const  getHeader=(param)=>{return BASE_ACTION("getHeader",param)}
export const  getGPS=(param)=>{return BASE_ACTION("getGPS",param)}
export const  getUserInfo=(param)=>{return BASE_ACTION("getUserInfo",param)}
export const  toast=(param)=>{return BASE_ACTION("toast",param)}
export const  loading=(param)=>{return BASE_ACTION("loading",param)}
export const  openTalk=(param)=>{return BASE_ACTION("openTalk",param)}
export const  newWebview=(param)=>{return BASE_ACTION("newWebview",param)}
export const  mapNavigate=(param)=>{return BASE_ACTION("mapNavigate",param)}
export const  shareMsg=(param)=>{return BASE_ACTION("shareMsg",param)}

export const  dataCollection=async (param)=>{
      if (!global.CITY) {
            let data = await getGPS();
            global.CITY = data.data.currentCityName;
        }
        if(param.label) param.label = global.CITY + param.label;
   console.log(JSON.stringify(param))
      return BASE_ACTION("dataCollection",param)
}
export const  pay=(param)=>{return BASE_ACTION("pay",param)}
export const  tel=(param)=>{return BASE_ACTION("tel",param)}

export const getStorage = async(key)=>{
      return  AsyncStorage.getItem(key);
           
}
export const setStorage = async(key,value,callback)=>{
      AsyncStorage.setItem(key, JSON.stringify(value),callback());
}
export const listener =(key,callback)=>{
   if(!EVENT_KEY_LIST[key]){
      EVENT_KEY_LIST[key]=true;
      DeviceEventEmitter.addListener(key,callback);
   }
}

function setNavFlag(t, h, flag) {
      t.props.navigation.setParams({
            config:{
                  height:h,
                  opacity:h ? 1: 0
            }
      })
      t.setState({
            flag: flag
      })
}
export const setButtonNav = (e, t) => {
      if(e.nativeEvent.contentOffset.y>t.state.space && t.state.flag){
            setNavFlag(t, 50, false);
      }else if(e.nativeEvent.contentOffset.y<t.state.space && !t.state.flag){
            setNavFlag(t, 0, true);
      }	
}