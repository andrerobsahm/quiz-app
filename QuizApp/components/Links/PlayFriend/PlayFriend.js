import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";

const PlayFriend = ({ navigation }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate("Quiz")}
    underlayColor="transparent"
    style={styles.newgamelink}
  >
    <ButtonComponent title="Spela mot en vän" />
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0
  }
});
export default PlayFriend;
