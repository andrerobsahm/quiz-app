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
import Loading from "../components/Loading/Loading";
import ButtonComponent from "../components/ButtonComponent/ButtonComponent";

export default class NewGameScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Nytt spel</Text>
        <Text>
          VIll du spela mot en kompis? Mot en random spelare? Eller bara för dig
          själv för att det är kul!?
        </Text>
        <View style={styles.navigationContainer}>
          <ButtonComponent
            title="Spela själv"
            onPress={() => navigate("Quiz")}
          />
          <ButtonComponent
            title="Spela mot random spelare"
            onPress={() => navigate("Quiz")}
          />
          <ButtonComponent
            title="Spela mot en vän"
            onPress={() => navigate("Quiz")}
          />
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
