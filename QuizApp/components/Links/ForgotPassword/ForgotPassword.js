import React from 'react';
import { Text, TouchableHighlight,StyleSheet } from 'react-native';

const ForgotPassword = ({ navigation }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate('Forgotpassword')}
    underlayColor="transparent"
    style={styles.newgamelink}
    >
     <Text>Glömt ditt lösenord?</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0,
  },

});
export default ForgotPassword;
