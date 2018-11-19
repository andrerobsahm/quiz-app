import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, FlatList } from "react-native";
import FindPlayers from "../components/FindPlayers/FindPlayers";
import Colors from "../constants/Colors";
import base from "../Config/base";
import LineChart from "../components/Chart/Chart";
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
      <View style={styles.scorecontainer}>
        <Text>Dina resultat:</Text>
        {this.state.result &&
          this.state.result.map((score, key) => (
            <View key={key}>
              <Text style={styles.answerText}>{score} av 4</Text>
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
        {this.state.result && (
          <View styles={styles.chartcontainer}>
            <LineChart data={this.state.result} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.bgWhite,
    paddingTop: 20
  },
  scorecontainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
    height: "auto",
    width: 300,
    borderRadius: 8,
    justifyContent: "space-around",
    backgroundColor: "white"
  },
  chartcontainer: {}
});

export default StatisticsScreen;
