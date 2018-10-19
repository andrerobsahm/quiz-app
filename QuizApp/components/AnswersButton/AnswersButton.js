import 'react-native';
import React, { Component } from 'react';
import { AppRegistry,Text,View,StyleSheet, TouchableHighlight } from 'react-native';

export default class AnswersButton extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      backgroundColor:'blue',
    });

  }

  _onAnswerPress = () =>{
    this.setState({
      backgroundColor:'pink',
    });
  }

  render() {
    return(
      <View>
      <TouchableHighlight
        underlayColor={this.state.backgroundColor}
        onPress={this._onAnswerPress}
        style={[{backgroundColor:this.state.backgroundColor}, ...styles.buttoncontainer]}>
        <Text>
          hej hej
        </Text>
        </TouchableHighlight>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0,
  },

});
