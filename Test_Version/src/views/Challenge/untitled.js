import React, { Component } from 'react';
import { View,
    Text,
    Image,
    Alert,
    ListView,
    Button,
    AsyncStorage,
    StyleSheet,
    Text as TextReact,
    Share,

    Modal,
    Keyboard,
    Easing,
    FlatList,
    ScrollView,
    Dimensions,
    InteractionManager,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TouchableHighlight} from 'react-native';

import {Navigator} from 'react-native-deprecated-custom-components'
import {Connect} from "../../views/Challenge/connect";

//var Connect = require("../../views/Challenge/connect");
var startGame = React.createClass({
    connectSever (){
        Connect();
    },
    getInitialState: function () {
        Connect();
        return { checked : this.props.initClick};
    },


    showNewsDetailView() {
        console.log('点击cell')
    },




    render(){
     //   const { navigate } = this.props.navigation;
        //const { callback1 } = this.props.callbackParent;

        return(

            <View style={styles.popScreen}>

                <View style = {styles.caption}>
                    <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                    <Text style = {styles.captionText}>USC Daily Challenge</Text>
                </View>

                <View style={styles.timeLeft}>
                    <Text style = {styles.timeLeftText}>8:33</Text>
                </View>

                <View style={styles.challengeContent}>
                    <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                    <Text style = {styles.captionText}>Give a hug to random person</Text>
                </View>

                <View style = {styles.challengersContent}>
                    <View style = {styles.challengersOne}>
                        <Text style = {styles.captionText}> Annie </Text>
                    </View>

                    <View style = {styles.challengersLine}></View>

                    <View style = {styles.challengersTwo}>
                        <Text style = {styles.captionText}> Jason </Text>
                    </View>
                </View>


                <View style={styles.challengeButton} >
                    <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                    <TouchableOpacity >
                        <Text style={styles.captionText}> DO IT</Text>
                    </TouchableOpacity>

                </View>



                <View  style={styles.upChallengeContentCaption}>
                    <Text style={styles.captionText}> Upcoming Challenge </Text>
                </View>
                <View style={styles.upComingChallenge} >

                    <View style={styles.upChallengeContent}>
                        <Text style={styles.textProperty }> Eat banana in 7 second</Text>
                        <Text style={styles.textProperty }> shotgun a beer</Text>
                    </View>
                    <View style={styles.upChallengeContent}>
                        <Text style={styles.textProperty }> Eat banana in 7 second</Text>
                        <Text style={ styles.textProperty }> shotgun a beer</Text>
                    </View>
                </View>

                <View style={styles.submitButton}>
                    <TouchableOpacity   >
                        <Text style={styles.captionText}> Submit Your Idea</Text>
                    </TouchableOpacity>

                </View>
                <View >


                    {this.renderContent()}

                </View>


            </View>





        );
    },


     renderContent() {
       Connect().then(function (DailyCompetitor) {
               var array = [];
               //console.log(responseJson);
               for (var i = 0; i < DailyCompetitor.DailyCompetitor.length; i++) {
                   array.push(DailyCompetitor.DailyCompetitor[i].name)
                   console.log(DailyCompetitor.DailyCompetitor[i].name);
               }});
    },



    //     // let array = [];
    //     // array = this.getData();
    //     // console.log( this.getData().then(function (name) {
    //     //     console.log(name);
    //     // }))
    //     // console.log(array);
    //     // console.log(array[0]);
    //     //let res = Connect();
    //
    //     //res1 = JSON.stringify(res);
    //     //console.log(res);
    //     //console.log(res);
    //     // this.timer2 = setTimeout(
    //     //     ()=>{
    //     //         let res = dailyCompetitor;
    //     //         console.log(res);
    //     //         res = JSON.stringify(res);
    //     //         console.log(res);
    //     //         console.log('setTimeout22222222'); },
    //     //     2000,
    //     // );
    //
    //     // define array to hold all competitor
    //     var competitor = [];
    //
    //     // traverse
    // },
    // async getData(){
    //     try {
    //
    //         let response = await fetch('http://localhost/');
    //         let responseJson = await response.json();
    //         //console.log(responseJson);
    //
    //         return this.dealwithData(responseJson);
    //     } catch(error) {
    //         console.error(error);
    //     }
    // },

});


const styles = StyleSheet.create({
    upChallengeContentCaption:{
        marginTop:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        top: 70

    },
    buttonStyle:{
        borderWidth:3,
        borderColor:"white",
        backgroundColor: "#5CACEE"
    },
    timeLeftText:{
        fontSize: 15,
        color:'white'
    },
    captionText:{
        fontSize: 15,
        color:'white'
    },
    textProperty:{
        fontSize: 10,
        margin:5,
        color:'white'
    },

    challengersContent:{
        flexDirection:'row',

    },

    challengerSide:{
        flexDirection:'column',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },

    challengersOne:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        position: "absolute"

    },

    challengersLine:{

        left: 120,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        borderColor:"white",
        borderWidth: 1,
        paddingTop: 60,
        paddingBottom: 40,
        position: "absolute"
    },


    challengersTwo:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        left: 200,
        position: "absolute"
    },

    upChallengeContent:{
        flexDirection:'column',
        top: 90
    },
    upComingChallenge:{

        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        margin:10,

    },

    submitButton:{
        backgroundColor:"#277DE0",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        margin:10,
        borderWidth:2,
        borderColor:"white",
        borderRadius:5,
        padding:8,
        top:120,
        paddingVertical: 5,
        paddingRight:1,
        paddingLeft:1,
        
        
    },

    challengeButton:{
        backgroundColor:"#83E027",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        margin:10,
        borderWidth:2,
        paddingVertical: 8,
        paddingRight: 1,
        paddingLeft: 1,
        borderColor:"white",
        borderRadius:5,
        padding:5,
        top: 100
    },
    challengeContent:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        margin:10,
    },
    timeLeft:{
        alignItems:"flex-end",
        margin: 10,
    },
    captionImage:{
        width:15,
        height:15
    },
    caption:{

        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        margin: 10,

    },
    popScreen:{
        position:"relative",
        backgroundColor: "#4AA0DF",
        width: Dimensions.get('window').width-(Dimensions.get('window').width)/7,
        height: Dimensions.get('window').height-(Dimensions.get('window').height)/7,
        left:(Dimensions.get('window').width)/14,
        flexDirection:'column',
        padding:30,
        borderColor: "white",
        borderWidth:3
    }
});
module.exports = startGame;