import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import * as firebase from "firebase";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import ProfileScreen from "./ProfileScreen";
import FavoritesScreen from "./FavoritesScreen";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//import { AuthContext } from "../../ component/context";

export function DrawerContent(props) {
  const paperTheme = useTheme();
  const [user, setUser] = useState();
  useEffect(() => {
    const user = firebase.auth().currentUser.email;
    setUser(user);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={require("../../assets/Man-Woman.png")}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{user}</Title>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("ProfileScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="heart-outline" color={color} size={size} />
              )}
              label="Favorites"
              onPress={() => {
                props.navigation.navigate("FavoritesScreen");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut = async () => {
              try {
                auth()
                  .signOut()
                  .then(() => alert("Your are signed out!"));
                setloggedIn(false);
                // setuserInfo([]);
              } catch (error) {
                console.error(error);
              }
            };
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
