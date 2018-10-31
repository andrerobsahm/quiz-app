import React from "react";
import { LinearGradient } from "expo";
import Colors from "../../constants/Colors";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ButtonComponent = props => {
  return (
    <LinearGradient
      colors={[Colors.pink, Colors.orange]}
      style={{
        width: 304,
        height: 50,
        borderRadius: 25,
        marginBottom: 10,
        marginTop: 10
      }}
      start={[0.1, 0]}
      end={[0.5, 0]}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          // color={this.props.focused ? Colors.gradient : Colors.gradient}
          onPress={() => props.onPress()}
        >
          <Text style={styles.title}>{props.title.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },
  title: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600"
  }
});

export default ButtonComponent;
