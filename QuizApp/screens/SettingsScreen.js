import React from 'react';
import { WebBrowser } from 'expo';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
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
      photoUrl: '',
      name:'',
      emailVerified: '',
      uid: ''
    }
    this.getuser = this.getuser.bind(this);
  }
  componentDidMount() {
    this.getuser();
  }
  getuser = ()=> {
    var user = base.auth().currentUser;
  if (user != null) {
    this.setState({
        emailVerified:user.emailVerified,
        email:user.email,
        photoUrl:user.photoURL,
        uid: user.uid,
        name:user.displayName
    });
  }
 }

 changePassword = ()=> {
   base.auth().currentUser.updatePassword(this.state.password).then(function() {
    console.log('update');
   }).catch(function(error) {
     console.log(error);
   });
}




  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
        <ScrollView>
        <Text>
        {this.state.email}
       {this.state.photoURL}
       {this.state.name}
        </Text>
          <TouchableWithoutFeedback>
             <TextInput
               placeholder='change password'
               changePassword={(password) => this.setState({password})}
               autoCapitalize="none"
             />
         </TouchableWithoutFeedback>
        </ScrollView>
    );
  }
}
