import React from 'react';
import { View, StyleSheet,  ScrollView} from 'react-native';
import {Button, WhiteSpace, WingBlank} from 'antd-mobile';
import {setStorage,listener} from "../utils/common"

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {showText: "李晓龙"};
		setStorage("lxl", {name: "lxlx"}, function () {
			console.log("设置成功")
		})
	}
	
	static navigationOptions = ({navigation}) => {
		return navconfig(navigation, "列表入口");
	};
	componentWillMount(){
    console.log("home加载数据")
	  }
	componentDidMount() {
		global.getData = this.componentWillMount.bind(this);
		console.log("我是HOME")
		listener("Home",function(){
			
		})
	  }
	render() {
		
		return (
      <View>
        <ScrollView
          style={{height: "100%"}}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <WingBlank>
	          <Button type="primary" size="large" inline
	                  onClick={() => {
		                  this.props.navigation.navigate('SelectService', {
			                  itemId: 86,
			                  otherParam: '选择服务',
		                  });
	                  }}
	          >选择服务</Button>
	          <WhiteSpace style={{paddingTop: 10}}/>
            <Button type="primary" size="large" inline
                    onClick={() => {
							        this.props.navigation.navigate('OrderDetail', {
								        itemId: 86,
								        otherParam: '订单详情',
							        });
						        }}
            >订单详情</Button>
            <WhiteSpace style={{paddingTop: 10}}/>
            <Button type="primary" size="large" inline
                    onClick={() => {
							        this.props.navigation.navigate('OrderList', {
								        itemId: 86,
								        otherParam: '订单列表',
							        });
						        }}
            >订单列表</Button>
            <WhiteSpace style={{paddingTop: 10}}/>
            <Button type="primary" size="large" inline
                    onClick={() => {
		                  this.props.navigation.navigate('ProductList', {
			                  otherParam: '机油列表',
		                  });
	                  }}
            >机油列表</Button>
            <WhiteSpace style={{paddingTop: 10}}/>
            <Button type="primary" size="large" inline
                    onClick={() => {
		                  this.props.navigation.navigate('TyreList', {
			                  otherParam: '轮胎列表',
		                  });
	                  }}
            >轮胎列表</Button>
            <WhiteSpace style={{paddingTop: 10}}/>
            <Button type="primary" size="large" inline
                    onClick={() => {
							        this.props.navigation.navigate('Prodetail', {
										// title: '商品详情1',
										skuCode: '1064666',
										storeId: '1',
										isServiceDetail: true,
										indexGroups: {
											serviceIndex:0,
											categoryIndex:0,
											subCategoryIndex:1
										}
							        });
						        }}
            >商品详情</Button>
			<WhiteSpace style={{paddingTop: 10}}/>
            <Button type="primary" size="large" inline
                    onClick={() => {
							        this.props.navigation.navigate('Prodetail', {
										title: '轮胎商品详情1',
										skuCode: '1064876',
										storeId: '1',
                                        isServiceDetail: true,
										// isTyre: true,
										indexGroups: {
											serviceIndex:0,
											categoryIndex:0,
											subCategoryIndex:1
										}
							        });
						        }}
            >轮胎商品详情</Button>
			<WhiteSpace style={{paddingTop: 10}}/>
            <Button type="primary" size="large" inline
                    onClick={() => {
							        this.props.navigation.navigate('Prodetail', {
										skuCode: '1064351',
										// isTyre: false,
							        });
						        }}
            >活动商品详情</Button>
			<WhiteSpace style={{paddingTop: 10}}/>
            <Button type="primary" size="large" inline
                    onClick={() => {
							        this.props.navigation.navigate('Prodetail', {
										skuCode: '1064686',
										// isTyre: true,
										title: '123',
										// toOrder: false,
							        });
						        }}
            >活动轮胎商品详情</Button>
            <WhiteSpace style={{paddingTop: 10}}/>
            <Button type="primary" size="large" inline
                    onClick={() => {
							        this.props.navigation.navigate('MyCoupons', {
								        otherParam: '选择优惠券',
							        });
						        }}
            >选择优惠券</Button>
            <WhiteSpace style={{paddingTop: 10}}/>
            <Button type="primary" size="large" inline
                    onClick={() => {
							        this.props.navigation.navigate('MyCards', {
								        otherParam: '选择套餐卡',
							        });
						        }}
            >选择套餐卡</Button>
            <WhiteSpace style={{paddingTop: 10}}/>
            <Button type="primary" size="large" inline
                    onClick={() => {
							        this.props.navigation.navigate('OrderConfirms', {
								        otherParam: '订单',
							        });
						        }}
            >订单</Button>
		  <WhiteSpace style={{paddingTop: 10}}/>
		  <Button type="primary" size="large" inline
				  onClick={() => {
					  this.props.navigation.navigate('ErrorPage', {
					  });
				  }}
		  >出错页面</Button>
          </WingBlank>


        
        </ScrollView>
      </View>
		);
	}
}
const styles = StyleSheet.create({
	line: {
		marginTop: 15,
		marginBottom: 5,
		borderTopWidth: 0.5,
		borderTopColor: "#999"
	},
	wrapper: {
		height: 220
	},
	image: {
		height: 220,
		width: '100%'
	},
	slide1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#9DD6EB',
	},
	slide2: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#97CAE5',
	},
	slide3: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#92BBD9',
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold',
	}
})