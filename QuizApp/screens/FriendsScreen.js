import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, FlatList } from "react-native";
import FindPlayers from "../components/FindPlayers/FindPlayers";
import Colors from "../constants/Colors";
import base from "../Config/base";

class FriendsScreen extends Component {
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
    console.log(this.state.allfriends);
    return (
      <View>
        <Text style={styles.title}>Dina vänner</Text>
        {this.state.allfriends &&
          this.state.allfriends.map((friend, key) => (
            <View key={key}>
              <Text style={styles.friend}>{friend}</Text>
            </View>
          ))}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View>{this.renderFriends()}</View>
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
  title: {
    fontSize: 24,
    textAlign: "center"
  },
  friend: {
    fontSize: 18,
    textAlign: "center"
  },
  question: {
    fontSize: 30,
    textAlign: "center",
    lineHeight: 39
  }
});

export default FriendsScreen;
