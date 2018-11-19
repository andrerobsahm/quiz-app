import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, FlatList } from "react-native";
import * as Elements from "react-native-elements";
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
        <Elements.Text h4 style={styles.headline}>
          Resultat för {this.state.username}
        </Elements.Text>
        {this.state.result &&
          this.state.result.map((score, key) => (
            <View key={key}>
              <Elements.Badge containerStyle={{ backgroundColor: "violet" }}>
                <Text>{score} av 4</Text>
              </Elements.Badge>
            </View>
          ))}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Elements.Text h1 style={styles.headline}>
          Din statistik
        </Elements.Text>
        <Text style={styles.paragraph}>
          Här kan du se hur det har gått i dina matcher och din
          utvecklingskurva.
        </Text>
        <Elements.Divider
          style={{
            backgroundColor: Colors.black,
            width: "30%",
            height: 3,
            marginVertical: 10
          }}
        />
        {this.state.result > 0 && (
          <View>
            <View>{this.renderScore()}</View>
            <View style={styles.chartcontainer}>
              <LineChart data={this.state.result} />
            </View>
          </View>
        )}
        : (
        <View>
          <Elements.Card>
            <Text style={styles.paragraph}>
              Ingen statistik än... Spela ett quiz och kom tillbaks för att föja
              dina framsteg!
            </Text>
          </Elements.Card>
        </View>
        ) ) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-around",
    paddingHorizontal: 27,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: Colors.white,
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
  chartcontainer: {},
  headline: {
    marginVertical: 10
  },
  paragraph: {
    fontSize: 18
  }
});

export default StatisticsScreen;
