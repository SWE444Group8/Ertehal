import React from "react";

import "react-native-gesture-handler";
import { StyleSheet, Platform, Image, Text, View } from "react-native";
// import { createStackNavigator } from "react-navigation-stack";
// import { createAppContainer } from "react-navigation";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
// import { SwitchNavigator } from "react-navigation";
import Main from "./src/screens/Main";
import Loading from "./src/screens/Loading";
import ForgotPassword from "./src/screens/ForgotPassword";
import ManageRequests from "./src/screens/ManageRequests";
import ShowPlaceAdmin from "./src/screens/ShowPlaceAdmin";
import ResultsScreen from "./src/screens/ResultsScreen";
import MyDestentions from "./src/screens/MyDestentions";
import ManageAccounts from "./src/screens/ManageAccounts";
import Accounts from "./src/screens/Accounts";
import ResultCommentList from "./src/components/ResultCommentList";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "./src/components/PlacesContext";

// create our app's navigation stack
// const AppNavigator = createStackNavigator({
//   Login: { screen: Login },
//   Signup: { screen: Signup },

//   Mais: { screen: Mais },

//   initialRouteName: "Login",

// });

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ManageRequests" component={ManageRequests} />
          <Stack.Screen name="ShowPlaceAdmin" component={ShowPlaceAdmin} />
          <Stack.Screen
            name="ResultCommentList"
            component={ResultCommentList}
          />
          <Stack.Screen
            name="MyDestentions"
            component={MyDestentions}
            options={{
              headerStyle: {},
              title: "",
            }}
          />
          <Stack.Screen name="ManageAccounts" component={ManageAccounts} />
          <Stack.Screen name="Accounts" component={Accounts} />

          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
