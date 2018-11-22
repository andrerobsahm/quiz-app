import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, Button } from "react-native";
import * as Elements from "react-native-elements";
import ProgressCircle from "react-native-progress/Circle";
import Colors from "../constants/Colors";
import base from "../Config/base";
import LineChart from "../components/Chart/Chart";
import Headline from "../components/Headline/Headline";

class StatisticsScreen extends Component {
  state = {
    uid: base.auth().currentUser.uid,
    username: this.props.navigation.state.params.username,
    result: false
  };

  _isMounted = false;

  _getScores() {
    base
      .database()
      .ref(`statistics/${base.auth().currentUser.uid}/result`)
      .on("value", data => {
        const result = Object.values(data.val());
        this._isMounted && this.setState({ result });
      });
  }

  _getSum(total, num) {
    return total + num;
  }

  _renderScore() {
    const statistics = this.state.result;
    const score = statistics.reduce(function(prev, cur) {
      let sum = (prev + cur) / 10;
      return +sum.toFixed(2);
    });

    return (
      <View style={styles.scorecontainer}>
        <Elements.Text h4 style={styles.headline}>
          Resultat för {this.state.username}!
        </Elements.Text>
        <View style={styles.lastmatchcontainer}>
          <Text style={styles.lastmatchtext}>Din senaste matchpoäng</Text>
          <Elements.Badge
            containerStyle={{ backgroundColor: Colors.orange, height: 25 }}
          >
            <Text>{statistics.slice(-1)[0]} av 4</Text>
          </Elements.Badge>
        </View>
        <Text style={styles.lastmatchtext}>Antal rätta svar</Text>
        <ProgressCircle
          showsText={true}
          progress={score}
          size={120}
          thickness={5}
          animated={true}
          color={Colors.orange}
        />
      </View>
    );
  }

  componentDidMount() {
    this._isMounted = true;
    this._getScores();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _renderNoScore() {
    return (
      <View>
        <Elements.Card>
          <Text style={styles.paragraph}>
            Ingen statistik än... Spela ett quiz och kom tillbaks för att föja
            dina framsteg!
          </Text>
          <Button title="Spela" onPress={() => navigate("NewGame")} />
        </Elements.Card>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <Headline
          headline="Din Statistik"
          paragraph="Här kan du se hur det har gått i dina matcher och din
          utvecklingskurva."
        />
        {this._isMounted && this.state.result ? (
          <View>
            <View>
              <View>{this._renderScore()}</View>
            </View>
            <View style={styles.chartcontainer}>
              <LineChart data={this.state.result} />
            </View>
          </View>
        ) : (
          <View>{this._renderNoScore()}</View>
        )}
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.white
  },
  scorecontainer: {
    alignItems: "center",
    marginTop: 30,
    paddingVertical: 10,
    marginHorizontal: 27,
    borderRadius: 8,
    backgroundColor: Colors.bgWhite
  },
  chartcontainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.bgWhite,
    marginHorizontal: 27
  },
  headline: {
    marginBottom: 30
  },
  paragraph: {
    fontSize: 18
  },
  lastmatchcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  lastmatchtext: {
    fontSize: 20
  }
});

export default StatisticsScreen;
