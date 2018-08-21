import React from 'react';
import PullRefresh from '../../components/PullRefresh'
import { Button, Drawer, List, WhiteSpace } from 'antd-mobile';
import { View, StyleSheet, ScrollView, Text, Alert,BackAndroid} from 'react-native';

import {test} from "../../utils/api"
import {listener,
  getEnv, mapNavigate, toNativeAction, getStorage,shareMsg, isLogin
  , getHeader, getGPS, getUserInfo, toast, loading, openTalk, newWebview,dataCollection,pay,tel
} from "../../utils/common"

  // 分享给朋友和朋友圈数据对象
  var shareData = {
    friend: {
      title: "车享会员2018新权益，养车买车和卖车",
      content: "养车更贴心，买车更优惠，卖车更放心，会员权益全面到“家”",
      url:  "https:www.baidu.com",
      imgUrl: "https://s1.cximg.com/msweb02/cx/cxj/cxjappweb/staticactivities/images/share43_2.jpg"
    },
    friendQuan: {
      title: "车享会员2018新权益，养车买车和卖车",
      content: "养车更贴心，买车更优惠，卖车更放心，会员权益全面到“家”",
      url: "https:www.qq.com",
      imgUrl: "https://s1.cximg.com/msweb02/cx/cxj/cxjappweb/staticactivities/images/share43_2.jpg"
    }
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
var callback = function (navigation) {
  navigation.getParam('increaseCount')()
  test().then(data=>{
    console.log(data)
  })
  // Alert.alert(
  //   '哈哈',
  //   "我是自定义的按钮",
  //   [
  //     {
  //       text: 'OK',
  //     },
  //   ],
  //   { cancelable: false }
  // )
}

export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 1 }
  }
  testAlert(msg) {
    Alert.alert(
      '返回结果',
      msg || "返回结果为空",
      [
        {
          text: 'OK',
        },
      ],
      { cancelable: false }
    )
  }
  static navigationOptions = ({ navigation }) => {
    return navconfig(navigation, "我是更新后的版本2", {
      left: {
        solt: <Text>返回</Text>
      }, 
      right: { 
         callback, 
        solt: <Text>我是右侧按钮</Text> }
    });
  };
  componentWillMount(){
    console.log("Test加载数据")
//     BackAndroid.addEventListener('hardwareBackPress', ()=> {
//       this.props.navigation.navigate('Home')
//       return true;
//  });
  }
  componentDidMount() {
    global.getData = this.componentWillMount.bind(this);
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
    listener("Test",function(){
			console.log("我是Test")
		})
  }
  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    // getStorage("lxl").then((data) => {
    //   console.log(data)
    // })

    return (
     <ScrollView style={{flex:1}}>
      {/* <PullRefresh ref="yyf" style={{ marginTop: 10, padding: 8 }} onRefresh={()=>{
        console.log(1)
        setTimeout(()=>{
          this.refs.yyf.stopRefresh()
        },2000)
        console.log(this.refs)
      }}> */}
        <Button
          title="去Home界面"
          onClick={() => {
            this.props.navigation.navigate('Home')
          }}
        >  去Home界面{this.state.count}</Button>

        <Button onClick={() => toNativeAction({ action: "favorit_vehicle" }).then((data) => {
          this.testAlert(JSON.stringify(data))
        })}>
          去原生界面
          </Button>
        <Button
          onClick={() => getEnv().then((data) => {
            this.testAlert(JSON.stringify(data))
          })}
        > getEnv </Button>
        <Button
          onClick={() => isLogin().then((data) => {
            this.testAlert(JSON.stringify(data))
          })}
        > isLogin </Button>
        <Button
          onClick={() => getHeader().then((data) => {
            this.testAlert(JSON.stringify(data))
          })}
        > getHeader </Button>
        <Button
          onClick={() => getGPS().then((data) => {
            this.testAlert(JSON.stringify(data))
          })}
        > getGPS </Button>
        <Button
          onClick={() => getUserInfo().then((data) => {
            this.testAlert(JSON.stringify(data))
          })}
        > getUserInfo </Button>
        <Button
          onClick={() => toast({ text: "我是弹出框" }).then((data) => {
            this.testAlert(JSON.stringify(data))
          })}
        > toast </Button>
        <Button
          onClick={() => {loading({ show: true }) ;setTimeout(()=>{
            loading({ show: false })
          },2000)}
        }
        > loading </Button>
        <Button
          onClick={() => openTalk({
            type: 2,//0商品详情，1订单详情
            link: "http://h.jia.chexiangpre.com/order/h_order_180309999999006537188.htm",//跳转链接
            pic: "https://i2.cximg.com/images//6762dcd6765e7ee7a147b4402a3f3174/9d6947c4ad0d409eb70ee1ad94174f47/a22cb8b7ae864324bf2f4dbcaf156cef.png",//商品图片
            price: "100.00",//商品或者订单总价
            description: "米其林185/65R14 86H TL ENERGY XM2 GRNX MI ",//商品描述，或者订单描述（订单描述就是订单包含的商品列表，字符串形式用逗号分隔）
            orderNo: "180309999999006537188",//订单编号
            storeName: "上海功夫熊猫店",//门店名称
            status: "已完成",//订单状态
            group: "王漪叶",//分组扩展字段
            agent: "pufanrong@chexiang.com"//客服编号
          }).then((data) => {
            this.testAlert(JSON.stringify(data))
          })}
        > openTalk </Button>

        <Button
          onClick={() => newWebview({ url: "https://www.baidu.com" }).then((data) => {
            this.testAlert(JSON.stringify(data))
          })}
        > newWebview </Button>

        <Button
          onClick={() => mapNavigate({destLongitude:"137.111", destLatitude:"31.222", destName:"上海"}).then((data) => {
            this.testAlert(JSON.stringify(data))
          })}
        > mapNavigate </Button>
    <Button
          onClick={() => dataCollection({type:"1",action:"",label:"1",category:"首页",page:"page"  }).then((data) => {
            this.testAlert(JSON.stringify(data))
          })}
        > 打点 dataCollection</Button>
            <Button
          onClick={() => pay({ // 唤起收银台所需参数
            "partner": "",
            "orderId": "",
            "txnAmount": "",
            "mdseName": "",
            "body": "",
            "returnUrl": "",
            "notifyUrl": "",
            "finishUrl": "",
            "timeout": "",
            "sign": "",
            "terminalType": "",
            "sign_type": "",
            "storeId": ""
        }).then((data) => {
            this.testAlert(JSON.stringify(data))
          })}
        > pay</Button>
         <Button
          onClick={() => tel({text: "18721721426"}).then((data) => {
            this.testAlert(JSON.stringify(data))
          })}
        > tel </Button>
         <Button onClick={() => toNativeAction({ action: "carinfo_complete" }).then((data) => {
          this.testAlert(JSON.stringify(data))
        })}>
         爱车信息补全
          </Button>
          <Button onClick={() => toNativeAction({ action: "update_nickname" }).then((data) => {
          this.testAlert(JSON.stringify(data))
        })}>
        昵称更新
          </Button>
         <Button onClick={() => toNativeAction({ action: "update_realname" }).then((data) => {
             this.testAlert(JSON.stringify(data))
         })}>
             姓名更新
         </Button>
         <Button onClick={() => toNativeAction({ action: "add_vehicle" }).then((data) => {
             this.testAlert(JSON.stringify(data))
         })}>
             添加爱车
         </Button>
         <Button onClick={() => shareMsg({wx:shareData.friend,wxtl:shareData.friendQuan}).then((data) => {
             this.testAlert(JSON.stringify(data))
         })}>
             分享
         </Button>
        <WhiteSpace />
      {/* </PullRefresh> */}
      </ScrollView>
    );
  }
}