import React, { useState } from "react";
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
} from "react-native";

import ImageUpload from "../components/ImageUpload";
import Map from "../components/Map";
import Spacer from "../components/Spacer";
import Hr from "../components/Hr";

const AddDestenation = ({ navigation }) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [des, setDes] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [coords, setCoords] = useState({});
  const [err, setErr] = useState("");

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

    navigation.pop();
  };

  const showErr = () => err.map((e) => <Text style={styles.err}>{e}</Text>);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          Add New Place To ERTEHAL So Everyone Could Enjoy The Beauty Of Saudi
          Arabia
        </Text>
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
          Place Infomation:
        </Text>
        <TextInput
          placeholder="Title Of The Place"
          style={styles.input}
          value={name}
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
          Place Image:
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
          Place Location:{" "}
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
