import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
  Button,
} from 'react-native';
import base from '../Config/base';


export default class FindPlayersScreen extends React.Component {
  constructor(props){
  super(props);
  this.state={
    emails:[],
    response: ''
  }
  }
     async allplayers() {
         try {
             await base.database().ref('users').orderByChild('loggedin').equalTo(true).on('value').then(function(snapshot) {
              console.log(snapshot.child('username').val());
            });

         } catch (error) {
             // this.setState({
             //     response: error.toString()
             // })
         }

     }
  render() {
console.log(this.state.emails);
    return (
      <TouchableWithoutFeedback style={styles.container}>
        <View>

          <View>
            <Button title='search players' onPress={this.allplayers} />
          </View>
          <View>
           <Text style={styles.response}>{this.state.response}</Text>
          </View>
          {this.state.emails.map((email, key) => {
          return (
            <View>
            <Text style={styles.response}>{email}</Text>

            </View>
        );}

        )}
          <View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
