import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  TextInput,
  Button
} from "react-native";
import Colors from "../constants/Colors";
import base from "../Config/base";
import * as Elements from "react-native-elements";
import LoginLink from "../components/Links/LoginLink/LoginLink";
import ButtonComponent from "../components/ButtonComponent/ButtonComponent";

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    // header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      response: "",
      loggedin: "",
      // uid: "",
      secureText: true,
      checked: false
    };

    this.signup = this.signup.bind(this);
  }

  _redirect() {
    setTimeout(() => {
      this.props.navigation.navigate("Walkthrough");
    }, 600);
  }

  async signup() {
    try {
      await base
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
      base
        .database()
        .ref("users/")
        .push({
          email: this.state.email,
          username: this.state.username,
          uid: base.auth().currentUser.uid,
          loggedin: true
        });
      base
        .auth()
        .currentUser.updateProfile({ displayName: this.state.username });

      this.setState({
        response: "Konto skapat"
      });

      this._redirect();
    } catch (error) {
      this.setState({
        response: error.toString()
      });
    }
  } //end signup

  //see password
  seeSecureText = () => {
    this.setState({
      secureText: !this.state.secureText
    });
  };

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
            <View style={styles.seeSecureText}>
              <TextInput
                placeholder="Lösenord"
                secureTextEntry={this.state.secureText}
                onChangeText={password => this.setState({ password })}
                autoCapitalize="none"
                style={styles.input}
              />
              <TouchableWithoutFeedback onPress={this.seeSecureText}>
                <Image
                  style={styles.seeSecureImage}
                  source={require("../assets/images/showIcon.png")}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Elements.CheckBox
            title="Jag godkänner integritetspolicyn"
            checked={this.state.checked}
            checkedColor={Colors.orange}
            containerStyle={styles.checkBoxContainer}
            textStyle={styles.checkBoxText}
            onPress={() => this.setState({ checked: true })}
          />
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
  seeSecureImage: {
    width: 30,
    height: 18,
    position: "absolute",
    top: 16,
    right: 12
  },
  seeSecureText: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  row: {
    flexDirection: "row"
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
  checkBoxText: {
    color: Colors.orange
  },
  response: {
    color: Colors.white,
    textAlign: "center"
  }
});
