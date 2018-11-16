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
import base from "../Config/base";
import * as Elements from "react-native-elements";
import Colors from "../constants/Colors";
export default class NewGameScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

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
        <Elements.Text h1>Nytt spel</Elements.Text>
        <Text style={styles.p}>
          VIll du spela mot en kompis? Mot en random spelare? Eller bara för dig
          själv för att det är kul!?
        </Text>
        <Elements.Divider
          style={{ backgroundColor: Colors.black, width: "30%", height: 3 }}
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
  textContainer: {},
  navigationContainer: {
    alignItems: "center"
  },
  p: {
    fontSize: 18
  }
});
