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
import Loading from "../components/Loading/Loading";
import ButtonComponent from "../components/ButtonComponent/ButtonComponent";
import base from "../Config/base";
import * as Elements from "react-native-elements";
import Colors from "../constants/Colors";
import Headline from "../components/Headline/Headline";

export default class NewGameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: false,
      response: "",
      uid: ""
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Headline
          headline="Nytt spel"
          paragraph="VIll du spela mot en kompis? Mot en random spelare? Eller bara för dig
            själv för att det är kul!?"
        />

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
  }
});
