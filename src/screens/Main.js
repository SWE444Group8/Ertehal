import React from "react";
import MainTabScreen from "./MainTabScreen";
import { DrawerContent } from "./DrawerContent";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "./ProfileScreen";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      </Drawer.Navigator>
    </>
  );
};

export default App;
