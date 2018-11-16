import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, FlatList } from "react-native";
import FindPlayers from "../components/FindPlayers/FindPlayers";
import Colors from "../constants/Colors";
import base from "../Config/base";

class StatisticsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    uid: base.auth().currentUser.uid,
    username: this.props.navigation.state.params.username,
    result: []
  };

  componentDidMount() {}

  _getScores() {
    base
      .database()
      .ref("statistics/")
      .orderByKey()
      .equalTo(`${this.state.uid}`)
      .on("value", data => {
        const users = Object.values(data.val());
        this.setState({ result });
      });
  }

  renderScore() {
    return (
      <View style={styles.questionContainer}>
        <FlatList
          style={styles.listContainer}
          keyExtractor={(score, index) => index.toString()}
          data={this.state.result}
          renderItem={({ result }) => (
            <View style={styles.listItem}>
              <View>
                <Text style={styles.userText}>
                  {result !== undefined && result.toUpperCase()}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }

  render() {
    console.log(this.state.result);
    return (
      <View style={styles.container}>
        <Text>QUIZ!T</Text>
        <ScrollView>{this.renderScore()}</ScrollView>
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

export default StatisticsScreen;
