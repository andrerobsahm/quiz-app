import React from "react";
import Colors from "../../constants/Colors";
import { View, Text, StyleSheet } from "react-native";
import * as Elements from "react-native-elements";

const Headline = props => (
  <View>
    <Elements.Text h1 style={styles.headline}>
      {props.headline}
    </Elements.Text>
    <Text style={styles.paragraph}>{props.paragraph}</Text>
    <Elements.Divider style={styles.divider} />
  </View>
);

const styles = StyleSheet.create({
  headline: {
    marginVertical: 10
  },
  paragraph: {
    fontSize: 18
  },
  divider: {
    backgroundColor: Colors.black,
    width: "30%",
    height: 3,
    marginVertical: 10
  }
});

export default Headline;
