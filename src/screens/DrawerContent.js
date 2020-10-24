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
  if (firebase.auth().currentUser.email == "ertehaladmin@gmail.com") {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Image
                  source={require("../../assets/admin.png")}
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
                  <Icon
                    name="account-check-outline"
                    color={color}
                    size={size}
                  />
                )}
                label="Support"
                onPress={() => {
                  props.navigation.navigate("SupportScreen");
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
              firebase.auth().signOut();
              props.navigation.navigate("Login");
              // signOut = async () => {
              //   try {
              //     firebase.auth()
              //       .signOut()
              //     setloggedIn(false);
              //     // setuserInfo([]);
              //   } catch (error) {
              //     console.error(error);
              //   }
              // };
            }}
          />
        </Drawer.Section>
      </View>
    );
  } else {
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
                  <Icon name="heart-outline" color={color} size={size} />
                )}
                label="Favorites"
                onPress={() => {
                  props.navigation.navigate("FavoritesScreen");
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="account-check-outline"
                    color={color}
                    size={size}
                  />
                )}
                label="Support"
                onPress={() => {
                  props.navigation.navigate("SupportScreen");
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
              firebase.auth().signOut();
              props.navigation.navigate("Login");
              // signOut = async () => {
              //   try {
              //     firebase.auth()
              //       .signOut()
              //     setloggedIn(false);
              //     // setuserInfo([]);
              //   } catch (error) {
              //     console.error(error);
              //   }
              // };
            }}
          />
        </Drawer.Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    fontFamily: "Futura-Medium",
  },
  title: {
    fontSize: 12,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "Futura-Medium",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Futura-Medium",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    fontFamily: "Futura-Medium",
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
    fontFamily: "Futura-Medium",
  },
  drawerSection: {
    marginTop: 15,
    fontFamily: "Futura-Medium",
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
    fontFamily: "Futura-Medium",
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
