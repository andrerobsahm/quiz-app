import 'react-native';
import React, { Component } from 'react';
import { AppRegistry,Text,View,StyleSheet, TouchableHighlight } from 'react-native';

export default class AnswersButton extends Component {
  state = {
    options: []
  };

  componentDidMount() {
    this._getData();
  }

  _getData() {
    let data = fetch(
      "https://quiz-app-6a8dd.firebaseio.com/quiz/questions/`${this.props.id}`/options"
    )
      .then(this._handleResponse)
      .catch(error => {
        console.log(error);
      });
  }

  _handleResponse = async response => {
    const questionList = await response.json();

    if (!response.ok) {
      console.log("error");
    }

    this.setState({
      options: options
    });
    console.log(options);
  };
  // constructor(props) {
  //   super(props);
  //   this.state = ({
  //     backgroundColor:'blue',
  //   });
  //
  // }
  //
  // _onAnswerPress = () =>{
  //   this.setState({
  //     backgroundColor:'pink',
  //   });
  // }

  render() {
console.log(this.props.id);
    return(
      <View>
      <TouchableHighlight
        underlayColor='transparent'
        onPress={this._onAnswerPress}
        style={[{backgroundColor:this.state.backgroundColor}, ...styles.buttoncontainer]}>
        <Text>
        {
          this.state.options.map((question, key) => (
            <View>
            <Text id={id} />
            <Text style={styles.question}>{question.option_1}</Text>
           </View>
          ))
        }
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
