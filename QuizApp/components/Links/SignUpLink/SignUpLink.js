import React from 'react';
import { Text, TouchableHighlight,StyleSheet } from 'react-native';

const SignUpLink = ({ navigation }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate('Registrera')}
    underlayColor="transparent"
    style={styles.newgamelink}
    >
     <Text>Registrera här!</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0,
  },

});
export default SignUpLink;
