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
  NavigatorIOS,
} from 'react-native';
import base from '../Config/base.js';
import { Navigator } from 'react-navigation';
import HomeScreen from './HomeScreen';

export default class LogoutScreen extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       response: '',
       loggedin: ''
     }
     this.logout = this.logout.bind(this);
     base.database().ref(`users/${this.state.username}`).update(
       {
         loggedin: false,
       });
   }
   async logout() {

           try {

               await firebase.auth().signOut();
               this.setState({
                   response: "Logged out!"
               });
               setTimeout(() => {
                 this.props.navigation.navigate('Login')
               }, 1500);

           } catch (error) {
               console.log(error);
           }

       }

  render() {
      console.log(this.props.component);
    return (
      <TouchableWithoutFeedback style={styles.container}>
        <View>
          <View>
            <Button title='Logout' onPress={this.logout} />
          </View>
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
