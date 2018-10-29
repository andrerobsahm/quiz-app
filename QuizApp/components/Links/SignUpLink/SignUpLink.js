import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const SignUpLink = ({ navigation }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate("SignUp")}
    underlayColor="transparent"
    style={styles.newgamelink}
  >
    <Text style={{ color: Colors.white }}>Registrera här!</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0
  }
});
export default SignUpLink;
