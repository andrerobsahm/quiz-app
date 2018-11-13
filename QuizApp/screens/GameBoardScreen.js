import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import AnswersButton from "../components/AnswersButton/AnswersButton";
import Timer from "../components/Timer/Timer";
import Colors from "../constants/Colors";
import base from "../Config/base";

class GameBoardScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    questions: [],
    questionsanswers: 0,
    score: 0,
    clearTimer: false,
    gameid: "",
    playerOne: "",
    playerTwo: "",
    scorePlayerOne: 0,
    scorePlayerTwo: 0
  };

  componentDidMount() {
    // this.props.channel.bind("client-make-move", data => {
    //   let moves = this.state.moves;
    //   let id = this.ids[data.row_index][data.index]; // get the ID based on the row index and block index
    //   moves[id] = data.piece; // set the piece
    //
    //   // update the UI
    //   this.setState({
    //     moves
    //   });
    //
    //   this.updateScores.call(this, moves); // update the user scores
    // });
  }

  _getData = () => {
    let data = fetch(
      "https://quiz-app-6a8dd.firebaseio.com/quiz/questions.json?print=pretty"
    )
      .then(this._handleResponse)
      .catch(error => {
        console.log(error);
      });
    base
      .database()
      .ref("games/")
      .set({
        playerOne: this.state.username,
        gameid: base.auth().currentUser.uid,
        playerTwo: this.state.username,
        scorePlayerOne: this.state.scorePlayerOne,
        scorePlayerTwo: this.state.scorePlayerTwo,
        questions: this.state.questions
      });
  };

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
      questionsanswers: this.state.questionsanswers + 1,
      clearTimer: !this.state.clearTimer
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
            <Timer clear={this.state.clearTimer} />
          </React.Fragment>
        )}
        <View style={styles.scores_container}>
          <View style={styles.score}>
            <Text style={styles.user_score}>{this.state.score}</Text>
            <Text style={styles.username}>{this.props.username}</Text>
          </View>

          <View style={styles.score}>
            <Text style={styles.user_score}>{this.state.score}</Text>
            <Text style={styles.username}>{this.props.rival_username}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>QUIZ!T</Text>
        <TouchableHighlight onPress={this._getData}>
          <View>
            <Text>Starta spel</Text>
          </View>
        </TouchableHighlight>

        <ScrollView>{this.renderQuestions()}</ScrollView>
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

export default GameBoardScreen;
