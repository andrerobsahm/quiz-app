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
import PlayGame from "../components/Links/PlayGame/PlayGame";
import PlayRandom from "../components/Links/PlayRandom/PlayRandom";
import PlayFriend from "../components/Links/PlayFriend/PlayFriend";
import Loading from "../components/Loading/Loading";

export default class NewGameScreen extends React.Component {
  render() {
    return (
      <View
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text>Nytt spel</Text>
        <Loading />
        <PlayGame navigation={this.props.navigation} />
        <PlayRandom navigation={this.props.navigation} />
        <PlayFriend navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
