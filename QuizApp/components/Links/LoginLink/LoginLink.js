import React from 'react';
import { Text, TouchableHighlight,StyleSheet } from 'react-native';

const LoginLink = ({ navigation }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate('Login')}
    underlayColor="transparent"
    style={styles.newgamelink}
    >
     <Text>har redan konto</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0,
  },

});
export default LoginLink;
