import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  TextInput,
  AsyncStorage,
  ImageBackground
} from "react-native";
import Colors from "../constants/Colors";
import base from "../Config/base.js";
import HomeScreen from "./HomeScreen";
import SignUpLink from "../components/Links/SignUpLink/SignUpLink";
import ForgotPassword from "../components/Links/ForgotPassword/ForgotPassword";
import * as Elements from "react-native-elements";
import { MonoText } from "../components/StyledText";
import ButtonComponent from "../components/ButtonComponent/ButtonComponent";
import Logo from "../assets/images/logo_black.png";

const backgroundImage = require("../assets/images/background-waves.png");

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      response: "",
      loggedin: "",
      username: "",
      loggedin: false,
      secureText: true
    };
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    var user = base.auth().currentUser;
    if (user !== null) {
      this.setState({
        loggedin: true
      });
      this.props.navigation.navigate("Home");
      console.log(user);
    }
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

  seeSecureText = () => {
    this.setState({
      secureText: !this.state.secureText
    });
  };

  render() {
    return (
      <ImageBackground
        source={backgroundImage}
        imageStyle={{ resizeMode: "cover" }}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Image
            style={{
              height: 40,
              resizeMode: "contain",
              alignSelf: "center"
            }}
            source={Logo}
          />
          <Text style={styles.text}>
            Utmana dina vänner. Eller bara dig själv!
          </Text>
          <View>
            <TouchableWithoutFeedback style={styles.container}>
              <View>
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

                <View>
                  <ButtonComponent title="Logga in" onPress={this.login} />
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
          <View style={styles.row}>
            <Text style={{ color: Colors.grey }}>Har du inget konto? </Text>
            <SignUpLink navigation={this.props.navigation} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 15
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1
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
  response: {
    color: Colors.white,
    textAlign: "center"
  },
  row: {
    flexDirection: "row"
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.grey
  }
});
