import "react-native";
import React, { Component } from "react";
import { AppRegistry, Image, Text, View, StyleSheet } from "react-native";
const loadingImage = require("../../assets/icons/group-orange.png");

export default class Loading extends Component {
  render() {
    return (
      <View>
        <View>
          <Image
            source={loadingImage}
            imageStyle={{ resizeMode: "stretch" }}
            style={styles.loadingImage}
          />
          <Text>Hittar motståndare</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1
  }
});
