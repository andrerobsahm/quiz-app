import React from 'react';
import { Text, TouchableHighlight,StyleSheet } from 'react-native';

const Notifications = ({ navigation }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate('ForgotPassword')}
    underlayColor="transparent"
    style={styles.newgamelink}
    >
     <Text>Notifikationer</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttoncontainer: {
    padding: 0,
  },

});
export default Notifications;
