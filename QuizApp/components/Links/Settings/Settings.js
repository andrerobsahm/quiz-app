import React from 'react';
import { Text, TouchableHighlight,StyleSheet } from 'react-native';

const Settings = ({ navigation }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate('Settings')}
    underlayColor="transparent"
    style={styles.newgamelink}
    >
     <Text>Inställningar</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0,
  },

});
export default Settings;
