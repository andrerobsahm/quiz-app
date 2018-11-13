import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import base from "../Config/base.js";
import * as Elements from "react-native-elements";
import Colors from "../constants/Colors";
import { MonoText } from "../components/StyledText";
import HomeLinkBox from "../components/HomeLinkBox/HomeLinkBox";

//Icons
import Logo from "../assets/images/logo_black.png";
import Plus from "../assets/icons/plus-orange.png";
import Group from "../assets/icons/group-orange.png";
import Level from "../assets/icons/level-orange.png";
import Notification from "../assets/icons/notifications-orange.png";
import Star from "../assets/icons/star-orange.png";
import Setting from "../assets/icons/settings-orange.png";

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
        <Image
          style={{
            height: 40,
            resizeMode: "contain",
            alignSelf: "center"
          }}
          source={Logo}
        />

        <View style={styles.innerContainer}>
          <Elements.Avatar
            large
            rounded
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
            }}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        </View>
        <View>
          <Elements.Text h3 style={styles.profileText}>
            {user.username}
          </Elements.Text>
        </View>
        <View />
        <View style={styles.linkBoxContainer}>
          <HomeLinkBox
            title="Nytt spel"
            icon={Plus}
            onPress={() => navigate("NewGame")}
          />
          <HomeLinkBox
            title="Aktiva spel"
            icon={Star}
            onPress={() => navigate("Home")}
          />
          <HomeLinkBox
            title="Statistik"
            icon={Level}
            onPress={() => navigate("Home")}
          />
          <HomeLinkBox
            title="Vänner"
            icon={Group}
            onPress={() => navigate("Home")}
          />
          <HomeLinkBox
            title="Notifikationer"
            icon={Notification}
            onPress={() => navigate("Home")}
          />
          <HomeLinkBox
            title="Inställningar"
            icon={Setting}
            onPress={() => navigate("Settings")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgWhite,
    paddingTop: 30,
    justifyContent: "space-around"
  },
  innerContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  profileText: {
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
