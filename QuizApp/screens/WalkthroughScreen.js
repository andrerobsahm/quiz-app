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
const screenWidht = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
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
    width: screenWidht,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100
    // backgroundColor: Colors.black
  },
  screentext: {
    color: "white",
    textAlign: "center"
  }
});
