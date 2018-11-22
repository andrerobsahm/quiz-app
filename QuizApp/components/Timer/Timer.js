import React, { Component } from "react";
import { Text, View } from "react-native";

export default class Timer extends Component {
  componentDidMount() {
    this.myInterval = setInterval(() => {
      if (
        this.props.clear.state.timer === 0 ||
        this.props.clear.state.clearTimer
      ) {
        this.props.clear.setState({
          clearTimer: false,
          timer: 11
        });
      }
      this.props.clear.setState({
        timer: this.props.clear.state.timer - 1
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    return (
      <View>
        <View>
          <Text style={{ color: "white" }}>{this.props.clear.state.timer}</Text>
        </View>
      </View>
    );
  }
}
