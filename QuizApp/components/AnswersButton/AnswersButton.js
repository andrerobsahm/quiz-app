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
      backgroundColor: "blue",
      pressed: false
    };
  }
  componentDidMount() {
    // if (this.state.pressed) {
    //   clearInterval(this.myTimerInterval);
    //   this.myTimer();
    // } else {
    //   this.myTimer();
    // }
    // this.myTimer();
    this.myTimerInterval = setInterval(() => {
      if (this.props.timer === 0) {
        this.progress();
      }
    }, 1500);
  }

  componentWillUnmount() {
    clearInterval(this.myTimerInterval);
  }

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
    this.setState({
      pressed: !this.state.pressed
    });
    setTimeout(() => {
      this.props.counter();
      this.setState({
        backgroundColor: "blue"
      });
    }, 1000);
  };

  progress() {
    this._onAnswerPress("wrongAnswer");
  }

  render() {
    console.log(this.props.timer);
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
