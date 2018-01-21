import React, { Component } from 'react';
import { View, Text, Navigator, StatusBar,Image,StyleSheet, Button, Dimensions, TouchableOpacity,TouchableHighlight,Modal } from 'react-native';


export default class Idea extends Component {
    constructor(props){
        super(props);
        this.state = {
            boxVisibile : this.props.visibile
        }
    }



    render(){
        console.log(this.state.visibile + "xl");
        return(
            <View>
                <Modal
                    animationType = {'fade'}
                    visible = {this.props.showBox}>

                <View>
                    {this.inputBox()}
                </View>
                </Modal>
            </View>
        )
    }


    inputBox() {
        return(
            <View style={[styles.popScreenSmallBackground, styles.modalBackgroundStyle]}>
                <View style={styles.popScreenSmall}>
                    <View style = {styles.alert}>
                        <Text style = {styles.pointsContent}>{this.state.whoBeClick} 1already has a Challenge partner for today. Please repick.</Text >
                    </View>
                    <TouchableOpacity onPress={()=> this.setState({boxVisibile:false})}>
                        <View style = {styles.ok}>
                            <Text style = {styles.pointsContent}> OK </Text >
                        </View>
                    </TouchableOpacity>
                </View>
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


