import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "react-navigation";
import Colors from "../constants/Colors";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import WalkthroughScreen from "../screens/WalkthroughScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import FriendsScreen from "../screens/FriendsScreen";
import NewGameScreen from "../screens/NewGameScreen";
import QuizScreen from "../screens/QuizScreen";

const logoBlack = require("../assets/images/logo_black.png");
const logoWhite = require("../assets/images/logo_white.png");

const LogoBlack = () => (
  <Image source={logoBlack} style={{ height: 18, resizeMode: "contain" }} />
);
const LogoWhite = () => (
  <Image source={logoWhite} style={{ height: 18, resizeMode: "contain" }} />
);

const SignedOut = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen },
    ForgotPassword: { screen: ForgotPasswordScreen }
  },
  {
    navigationOptions: {
      headerTintColor: Colors.white,
      headerStyle: {
        backgroundColor: Colors.black,
        borderBottomColor: Colors.black
      }
    }
  }
);

const QuizStack = createStackNavigator({
  Quiz: {
    screen: QuizScreen,
    navigationOptions: {
      headerTitle: <LogoWhite />,
      headerTintColor: Colors.white,
      headerStyle: {
        backgroundColor: Colors.grey,
        borderBottomColor: Colors.grey
      }
    }
  }
});

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Settings: { screen: SettingsScreen },
    Statistics: { screen: StatisticsScreen },
    Friends: { screen: FriendsScreen },
    NewGame: { screen: NewGameScreen }
  },
  {
    navigationOptions: {
      headerTitle: <LogoBlack />,
      headerTintColor: Colors.black,
      headerStyle: {
        borderBottomColor: Colors.white,
        backgroundColor: Colors.white
      }
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    SignedOut: SignedOut,
    Walkthrough: WalkthroughScreen,
    Home: HomeStack,
    Quiz: QuizStack
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default AppNavigator;
