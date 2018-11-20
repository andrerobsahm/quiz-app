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
import ButtonComponent from "../ButtonComponent/ButtonComponent";
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

  _onPress = e => {
    this.props.user.setState({
      friends: this.props.user.state.friends.concat([e])
    });
    setTimeout(() => {
      base
        .database()
        .ref("friends/")
        .update({
          username: this.props.user.state.username,
          uid: base.auth().currentUser.uid,
          friends: this.props.user.state.friends
        });
    }, 1500);
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
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <ButtonComponent title="Hitta Vänner" onPress={this._getAllUsers} />
        </View>
        <ScrollView>{this.getUserRows()}</ScrollView>
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
    flex: 1,
    alignContent: "center"
  },
  listItem: {
    alignItems: "center",
    justifyContent: "center"
  },
  userText: {
    fontSize: 15,
    textAlign: "center"
  }
});
