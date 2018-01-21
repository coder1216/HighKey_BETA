'use strict';

import React, { Component, PropTypes,TabBarIOS } from 'react';
import Contacts from 'react-native-contacts';
import Communications from 'react-native-communications';
import AlphabetListView from 'react-native-alphabetlistview';
import {Navigator} from 'react-native-deprecated-custom-components'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ChooseChallenger from '../../views/challenge/ChallengerChoosePage';
import challenge from '../../views/challenge/Challenge';

import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView,
    Alert,
    Image,
    Button,
    AsyncStorage,
    Text as TextReact, Share, Modal, Keyboard, Easing, Dimensions, InteractionManager, TouchableWithoutFeedback, TouchableHighlight

} from 'react-native';
let ITEM_HEIGHT = Dimensions.get('window').height / 12;

class Cell extends Component {

    constructor(props) {
        super(props);
        this.state = { isSelected: false,
            count: 0};
        this.onPress = this.onPress.bind(this);
        // this.contacts = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }
    onPress() {
        this.props.onSelectContact(this.props.item);
        //this.setState({ isSelected: !this.state.isSelected },{count: this.state.count+1});
        this.setState((state) => Object.assign({}, state,{ isSelected: !this.state.isSelected }, { count: this.state.count + 1 }))
        console.log(this.state.count)
    }

    getIndicatorStyle() {
        if (this.state.isSelected) {
            return styles.IndicatorSelected;
        } else {
            return styles.Indicator;
        }
    }
    getCount(){
        return this.state.count;
    }
    getTextStyle() {
        if (this.props.textStyle) {
            return this.props.textStyle;
        }
        return styles.cellText;
    }

    getCellStyle() {
        let style = {
            justifyContent: 'center',
            paddingLeft: 8,
            flexDirection: 'row',
            height: 45,
        };
        if (this.props.backgroundColor) {
            style.backgroundColor = this.props.backgroundColor;
        }
        return style;
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.onPress()}>
                    <View style={this.getCellStyle()}>

                        <View style={styles.indicatorContainer}>
                            <View style={this.getIndicatorStyle()}></View>
                        </View>

                        <View style={styles.cellTextContainer}>
                            <Text style={this.getTextStyle()}>{this.props.item.name}</Text>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}



class SelectableContactsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            selected: [],
            contacts: [],
            phoneNumbers:[],
            count: 0,
            count2: 0,
            //
            ItemColor: '#0883b1',
            clicked : false,
            index: 0,
            data:[],
            page:1,
            seed:1,
            error:null,
            loading:false,
            json:'',
            //    showMessage:false,
        };
    }
//For Members data

    _copyOnPress(item)  {
        var newState = true;
        this.setState({clicked:true});
    }
    onPress(item,index) {
        this.setState((state) => Object.assign({}, state,{ clicked: !this.state.clicked },));
        this.setState({index:index});
        if(this.state.clicked === true){this.setState({count2:this.state.count2-1})}
            else{this.setState({count2:this.state.count2+1})}
    }
    renderItemComponent = ({item,index}) => {
        return (
            <TouchableOpacity onPress={() => this.onPress(item,index)}>
                <View style={[styles.item,]}>
                    {this.showHideCheck(index)}
                    <Text style = {styles.itemText}>{'    '} {item.name.first}{' '}{item.name.last}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    showHideCheck(index){
        if(this.state.index===index && this.state.clicked) {
            return (
                <Text>{'  '}
                <View style={styles.IndicatorSelected}></View>
                </Text>
            );
        }
        return  <Text>{'  '}<View style={styles.Indicator}></View></Text>
    }

    makeRemoteRequest = () => {
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


    //load member data end
    componentWillMount() {
        this.getContacts();
        this.makeRemoteRequest();
       // this.getMember();
    }

    getContacts() {
        Contacts.getAll((err, contacts) => {
            if (err && err.type === 'permissionDenied') {
            } else {
                console.log(contacts);
                let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
                let groups = {};
                for (let i = 0; i < letters.length; i++) {
                    groups[letters[i]] = [];
                }

                contacts = contacts.map(function(c) {
                    let name = '';
                    if (c.givenName) {
                        name += (c.givenName + ' ');
                    }
                    if (c.familyName) {
                        name += c.familyName;
                    }
                    c.name = name.trim();
                    return c;
                });
                //phoneNumbers = phoneNumbers.map(number => number.number.replace(/\D/g,''));
                contacts = contacts.sort(function(a, b) {
                    if (a.name.toUpperCase() < b.name.toUpperCase()) {
                        return -1;
                    }
                    if (a.name.toUpperCase() > b.name.toUpperCase()) {
                        return 1;
                    }
                    return 0;
                });

                for (let j = 0; j < contacts.length; j++) {
                    let contact = contacts[j];
                    let firstLetter = contact.name[0].toUpperCase();
                    if (firstLetter === firstLetter.toLowerCase()) {
                        groups['#'].push(contact);
                    } else {
                        groups[firstLetter].push(contact);
                    }
                }
                this.setState({ contacts: groups });
            }
        });
    }

    onSelectContact(contact) {
        let selected;
        let currentlySelected = this.state.selected;
        let contactRemoved = currentlySelected.filter(
            s => s.recordID !== contact.recordID
        );
        if (contactRemoved.length === currentlySelected.length) {
            selected = currentlySelected;
            this.setState({count: this.state.count+1});
            selected.push(contact);
        } else {
            selected = contactRemoved;
            this.setState({count: this.state.count-1});
        }
        this.setState({ selected: selected });

        // this.props.onSelectContact(selected);
    }

    onSelectMember(member) {
        let selected;
        let currentlySelected = this.state.selected;
        let memberRemoved = currentlySelected.filter(
            s => s.recordID !== member.recordID
        );
        if (memberRemoved.length === currentlySelected.length) {
            selected = currentlySelected;
            this.setState({count: this.state.count2+1});
            selected.push(member);
        } else {
            selected = memberRemoved;
            this.setState({count: this.state.count2-1});
        }
        this.setState({ selected: selected });

        // this.props.onSelectContact(selected);
    }


    getCellProps() {
        var cellProps = { onSelectContact: cellsection => this.onSelectContact(cellsection)};

        if (this.props.backgroundColor) {
            cellProps.backgroundColor = this.props.backgroundColor;
        }
        if (this.props.textStyle) {
            cellProps.textStyle = this.props.textStyle;
        }
        if (this.props.indicatorColor) {
            cellProps.indicatorColor = this.props.indicatorColor;
        }
        return cellProps;
    }

    getMCellProps() {
        var MCellProps = {onSelectMember: cellsection => this.onSelectMember(cellsection) };

        if (this.props.backgroundColor) {
            MCellProps.backgroundColor = this.props.backgroundColor;
        }
        if (this.props.textStyle) {
            MCellProps.textStyle = this.props.textStyle;
        }
        if (this.props.indicatorColor) {
            MCellProps.indicatorColor = this.props.indicatorColor;
        }
        return MCellProps;
    }

    clickBack() {
        this.props.callbackfromContacts(false);
        //this.props.callbackParent(modalVisible);
    }

    _keyExtractor = (item, index) => item.name.first;

    render() {
        //const { navigate } = this.props.navigation;
        return (
            <Modal

             //   animationType={"fade"}
               // transparent={true}
                visible={this.props.showContact}
            >
            <View style={{ flex: 1 }}>


                <View style={styles.firstView}>
                    <TouchableOpacity  onPress={() => {this.clickBack()}} >
                        <Text style={styles.cancelButton}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.midTitle}>Challenge</Text>
                </View>

                <ScrollableTabView tabBarPosition='top'
                 tabBarUnderlineStyle={{backgroundColor:'#4A90E2'}}
                 tabBarBackgroundColor='#FFFFFF'
                 tabBarActiveTextColor='#4A90E2'
                 tabBarInactiveTextColor='black'
                                   tabBarTextStyle={{fontSize: 18}}
                >
                    {/*<AlphabetListView tabLabel="Members"*/}
                                      {/*data={this.state.data}*/}
                                      {/*cell={Cell}*/}
                                      {/*cellProps={this.getCellProps()}*/}
                                      {/*enableEmptySections={true}*/}
                                      {/*pageSize={50}*/}
                                      {/*cellHeight={this.props.cellHeight || 50}*/}
                                      {/*sectionHeaderHeight={this.props.sectionHeaderHeight || 22.5}*/}
                    {/*/>*/}

                    <FlatList tabLabel="Members"
                        style = {styles.list}
                        data = {this.state.data}
                        renderItem = {this.renderItemComponent}
                        keyExtractor = {this._keyExtractor}
                        getItemLayout = {(data,index)=>(
                            {length: 30, offset: (30 + 1) * index, index}
                        )}

                    />
                        <AlphabetListView tabLabel="Friends"
                            data={this.state.contacts}
                            cell={Cell}
                            cellProps={this.getCellProps()}
                            enableEmptySections={true}
                            pageSize={50}
                            cellHeight={this.props.cellHeight || 50}
                            sectionHeaderHeight={this.props.sectionHeaderHeight || 22.5}
                        />
                </ScrollableTabView>


                <View style={styles.thirdView}>
                    <Text
                        style={styles.currentText}>{this.state.count+this.state.count2}</Text>
                    <TouchableOpacity onPress={
                        ()=> {
                            // Communications.text('3235946776','You got a challenge invitation, download populic to check details');
                            Alert.alert(
                                this.state.count+this.state.count2+` Invitation(s) Sent`,
                            )
                        }
                    } >
                        <Text
                            style={styles.confirmText}>Send</Text>

                    </TouchableOpacity>
                </View>

            </View>
            </Modal>

        );
    }

}

/*SelectableContactsList.propTypes = {
    onSelectContact: PropTypes.func.isRequired,
};*/

const styles = StyleSheet.create({
    indicatorContainer: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    cellTextContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    cellText: {
        fontSize: 18,
        color: 'black'
    },
    button: {
        backgroundColor: 'red',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    Indicator:{
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 8,
        borderColor:'white',

    },
    IndicatorSelected:{
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 8,
        backgroundColor : '#4A90E2',
        borderColor : '#4A90E2',

    },
    cancelButton:{
        fontSize: 13,
        marginLeft: 5,
        color:'#7074F2',
        marginTop:10,
    },
    midTitle:{
        fontSize: 20,

        marginRight: 35,
        color:'black',
        textAlign:'center',
        marginTop:8,
        flex:1,
        fontWeight:'bold',
    },
    captionText:{
        fontSize: 15,
        color:'white'
    },
    firstView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        alignItems:'stretch',
        height: 40,
    },
    secondView: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        //alignItems:'stretch'
        height: 30,
    },
    thirdView: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems:'stretch',
        height: 35,
        //alignItems:'stretch'
    },
    currentText: {
        fontSize: 18,
        color: '#7074F2',
        marginLeft: 25,
        marginTop:8,
    },
    confirmText: {
        fontSize: 18,
        color: '#7074F2',
        marginRight: 25,
        marginTop:8,
    },
    friendButton:{
        flex:1,
        backgroundColor:"white",
        borderWidth:0.01,
        borderRadius:0.3,
    },
    friendButtonSelected:{
        flex:1,
        backgroundColor:"#4A90E2",
        borderWidth:0.01,
        borderRadius:0.3,
        height:30
    },
    memberButton:{
        flex:1,
        backgroundColor:"white",
        borderWidth:0.01,
        borderRadius:0.3,
        height:30

    },
    clickButtonTextSelected:{
        fontSize: 18,
        color: 'white',
        fontWeight:'bold',
        textAlign:'center',
        margin:3,
    },
    clickButtonText:{
        fontSize: 18,
        color: 'black',
        fontWeight:'bold',
        textAlign:'center',
        margin:3,
    },


    //
    list:{
        height: (ITEM_HEIGHT + 1) * 8 + 20,
    },
    item:{
        flexDirection:'row',
        backgroundColor: 'white',
        height:ITEM_HEIGHT,
        // justifyContent:"space-around",
        alignItems:'center',
        paddingLeft:5,
    },
    itemAlt:{
        flexDirection:'row',
        //backgroundColor: '#3a99bb',
        height:ITEM_HEIGHT,
        // justifyContent:"space-around",
        alignItems:'center',
        paddingLeft:5,
    },
    itemText:{
        fontSize: 18,
        color:'black',
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

export default SelectableContactsList;
