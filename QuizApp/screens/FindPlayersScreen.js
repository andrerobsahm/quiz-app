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
  Button
} from "react-native";
import base from "../Config/base";

export default class FindPlayersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      response: ""
    };
  }
  componentDidMount() {
    this._getData();
  }
  _getData() {
    let data = fetch(
      "https://quiz-app-6a8dd.firebaseio.com/users.json?print=pretty"
    )
      .then(this._handleResponse)
      .catch(error => {
        console.log(error);
      });
    // try {
    //     await base.database().ref('users').orderByChild('loggedin').equalTo(true).on('value', (data) =>{
    //       console.log(data.toJSON());
    //       .then(this._handleResponse)
    //       .catch(error => {
    //         console.log(error);
    //       });
    //     })
    // } catch (error) {
    // this.setState({
    //     response: error.toString()
    // })
    // }
  }

  _handleResponse = async response => {
    usersList = await response.json();
    if (!response.ok) {
      console.log("error");
    }
    this.setState({
      users: usersList
    });
  };

  // <View>
  //   <TouchableHighlight onPress={this._allplayers}>
  //     <View>
  //       <Text>hitta spelare</Text>
  //     </View>
  //   </TouchableHighlight>
  // </View>

  render() {
    const users = this.state.users;
    console.log(users);
    return (
      <TouchableWithoutFeedback style={styles.container}>
        <View>
          {users !== undefined && (
            <View>
              {users.map((user, key) => {
                <View key={key}>
                  <Text style={styles.response}>{user.username}</Text>
                </View>;
              })}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
