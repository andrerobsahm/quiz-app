import React from "react";
import { LinearGradient } from "expo";
import Colors from "../../constants/Colors";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const HomeLinkBox = props => {
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <View style={styles.container}>
        <Image source={props.icon} style={styles.image} />
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 100,
    borderRadius: 8,
    backgroundColor: Colors.white,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-around"
  },
  title: {
    color: Colors.black,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500"
  },
  image: {
    marginTop: 20,
    width: 25,
    resizeMode: "contain"
  }
});

export default HomeLinkBox;
