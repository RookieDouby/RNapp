/**
 *  * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry,DeviceEventEmitter,Image,ScrollView,StatusBar,StyleSheet,Text, TouchableOpacity, TouchableHighlight,View } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import Util from './view/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

import Day1 from './view/day1'; //bug when not Z then exit
import Day2 from './view/day2';

class MainView extends Component {
    constructor() {
        super();
        this.state = {
           days: [{
               key:0,
               title:"A stopwatch",
               component: Day1,
               isFA: false,
               icon: "ios-stopwatch",
               size: 48,
               color: "red",
               hideNav: false,
           },{
               key:1,
               title:"A weather app",
               component: Day2,
               isFA: false,
               icon: "ios-partly-sunny",
               size:60,
               color:"#90bdc1",
               hideNav: true,
           },]
        };
    }

    _jumpToDay(index){
        this.props.navigator.push({
            title: this.state.days[index].title,
            index: index + 1,
            display: !this.state.days[index].hideNav,
            component: this.state.days[index].component,
        })
    }

    render() {
        var onThis = this;
        var boxs = this.state.days.map(function(elem, index) {
            return(
                <TouchableHighlight key={elem.key} style={[styles.touchBox, index%3==2?styles.touchBox2:styles.touchBox1]} underlayColor="#abc" onPress={()=> onThis._jumpToDay(index)}>
                    <View style={styles.boxContainer}>
                        <Text style={styles.boxText}>Day{index+1}</Text>
                        {elem.isFA? <IconFA size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></IconFA>:
                            <Icon size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></Icon>}
                    </View>
                </TouchableHighlight>
            );
        })
        return(
            <ScrollView style={styles.mainView} title={this.props.title}>
                <Swiper height={150} showsButtons={false} autoplay={true}
                        activeDot={<View style={{backgroundColor: 'rgba(255,255,255,0.8)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
                    <TouchableHighlight onPress={()=> onThis._jumpToDay(0)}>
                        <View style={styles.slide}>
                            <Image style={styles.image} source={{uri:'day1'}}></Image>
                            <Text style={styles.slideText}>Day1: Timer</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> onThis._jumpToDay(1)}>
                        <View style={styles.slide}>
                            <Image style={styles.image} source={{uri:'day2'}}></Image>
                            <Text style={styles.slideText}>Day2: Weather</Text>
                        </View>
                    </TouchableHighlight>
                </Swiper>
                <View style={styles.touchBoxContainer}>
                    {boxs}
                </View>
            </ScrollView>
        );
    }
}

class NavigationBar extends Navigator.NavigationBar {
    render() {
        var routes = this.props.navState.routeStack;

        if (routes.length) {
            var route = routes[routes.length - 1];

            if (route.display === false) {
                return null;
            }
        }

        return super.render();
    }
}

export default class RNapp extends Component {
    componentDidMount() {
        StatusBar.setBarStyle(0);
    }

    configureScene(route, routeStack) {
        if (route.type == 'Bottom') {
            return Navigator.SceneConfigs.FloatFromBottom;
        }
        return Navigator.SceneConfigs.PushFromRight;
    }

    routeMapper = {
        LeftButton: (route, navigator, index, navState) =>
        {
            if(route.index > 0) {
                return <TouchableOpacity
                    underlayColor='transparent'
                    onPress={() => {if (index > 0) {navigator.pop()}}}>
                    <Text style={styles.navBackBtn}><Icon size={18} name="ios-arrow-back"></Icon> Back</Text>
                </TouchableOpacity>;
            }else{
                return null;
            }
        },
        RightButton: (route, navigator, index, navState) =>
        { return null; },
        Title: (route, navigator, index, navState) =>
        { return (<Text style={styles.navTitle}>{route.title}</Text>); },
    };

    render(){
        return (
            <Navigator
                initialRoute={{
                    title: '30 Days of RN',
                    index: 0,
                    display: true,
                    component: MainView,
                }}
                configureScene={this.configureScene}
                renderScene={(route, navigator) => {
                    return <route.component navigator={navigator} title={route.title} index={route.index} />
                }}
                navigationBar={
                    <NavigationBar
                        routeMapper={this.routeMapper}
                        style={styles.navBar}
                    />
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flexGrow:1,
    },
    mainView: {
        marginTop: 63
    },
    navBar: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    navTitle: {
        paddingTop: 10,
        fontSize: 18,
        fontWeight: "500",
    },
    navBackBtn: {
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 18,
        color: "red",
    },
    itemWrapper:{
        backgroundColor: '#f3f3f3'
    },
    touchBox:{
        width: Util.size.width/3-0.33334,
        height:Util.size.width/3,
        backgroundColor:"#fff",
    },
    touchBoxContainer:{
        flexDirection: "row",
        flexWrap:"wrap",
        width: Util.size.width,
        borderTopWidth: Util.pixel,
        borderTopColor:"#ccc",
        borderLeftWidth: Util.pixel,
        borderLeftColor:"#ccc",
        borderRightWidth: Util.pixel,
        borderRightColor:"#ccc",
    },
    touchBox1:{
        borderBottomWidth: Util.pixel,
        borderBottomColor:"#ccc",
        borderRightWidth: Util.pixel,
        borderRightColor:"#ccc",
    },
    touchBox2:{
        borderBottomWidth: Util.pixel,
        borderBottomColor:"#ccc",
        borderLeftWidth: Util.pixel,
        borderLeftColor:"#ccc",
    },
    boxContainer:{
        alignItems:"center",
        justifyContent:"center",
        width: Util.size.width/3,
        height:Util.size.width/3,
    },
    boxIcon:{
        position:"relative",
        top:-10
    },
    boxText:{
        position:"absolute",
        bottom:15,
        width:Util.size.width/3,
        textAlign:"center",
        left: 0,
        backgroundColor:"transparent"
    },
    slide: {
        flexGrow: 1,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slideText:{
        position:"absolute",
        bottom: 0,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:"rgba(255,255,255,0.5)",
        width: Util.size.width,
        textAlign:"center",
        fontSize: 12
    },
    image:{
        width: Util.size.width,
        flexGrow: 1,
        alignSelf: 'stretch',
    }
});

AppRegistry.registerComponent('RNapp', () => RNapp);
