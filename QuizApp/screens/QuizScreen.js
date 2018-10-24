import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import AnswersButton from "../components/AnswersButton/AnswersButton";
class QuestionList extends Component {
  state = {
    questions: [],
    questionsanswers: 0
  };

  componentDidMount() {
    this._getData();
  }

  _getData() {
    let data = fetch(
      "https://quiz-app-6a8dd.firebaseio.com/quiz/questions.json?print=pretty"
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
      questions: questionList
    });
  };

  _counter = () => {
    this.setState({
      questionsanswers: this.state.questionsanswers + 1
    });
  };

  renderQuestions() {
    const question = this.state.questions[this.state.questionsanswers];
    return (
      <View style={styles.questionContainer}>
        {question !== undefined && (
          <React.Fragment>
            {console.log(question.category)}
            <Text style={styles.category}>{question.category}</Text>
            <Text style={styles.question}>{question.question}</Text>
            <AnswersButton
              counter={this._counter}
              correct={question.correct_answer}
              answers={question.options}
            />
          </React.Fragment>
        )}
      </View>
    );
  }

  render() {
    return <ScrollView>{this.renderQuestions()}</ScrollView>;
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
