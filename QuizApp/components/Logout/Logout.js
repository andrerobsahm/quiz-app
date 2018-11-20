import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import base from "../../Config/base.js";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { Navigator } from "react-navigation";
export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      loggedin: "",
      uid: ""
    };
    this.logout = this.logout.bind(this);
  }
  async logout() {
    try {
      var user = base.auth().currentUser;
      if (user != null) {
        this.setState({
          emailVerified: user.emailVerified,
          email: user.email,
          photoUrl: user.photoURL,
          uid: user.uid,
          name: user.displayName
        });
        base
          .database()
          .ref("users/uid:" + `${this.state.uid}`)
          .update({
            loggedin: false
          });
      }
      await base.auth().signOut();

      this.setState({
        response: "Logged out!"
      });
      setTimeout(() => {
        this.props.navigation.navigate("Login");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return <ButtonComponent title="Logga ut från app" onPress={this.logout} />;
  }
}
