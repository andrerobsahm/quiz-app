import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import base from "../Config/base.js";
import { WebBrowser } from "expo";
import { MonoText } from "../components/StyledText";
import LinkNewGame from "../components/Links/LinkNewGame/LinkNewGame";
import ActiveGames from "../components/Links/ActiveGames/ActiveGames";
import Friends from "../components/Links/Friends/Friends";
import Statistics from "../components/Links/Statistics/Statistics";
import Notifications from "../components/Links/Notifications/Notifications";
import Settings from "../components/Links/Settings/Settings";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      uid: "",
      email: "",
      username: "",
      response: "",
      photoUrl: ""
    };

    this.getUserData = this.getUserData.bind(this);
  }

  getUserData() {
    base.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        // console.log(user);
      } else {
        this.setState({ user: null });
        console.log("User not logged in");
      }
    });
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    const { user } = this.state;

    console.log(this.state.username);

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require("../assets/images/robot-dev.png")
                  : require("../assets/images/robot-prod.png")
              }
              alt="Profile image"
              style={styles.welcomeImage}
            />
          </View>
          {user && <Text>{this.state.username}</Text>}

          <View />

          <View style={styles.getStartedContainer}>
            <LinkNewGame navigation={this.props.navigation} />
            <ActiveGames navigation={this.props.navigation} />
            <Friends navigation={this.props.navigation} />
            <Notifications navigation={this.props.navigation} />
            <Settings navigation={this.props.navigation} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  }
});
