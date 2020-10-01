import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Linking,
  Alert,
} from "react-native";
//import { TestComponent, PhoneButton } from "./../components/AppComponents";

import * as firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");


  const onForgotPasswordPress = () => {
    if (email.length == 0) Alert.alert("Please enter your Email.");
    else {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(
          () => {
            Alert.alert("An Email has been sent.");
          },
          (error) => {
            Alert.alert(error.message);
          }
        );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#8fbc8f",
      }}
    >
        {message ? <Text style={styles.msg}>
            {message}
        </Text>:null}
      <Text
        style={{
          color: "white",
          alignItems: "center",
          fontFamily: "Verdana-BoldItalic",
          fontSize: 15,
        }}
      >
        Enter Your E-mail:
      </Text>
      <TextInput
        style={styles.input}
        placeholder="E-Mail"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEmail(text)}
        value={email}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => onForgotPasswordPress()}
      >
        <Text style={styles.buttonTitle}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

//const onForgotPasswordPress = () => {};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    color: "green",
    backgroundColor: "green",
  },
  con: {
    flex: 1,
  },

  input: {
    width: 350,
    height: 55,
    backgroundColor: "white",
    margin: 10,
    padding: 8,
    color: "black",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "center",
  },

  button: {
    backgroundColor: "#2f4f4f",
    width: 200,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 18,
    alignSelf: "center",
  },
});