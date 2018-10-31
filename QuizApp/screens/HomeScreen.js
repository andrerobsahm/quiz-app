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
      email: "",
      password: "",
      response: "",
      photoUrl: "",
      name: "",
      emailVerified: "",
      uid: ""
    };
    this.getuser = this.getuser.bind(this);
  }

  getuser = () => {
    var user = base.auth().currentUser;
    if (user != null) {
      this.setState({
        emailVerified: user.emailVerified,
        email: user.email,
        photoUrl: user.photoURL,
        uid: user.uid,
        name: user.name
      });
    }
  };

  componentDidMount() {
    this.getuser();
  }

  render() {
    console.log("Id: " + this.state.uid);
    console.log("Username: " + this.state.name);
    console.log("Email: " + this.state.email);

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require("../assets/images/robot-dev.png")
                  : require("../assets/images/robot-prod.png")
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text>{this.state.username}</Text>
            <LinkNewGame navigation={this.props.navigation} />
            <ActiveGames navigation={this.props.navigation} />
            <Friends navigation={this.props.navigation} />
            <Notifications navigation={this.props.navigation} />
            <Settings navigation={this.props.navigation} />
          </View>
        </ScrollView>

        <View style={styles.helpContainer}>
          <TouchableOpacity
            onPress={this._handleHelpPress}
            style={styles.helpLink}
          >
            <Text style={styles.helpLinkText}>
              Help, it didn’t automatically reload!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
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
  homeScreenFilename: {
    marginVertical: 7
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
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
