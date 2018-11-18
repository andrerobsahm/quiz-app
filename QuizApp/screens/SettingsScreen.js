import React from "react";
import { WebBrowser } from "expo";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  View
} from "react-native";
import base from "../Config/base.js";
import Logout from "../components/Logout/Logout";
import Header from "../components/Header/Header";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    // header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      response: "",
      photoUrl: "",
      username: "",
      emailVerified: "",
      uid: "",
      loggedin: ""
    };
    this.getuser = this.getuser.bind(this);
  }
  componentDidMount() {
    this.getuser();
  }
  getuser = () => {
    var user = base.auth().currentUser;
    if (user != null) {
      this.setState({
        emailVerified: user.emailVerified,
        email: user.email,
        photoUrl: user.photoURL,
        uid: user.uid,
        username: user.username,
        loggedin: user.loggedin
      });
    }
  };

  changePassword = () => {
    base
      .auth()
      .currentUser.updatePassword(this.state.password)
      .then(function() {
        console.log("update");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Ändra lösenord</Text>
        <Text>
          {this.state.email}
          {this.state.photoURL}
          {this.state.username}
        </Text>
        <TouchableWithoutFeedback>
          <TextInput
            placeholder="change password"
            changePassword={password => this.setState({ password })}
            autoCapitalize="none"
          />
        </TouchableWithoutFeedback>

        <View>
          <Logout navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}
