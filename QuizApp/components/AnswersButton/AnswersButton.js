import "react-native";
import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from "react-native";

export default class AnswersButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue"
    };
  }
  // componentDidMount() {
  //   setTimeout(() => {
  //     this._onAnswerPress(this.progress());
  //   }, 5000);
  // }
  _onAnswerPress = e => {
    if (e === this.props.correct) {
      this.setState({
        backgroundColor: "green"
      });
      this.props.score();
    } else {
      this.setState({
        backgroundColor: "red"
      });
    }
    setTimeout(() => {
      this.props.counter();
      this.setState({ backgroundColor: "blue" });
    }, 1000);
  };

  progress() {
    timer = 15;
    for (var i = 0; i < 4; i++) {
      this._onAnswerPress("wrongAnswer");
    }
  }

  render() {
    return (
      <View>
        {this.props.correct}
        {this.props.answers.map((option, key) => (
          <TouchableHighlight
            key={key}
            underlayColor="transparent"
            onPress={() => this._onAnswerPress(option)}
            style={[
              {
                backgroundColor: this.state.backgroundColor,
                width: 304,
                height: 50,
                borderRadius: 25,
                marginBottom: 10,
                marginTop: 10
              },
              ...styles.buttoncontainer
            ]}
          >
            <View style={styles.answerTextContainer}>
              <Text style={styles.answerText}>{option.toUpperCase()}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttoncontainer: {},
  answerTextContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },
  answerText: {
    // color: Colors.white,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 18,
    textAlign: "center"
  }
});
