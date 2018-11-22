import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { LinearGradient } from "expo";
import Colors from "../../constants/Colors";

export default class AnswersButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: [Colors.pink, Colors.orange],
      pressed: false
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;

    this.myTimerInterval = setInterval(() => {
      if (this.props.timer === 0) {
        this.progress();
      }
    }, 1000);
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.myTimerInterval);
  }

  _onAnswerPress = e => {
    if (e === this.props.correct) {
      this.props.score();
    }

    this._isMounted &&
      this.setState({
        pressed: !this.state.pressed
      });

    setTimeout(() => {
      this.props.counter();
      this._isMounted &&
        this.setState({
          pressed: false
        });
    }, 1500);
  };

  progress() {
    this._onAnswerPress("wrongAnswer");
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
          >
            <LinearGradient
              colors={
                this.state.pressed && option === this.props.correct
                  ? [Colors.green, Colors.lightgreen]
                  : this.state.backgroundColor &&
                    this.state.pressed &&
                    option !== this.props.correct
                    ? [Colors.red, Colors.lightred]
                    : this.state.backgroundColor
              }
              style={{
                width: 304,
                height: 50,
                borderRadius: 25,
                marginBottom: 10,
                marginTop: 10
              }}
              start={[0.1, 0]}
              end={[0.5, 0]}
            >
              <View style={styles.answerTextContainer}>
                <Text style={styles.answerText}>{option.toUpperCase()}</Text>
              </View>
            </LinearGradient>
          </TouchableHighlight>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  answerTextContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },
  answerText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 18,
    textAlign: "center"
  }
});
