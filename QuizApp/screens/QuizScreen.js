import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import AnswersButton from "../components/AnswersButton/AnswersButton";
import Timer from "../components/Timer/Timer";
import Colors from "../constants/Colors";

class QuestionList extends Component {
  static navigationOptions = {
    header: null
  };

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
    this._quizFinish();
  };
  _scoreCounter = () => {
    this.setState({
      score: this.state.score + 1
    });
  };
  _quizFinish = () => {
    if (this.state.questions.length <= this.state.questionsanswers) {
      setTimeout(() => {
        this.props.navigation.navigate("Home");
      }, 1500);
      this.setState({
        questionsanswers: 0
      });
    }
  };
  renderQuestions() {
    const question = this.state.questions[this.state.questionsanswers];
    return (
      <View style={styles.questionContainer}>
        {question !== undefined && (
          <React.Fragment>
            <View>
              <Text style={styles.category}>KATEGORI: {question.category}</Text>
            </View>
            <View>
              <Text style={styles.question}>{question.question}</Text>
            </View>
            <AnswersButton
              score={this._scoreCounter}
              counter={this._counter}
              correct={question.correct_answer}
              answers={question.options}
            />
          </React.Fragment>
        )}
        <Timer />
        <Text>
          Du fick {this.state.score} rätta svar av {this.state.questions.length}{" "}
          frågor
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>QUIZ!T</Text>
        <View>{this.renderQuestions()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20
    // backgroundColor: Colors.black
  },
  questionContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    justifyContent: "space-around"
  },
  category: {
    fontSize: 14,
    textAlign: "center"
  },
  question: {
    //  color: Colors.white,
    fontSize: 30,
    textAlign: "center",
    lineHeight: 39
  }
});

export default QuestionList;
