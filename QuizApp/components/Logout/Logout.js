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
  Button,
  NavigatorIOS
} from "react-native";
import base from "../../Config/base.js";
import { Navigator } from "react-navigation";

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ""
    };
    this.logout = this.logout.bind(this);
  }
  async logout() {
    try {
      await base.auth().signOut();
      this.setState({
        response: "Logged out!"
      });
      setTimeout(() => {
        this.props.navigation.navigate("Login");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback style={styles.container}>
        <View>
          <View>
            <Button title="Logout" onPress={this.logout} />
          </View>
          <View />
        </View>
      </TouchableWithoutFeedback>
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
