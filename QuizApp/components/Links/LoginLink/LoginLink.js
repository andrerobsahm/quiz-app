import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const LoginLink = ({ navigation }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate("Login")}
    underlayColor="transparent"
    style={styles.newgamelink}
  >
    <Text style={{ color: Colors.white }}>Logga in här!</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0
  }
});
export default LoginLink;
