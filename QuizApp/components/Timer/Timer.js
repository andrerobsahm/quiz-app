import "react-native";
import React, { Component } from "react";
import { AppRegistry, Text, View, StyleSheet } from "react-native";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 10
    };
  }
  componentDidMount() {
    this.myInterval = setInterval(() => {
      if (this.state.timer === 0 || this.props.clear) {
        this.setState({
          timer: 11
        });
      }
      this.setState({
        timer: this.state.timer - 1
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
          <Text>{this.state.timer}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
