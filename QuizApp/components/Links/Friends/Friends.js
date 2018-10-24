import React from 'react';
import { Text, TouchableHighlight,StyleSheet } from 'react-native';

const Friends = ({ navigation }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate('FindPlayers')}
    underlayColor="transparent"
    style={styles.newgamelink}
    >
     <Text>Vänner</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0,
  },

});
export default Friends;
