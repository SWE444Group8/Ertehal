import React, { useEffect, useState, useContext } from "react";
import * as firebase from "firebase";
import { Feather } from "@expo/vector-icons";
import "@firebase/firestore";

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Linking,
  Alert,
} from "react-native";
import FlashMessage from "react-native-flash-message";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
//import { Context } from '../context/PlacesContext'

import Hr from "../components/Hr";

const Accounts = ({ route, navigation }) => {
  const { id } = route.params;
  const [place, setPlace] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const Approve = async () => {
    firebase.firestore().collection("places").doc(place.id).update({
      show: true,
    });
    navigation.navigate("Home");

    Alert.alert("Destintion Approved!");
  };
  const Dissaprove = async () => {
    firebase.firestore().collection("places").doc(place.id).delete();
    navigation.navigate("Home");

    Alert.alert("Destintion Dissapproved!");
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .get()
      .then((data) => {});
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.iconsView}>
          <TouchableOpacity onPress={Approve}>
            <View style={styles.icon}>
              <Text
                style={{
                  color: "white",
                  alignItems: "center",
                  fontFamily: "Futura-Medium",
                }}
              >
                APPROVE
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={Dissaprove}>
            <View
              style={{
                backgroundColor: "red",
                padding: 10,
                borderRadius: 25,
                margin: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  alignItems: "center",
                  fontFamily: "Futura-Medium",
                }}
              >
                DISAPPROVE
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Hr />
        <Text style={styles.title}>{place.name}</Text>
        <Image style={styles.image} source={{ uri: imgUrl }} />
        <Hr />
        <Text style={styles.des}>{place.description}</Text>
        <Hr />

        <Text style={styles.city}>Destenation info:</Text>
        <Text style={styles.city}>City: {place.city}</Text>
        <Text style={styles.city}>Created By: {place.userEmail}</Text>
        <Text style={styles.city}>Created At: {place.createdAt}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "flex-start",
    flex: 1,
    padding: 10,
  },
  city: {
    fontFamily: "Futura-Medium",
    fontSize: 15,
    color: "grey",
    marginLeft: 15,
    marginVertical: 10,
  },
  title: {
    fontFamily: "Futura-Medium",
    fontSize: 26,
    color: "darkgreen",
    fontWeight: "bold",
    marginLeft: 15,
    marginVertical: 10,
    textAlign: "center",
  },
  des: {
    color: "grey",
    textAlign: "justify",
    marginHorizontal: 10,
    fontFamily: "Futura-Medium",
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 4,
    marginBottom: 5,
    resizeMode: "cover",
    alignSelf: "center",
  },
  icon: {
    backgroundColor: "#8fbc8f",
    padding: 10,
    borderRadius: 25,
    margin: 10,
  },
  iconsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
});

export default Accounts;
