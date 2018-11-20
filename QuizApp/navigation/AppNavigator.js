import React from "react";
import { createSwitchNavigator } from "react-navigation";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

// import MainTabNavigator from "./MainTabNavigator";
import Colors from "../constants/Colors";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import WalkthroughScreen from "../screens/WalkthroughScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import FindPlayersScreen from "../screens/FindPlayersScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import FriendsScreen from "../screens/FriendsScreen";
import NewGameScreen from "../screens/NewGameScreen";
import QuizScreen from "../screens/QuizScreen";

const SignedOut = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: "Logga In"
      }
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        title: "Registrera dig",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      navigationOptions: {
        title: "Begär nytt lösenord"
      }
    }
  },
  {
    navigationOptions: {
      headerTintColor: Colors.white,
      headerStyle: {
        backgroundColor: Colors.black
      }
    }
  }
);

const QuizStack = createStackNavigator({
  Quiz: {
    screen: QuizScreen,
    navigationOptions: {
      title: "Quiz"
    }
  }
});

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        // headerMode: "none"
        title: "Profil"
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: "Inställningar"
      }
    },
    Statistics: {
      screen: StatisticsScreen,
      navigationOptions: {
        title: "Statistik"
      }
    },
    FindPlayers: {
      screen: FindPlayersScreen,
      navigationOptions: {
        title: "Hitta vänner"
      }
    },
    NewGame: {
      screen: NewGameScreen,
      navigationOptions: {
        title: "Nytt spel"
      }
    }
  },
  {
    navigationOptions: {
      headerTintColor: Colors.black,
      headerStyle: {
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

// export default createSwitchNavigator({
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   Main: MainTabNavigator,
//
// });
