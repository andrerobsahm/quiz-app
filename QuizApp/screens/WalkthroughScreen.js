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
import { LinearGradient } from "expo";
import Colors from "../constants/Colors";

import WalkthroughOne from "../assets/images/WalkthroughOne.png";
import WalkthroughTwo from "../assets/images/WalkthroughTwo.png";
import WalkthroughThree from "../assets/images/WalkthroughThree.png";
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
          image: WalkthroughOne
        },
        {
          title: "Frågor som utmanar!",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: WalkthroughTwo
        },
        {
          title: "Håll koll på din utveckling!",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: WalkthroughThree
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
        <LinearGradient
          colors={[Colors.pink, Colors.orange]}
          start={[0, 1]}
          end={[0.8, 0]}
        >
          {page !== undefined && (
            <View style={styles.container}>
              <Image
                style={{
                  height: 400,
                  resizeMode: "contain",
                  alignSelf: "center"
                }}
                source={page.image}
              />
              <Text>{page.title}</Text>
              <Text>{page.text}</Text>
              <View style={styles.linecontainer}>
                <View
                  style={[0 === this.state.index ? styles.active : styles.line]}
                />
                <View
                  style={[1 === this.state.index ? styles.active : styles.line]}
                />
                <View
                  style={[2 === this.state.index ? styles.active : styles.line]}
                />
              </View>
              <Button title="gå vidare" onPress={this.slide} />
            </View>
          )}
        </LinearGradient>
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
    paddingTop: 100
  },
  screentext: {
    color: "white",
    textAlign: "left"
  },
  linecontainer: {
    flexDirection: "row"
  },
  line: {
    height: 4,
    width: 30,
    marginRight: 5,
    backgroundColor: "rgba(255,255,255,0.3)"
  },
  active: {
    width: 50,
    backgroundColor: "white"
  }
});
