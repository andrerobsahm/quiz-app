import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image
} from "react-native";
import ProgressBar from "react-native-progress/Bar";
import AnswersButton from "../components/AnswersButton/AnswersButton";
import Timer from "../components/Timer/Timer";
import Colors from "../constants/Colors";
import base from "../Config/base";
import ButtonComponent from "../components/ButtonComponent/ButtonComponent";
const backgroundImage = require("../assets/images/background-waves-black.png");

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

  _isMounted = false;

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
    this._isMounted &&
      this.setState({
        questions: randomList,
        startgame: true
      });
  };

  _counter = () => {
    this._isMounted &&
      this.setState({
        questionsanswers: this.state.questionsanswers + 1,
        clearTimer: true
      });
    this._quizFinish();
  };
  _scoreCounter = () => {
    this._isMounted &&
      this.setState({
        score: this.state.score + 1
      });
  };
  _quizFinish = () => {
    if (this.state.questionsanswers === this.state.questions.length) {
      this._isMounted &&
        this.setState({
          result: this.state.result.concat([this.state.score])
        });

      if (
        base
          .database()
          .ref("statistics/")
          .child(base.auth().currentUser.uid)
      ) {
        base
          .database()
          .ref(`statistics/${base.auth().currentUser.uid}/result`)
          .push(this.state.score);
      } else {
        base
          .database()
          .ref("statistics/")
          .push(base.auth().currentUser.uid)
          .push(result)
          .push(this.state.score);
      }

      this._isMounted &&
        this.setState({
          questionsanswers: 0,
          score: this.state.score,
          startgame: false,
          popUp: true
        });
    }
  };

  componentWillMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  popUp() {
    return (
      <View style={styles.popup}>
        <Text style={styles.popuptext}>
          {this.state.score} rätta svar av {this.state.questions.length} frågor
        </Text>
      </View>
    );
  }

  renderQuestions() {
    const question = this.state.questions[this.state.questionsanswers];
    return (
      <View style={styles.questionContainer}>
        {this._isMounted &&
          question !== undefined && (
            <React.Fragment>
              <View>
                <Text style={styles.category}>
                  KATEGORI: {question.category}
                </Text>
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
      <ImageBackground
        source={backgroundImage}
        imageStyle={{ resizeMode: "cover" }}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          {this.state.startgame ? (
            <View>
              <View>{this.renderQuestions()}</View>
            </View>
          ) : (
            <View style={styles.linkscontainer}>
              <Text style={styles.gametitle}>Är du redo?</Text>
              <Text style={styles.gametext}>Då kör vi!</Text>
              <ButtonComponent title="Börja spela" onPress={this._getData} />
              <ButtonComponent
                title="Tillbaka till profil"
                onPress={() => navigate("Home")}
              />
              {this.state.popUp && this.popUp()}
            </View>
          )}
        </View>
      </ImageBackground>
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
    textAlign: "center",
    color: Colors.white
  },
  question: {
    fontSize: 30,
    textAlign: "center",
    lineHeight: 39,
    color: Colors.white
  },
  linkscontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  gametitle: {
    color: Colors.white,
    fontSize: 36,
    marginBottom: 15
  },
  gametext: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 20,
    width: 300,
    marginBottom: 30
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: Colors.black
  },
  popup: {
    backgroundColor: Colors.orange,
    height: 120,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 50,
    shadowColor: Colors.grey,
    shadowRadius: 0,
    shadowOpacity: 2,
    shadowOffset: { width: 6, height: 6 },
    alignItems: "center",
    justifyContent: "center"
  },
  popuptext: {
    color: Colors.white,
    fontSize: 20,
    width: 200
  }
});

export default QuestionList;
