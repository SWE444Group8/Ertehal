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
} from "react-native";

import ImageUpload from "../components/ImageUpload";
import Map from "../components/Map";
import Spacer from "../components/Spacer";
import Hr from "../components/Hr";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

const AddDestenation = ({ navigation }) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [des, setDes] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [coords, setCoords] = useState({});
  const [err, setErr] = useState("");

 
  const [Email, setUser] = useState();
  useEffect(() => {
    const email = firebase.auth().currentUser.email;
    setUser(email);
  }, []);

  let imageName = uid(15);
  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      var ref = firebase
        .storage()
        .ref()
        .child(imageName + ".jpg");
      return ref.put(blob);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (() => registerForPushNotificationsAsync())();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      let token = (await Notifications.getExpoPushTokenAsync()).data;
      //console.log(token);
    } else {
      Alert.alert("Must use physical device for Push Notifications");
    }

    if (email=='adminertehal.gmail.com'){
    const res = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).update({tokens:token});
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  const sendNotifications = async (token) => {
    const message = {
      to: token,
      sound: "default",
      title: "Request",
      body: "New requests awaits you !!",
      data: { data: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  const sendNotificationsToAll = async () => {
    const users = await firebase.firestore().collection("users").get();
    users.docs.map((user) => sendNotifications(user.data().token));
  };

  const submitData = () => {
    if (!name) return setErr("Please Enter a Place Title");
    if (!city) return setErr("Please Choose a City");
    if (!des) return setErr("Please Enter a Description");
    if (!imageUri) return setErr("Please Add an Image");
    if (!coords.latitude) return setErr("Please Pin the Location on the Map ");

    //upload the image
    if (imageUri) {
      uploadImage(imageUri);
    }
    // save data to rdb
    const id = uid(15);
    //try
    firebase
      .firestore()
      .collection("places")
      .doc(id)
      .set({
        id,
        name,
        city,
        description: des,
        show: false,
        latitude: coords.latitude,
        longitude: coords.longitude,
        thumb: imageName + ".jpg",
        createdAt: new Date().toJSON().slice(0, 10),
        userId: firebase.auth().currentUser.uid,
        userEmail: Email,
      });
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
    sendNotificationsToAll();
    navigation.pop();
    Alert.alert("Please wait for admin's approval! ");
  };

  const showErr = () => err.map((e) => <Text style={styles.err}>{e}</Text>);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Add New Destenation To Ertehal</Text>
        <Text style={styles.little}>
          * The destination must be approved by the administration before it
          appears{" "}
        </Text>
        <Hr />
        {err ? <Text style={styles.err}>{err}</Text> : null}
        <Text
          style={{
            color: "#085C06",
            marginVertical: 10,
            fontFamily: "Futura-Medium",
          }}
        >
          Destenation Infomation:
        </Text>
        <TextInput
          placeholder="Title Of The Place"
          style={styles.input}
          value={name.toLowerCase()}
          onChangeText={setName}
        />
        <View style={styles.pickerStyle}>
          <Text style={{ color: "#085C06", fontFamily: "Futura-Medium" }}>
            Which City:
          </Text>
          <Picker
            placeholder="Which City"
            selectedValue={city}
            onValueChange={(itemVal) => {
              console.log(city);
              if (itemVal != "0") setCity(itemVal);
            }}
            style={{ width: "100%", color: !city ? "gray" : "#8fbc8f" }}
          >
            <Picker.Item label="Select City.." value="0" />
            <Picker.Item label="Riyadh" value="riyadh" />
            <Picker.Item label="AlQassim" value="alqassim" />
            <Picker.Item label="Jeddah" value="jeddah" />
            <Picker.Item label="Mecca" value="mecca" />
            <Picker.Item label="AlKhobar" value="alkobar" />
            <Picker.Item label="Abha" value="abha" />
          </Picker>
        </View>
        <TextInput
          placeholder="Description"
          style={[styles.input, { textAlignVertical: "top" }]}
          value={des}
          onChangeText={setDes}
          numberOfLines={8}
          multiline={true}
        />
        <Hr />
        <Text
          style={{
            color: "#085C06",
            marginVertical: 10,
            fontFamily: "Futura-Medium",
          }}
        >
          Destenation Image:
        </Text>
        <ImageUpload onSaveImage={setImageUri} />
        <Hr />
        <Text
          style={{
            color: "#085C06",
            marginVertical: 10,
            fontFamily: "Futura-Medium",
          }}
        >
          Destenation Location:{" "}
        </Text>
        <Map onPressLocation={setCoords} />
        <Hr />
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

export default AddDestenation;
