import React from 'react';
import { WebBrowser } from 'expo';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import base from '../Config/base.js';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Inställningar',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      response: '',
      uid: ''
    }
    this.getuser = this.getuser.bind(this);
  }
  componentDidMount() {
    this.getuser();
  }
  getuser = ()=> {
         if (base.auth().currentUser !== null){
       console.log("user id: " + base.auth().currentUser.uid);
       this.setState({
           email:base.auth().currentUser.email,
           password: base.auth().currentUser.password
       });
     }

   }



  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
        <ScrollView>
          <Text>
            {this.state.email}
             {this.state.password }
         </Text>
        </ScrollView>
    );
  }
}
