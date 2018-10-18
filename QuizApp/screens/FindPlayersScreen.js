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


export default class FindPlayersScreen extends React.Component {
  constructor(props){
  super(props);
  this.state={
    emails:[],
  }
  }
     async allplayers() {
         try {
             await base.database().ref('users').on('value', (data) =>{
                   this.state.emails
               console.log(data.toJSON());
             })

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

          <View>
            <Button title='search players' onPress={this.allplayers} />
          </View>
          <View>
           <Text style={styles.response}>{this.state.response}</Text>
          </View>
          <View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}


// _RandomRender() {
//   if (this.state.emails >= 2) {
//         return (
//           <View>
//           ({this.state.emails.map((email,keys) =>
//             {
//           {email.email}
//         )
//       }
//     })
//           </View>
//         )
//   } else {
//       (   <View>
//             hej hej
//           </View>
//         )
//     }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
