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

//import { Context } from '../context/PlacesContext'

import Hr from "../components/Hr";

const ShowPlaceScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [place, setPlace] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const Approve = async ({ navigation }) => {
    firebase.firestore().collection("places").doc(place.id).update({
      show: true,
    });
    Alert.alert("Destintion Approved!");
    navigation.pop();
  };

  const Dissaprove = async () => {
    firebase.firestore().collection("places").doc(place.id).delete();
    Alert.alert("Destintion Dissapproved!");

    navigation.pop();
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("places")
      .doc(id)
      .get()
      .then((data) => {
        setPlace(data.data());
        getImage(data.data().thumb);
      });
  }, []);

  const getImage = async (name) => {
    try {
      var ref = firebase.storage().ref(name);
      const res = await ref.getDownloadURL();
      setImgUrl(res);
      setIsLoading(false);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  if (!place.hasOwnProperty("thumb") || isLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );

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

export default ShowPlaceScreen;
