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
    emails:'',
  }
  }
     async allplayers() {
         try {
             await base.database().ref('users').on('value').then(function(snapshot) {
               this.setState({
                 emails: snapshot.val()
               })
             });

         } catch (error) {
             this.setState({
                 response: error.toString()
             })
         }

     }
  render() {

    return (
      <TouchableWithoutFeedback style={styles.container}>
        <View>

          <View>
            <Button title='search players' onPress={this.allplayers} />
          </View>
          <View>
           <Text style={styles.response}>{this.state.response}</Text>
          </View>
          <View>
          {this.state.emails.map((email,keys) =>
            {
              return (email.email)
            }
          )}

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
