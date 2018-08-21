import React from 'react';
import { View} from 'react-native';
import {NavigationCustomBackMenu, NavigationCustomRightMenu} from "./NavigationCustomMenu";


export default navconfig = (navigation, pageName, options={}) => {
    return {
        title:pageName,
        headerLeft: (
            <NavigationCustomBackMenu nav={navigation}
                                       solt={options.left && options.left.solt ||""}
                                      callback={options.left && options.left.callback}/>
        ),
        headerRight:(
            options.right ? <NavigationCustomRightMenu nav={navigation}
                                              solt={options.right.solt ||""}
                                               callback={options.right.callback}/> : <View />
        ),
    }
}
