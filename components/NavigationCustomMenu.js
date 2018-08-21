import React from 'react';
import {StyleSheet, Image, TouchableOpacity, Text, View} from 'react-native';
import {closeRNView,loading} from "../utils/common"

export class NavigationCustomBackMenu extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={() => {
                   loading({show:false})
                   if(!global.navDisable){
                    if (this.props.nav.state.key.split("-")[2] > 0 && this.props.nav.state.routeName !== global.pageName) {
                        if (this.props.callback) {
                            this.props.callback(this.props.nav);
                        } else {
                            this.props.nav.goBack()
                        }
                    } else {
                        closeRNView();
                    }
                }}
            }
            >
                {this.props.solt || <View style={styles.imageWrap}><Image source={require('../assets/imgs/icons/arrow_left.png')}
                                                 style={styles.image}/><Text style={styles.atext}>{this.props.text || null}</Text></View>
                }

            </TouchableOpacity>
        );
    }
}

export class NavigationCustomRightMenu extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.headerNav}
                onPress={() => {
                    if(!global.navDisable){
                    this.props.callback(this.props.nav);
                    }
                }}
            >
                {this.props.solt || ""}
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    imageWrap:{
        flex:1,
        flexDirection: "row",
        alignItems: "center",
        minWidth: 40,
        marginLeft: 13,
    },

    atext: {
        marginLeft: 5
    },
    right: {
        color: '#262834',
        marginRight: 13,
    },

    headerNav: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20,
    },
    headerNavTxt: {
        paddingLeft: 4,
        color: '#4a4a4a',
        fontSize: 12
    },
});
