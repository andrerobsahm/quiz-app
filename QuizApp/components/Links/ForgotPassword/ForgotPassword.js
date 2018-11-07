import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const ForgotPassword = ({ navigation }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate("ForgotPassword")}
    underlayColor="transparent"
    style={styles.newgamelink}
  >
    <Text style={styles.text}>Glömt ditt lösenord?</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0
  },
  text: {
    color: Colors.orange
  }
});
export default ForgotPassword;
