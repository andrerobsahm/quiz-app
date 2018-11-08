import React from "react";
import { LinearGradient } from "expo";
import Colors from "../../constants/Colors";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";

const HomeLinkBox = props => {
  return (
    <TouchableHighlight onPress={() => props.onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 100,
    borderRadius: 8,
    backgroundColor: Colors.white,
    margin: 10
  },
  title: {
    color: Colors.black,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500"
  }
});

export default HomeLinkBox;
