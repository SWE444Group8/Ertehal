import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "./Home";

import NotificationScreen from "./NotificationScreen";
import FavoritesScreen from "./FavoritesScreen";
import ProfileScreen from "./ProfileScreen";
import { useTheme, Avatar } from "react-native-paper";
import { View } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import CardListScreen from "./CardListScreen";
import CardItemDetails from "./CardItemDetails";
import AddDestenation from "./AddDestenation";
import ShowPlaceScreen from "./ShowPlaceScreen";
import ShowByCity from "./ShowByCity";


import SettingsScreen from "./SettingsScreen";
import SupportScreen from "./SupportScreen";
import ResultsScreen from "./ResultsScreen";

import addComment from "./addComment";
import Rating from "./Rating";
import MyComments from "./MyComments";

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
//const AddDestenationStack = createStackNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    barStyle={{ backgroundColor: "#8fbc8f", fontFamily: "Futura-Medium" }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#FF6347",
        fontFamily: "Futura-Medium",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarColor: "#694fad",
        fontFamily: "Futura-Medium",

        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    {/* <Tab.Screen
      name="AddDestenation"
      component={AddDestenationStack}
      options={{
        tabBarLabel: "AddDestenation",
        tabBarColor: "#1f65ff",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    /> */}
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Discover",
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="CardListScreen"
        component={CardListScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
      <HomeStack.Screen
        name="CardItemDetails"
        component={CardItemDetails}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: "#fff",
        })}
      />
      <HomeStack.Screen
        name="AddDestenation"
        component={AddDestenation}
        onPress={() => navigation.navigate("AddDestenation")}
        options={{
          headerStyle: {
          },
          title: '',
      }}
      />

      <HomeStack.Screen
        name="ResultsScreen"
        component={ResultsScreen}
        onPress={() => navigation.navigate("ResultsScreen")}
        options={{
          headerStyle: {
          },
          title: '',
      }}
      />

      <HomeStack.Screen
        name="ShowPlaceScreen"
        component={ShowPlaceScreen}
        onPress={() => navigation.navigate("ShowPlaceScreen")}
        options={{
          headerStyle: {
          },
          title: '',
      }}
      />
      <HomeStack.Screen
        name="ShowByCity"
        component={ShowByCity}
        onPress={() =>
          navigation.navigate("ShowByCity", { city: city.title.toLowerCase() })
        }
        options={{
          headerStyle: {
          },
          title: '',
      }}
      />
      <HomeStack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        onPress={() => navigation.navigate("FavoritesScreen")}
        options={{
          headerStyle: {
          },
          title: '',
      }}
      />
      <HomeStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        onPress={() => navigation.navigate("SettingsScreen")}
      />
      <HomeStack.Screen
        name="SupportScreen"
        component={SupportScreen}
        onPress={() => navigation.navigate("SupportScreen")}
        options={{
          headerStyle: {
          },
          title: '',
      }}
      />
       <HomeStack.Screen
        name="addComment"
        component={addComment}
        onPress={() => navigation.navigate("addComment")}
        options={{
          headerStyle: {
          },
          title: '',
      }}
      />
      <HomeStack.Screen
        name="MyComments"
        component={MyComments}
        onPress={() => navigation.navigate("MyComments")}
        options={{
          headerStyle: {
          },
          title: '',
      }}
      />
     <HomeStack.Screen
        name="Rating"
        component={Rating}
        onPress={() => navigation.navigate("Rating")}
        options={{
          headerStyle: {
          },
          title: '',
      }}
      />
    </HomeStack.Navigator>
  );
};

const ProfileStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#8fbc8f",
          shadowColor: "#8fbc8f", // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "",
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="#8fbc8f"
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
              <ProfileStack.Screen
                name="FavoritesScreen"
                component={FavoritesScreen}
                onPress={() => navigation.navigate("FavoritesScreen")}
                options={{
                  headerStyle: {
                  },
                  title: '',
              }}
              />
              <ProfileStack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                onPress={() => navigation.navigate("SettingsScreen")}
              />
              <ProfileStack.Screen
                name="SupportScreen"
                component={SupportScreen}
                onPress={() => navigation.navigate("SupportScreen")}
                options={{
                  headerStyle: {
                  },
                  title: '',
              }}
              />
              <ProfileStack.Screen
                name="MyComments"
                component={MyComments}
                onPress={() => navigation.navigate("MyComments")}
                
                
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: "Edit Profile",
        }}
        component={ProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};
