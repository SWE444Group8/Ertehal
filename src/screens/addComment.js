import React, { useState, useEffect } from "react";
import uid from "uid";
import * as firebase from "firebase";
import "@firebase/firestore";

// import {firebase} from '../firebase/config'

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Picker,
  ScrollView,
  Alert,
  reload,
} from "react-native";

import ImageUpload from "../components/ImageUpload";
import Map from "../components/Map";
import Spacer from "../components/Spacer";
import Hr from "../components/Hr";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

const addComment = ({ route, navigation }) => {
  
  // const [name, setName] = useState("");
  // const [city, setCity] = useState("");
  // const [des, setDes] = useState("");
  // const [imageUri, setImageUri] = useState("");
  // const [coords, setCoords] = useState({});
  // const [err, setErr] = useState("");
  const { place } = route.params;
  console.log(place);
  const [comment, setComment] = useState("");
  const [err, setErr] = useState("");
  const [Email, setUser] = useState();

  // const submitData = () => {
  //   if (!name) return setErr("Please Enter a Place Title");
  //   if (!city) return setErr("Please Choose a City");
  //   if (!des) return setErr("Please Enter a Description");
  //   if (!imageUri) return setErr("Please Add an Image");
  //   if (!coords.latitude) return setErr("Please Pin the Location on the Map ");

  //   //upload the image
  //   if (imageUri) {
  //     uploadImage(imageUri);
  //   }
  //   // save data to rdb
  //   const id = uid(15);
  //   //try
  //   firebase
  //     .firestore()
  //     .collection("places")
  //     .doc(id)
  //     .set({
  //       id,
  //       name,
  //       city,
  //       description: des,
  //       show: false,
  //       latitude: coords.latitude,
  //       longitude: coords.longitude,
  //       thumb: imageName + ".jpg",
  //       createdAt: new Date().toJSON().slice(0, 10),
  //       userId: firebase.auth().currentUser.uid,
  //       userEmail: Email,
  //     });

  // firebase
  //   .database()
  //   .ref(city + id)
  //   .set({
  //     id,
  //     name,
  //     city,
  //     description: des,
  //     show: false,
  //     latitude: coords.latitude,
  //     longitude: coords.longitude,
  //     thumb: imageName + ".jpg",
  //     createdAt: new Date().toJSON().slice(0, 10),
  //     userId: firebase.auth().currentUser.uid,
  //   });
  //   sendNotificationsToAll();
  //   navigation.pop();
  //   Alert.alert("Please wait for admin's approval! ");
  // };

  useEffect(() => {
    const email = firebase.auth().currentUser.email;
    setUser(email);
  }, []);

  const submitData = () => {
    if (!comment) return setErr("Please Enter Your Comment!");

    // save data to rdb
    const id = uid(15);
    //try
    firebase
      .firestore()
      .collection("comments")
      .doc(id)
      .set({
        id,
        desID: place.id,
        comment: comment,
        city: place.city,
        userEmail: Email,
        title: place.name,
        createdAt: new Date().toJSON().slice(0, 10),
        userId: firebase.auth().currentUser.uid,
      });
    Alert.alert("Thank you for your comment! ");
   // navigation.push(('ShowPlaceScreen', { id: place.id }))

   navigation.pop();

    navigation.pop();
  };
  //const showErr = () => err.map((e) => <Text style={styles.err}>{e}</Text>);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Share Your Opinion</Text>
        <Hr />
        {err ? <Text style={styles.err}>{err}</Text> : null}
        <Text
          style={{
            color: "darkgreen",
            marginVertical: 10,
            fontFamily: "Futura-Medium",
          }}
        >
          Share a Comment:
        </Text>
        <TextInput
          placeholder="Comment"
          style={[styles.input, { textAlignVertical: "top" }]}
          value={comment}
          onChangeText={setComment}
          numberOfLines={8}
          multiline={true}
        />
        <TouchableOpacity onPress={submitData}>
          <View style={styles.btn}>
            <Text style={styles.btnTxt}>SUBMIT</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "Futura-Medium",
    alignContent: "center",
    justifyContent: "flex-start",
    flex: 1,
    padding: 10,
  },
  title: {
    fontFamily: "Futura-Medium",
    fontSize: 20,
    color: "#8fbc8f",
    fontWeight: "bold",
    marginLeft: 15,
    marginVertical: 10,
    textAlign: "center",
  },
  input: {
    fontFamily: "Futura-Medium",
    width: "90%",
    borderRadius: 10,
    backgroundColor: "white",
    margin: 10,
    fontSize: 15,
    padding: 10,
    alignSelf: "center",
    color: "black",
  },
  pickerStyle: {
    width: "90%",
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
  },
  btn: {
    backgroundColor: "#8fbc8f",
    padding: 10,
    borderRadius: 25,
    margin: 10,
  },
  btnTxt: {
    fontFamily: "Futura-Medium",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  err: {
    fontFamily: "Futura-Medium",
    color: "red",
    fontWeight: "bold",
  },
  little: {
    fontFamily: "Futura-Medium",

    fontSize: 8,
    color: "red",
  },
});

export default addComment;
