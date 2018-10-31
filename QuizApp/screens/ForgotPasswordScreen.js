import "react-native";
import React from "react";
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Button
} from "react-native";
import Colors from "../constants/Colors";
import ButtonComponent from "../components/ButtonComponent/ButtonComponent";

import base from "../Config/base.js";

export default class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
    this._onForgotPress = this._onForgotPress.bind(this);
  }
  async _onForgotPress() {
    base
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(function() {
        console.log("email sent to" + `${this.state.email}`);
      });
    this.setState({
      email: ""
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <View>
        <TouchableWithoutFeedback style={styles.container}>
          <View>
            <TextInput
              placeholder="enter email"
              onChangeText={email => this.setState({ email })}
              autoCapitalize="none"
              style={styles.input}
            />
            <View>
              <ButtonComponent
                title="Skicka nytt lösenord"
                onPress={this._onForgotPress}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0
  },
  input: {
    height: 50,
    width: 304,
    borderRadius: 25,
    backgroundColor: Colors.bgWhite,
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20
  }
});
