import React, { Component } from 'react';
import { View, Text, Image, Alert,Button, AsyncStorage,StyleSheet, Text as TextReact, Share, Modal, Keyboard, Easing, FlatList, ScrollView, Dimensions, InteractionManager, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
// import {List, ListItem } from 'react-native-elements';

var ChallengerList = require('./ChallengerList')

export default class ChooseChallenger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // modalVisible: false,
            showGo:false,
            whoBeClick:'',
            alertModalVisible:false,
            hintModalVisible:false,
            isGameOn:false,
            whoIsPaired:'',
        };
    }

    // setModalVisible(visible){
    //     this.setState({modalVisible: visible});
    // }

    onClickPerson = (newState,who)=> {
        this.setState({showGo: newState,whoBeClick:who});

    }

    showGo(){
        if(this.state.showGo){
            return(
                <View style = {styles.footer}>
                    <View>
                        <Text style = {styles.hintName}>{this.state.whoBeClick}</Text>
                        <Text  style = {styles.hint}> will be paired with you</Text>
                    </View>
                    <View style = {{alignItems: 'center'}}>
                        <TouchableOpacity style = {{height:50,width:50}} onPress = {()=> this.clickGo()}>
                            <Image style = {{height:50,width:50} } source={require('../../images/handmade-go-signal-with-right-arrow.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

    clickGo(){
        if(this.state.whoBeClick.length > 12){
            this.setState({whoIsPaired:this.state.whoBeClick});
            this.setState({alertModalVisible:true});
        }else{
            this.setState({hintModalVisible:true});
            this.setState({isGameOn:true});
            this.props.gameOn(true);
        }
    }

    clickBack() {
        this.setState({showGo: false,whoBeClick:''});
        // this.props.showPage = false;
        this.props.callbackParent(false);
    }

    showAlertContent() {
            return(
                <View style={[styles.popScreenSmallBackground, styles.modalBackgroundStyle]}>
                    <View style={styles.popScreenSmall}>
                        <View style = {styles.alert}>
                            <Text style = {styles.pointsContent}>{this.state.whoBeClick} already has a Challenge partner for today. Please repick.</Text >
                        </View>
                        <TouchableOpacity onPress={()=> this.setState({alertModalVisible:false})}>
                            <View style = {styles.ok}>
                                <Text style = {styles.pointsContent}> OK </Text >
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
    }

    showList(){
        return(
            <View>
                <View style = {styles.header}>
                    <Image style = {styles.captionImage } source={require('../../images/lace-2.png')} />
                    <Text style = {styles.headerText}>   Pick a competitor</Text>
                </View>
                <View>
                    <ChallengerList callbackParent = {this.onClickPerson} whoPaired = {this.state.whoIsPaired}></ChallengerList>
                </View>
                <View style = {styles.listBottomSeparator}>
                </View>
                {this.showGo()}



            </View>
        );
    }

    showHint(){
        return(
            <View>
                <View style = {styles.hintHeader}>
                    <Image style = {styles.captionImage } source={require('../../images/lace-2.png')} />
                    <Text style = {styles.headerText}> {'   '}GAME IS ON</Text >
                </View>

                <View>
                    <Text style = {styles.challengeTitle}> Give a hug to random person</Text >
                </View>

                <View style = {styles.pointsView}>
                    <View style = {styles.points}>
                        <Text style = {styles.subtitleText}> Available points in this Challenge</Text >
                        <View style = {{flexDirection:'row'}}>
                            <Text style = {styles.pointsContent}> Complete Challenge:</Text >
                            <Text style = {styles.pointsContent}> +400p</Text >
                        </View>
                        <Text style = {styles.pointsContent}> Both of you can complete it: +300p</Text >
                    </View>

                    <View style = {styles.points}>
                        <Text style = {styles.subtitleText}> Extra Points</Text >
                        <Text style = {styles.pointsContent}> First Bonus: +200p</Text >
                    </View>
                </View>

                <View style = {styles.hintFooter}>
                    <TouchableOpacity onPress={()=> this.clickBack()}>
                        <View>
                            <View style = {{alignItems: 'center'}}>
                                <TouchableOpacity style = {{height:50,width:50}} onPress = {()=> this.clickBack()}>
                                    <Image style = {{height:50,width:50} } source={require('../../images/handmade-go-signal-with-right-arrow.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }

    showContent(){
        if(!this.state.isGameOn){
            return(
                this.showList()
            );
        }else{
            return(
                this.showHint()
            );
        }
    }

    render(){

        return(<View>
        <Modal
            animationType={'fade'}
            transparent={true}
            visible={this.props.showPage}
        >
            <View style={styles.challengerPage}>
                <View style = {{alignItems: 'flex-start'}}>
                    <TouchableOpacity style = {{height:30,width:30}} onPress = {()=>this.clickBack()}>
                        <Image style = {styles.backIcon} source={require('../../images/back.png')} />
                    </TouchableOpacity>
                </View>
                {this.showContent()}
                <Modal
                    animationType = {'fade'}
                    transparent = {true}
                    visible = {this.state.alertModalVisible}
                >
                    {this.showAlertContent()}
                </Modal>
            </View>


        </Modal>
        </View>
        );
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#44d1ff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    challengersButton:{
        backgroundColor:'#08709e',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        borderWidth:3,
        borderColor:'white',
        borderRadius:5,
    },
    myBtnText:{
        color:'white'
    },
    popScreenSmall:{
        position:'relative',
        backgroundColor: '#4A90E2',
        width: Dimensions.get('window').width - Dimensions.get('window').width / 6,
        height: Dimensions.get('window').height / 4,
        left:(Dimensions.get('window').width)/12,
        flexDirection:'column',
        borderColor: 'white',
        borderWidth:3
    },
    popScreenSmallBackground:{
        position:'relative',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flexDirection:'column',
        paddingTop:Dimensions.get('window').height / 4,
        borderWidth:3
    },
    challengerPage:{
        position:'relative',
        backgroundColor: '#4A90E2',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        paddingTop:Dimensions.get('window').height / 20,
        flexDirection:'column',
    },
    modalBackgroundStyle:{
        backgroundColor:  'rgba(0, 0, 0, 0.75)',
    },
    captionImage:{
        width:25,
        height:30,
        alignItems: 'center',
    },
    backIcon:{
        width:30,
        height:30,
        alignItems: 'center',
    },
    hint:{
        fontWeight: 'bold',
        fontSize: 16,
        color:'#3cbadc',
        textAlign:'center',
        paddingBottom:14,
    },
    hintName:{
        fontWeight: 'bold',
        fontSize: 16,
        color:'#144655',
        textAlign:'center',
    },
    header:{
        flexDirection:'row',
        justifyContent:'center',
        paddingBottom:24,
        alignItems:'center',
        borderBottomWidth:2,
        borderColor:'skyblue',
    },
    hintHeader:{
        flexDirection:'row',
        justifyContent:'center',
        paddingBottom:24,
        alignItems:'center',
    },
    headerText:{

        fontWeight: 'bold',
        fontSize: 20,
        color:'white',
        textAlign:'center',

    },
    listBottomSeparator:{
        borderTopWidth:2,
        borderColor:'skyblue',
    },
    footer:{
        paddingTop:Dimensions.get('window').height / 25,
        paddingBottom:20
    },

    challengeTitle:{
        fontSize: 20,
        color:'white',
        textAlign:'center',
    },
    subtitleText:{
        fontSize: 20,
        color:'#8CEA4D',
        textAlign:'center',
    },
    points:{
        paddingTop:Dimensions.get('window').height / 20,
        flexDirection:'column',
        alignItems:'center',
    },
    pointsContent:{
        fontSize: 16,
        color:'white',
        textAlign:'center',
    },
    pointsView:{
        height: Dimensions.get('window').height / 4,
        paddingBottom:Dimensions.get('window').height / 8,
    },
    hintFooter:{
        paddingTop:Dimensions.get('window').height / 3,
    },
    ok:{
        paddingTop:5,
    },
    alert:{
        paddingTop:Dimensions.get('window').height / 20,
        paddingBottom:Dimensions.get('window').height / 13,
        borderBottomWidth:2,
        borderColor:'white',
    },
});


module.exports = ChooseChallenger;