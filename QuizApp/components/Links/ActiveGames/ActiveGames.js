import React from 'react';
import { Text, TouchableHighlight,StyleSheet } from 'react-native';

const LinkNewGame = ({ navigation }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate('Quiz')}
    underlayColor="transparent"
    style={styles.newgamelink}
    >
     <Text>Aktiva spel</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0,
  },

});
export default LinkNewGame;
