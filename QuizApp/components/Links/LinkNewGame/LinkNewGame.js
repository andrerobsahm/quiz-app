import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";

const LinkNewGame = ({ navigation }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate("NewGame")}
    underlayColor="transparent"
    style={styles.newgamelink}
  >
    <Text>Nytt spel</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0
  }
});
export default LinkNewGame;
