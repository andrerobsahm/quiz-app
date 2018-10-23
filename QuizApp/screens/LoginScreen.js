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
import colors from "../constants/Colors";
import base from "../Config/base.js";
import HomeScreen from "./HomeScreen";
import SignUpLink from "../components/Links/SignUpLink/SignUpLink";
import ForgotPassword from "../components/Links/ForgotPassword/ForgotPassword";
import { WebBrowser } from "expo";
import { MonoText } from "../components/StyledText";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      response: "",
      loggedin: "",
      username: ""
    };
    this.login = this.login.bind(this);
  }
  async login() {
    try {
      await base
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);

      this.setState({
        response: "Logged In!"
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
      <ScrollView style={styles.container}>
        <Text>QUIZ!T</Text>
        <Text>En app för dig som gillar quiz...</Text>
        <View>
          <TouchableWithoutFeedback style={styles.container}>
            <View>
              <TextInput
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
                autoCapitalize="none"
                style={styles.input}
              />
              <TextInput
                placeholder="Lösenord"
                onChangeText={password => this.setState({ password })}
                autoCapitalize="none"
                style={styles.input}
              />

              <View>
                <Button
                  style={styles.button}
                  title="Logga in"
                  color={colors.radial}
                  onPress={this.login}
                />
              </View>
              <View>
                <Text style={styles.response}>{this.state.response}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <ForgotPassword navigation={this.props.navigation} />
        </View>
        <View>
          <Text>Har du inget konto?</Text>
          <SignUpLink navigation={this.props.navigation} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 304,
    borderRadius: 25,
    backgroundColor: colors.bgWhite,
    textAlign: "center",
    fontSize: 15
  },
  // button: {
  //   backgroundColor: colors.radial,
  //   color: colors.white,
  //   height: 50,
  //   width: 304,
  //   borderRadius: 25
  // },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: colors.grey
  }
});
