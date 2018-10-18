import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

class QuestionList extends Component {
  state = {
    questions: []
  };

  componentDidMount() {
    this._getData();
  }

  _getData() {
    let data = fetch(
      "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
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
      questions: questionList.results
    });

    console.log(questionList);
  };

  renderQuestions() {
    return this.state.questions.map(question => (
      <View style={styles.questionContainer}>
        <Text style={styles.category}>{question.category}</Text>
        <Text style={styles.question}>{question.question}</Text>
      </View>
    ));
  }

  render() {
    return (
      <ScrollView>
        <Text>{this.renderQuestions()}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  questionContainer: {
    paddingTop: 10
  },
  category: {
    fontSize: 14
  },
  question: {
    fontSize: 18
  }
});

export default QuestionList;
