import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import base from "../Config/base.js";
// import { WebBrowser } from "expo";
import Colors from "../constants/Colors";
import { MonoText } from "../components/StyledText";
import LinkNewGame from "../components/Links/LinkNewGame/LinkNewGame";
import ActiveGames from "../components/Links/ActiveGames/ActiveGames";
import Friends from "../components/Links/Friends/Friends";
import Statistics from "../components/Links/Statistics/Statistics";
import Notifications from "../components/Links/Notifications/Notifications";
import Settings from "../components/Links/Settings/Settings";
import HomeLinkBox from "../components/HomeLinkBox/HomeLinkBox";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      username: "",
      email: "",
      photoUrl: ""
    };

    this._getUser = this._getUser.bind(this);
  }

  _getUser = () => {
    const loggedinUser = base.auth().currentUser;

    if (loggedinUser != null) {
      loggedinUser.providerData.forEach(profile => {
        this.setState({
          username: profile.displayName,
          uid: profile.providerId,
          email: profile.email,
          photoUrl: profile.photoURL
        });
      });
    }
  };

  componentDidMount() {
    this._getUser();
  }

  render() {
    const user = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView>
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
          <View>
            <Text style={styles.profileText}>{user.username}</Text>
          </View>

          <View />
          <View style={styles.getStartedContainer}>
            <Text style={styles.codeHighlightText}>Länkar</Text>
            <LinkNewGame navigation={this.props.navigation} />
            <ActiveGames navigation={this.props.navigation} />
            <Friends navigation={this.props.navigation} />
            <Notifications navigation={this.props.navigation} />
            <Settings navigation={this.props.navigation} />
          </View>
          <View style={styles.linkBoxContainer}>
            <HomeLinkBox title="Nytt spel" onPress={() => navigate("Quiz")} />
            <HomeLinkBox title="Aktiva spel" />
            <HomeLinkBox title="Statistik" />
            <HomeLinkBox title="Vänner" />
            <HomeLinkBox title="Notifikationer" />
            <HomeLinkBox title="Inställningar" />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgWhite,
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
  profileText: {
    fontSize: 28,
    lineHeight: 42,
    color: Colors.black,
    textAlign: "center"
  },
  linkBoxContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
