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
import Colors from "../constants/Colors";
import base from "../Config/base";
import LoginLink from "../components/Links/LoginLink/LoginLink";
import ButtonComponent from "../components/ButtonComponent/ButtonComponent";

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

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
      <View style={styles.container}>
        <View>
          <Text style={styles.h1}>Registrera</Text>
        </View>
        <TouchableWithoutFeedback>
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
              secureTextEntry={true}
              style={styles.input}
            />
          </View>
        </TouchableWithoutFeedback>
        <View>
          <ButtonComponent title="Registrera konto" onPress={this.signup} />
        </View>
        <View>
          <Text style={styles.response}>{this.state.response}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: Colors.grey }}>Har du redan ett konto? </Text>
          <LoginLink navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 100,
    backgroundColor: Colors.black
  },
  h1: {
    fontSize: 36,
    color: Colors.bgWhite
  },
  input: {
    height: 50,
    width: 304,
    borderRadius: 25,
    backgroundColor: Colors.bgWhite,
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20
  },
  row: {
    flexDirection: "row"
  }
});
