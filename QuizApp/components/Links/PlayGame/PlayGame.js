import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";

const PlayGame = ({ navigation }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate("Quiz")}
    underlayColor="transparent"
    style={styles.newgamelink}
  >
    <ButtonComponent title="Spela själv" />
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0
  }
});
export default PlayGame;
