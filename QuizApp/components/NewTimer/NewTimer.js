// import React, { Component } from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
//
// const timer = () => {};
// export default class NewTimer extends Component {
//   constructor(props) {
//     super(props);
//     state = {
//       remainingTime: 10
//     };
//   }
//
//   countdownTimer() {
//     this.setState({ remainingTime: 10 });
//     clearInterval(timer);
//     timer = setInterval(() => {
//       if (!this.state.remainingTime) {
//         clearInterval(timer);
//         return false;
//         this.setState({
//           remainingTime: 10
//         });
//       }
//       this.setState(prevState => {
//         return { remainingTime: prevState.remainingTime - 1 };
//       });
//     }, 1000);
//     console.log(remainingTime);
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Remaining time: {this.state.remainingTime}</Text>
//         // <Button title="Börja spela!" onPress={() => this.countdownTimer()} />
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   }
// });
