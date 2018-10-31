import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import AnswersButton from "../components/AnswersButton/AnswersButton";
class QuestionList extends Component {
  state = {
    questions: [],
    questionsanswers: 0,
    score: 0
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

  randomAndLimit(questionList) {
    const numberOfQuestions = 6;
    const limit = 4;
    const randomList = [];
    for (var i = 0; i < limit; i++) {
      let randomIndex = Math.floor(Math.random() * numberOfQuestions);
      randomList.push(questionList[randomIndex]);
    }
    return randomList;
  }

  _handleResponse = async response => {
    questionList = await response.json();
    randomList = this.randomAndLimit(questionList);
    if (!response.ok) {
      console.log("error");
    }

    this.setState({
      questions: randomList
    });
  };

  _counter = () => {
    this.setState({
      questionsanswers: this.state.questionsanswers + 1
    });
  };
  _scoreCounter = () => {
    this.setState({
      score: this.state.score + 1
    });
  };

  renderQuestions() {
    console.log(this.state.questions);
    const question = this.state.questions[this.state.questionsanswers];
    return (
      <View style={styles.questionContainer}>
        {question !== undefined && (
          <React.Fragment>
            <Text style={styles.category}>{question.category}</Text>
            <Text style={styles.question}>{question.question}</Text>
            <AnswersButton
              score={this._scoreCounter}
              counter={this._counter}
              correct={question.correct_answer}
              answers={question.options}
            />
          </React.Fragment>
        )}
        <Text>
          Du fick {this.state.score}/{this.state.questions.length}
        </Text>
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
