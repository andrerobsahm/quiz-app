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


export default class SignUpScreen extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
         email: "",
         password: "",
         response: ""
     };

     this.signup = this.signup.bind(this);
 }

     async signup() {

         try {
             await base.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

             this.setState({
                 response: "account created"
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
            <Button title='Create account' onPress={this.signup} />
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
