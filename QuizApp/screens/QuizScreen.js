import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import AnswersButton from '../components/AnswersButton/AnswersButton'
class QuestionList extends Component {
  state = {
    questions: []
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

  renderQuestions() {
    return this.state.questions.map((question, key) => (
      <View key={key} style={styles.questionContainer}>
        <Text style={styles.category}>{question.category}</Text>
        <Text style={styles.question}>{question.question}</Text>
          <AnswersButton correct={question.correct_answer} answers={question.options} id={question.id}/>
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
