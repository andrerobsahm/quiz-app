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
import FindPlayers from "../components/FindPlayers/FindPlayers";
import Colors from "../constants/Colors";
import base from "../Config/base";

class GameBoardScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    questions: [],
    users: false,
    answersPlayerOne: 0,
    answersPlayerTwo: 0,
    score: 0,
    clearTimer: false,
    gameid: "",
    playerOne: this.props.navigation.state.params.playerOne,
    playerTwo: "",
    scorePlayerOne: 0,
    scorePlayerTwo: 0,
    timer: 10,
    gameready: false
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
    setTimeout(() => {
      base
        .database()
        .ref("games/")
        .push({
          gameid: base.auth().currentUser.uid,
          playerOne: this.state.playerOne,
          playerTwo: this.state.playerTwo,
          scorePlayerOne: this.state.scorePlayerOne,
          scorePlayerTwo: this.state.scorePlayerTwo,
          answersPlayerOne: this.state.answersPlayerOne,
          answersPlayerTwo: this.state.answersPlayerTwo,
          questions: this.state.questions
        });
    }, 1500);
    this.setState({
      gameready: true
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
      questions: randomList
    });
  };

  _counter = () => {
    if (this.state.answersPlayerOne <= this.state.answersPlayerTwo) {
      this.setState({
        answersPlayerOne: this.state.answersPlayerOne + 1
      });
    } else if (this.state.answersPlayerTwo <= this.state.answersPlayerOne) {
      this.setState({
        answersPlayerTwo: this.state.answersPlayerTwo + 1
      });
    }
    this.setState({
      clearTimer: !this.state.clearTimer
    });
    this._quizFinish();
  };
  _scoreCounter = () => {
    this.setState({
      scorePlayerTwo: this.state.scorePlayerTwo + 1,
      scorePlayerOne: this.state.scorePlayerOne + 1
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
    const question = this.state.questions[this.state.answersPlayerTwo];
    console.log(this.state.answersPlayerOne);
    console.log(this.state.answersPlayerTwo);
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
            <Timer clear={this} />
          </React.Fragment>
        )}
        <View style={styles.scores_container}>
          <View style={styles.score}>
            <Text style={styles.user_score}>{this.state.scorePlayerOne}</Text>
            <Text style={styles.username}>{this.state.playerOne}</Text>
          </View>

          <View style={styles.score}>
            <Text style={styles.user_score}>{this.state.scorePlayerTwo}</Text>
            <Text style={styles.username}>{this.state.playerTwo}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>QUIZ!T</Text>
        {this.state.gameready ? (
          <ScrollView>{this.renderQuestions()}</ScrollView>
        ) : (
          <TouchableHighlight onPress={this._getData}>
            <View>
              <FindPlayers user={this} />
              <Text>Starta spel</Text>
              <Text>{this.state.playerOne}</Text>
              <Text>{this.state.playerTwo}</Text>
            </View>
          </TouchableHighlight>
        )}
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
