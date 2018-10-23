import React from 'react';
import { Text, TouchableHighlight,StyleSheet } from 'react-native';

const Statistics = ({ navigation }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate('Quiz')}
    underlayColor="transparent"
    style={styles.newgamelink}
    >
     <Text>Statistik</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0,
  },

});
export default Statistics;
