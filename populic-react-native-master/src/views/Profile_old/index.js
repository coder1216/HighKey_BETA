import React, { Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  AsyncStorage,
  Keyboard,
  Easing,
  FlatList,
  Dimensions,
  ScrollView,
  InteractionManager
} from 'react-native';

//Styles
import styles from './styles';

//Component
import DrawerComponent from '../../modules/drawer';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/userAction';

//UI
import {
  Title,
  TextInput,
  Button,
  Text,
  Caption,
  View as ViewShoutem,
  NavigationBar,
  Lightbox,
  Image,
  Card,
  Divider,
  Subtitle,
  Tile,
  TouchableOpacity,
  Spinner,
  ListView,
  GridRow
} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/FontAwesome';

//Modal
import Modal from 'react-native-modal';

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class Login extends Component {
  // static navigationOptions = { title: 'Kurssit', header: null };
  static navigationOptions = {
    tabBarLabel: 'Profile',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Icon name="th" style={{ color: tintColor }} size={15} />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      interactionsComplete: false,
      restaurants: [
        {
          name: 'Gaspar Brasserie',
          address: '185 Sutter St, San Francisco, CA 94109',
          image: {
            url:
              'https://shoutem.github.io/static/getting-started/restaurant-1.jpg'
          }
        },
        {
          name: 'Chalk Point Kitchen',
          address: '527 Broome St, New York, NY 10013',
          image: {
            url:
              'https://shoutem.github.io/static/getting-started/restaurant-2.jpg'
          }
        },
        {
          name: 'Gaspar Brasserie',
          address: '185 Sutter St, San Francisco, CA 94109',
          image: {
            url:
              'https://shoutem.github.io/static/getting-started/restaurant-3.jpg'
          }
        },
        {
          name: 'Gaspar Brasserie',
          address: '185 Sutter St, San Francisco, CA 94109',
          image: {
            url:
              'https://shoutem.github.io/static/getting-started/restaurant-1.jpg'
          }
        },
        {
          name: 'Chalk Point Kitchen',
          address: '527 Broome St, New York, NY 10013',
          image: {
            url:
              'https://shoutem.github.io/static/getting-started/restaurant-2.jpg'
          }
        },
        {
          name: 'Gaspar Brasserie',
          address: '185 Sutter St, San Francisco, CA 94109',
          image: {
            url:
              'https://shoutem.github.io/static/getting-started/restaurant-3.jpg'
          }
        },
        {
          name: 'Gaspar Brasserie',
          address: '185 Sutter St, San Francisco, CA 94109',
          image: {
            url:
              'https://shoutem.github.io/static/getting-started/restaurant-1.jpg'
          }
        },
        {
          name: 'Chalk Point Kitchen',
          address: '527 Broome St, New York, NY 10013',
          image: {
            url:
              'https://shoutem.github.io/static/getting-started/restaurant-2.jpg'
          }
        },
        {
          name: 'Gaspar Brasserie',
          address: '185 Sutter St, San Francisco, CA 94109',
          image: {
            url:
              'https://shoutem.github.io/static/getting-started/restaurant-3.jpg'
          }
        }
      ]
    };
  }

  renderRow(rowData, sectionId, index) {
    // rowData contains grouped data for one row,
    // so we need to remap it into cells and pass to GridRow

    if (index === '0') {
      return (
        <TouchableOpacity key={index}>
          <Image styleName="large" source={{ uri: rowData[0].image.url }}>
            <Image
              styleName="medium-avatar"
              source={{
                uri:
                  'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png'
              }}
            />
          </Image>
          <Tile>
            <Title styleName="md-gutter-bottom">Max Prokopenko</Title>
            <Subtitle styleName="sm-gutter-horizontal">max-prokopenko</Subtitle>
          </Tile>
          <Divider styleName="line" />
        </TouchableOpacity>
      );
    }
    const cellViews = rowData.map((restaurant, id) => {
      return (
        <TouchableOpacity key={id}>
          <Lightbox
            swipeToDismiss={true}
            renderContent={this.renderImage}
            activeProps={{
              style: {
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
              }
            }}
          >
            <Image
              styleName="small"
              source={{ uri: restaurant.image.url }}
              style={{ flex: 1 }}
            >
              <Tile>
                <Subtitle numberOfLines={1}>AaltoES</Subtitle>
                <View styleName="horizontal">
                  <Caption styleName="collapsible" numberOfLines={2}>
                    245 views
                  </Caption>
                </View>
              </Tile>
            </Image>
          </Lightbox>
        </TouchableOpacity>
      );
    });
    return <GridRow columns={3}>{cellViews}</GridRow>;
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ interactionsComplete: true });
    });
  }

  renderImage = () => {
    alert('render');
    return (
      <Image
        styleName="large"
        resizeMode="contain"
        source={{
          uri:
            'https://shoutem.github.io/static/getting-started/restaurant-3.jpg'
        }}
        style={{ flex: 1 }}
      >
        <Tile>
          <Subtitle numberOfLines={1}>AaltoEeeeS</Subtitle>
          <View styleName="horizontal">
            <Caption styleName="collapsible" numberOfLines={2}>
              245 views
            </Caption>
          </View>
        </Tile>
      </Image>
    );
  };

  render() {
    // Group the restaurants into rows with 2 columns, except for the
    // first article. The first article is treated as a featured article
    let isFirstArticle = true;
    const groupedData = GridRow.groupByRows(this.state.restaurants, 3, () => {
      if (isFirstArticle) {
        isFirstArticle = false;
        return 2;
      }

      return 1;
    });
    return (
      <View style={styles.container}>
        <NavigationBar centerComponent={<Title>Profile</Title>} />

        <ListView data={groupedData} renderRow={this.renderRow} />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
