import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";

const navigator = createStackNavigator(
  {
    Home: Home,
    Login: Login,
    Signup: Signup,
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      title: "ERTEHAL",
    },
  }
);

export default createAppContainer(navigator);

// import { Login, Home, Signup } from "./src/screens";
// import { decode, encode } from "base-64";

// if (!global.btoa) {
//   global.btoa = encode;
// }
// if (!global.atob) {
//   global.atob = decode;
// }

// const Stack = createStackNavigator();

// export default function App() {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {user ? (
//           <Stack.Screen name="Home">
//             {(props) => <Home {...props} extraData={user} />}
//           </Stack.Screen>
//         ) : (
//           <>
//             <Stack.Screen name="Login" component={Login} />
//             <Stack.Screen name="Signup" component={Signup} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
