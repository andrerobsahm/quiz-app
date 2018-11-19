import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, FlatList } from "react-native";
import FindPlayers from "../components/FindPlayers/FindPlayers";
import Colors from "../constants/Colors";
import base from "../Config/base";

class FriendsScreen extends Component {
  static navigationOptions = {
    // header: null
  };

  state = {
    uid: base.auth().currentUser.uid,
    username: this.props.navigation.state.params.username,
    allfriends: false,
    friends: [],
    users: false
  };

  componentDidMount() {
    this._getFriends();
  }

  _getFriends() {
    base
      .database()
      .ref("friends/friends")
      .on("value", data => {
        const allfriends = Object.values(data.val());
        this.setState({ allfriends });
      });
  }

  renderFriends() {
    return (
      <View style={styles.questionContainer}>
        <Text>Dina resultat:</Text>
        {this.state.allfriends &&
          this.state.result.map((friend, key) => (
            <View key={key}>
              <Text style={styles.answerText}>{friend}</Text>
            </View>
          ))}
      </View>
    );
  }

  render() {
    console.log(this.state.allfriends);
    return (
      <View style={styles.container}>
        <Text>QUIZ!T</Text>
        <ScrollView>{this.renderFriends()}</ScrollView>
        <View>
          <FindPlayers user={this} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20
  },
  questionContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    justifyContent: "space-around"
  },
  category: {
    fontSize: 14,
    textAlign: "center"
  },
  question: {
    fontSize: 30,
    textAlign: "center",
    lineHeight: 39
  }
});

export default FriendsScreen;
