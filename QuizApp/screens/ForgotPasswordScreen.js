import 'react-native';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Button,
 } from 'react-native';
import base from '../Config/base.js';

export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
    this._onForgotPress = this._onForgotPress.bind(this);
  }
   async _onForgotPress() {
     base.auth().sendPasswordResetEmail(this.state.email).then(function() {
       console.log('email sent to' + `${this.state.email}`);
     }).catch(function(error) {
       console.log(error);
     });
   }

  render() {
    return(
      <View >
      <TouchableWithoutFeedback style={styles.container}>
        <View>
          <TextInput
            placeholder='enter email'
            onChangeText={(email) => this.setState({email})}
            autoCapitalize="none"
          />
          <View>
            <Button title='Send new password' onPress={this._onForgotPress } />
          </View>
        </View>
        </TouchableWithoutFeedback>
      </View>

    )
  };
}

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0,
  },

});
