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
import base from "../Config/base";
import { Divider } from "react-native-elements";
import Colors from "../constants/Colors";

export default class FindPlayersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: false,
      username: "",
      response: ""
    };
  }

  _getAllUsers = () => {
    base
      .database()
      .ref("users")
      .on("value", data => {
        const users = Object.values(data.val());
        this.setState({ users });
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
          data={this.state.users}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Image style={styles.userPhoto} source={{ uri: item.photoURL }} />
              <View>
                <Text style={styles.userText}>
                  {item.username !== undefined && item.username.toUpperCase()}
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
