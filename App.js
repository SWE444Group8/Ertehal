import React from 'react'


import "react-native-gesture-handler";
import { StyleSheet, Platform, Image, Text, View } from "react-native";
// import { createStackNavigator } from "react-navigation-stack";
// import { createAppContainer } from "react-navigation";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
// import { SwitchNavigator } from "react-navigation";
import Mais from "./src/screens/Mais";
import Loading from "./src/screens/Loading";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


// create our app's navigation stack
// const AppNavigator = createStackNavigator({
//   Login: { screen: Login },
//   Signup: { screen: Signup },

//   Mais: { screen: Mais },

//   initialRouteName: "Login",
  
// });

const Stack = createStackNavigator()

const App = () => {
return ( 
  <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen
        name='Loading'
        component={Loading}
      />
      <Stack.Screen
        name='Login'
        component={Login}
      />
      <Stack.Screen
        name='Signup'
        component={Signup}
      />
      <Stack.Screen
        name='Mais'
        component={Mais}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
)
}
export default App
