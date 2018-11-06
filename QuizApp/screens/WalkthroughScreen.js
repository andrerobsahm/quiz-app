import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import { MonoText } from "../components/StyledText";
const { width, height } = Dimensions.get("window");
export default class WalkthroughScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      something: ""
    };
  }

  render() {
    return (
      <ScrollView horizontal={true}>
        <View style={styles.container}>
          <Text>screen 1</Text>
        </View>
        <View style={styles.container}>
          <Text>screen 2</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.screentext}>screen 3</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: width,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100
  },
  screentext: {
    color: "white",
    textAlign: "center"
  }
});
