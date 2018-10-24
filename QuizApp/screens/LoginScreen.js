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
import base from '../Config/base.js';
import HomeScreen from './HomeScreen';
import SignUpLink from '../components/Links/SignUpLink/SignUpLink';
import ForgotPassword from '../components/Links/ForgotPassword/ForgotPassword';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';

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
    console.log(this.props.navigation);
    return (
      <ScrollView>
        <View>
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
        </View>
        <View>
        <ForgotPassword navigation={this.props.navigation} />
        </View>
        <View>
          <Text>Har du inget konto?</Text>
          <SignUpLink navigation={this.props.navigation} />
        </View>
      </ScrollView>

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
