import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import FindPlayersScreen from "../screens/FindPlayersScreen";
import QuizScreen from "../screens/QuizScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import NewGameScreen from "../screens/NewGameScreen";
import WalkthroughScreen from "../screens/WalkthroughScreen";
import GameBoardScreen from "../screens/GameBoardScreen";
const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-link${focused ? "" : "-outline"}`
          : "md-link"
      }
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};
const LoginStack = createStackNavigator({
  Login: LoginScreen
});
LoginStack.navigationOptions = {
  tabBarLabel: "Login",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};
const SignUpStack = createStackNavigator({
  SignUp: SignUpScreen
});
SignUpStack.navigationOptions = {
  tabBarLabel: "SignUp",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};
const FindPlayersStack = createStackNavigator({
  FindPlayers: FindPlayersScreen
});
FindPlayersStack.navigationOptions = {
  tabBarLabel: "FindPlayers",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};

//QUIZSTACK
const QuizStack = createStackNavigator({
  Quiz: QuizScreen
});
QuizStack.navigationOptions = {
  tabBarLabel: "Quiz",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};

const ForgotPasswordStack = createStackNavigator({
  ForgotPassword: ForgotPasswordScreen
});
ForgotPasswordStack.navigationOptions = {
  tabBarLabel: "Forgotpassword",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};

const NewGameStack = createStackNavigator({
  NewGame: NewGameScreen
});
NewGameStack.navigationOptions = {
  tabBarLabel: "NewGame",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};
const WalkthroughStack = createStackNavigator({
  Walkthrough: WalkthroughScreen
});
WalkthroughStack.navigationOptions = {
  tabBarLabel: "Walkthrough",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};
const GameBoardStack = createStackNavigator({
  GameBoard: GameBoardScreen
});
GameBoardStack.navigationOptions = {
  tabBarLabel: "GameBoard",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};

export default createBottomTabNavigator({
  LoginStack,
  SignUpStack,
  HomeStack,
  LinksStack,
  SettingsStack,
  FindPlayersStack,
  QuizStack,
  ForgotPasswordStack,
  NewGameStack,
  WalkthroughStack,
  GameBoardStack
});
