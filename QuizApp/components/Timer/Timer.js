import "react-native";
import React, { Component } from "react";
import { AppRegistry, Text, View, StyleSheet } from "react-native";

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
          <Text>{this.props.clear.state.timer}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
