import React, { Component } from 'react';
import { View,
    Text,
    Image,
    Alert,
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
var dailyCompetitor = require("../../views/Challenge/Data.json");

export default class Challenge extends Component{
    constructor(props){
        super(props);
        this.state = {
            load: false,
            upcoming: 123,
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    }


    componentDidMount = () => {

        this.GetData();

}



    render(){
        const { navigate } = this.props.navigation;
        const { callback1 } = this.props.callbackParent;
        console.log(this.state.load);
        if(this.state.load == true){
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

                    <View style={styles.challengeButton} >
                        <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                        <TouchableOpacity   onPress={() => {this.props.callbackParent(); navigate('Camera', {name: 'Test'}); } }>
                            <Text style={styles.btnText}> do it</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.challengeButton} >
                        <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                        <TouchableOpacity   >
                            <Text style={styles.btnText}> Challenge your friend</Text>
                        </TouchableOpacity>

                    </View>


                    <View  style={styles.upChallengeContentCaption}>
                        <Text style={styles.captionText }> upcoming challenge</Text>
                    </View>
                    <View  style={styles.upComingChallenge} >

                        {this.renderContent()}

                    </View>
                    <View style={styles.challengeButton} >
                        <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                        <TouchableOpacity   >
                            <Text style={styles.btnText}> Submit Your Idea</Text>
                        </TouchableOpacity>

                    </View>
                    <View >



                    </View>
                </View>

            );
        }else{
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

                    <View style={styles.challengeButton} >
                        <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                        <TouchableOpacity   onPress={() => {this.props.callbackParent(); navigate('Camera', {name: 'Test'}); } }>
                            <Text style={styles.btnText}> do it3</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.challengeButton} >
                        <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                        <TouchableOpacity   >
                            <Text style={styles.btnText}> Challenge your friend</Text>
                        </TouchableOpacity>

                    </View>


                    <View  style={styles.upChallengeContentCaption}>
                        <Text style={styles.captionText }> upcoming challenge</Text>
                    </View>
                    <View  style={styles.upComingChallenge} >



                        <View style={styles.upChallengeContent}>

                            <Text id="upcomingChallenge1" style={styles.textProperty }> Eat banana in 8 second</Text>
                            <Text style={styles.textProperty }> shotgun a beer</Text>
                        </View>

                        <View style={styles.upChallengeContent}>
                            <Text style={styles.textProperty }> Eat banana in 10 second</Text>
                            <Text style={ styles.textProperty }> shotgun a beer</Text>
                        </View>
                    </View>
                    <View style={styles.challengeButton} >
                        <Image style = {styles.captionImage } source={require('../../images/pin.png')}/>
                        <TouchableOpacity   >
                            <Text style={styles.btnText}> Submit Your Idea</Text>
                        </TouchableOpacity>

                    </View>
                    <View >



                    </View>
                </View>

            );
        }

    }


    renderContent() {

        var competitor = [];
         let dailyCompetitor = this.state.upcoming.UpcomingChallenge;
            console.log(this.state.upcoming);
         // traverse

           for (var i = 0; i < this.state.upcoming.length; i += 2) {
               let itemLeft = this.state.upcoming[i];
               let itemRight = this.state.upcoming[i + 1];
               competitor.push(
                   <View style={styles.upChallengeContent}>
                       <Text  style={styles.textProperty}> {itemLeft.content}</Text>
                       <Text style={styles.textProperty}>  {itemRight.content}</Text>
                   </View>
               )
           }
           console.log(competitor);
           return competitor;
          //     console.log(item);
          // }
         //     // get item
         //     var item = dailyCompetitor.DailyCompetitor[i];
         //
         //     // load arr;
         //     competitor.push(
         //         <View key={i} >
         //             <Text>{item.name}</Text>
         //         </View>
         //     )
         // }





        // let upcoming1;
        // let array ;
        // this.GetData().then(DailyCompetitor =>{
        //     //console.log(DailyCompetitor);
        //     this.setState( {load : true , upcoming : DailyCompetitor})
        //     array = JSON.stringify(DailyCompetitor);
        //     // console.log(upcoming1);
        //
        // }).catch(function (error) {
        //     throw error;
        // });
        let array1;
        //console.log(this.state.upcoming);
        array1 = JSON.stringify(this.state.upcoming)
        //console.log(array1);
       // for( let i = 0; i < this.state.upcoming.length;)
       // console.log(array);
        //console.log(this.state.upcoming);
       // alert(JSON.stringify(upcoming1));
        //console.log(upcoming1);
        //
        //     .then( (DailyCompetitor) => {
        //     //console.log(DailyCompetitor);
        //     let upcoming = JSON.stringify(DailyCompetitor);
        //     //console.log(name1);
        //    name = this.showName(upcoming);
        //     // console.log( "123" + this.state.upcoming );
        // }).done();

        //console.log("hha");

       // if()
       // let upcomingData = JSON.parse(this.upcoming);

        //console.log(upcomingData);
       //   let content = Connect().then( (DailyCompetitor) => {
       //
       //      var upcomingData = [];
       //      //console.log(responseJson);
       //      for (var i = 0; i < DailyCompetitor.UpcomingChallenge.length; i++) {
       //          let item = DailyCompetitor.UpcomingChallenge[i];
       //          upcomingData.push(
       //              item.content
       //          )
       //      }
       //
       //      return upcomingData;
       //
       //      //this.setState({source:upcomingData})
       //    //  console.log("1"+upcomingData);
       //     // return upcomingData;
       //
       //
       //
       //  });
       //   console.log("11111" + content[1])
       //
       // // // console.log("x"+JSON.stringify(upcoming[0]));
       // // // console.log("after"+this.upcoming);
       // //  //
       // //  // {/*<View style={styles.upChallengeContent}>*/}
       // //  // {/*<Text style={styles.textProperty }>{itemLeft.content}</Text>*/}
       // //  // {/*<Text style={styles.textProperty }>{itemRight.content}</Text>*/}
       // //  // {/*</View>*/}
       // //  // // define array to hold all competitor
       // //  // var competitor = [];
       // //  // dailyCompetitor = Json.stringify(dailyCompetitor);
       // //  // // traverse
       // //  // console.log(dailyCompetitor);
       // //  // for (var i = 0; i < dailyCompetitor.DailyCompetitor.length; i++) {
       // //  //     // get item
       // //  //     var item = dailyCompetitor.DailyCompetitor[i];
       // //  //
       // //  //     // load arr;
       // //  //     competitor.push(
       // //  //         <View key={i} >
       // //  //             <Text>{item.name}</Text>
       // //  //         </View>
       // //  //     )
       // //  // }
       //
       //   let res = this.state.upcoming.slice();
       //
       //  let contentUpcoming = [];
       //  for( let i = 0; i < 4; i+=2){
       //      contentUpcoming.push(
       //          <View style={styles.upChallengeContent}>
       //          <Text style={styles.textProperty }>{res[i]}</Text>
       //          <Text style={styles.textProperty }>{res[i+1]}</Text>
       //          </View>
       //      )
       //  }
       //
       //  return contentUpcoming;
    }


  GetData =() => {

      const url = `http://localhost/`;
      //this.setState({ loading: true });
      return fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
              this.setState({ load : true, upcoming:responseJson.UpcomingChallenge});
          })
          .catch(error => {
              throw  error
          });


      // Connect().then(function (DailyCompetitor){
      //
      //     //console.log(DailyCompetitor.UpcomingChallenge);
      //     this.setState({load : true , upcoming : (DailyCompetitor.UpcomingChallenge)}).bind(this);
      //     //console.log(this.state.upcoming);
      //     //console.log(this.state.load);
      // }).catch(function (error) {
      //     throw error;
      // });

 }
};




const styles = StyleSheet.create({
    upChallengeContentCaption:{
        marginTop:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",

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
        color:'white',
        height:25,
        left : 5
    },
    upChallengeContent:{
        flexDirection:'column',
    },
    upComingChallenge:{

        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        margin:10,
        width: Dimensions.get('window').width-(Dimensions.get('window').width)/2,
        left:(Dimensions.get('window').width)/15,
    },
    challengeButton:{
        backgroundColor:"#5CACEE",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        margin:10,
        borderWidth:3,
        borderColor:"white",
        borderRadius:5,
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
        backgroundColor: "#84c1ff",
        width: Dimensions.get('window').width-(Dimensions.get('window').width)/7,
        height: Dimensions.get('window').height-(Dimensions.get('window').height)/7,
        left:(Dimensions.get('window').width)/14,
        top:(Dimensions.get('window').height)/30,
        flexDirection:'column',
        padding:30,
        borderColor: "white",
        borderWidth:3,
        zIndex:-1,
    }
});
module.exports = Challenge;