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

  _isMounted = true;

  _getScores() {
    base
      .database()
      .ref(`statistics/${base.auth().currentUser.uid}/result`)
      .on("value", data => {
        const result = Object.values(data.val());
        this.setState({ result });
      });
  }

  _renderScore() {
    statistics = this.state.result;
    return (
      <View style={styles.scorecontainer}>
        <Elements.Text h4 style={styles.headline}>
          Resultat för {this.state.username}
        </Elements.Text>
        {statistics &&
          statistics.map((score, key) => (
            <View key={key}>
              <Text>{score} av 4</Text>
            </View>
          ))}
      </View>
    );
  }

  componentDidMount() {
    if (this._isMounted) {
      this._getScores();
    }
  }

  componentWillUnmount() {
    if (this._isMounted) {
      this._isMounted = false;
    }
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
        {this.state.result ? (
          <View>
            <View>{this._renderScore()}</View>
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
    flex: 1,
    alignItems: "center",
    marginTop: 50,
    height: "auto",
    width: 300,
    borderRadius: 8,
    justifyContent: "space-around",
    backgroundColor: Colors.orange
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
