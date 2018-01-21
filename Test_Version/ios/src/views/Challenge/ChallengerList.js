import React, { Component } from 'react';
import { View, Text, Image, Alert,Button, AsyncStorage,StyleSheet, Text as TextReact, Share, Modal, Keyboard, Easing, FlatList, ScrollView, Dimensions, InteractionManager, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
// import {List, ListItem } from 'react-native-elements';

let ITEM_HEIGHT = Dimensions.get('window').height / 14;

export default class ChallengerList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ItemColor: '#0883b1',
            clicked : false,
            index: 0,
            data:[],
            page:1,
            seed:1,
            error:null,
            loading:false,
            json:'',
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
        console.log('666666666');
        // console.log(this.state.json);
        if(this.state.data.length!=0){
            console.log(this.state.data[0].email);
        }
        // console.log(json[1].gender);
        // alert(JSON.stringify(json));
    }

    _sourceData = [
        {key: 'Peter Wood'},
        {key: 'Maggietr'},
        {key: 'Semtex'},
        {key: 'Schlatter'},
        {key: 'Frank'},
        {key: 'Stella'},
        {key: 'Jimmy'},
        {key: 'Trojan'},
        {key: 'Obama'},
        {key: 'Dina'},
        {key: 'Oscar'},
    ]

    _onPress(item, index)  {
        // this.setState({ItemColor:'#3a99bb'});
        // alert("you choose " + item.key);
        var newState = true;
        this.setState({clicked:true});
        this.setState({index:index});
        this.props.callbackParent(newState,item.name.first+' '+item.name.last);
        // alert('press ' + this.state.index);
    }

    showHideCheck(index){
        if(this.state.index===index && this.state.clicked) {
            return (
                <Image style={styles.checkMark} source={require('../../images/check.png')}/>
            );
        }
    }

    // renderItemComponent = ({item, index}) => {
    //     return (
    //         <TouchableHighlight
    //
    //             onPress={() => this._onPress(item, index)}>
    //             <View style={[styles.item, (this.state.index===index) && this.state.clicked && {backgroundColor: '#3a99bb'}]}>
    //                 <Text style ={styles.number}>{index + 1} {'  '}</Text>
    //                 <Image style = {styles. portraitImage } source={require('../images/profile.jpeg')} />
    //                 <Text style = {styles.itemText}>{'      '} {item.key}</Text>
    //                 {this.showHideCheck(index)}
    //             </View>
    //
    //         </TouchableHighlight>
    //     );
    // };

    renderItemComponent = ({item, index}) => {
        if (this.props.whoPaired != (item.name.first + ' ' + item.name.last)) {
            return (
                <TouchableHighlight

                    onPress={() => this._onPress(item, index)}>
                    <View
                        style={[styles.item, (this.state.index === index) && this.state.clicked && {backgroundColor: '#8CEA4D'}]}>
                        <Text style={styles.itemText}>{'      '} {item.name.first}{' '}{item.name.last}</Text>
                        {/*{this.showHideCheck(index)}*/}
                    </View>

                </TouchableHighlight>
            );
        }
    };

    makeRemoteRequest = () => {
        // const { page, seed } = this.state;
        // const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        const url = `https://randomuser.me/api/?seed=10&page=1&results=20`;
        this.setState({ loading: true });

        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({data:responseJson.results});
                this.setState({json:responseJson.results[0].email});
                console.log(responseJson.results[0].email);
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };

    _keyExtractor = (item, index) => item.name.first;

    render(){

        return(
            <FlatList
                style = {styles.list}
                data = {this.state.data}
                renderItem = {this.renderItemComponent}
                ListHeaderComponent = {this._header}
                ItemSeparatorComponent = { ItemDivideComponent }
                keyExtractor = {this._keyExtractor}
                getItemLayout = {(data,index)=>(
                     {length: ITEM_HEIGHT, offset: (ITEM_HEIGHT + 1) * index, index}
                )}

            />
        );
    }



};

//create list separator
class ItemDivideComponent extends Component {
    render() {

        return (
            <View style={{height: 1, backgroundColor: 'skyblue'}}
            />
        );
    }
};

const styles = StyleSheet.create({
    list:{
        height: (ITEM_HEIGHT + 1) * 8 + 20,
    },
    item:{
        flexDirection:'row',
        backgroundColor: '#4A90E2',
        height:ITEM_HEIGHT,
        // justifyContent:"space-around",
        alignItems:'center',
        paddingLeft:5,
    },
    itemAlt:{
        flexDirection:'row',
        backgroundColor: '#8CEA4D',
        height:ITEM_HEIGHT,
        // justifyContent:"space-around",
        alignItems:'center',
        paddingLeft:5,
    },
    itemText:{
        fontSize: 16,
        fontWeight: 'bold',
        color:'white',
        textAlign:'left',
        width:Dimensions.get('window').width * 2 / 3,
    },

    portraitImage:{
        width:40,
        height:40,
        borderRadius:20,
        paddingRight:12,
    },
    checkMark:{
        width:25,
        height:25,

    },
    number:{
        fontSize: 14,
        color:'white',
        textAlign:'right',
        width:Dimensions.get('window').width * 1 / 15,
        marginRight:5,
    }

});

module.exports = ChallengerList;