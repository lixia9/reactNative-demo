import React from 'react';
import {Easing, Animated, Alert, YellowBox, Platform, View, Dimensions} from 'react-native';
import { NativeModules, NativeEventEmitterm, DeviceEventEmitter } from 'react-native';
import {setJSExceptionHandler, getJSExceptionHandler} from 'react-native-exception-handler';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
import Home from "./pages/home"
import Test from "./pages/basetest/test"
import navconfig from './components/navconfig';
import { log } from "./utils/api"

const { NativeManager } = NativeModules;
let AppNavigator = {};
//暂时过滤掉isMounted警告提示 方便开发
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getActiveRouteName(route);
    }
    return route.routeName;
}

const errorHandler = (e, isFatal) => {
    log({
        log:e
    })
      console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  };
 setJSExceptionHandler(errorHandler);
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { globleHeight: "100%" };

    }
    NativeCallJSMethod(data) {
        Alert.alert(data.result)
    }
    handleFirstConnectivityChange(isConnected) {
        console.log('Then, is ' + (isConnected ? 'online' : 'offline'));

    }

    componentWillUnmount() {
       
        this.listener = null;

    }
    componentWillMount() {
        let isIPhoneX = false;
	      if (Platform.OS === 'ios') {
		        const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');
		        if (D_WIDTH === 375 && D_HEIGHT === 812) {
			        isIPhoneX = true;
		        }
	      }
        global.ENV = null;
        global.HEADER = null;
        global.CITY = null;
        global.navDisable = false;
        global.webViewUserInfo=null;
        global.APPBAR_HEIGHT = Platform.OS === 'ios' ? (isIPhoneX ? 90 : 44) : 56;
        global.NETWORK_ERROR = false;
        DeviceEventEmitter.addListener("globalHeight", (data) => {
            this.setState({
                globleHeight: data
            })
        });
        try {
            const nativeManagerEmitter = new NativeEventEmitter(NativeManager);
            this.listener = nativeManagerEmitter.addListener('NativeCallJSMethod', this.NativeCallJSMethod.bind(this));
        } catch (error) {

        }
        let _initialRouteParams = this.props.param || {};
        if (Platform.OS !== 'ios' && this.props.param) {
            _initialRouteParams = JSON.parse(this.props.param)
        }
        AppNavigator = createStackNavigator(
            {
                Test,
                Home,
            }, {
                //  initialRouteName: 'MyCards',
                initialRouteName: "Test",
                initialRouteParams: _initialRouteParams,
                /* 首页配置文件 */
                navigationOptions: ({ navigation }) => (Object.assign(navconfig(navigation, "", {}), {
                    headerStyle: {
                        borderBottomColor: 'transparent',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                    },
                    headerTintColor: '#262834',
                    headerTitleStyle: {
                        fontSize: 16,
                        flex: 1,
                        textAlign: "center"

                    },
                })),
                transitionConfig: () => ({
                    transitionSpec: {
                        duration: 300,
                        easing: Easing.out(Easing.poly(4)),
                        timing: Animated.timing,
                    },
                    screenInterpolator: sceneProps => {
                        const { layout, position, scene } = sceneProps;
                        const { index } = scene;
                        const width = layout.initWidth;
                        const translateX = position.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [width, 0, 0],
                        });

                        /*
                         const height = layout.initHeight;
                         const translateY = position.interpolate({
                         inputRange: [index - 1, index, index + 1],
                         outputRange: [height, 0, 0],
                         });
                         */

                        const opacity = position.interpolate({
                            inputRange: [index - 1, index - 0.99, index],
                            outputRange: [0, 1, 1],
                        });

                        return { opacity, transform: [{ translateX: translateX }] };
                    },
                }),
            }
        );
    }

    componentDidMount() {
        global.pageName = this.props.page;
    }

    render() {

        return (<View style={{ flex: 1 }}>
            <View style={{ height: this.state.globleHeight, overflow: "hidden" }}>
                <AppNavigator 
                    onNavigationStateChange={(prevState, currentState) => {
                        const currentScreen = getActiveRouteName(currentState);
                        const prevScreen = getActiveRouteName(prevState);
                        if (prevScreen !== currentScreen) {
                            DeviceEventEmitter.emit(currentScreen)
                            // the line below uses the Google Analytics tracker
                            // change the tracker here to use other Mobile analytics SDK.
                           
                        }
                    }


                    }
                />

            </View>

            <View style={{ height: "100%" }}></View>

        </View>)
    }
}