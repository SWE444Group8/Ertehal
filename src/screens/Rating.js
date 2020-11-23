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
  RadioButtonGroup,
} from "react-native";

import ImageUpload from "../components/ImageUpload";
import Map from "../components/Map";
import Spacer from "../components/Spacer";
import Hr from "../components/Hr";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { RadioButton } from "react-native-paper";

const Rating = ({ route, navigation }) => {
  const [value, setValue] = React.useState(0);

  //const Rating = ({ route, navigation }) => {
  //const [value, setValue] = React.useState(0);
  // const { place } = route.params;
  //console.log(place);
  //const [comment, setComment] = useState("");
  //const [err, setErr] = useState("");
  // const [Email, setUser] = useState();
  // useEffect(() => {
  //const email = firebase.auth().currentUser.email;
  //setUser(email);
  //}, []);

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

  useEffect(() => {
    const email = firebase.auth().currentUser.email;
    setUser(email);
  }, []);

  const submitData = () => {
    if (!value) return setErr("Please Enter Your rating!");

    // save data to rdb
    const id = uid(15);
    //try
    firebase
      .firestore()
      .collection("rating")
      .doc(id)
      .set({
        id,
        desID: place.id,
        comment: comment,
        userEmail: Email,
        title: place.name,
        createdAt: new Date().toJSON().slice(0, 10),
        userId: firebase.auth().currentUser.uid,
        value: parseInt(value),
      });
    console.log(value);
    Alert.alert("Thank you for your rating! ");
    // navigation.push(('ShowPlaceScreen', { id: place.id }))

    navigation.pop();
  };
  //const showErr = () => err.map((e) => <Text style={styles.err}>{e}</Text>);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Share Your Rating</Text>
        <Hr />
        {err ? <Text style={styles.err}>{err}</Text> : null}
        <Text
          style={{
            color: "darkgreen",
            marginVertical: 10,
            fontFamily: "Futura-Medium",
          }}
        >
          choose a rating from 1-5:
        </Text>
        {/* <RadioButtonGroup
      name="rating"
      options={[1, 2,3,4]}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    /> */}

        <View style={styles.pickerStyle}>
          <Text
            style={{ color: "#085C06", fontFamily: "Futura-Medium" }}
          ></Text>
          <Picker
            placeholder="Choose rating"
            selectedValue={value}
            onValueChange={(itemVal) => {
              if (itemVal != "0") setValue(itemVal);
            }}
            style={{ width: "100%", color: !value ? "gray" : "#8fbc8f" }}
          >
            <Picker.Item label="choose A a rating.." value="0" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
        </View>

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
  pickerStyle: {
    width: "90%",
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
  },
  h: {
    width: "90%",
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
  },
});

export default Rating;
