import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Button
} from "react-native";
import * as Elements from "react-native-elements";
import ProgressCircle from "react-native-progress/Circle";
import FindPlayers from "../components/FindPlayers/FindPlayers";
import Colors from "../constants/Colors";
import base from "../Config/base";
import LineChart from "../components/Chart/Chart";
import ButtonComponent from "../components/ButtonComponent/ButtonComponent";
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
          Resultat för {this.state.username}
        </Elements.Text>
        <ProgressCircle
          showsText={true}
          progress={score}
          size={80}
          animated={true}
        />
        <View style={styles.lastmatchcontainer}>
          <Text style={styles.lastmatchtext}>
            Senaste matchpoäng : {statistics.slice(-1)[0]} av 4
          </Text>
        </View>
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
      <View style={styles.container}>
        <Headline
          headline="Din Statistik"
          paragraph="Här kan du se hur det har gått i dina matcher och din
          utvecklingskurva."
        />
        {this._isMounted && this.state.result ? (
          <View>
            <ScrollView>
              <View>{this._renderScore()}</View>
            </ScrollView>
            <View style={styles.chartcontainer}>
              <LineChart data={this.state.result} />
            </View>
          </View>
        ) : (
          <View>{this._renderNoScore()}</View>
        )}
        )}
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
    // backgroundColor: Colors.white,
    paddingTop: 20
  },
  scorecontainer: {
    alignItems: "center",
    marginTop: 50,
    height: 300,
    width: 300,
    borderRadius: 8
    // justifyContent: "space-around",
    // backgroundColor: Colors.orange
  },
  chartcontainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  headline: {
    marginBottom: 30
  },
  paragraph: {
    fontSize: 18
  },
  lastmatchcontainer: {
    marginTop: 50,
    marginLeft: "10%",
    justifyContent: "center"
  },
  lastmatchtext: {
    fontSize: 20
  }
});

export default StatisticsScreen;
