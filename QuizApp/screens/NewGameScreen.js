import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import { MonoText } from "../components/StyledText";
import Color from "../constants/Colors";
import PlayGame from "../components/Links/PlayGame/PlayGame";
import PlayRandom from "../components/Links/PlayRandom/PlayRandom";
import PlayFriend from "../components/Links/PlayFriend/PlayFriend";

export default class NewGameScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Nytt spel</Text>
        <Text>
          VIll du spela mot en kompis? Mot en random spelare? Eller bara för dig
          själv för att det är kul!?
        </Text>
        <View style={styles.navigationContainer}>
          <PlayGame navigation={this.props.navigation} />
          <PlayRandom navigation={this.props.navigation} />
          <PlayFriend navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: Color.bgWhite,
    paddingHorizontal: 27
  },
  navigationContainer: {
    alignItems: "center"
  },
  h1: {
    color: Color.black,
    fontSize: 36,
    lineHeight: 42,
    textAlign: "left"
  }
});
