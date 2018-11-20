import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import AnswersButton from "../components/AnswersButton/AnswersButton";
import Timer from "../components/Timer/Timer";
import Colors from "../constants/Colors";
import base from "../Config/base";
import ButtonComponent from "../components/ButtonComponent/ButtonComponent";
class QuestionList extends Component {
  state = {
    questions: [],
    questionsanswers: 0,
    score: 0,
    clearTimer: false,
    timer: 10,
    result: [],
    startgame: false,
    popUp: false
  };

  _getData = () => {
    let data = fetch(
      "https://quiz-app-6a8dd.firebaseio.com/quiz/questions.json?print=pretty"
    )
      .then(this._handleResponse)
      .catch(error => {
        console.log(error);
      });
  };

  randomAndLimit(questionList) {
    const limit = 4;
    const randomList = [];
    for (var i = 0; i < limit; i++) {
      let randomIndex = Math.floor(Math.random() * questionList.length);
      randomList.push(questionList[randomIndex]);
      questionList.splice(randomIndex, 1);
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
      questions: randomList,
      startgame: true
    });
  };

  _counter = () => {
    this.setState({
      questionsanswers: this.state.questionsanswers + 1,
      clearTimer: true
    });
    this._quizFinish();
  };
  _scoreCounter = () => {
    this.setState({
      score: this.state.score + 1
    });
  };
  _quizFinish = () => {
    if (this.state.questionsanswers === this.state.questions.length - 1) {
      this.setState({
        result: this.state.result.concat([this.state.score])
      });
      base
        .database()
        .ref("statistics/")
        .update({
          result: this.state.result,
          uid: base.auth().currentUser.uid
        });
      this.setState({
        questionsanswers: 0,
        score: this.state.score,
        startgame: false,
        popUp: true
      });
    }
  };

  popUp() {
    return (
      <View>
        <Text>
          Du fick {this.state.score} rätta svar av {this.state.questions.length}{" "}
          frågor
        </Text>
      </View>
    );
  }
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
              timer={this.state.timer}
            />
            <Timer clear={this} />
            <ProgressBar
              progress={this.state.timer / 10}
              width={350}
              height={5}
              color={Colors.orange}
              unfilledColor={Colors.black}
              borderColor="transparent"
              borderRadius={0}
            />
          </React.Fragment>
        )}
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>QUIZ!T</Text>
        {this.state.startgame ? (
          <View>
            <View>{this.renderQuestions()}</View>
          </View>
        ) : (
          <View style={styles.linkscontainer}>
            <ButtonComponent title="Starta spel" onPress={this._getData} />
            <ButtonComponent
              title="Tillbaka"
              onPress={() => navigate("Home")}
            />
          </View>
        )}
        {this.state.popUp && this.popUp()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20
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
    fontSize: 30,
    textAlign: "center",
    lineHeight: 39
  },
  linkscontainer: {
    flex: 1,
    justifyContent: "center"
  }
});

export default QuestionList;
