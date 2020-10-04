import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  Button,
} from "react-native-paper";
import * as firebase from "firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

//import Share from 'react-native-share';

//import files from '../assets/filesBase64';

const ProfileScreen = ({ navigation }) => {
  //   auth().getUserByEmail(email)
  //  .then(function(userRecord) {
  //   // See the UserRecord reference doc for the contents of userRecord.
  //   console.log('Successfully fetched user data:', userRecord.toJSON());
  // })
  // .catch(function(error) {
  //  console.log('Error fetching user data:', error);
  // });
  const [user, setUser] = useState();
  useEffect(() => {
    const user = firebase.auth().currentUser.email;
    setUser(user);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ marginTop: 15 }}>
          <Avatar.Image
            style={styles.row}
            source={require("../../assets/ProfilePic1.png")}
            size={100}
          />
          <View style={{ marginLeft: 20 }}></View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="email" color="#8fbc8f" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{user}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <TouchableRipple onPress={() => navigation.navigate("MyComments")}>
            <Text style={styles.infoBox}>0</Text>
          </TouchableRipple>
          <TouchableRipple onPress={() => navigation.navigate("MyComments")}>
            <Text style={styles.infoBox}>Comments</Text>
          </TouchableRipple>
        </View>
        <View style={styles.infoBox}>
          <TouchableRipple onPress={() => navigation.navigate("MyDestentions")}>
            <Text style={styles.infoBox}>0</Text>
          </TouchableRipple>
          <TouchableRipple onPress={() => navigation.navigate("MyDestentions")}>
            <Text style={styles.infoBox}>Destentions</Text>
          </TouchableRipple>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => navigation.navigate("FavoritesScreen")}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#8fbc8f" size={25} />
            <Text style={styles.menuItemText}> Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("SupportScreen")}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#8fbc8f" size={25} />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => navigation.navigate("SettingsScreen")}>
          <View style={styles.menuItem}>
            <Icon name="settings-outline" color="#8fbc8f" size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
        
      </View>
    </SafeAreaView>
  );
};


export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    alignSelf: "center",
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});