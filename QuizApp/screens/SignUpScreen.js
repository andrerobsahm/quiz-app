import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
  Button
} from "react-native";
import base from "../Config/base";
import LoginLink from "../components/Links/LoginLink/LoginLink";

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      response: "",
      loggedin: ""
    };

    this.signup = this.signup.bind(this);
  }

  async signup() {
    try {
      await base
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
      base
        .database()
        .ref("users")
        .push({
          email: this.state.email,
          username: this.state.username,
          loggedin: true
        });

      this.setState({
        response: "account created"
      });

      setTimeout(() => {
        this.props.navigation.navigate("Home");
      }, 1500);
    } catch (error) {
      this.setState({
        response: error.toString()
      });
    }
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
            />
            <TextInput
              placeholder="enter username"
              onChangeText={username => this.setState({ username })}
              autoCapitalize="none"
            />
            <TextInput
              placeholder="enter password"
              onChangeText={password => this.setState({ password })}
              autoCapitalize="none"
            />

            <View>
              <Button title="Create account" onPress={this.signup} />
            </View>
            <View>
              <Text style={styles.response}>{this.state.response}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View>
          <Text>Har du redan ett konto?</Text>
          <LoginLink navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
