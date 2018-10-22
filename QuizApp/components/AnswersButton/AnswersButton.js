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
      this.props.answers.map((option, key) => (
        <View key={key}>
      <TouchableHighlight
        underlayColor='transparent'
        onPress={this._onAnswerPress}
        style={[{backgroundColor:this.state.backgroundColor}, ...styles.buttoncontainer]}>
        <Text>
          <View >
            <Text>
            {option}
            </Text>
          </View>
        </Text>
        </TouchableHighlight>
      </View>
      ))
    )
  };
}

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0,
  },

});
