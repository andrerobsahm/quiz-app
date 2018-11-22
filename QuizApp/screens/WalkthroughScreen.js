import React, { Component } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import { MonoText } from "../components/StyledText";
const { width, height } = Dimensions.get("window");
import { LinearGradient } from "expo";
import Colors from "../constants/Colors";

import WalkthroughOne from "../assets/images/WalkthroughOne.jpg";
import WalkthroughTwo from "../assets/images/WalkthroughTwo.jpg";
import WalkthroughThree from "../assets/images/WalkthroughThree.jpg";
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
          text:
            "Utmana vänner eller dig själv, du behöver aldrig vänta på andra",
          image: WalkthroughOne
        },
        {
          title: "Frågor som utmanar!",
          text: "Flera tusentals unika frågor från vår databas",
          image: WalkthroughTwo
        },
        {
          title: "Håll koll på din utveckling!",
          text: "Med statistik får du din utveckling lättöverskådligt",
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
    return (
      <ScrollView horizontal={true}>
        <LinearGradient
          colors={[Colors.pink, Colors.orange]}
          start={[0, 1]}
          end={[0.8, 0]}
        >
          {page !== undefined && (
            <View style={styles.container}>
              <View style={styles.imgcontainer}>
                <Image
                  style={{
                    height: 550,
                    resizeMode: "contain",
                    marginRight: -99
                  }}
                  source={page.image}
                />
              </View>
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
              <Text style={styles.titletext}>{page.title}</Text>
              <Text style={styles.contenttext}>{page.text}</Text>
              <View style={styles.movenext}>
                <Button color="white" title="Gå vidare" onPress={this.slide} />
                <TouchableWithoutFeedback onPress={this.slide}>
                  <Image
                    style={styles.movenexticon}
                    source={require("../assets/icons/arrow-right-white.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
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
  imgcontainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  titletext: {
    color: "white",
    textAlign: "left",
    fontSize: 36,
    width: 300,
    marginTop: -40,
    marginBottom: 50,
    marginLeft: -15
  },
  contenttext: {
    color: "white",
    textAlign: "left",
    fontSize: 15,
    marginTop: -30,
    marginBottom: 30,
    marginLeft: -25,
    width: 280
  },
  movenext: {
    flexDirection: "row",
    marginLeft: -190,
    marginTop: -20,
    marginBottom: 20
  },
  movenexticon: {
    marginTop: 14,
    width: 20,
    marginLeft: 20
  },
  linecontainer: {
    flexDirection: "row",
    marginBottom: 60,
    marginRight: 170
  },
  line: {
    height: 5,
    width: 30,
    marginRight: 5,
    backgroundColor: "rgba(255,255,255,0.3)"
  },
  active: {
    width: 70,
    marginRight: 5,
    backgroundColor: "white"
  }
});
