import React, { Component } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Button,
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
      index: 0,
      pages: [
        {
          title: "Spela själv eller mot vänner!",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: "friends"
        },
        {
          title: "Frågor som utmanar!",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: "challanges"
        },
        {
          title: "Håll koll på din utveckling!",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: "progress"
        }
      ]
    };
  }
  slide = () => {
    this.redirect();
    this.setState({
      index: this.state.index + 1
    });
  };

  redirect = () => {
    if (this.state.index === this.state.pages.length - 1) {
      this.setState({
        index: 0
      });
      setTimeout(() => {
        this.props.navigation.navigate("Home");
      }, 100);
    }
  };

  render() {
    const page = this.state.pages[this.state.index];
    console.log(this.state.index);
    return (
      <ScrollView horizontal={true}>
        {page !== undefined && (
          <View style={styles.container}>
            <Text>{page.title}</Text>
            <Text>{page.text}</Text>
            <Text>{page.image}</Text>
            <Button title="gå vidare" onPress={this.slide} />
          </View>
        )}
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
