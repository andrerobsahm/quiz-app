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
import ButtonComponent from "../components/ButtonComponent/ButtonComponent";

export default class NewGameScreen extends React.Component {
  render() {
    return (
      <View
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text>Nytt spel</Text>

        <ButtonComponent title="Spela själv" />
        <ButtonComponent title="Spela mot random spelare" />
        <ButtonComponent title="Spela mot en vän" />
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
