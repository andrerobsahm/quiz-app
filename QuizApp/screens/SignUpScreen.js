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
import base from "../Config/base";
import LoginLink from "../components/Links/LoginLink/LoginLink";
import ButtonComponent from "../components/ButtonComponent/ButtonComponent";

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      response: "",
      loggedin: "",
      uid: ""
    };

    this.signup = this.signup.bind(this);
  }

  async signup() {
    try {
      await base
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
      var user = base.auth().currentUser;
      if (user != null) {
        this.setState({
          email: user.email,
          uid: user.uid,
          name: user.displayName
        });
        base
          .database()
          .ref("users")
          .push({
            email: this.state.email,
            username: this.state.username,
            uid: user.uid,
            loggedin: true
          });
      }

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
              placeholder="Användarnamn"
              onChangeText={username => this.setState({ username })}
              autoCapitalize="none"
              style={styles.input}
            />
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
              <ButtonComponent title="Registrera konto" onPress={this.signup} />
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
  },
  input: {
    height: 50,
    width: 304,
    borderRadius: 25,
    backgroundColor: colors.bgWhite,
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20
  }
});
