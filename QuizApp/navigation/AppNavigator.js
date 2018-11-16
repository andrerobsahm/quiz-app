import React from "react";
import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

// export default createStackNavigator({
//   HomeStack: {
//     screen: HomeScreen,
//     screen: SettingsScreen
//   },
//   LoginStack: {
//     screen: LoginScreen,
//     screen: SignUpScreen
//   }
// });

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator
});
