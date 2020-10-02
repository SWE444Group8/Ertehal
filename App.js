import "react-native-gesture-handler";
import { StyleSheet, Platform, Image, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import { SwitchNavigator } from "react-navigation";
import Mais from "./src/screens/Mais";
import Loading from "./src/screens/Loading";

// create our app's navigation stack
const AppNavigator = createStackNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup },

  Mais: { screen: Mais },

  initialRouteName: "Login",
});

export default createAppContainer(AppNavigator);
