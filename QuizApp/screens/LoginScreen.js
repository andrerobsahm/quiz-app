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

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      response: '',
      loggedin: '',
      username: ''
    }
    this.login = this.login.bind(this);
  }
   async login() {

       try {
           await base.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
           base.database().ref(`users/email/${this.state.email}`).update(
             {
             loggedin: true
           });
           this.setState({
               response: "Logged In!"
           });

           setTimeout(() => {
             this.props.navigation.navigate('Home')
           }, 1500);

       } catch (error) {
           this.setState({
               response: error.toString()
           })
       }
   }
  render() {
      console.log(this.props.component);
    return (
      <TouchableWithoutFeedback style={styles.container}>
        <View>
          <TextInput
            placeholder='enter email'
            onChangeText={(email) => this.setState({email})}
            autoCapitalize="none"
          />
          <TextInput
            placeholder='enter password'
            onChangeText={(password) => this.setState({password})}
            autoCapitalize="none"
          />


          <View>
            <Button title='Login' onPress={this.login} />
          </View>
          <View>
           <Text style={styles.response}>{this.state.response}</Text>
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
