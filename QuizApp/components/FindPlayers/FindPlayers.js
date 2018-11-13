import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  TextInput,
  Button,
  FlatList
} from "react-native";
import base from "../../Config/base";
import { Divider } from "react-native-elements";
import Colors from "../../constants/Colors";

export default class FindPlayers extends React.Component {
  _getAllUsers = () => {
    base
      .database()
      .ref("users")
      .on("value", data => {
        const users = Object.values(data.val());
        this.props.user.setState({ users });
      });
  };

  componentDidMount() {
    // this._getAllUsers();
  }

  // <View>
  //   <TouchableHighlight onPress={this._getAllUsers}>
  //     <View>
  //       <Text>hitta spelare</Text>
  //     </View>
  //   </TouchableHighlight>
  // </View>

  _onPress = e => {
    this.props.user.setState({
      playerTwo: e
    });
  };

  renderSeparator = () => {
    return (
      <Divider
        style={{
          backgroundColor: Colors.grey,
          width: "90%",
          alignSelf: "center"
        }}
      />
    );
  };

  getUserRows() {
    return (
      <View>
        <FlatList
          style={styles.listContainer}
          keyExtractor={(item, index) => index.toString()}
          data={this.props.user.state.users}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Image style={styles.userPhoto} source={{ uri: item.photoURL }} />
              <View>
                <Text style={styles.userText}>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => this._onPress(item.username)}
                  >
                    <View style={styles.answerTextContainer}>
                      <Text style={styles.answerText}>
                        {item.username && item.username.toUpperCase()}
                      </Text>
                    </View>
                  </TouchableHighlight>
                </Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        <Text>Här kan du hitta andra spelare:</Text>
        <TouchableHighlight onPress={this._getAllUsers}>
          <View>
            <Text>hitta spelare</Text>
          </View>
        </TouchableHighlight>
        <ScrollView>{this.getUserRows()}</ScrollView>
        <Text>Vald spelare : {this.props.user.state.playerTwo}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  },
  listContainer: {
    alignContent: "center"
  },
  listItem: {
    alignContent: "center",
    justifyContent: "center"
  },
  userText: {
    fontSize: 15,
    textAlign: "center"
  }
});
