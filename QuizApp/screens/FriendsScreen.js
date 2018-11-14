import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList
} from "react-native";
import FindPlayers from "../components/FindPlayers/FindPlayers";
import Colors from "../constants/Colors";
import base from "../Config/base";

class FriendsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    questions: [],
    users: false,
    uid: base.auth().currentUser.uid,
    friends: [],
    allFriends: [],
    username: this.props.navigation.state.params.username
  };

  componentDidMount() {
    // this._getAllFriends();
  }
  _getAllFriends() {
    base
      .database()
      .ref("friends")
      .orderByKey()
      .equalTo(`${this.state.uid}`)
      .on("value", data => {
        const users = Object.values(data.val());
        this.setState({ allFriends });
      });
  }

  renderFriends() {
    return (
      <View style={styles.questionContainer}>
        <FlatList
          style={styles.listContainer}
          keyExtractor={(friend, index) => index.toString()}
          data={this.state.allFriends}
          renderItem={({ friend }) => (
            <View style={styles.listItem}>
              <View>
                <Text style={styles.userText}>
                  {friend !== undefined && friend.toUpperCase()}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }

  render() {
    console.log(this.state.uid);
    return (
      <View style={styles.container}>
        <Text>QUIZ!T</Text>
        <ScrollView>{this.renderFriends()}</ScrollView>
        <TouchableHighlight onPress={this._getData}>
          <View>
            <FindPlayers user={this} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20
    // backgroundColor: Colors.black
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
    //  color: Colors.white,
    fontSize: 30,
    textAlign: "center",
    lineHeight: 39
  }
});

export default FriendsScreen;
