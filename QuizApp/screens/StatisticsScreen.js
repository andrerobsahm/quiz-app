import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, FlatList } from "react-native";
import FindPlayers from "../components/FindPlayers/FindPlayers";
import Colors from "../constants/Colors";
import base from "../Config/base";

class StatisticsScreen extends Component {
  static navigationOptions = {
    // header: null
  };

  state = {
    uid: base.auth().currentUser.uid,
    username: this.props.navigation.state.params.username,
    result: false
  };

  componentDidMount() {
    this._getScores();
  }

  _getScores() {
    base
      .database()
      .ref("statistics/result")
      .on("value", data => {
        const result = Object.values(data.val());
        this.setState({ result });
      });
  }

  renderScore() {
    return (
      <View style={styles.questionContainer}>
        <Text>Dina resultat:</Text>
        {this.state.result &&
          this.state.result.map((score, key) => (
            <View key={key}>
              <Text style={styles.answerText}>{score}</Text>
            </View>
          ))}
      </View>
    );
  }

  render() {
    console.log(this.state.result);
    return (
      <View style={styles.container}>
        <Text>QUIZ!T</Text>
        <Text>{this.state.username}</Text>
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
