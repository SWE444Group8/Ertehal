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
  message,
  Image,
} from "react-native";
//import { TestComponent, PhoneButton } from "./../components/AppComponents";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
        backgroundColor: "white",
      }}
    >
       <KeyboardAwareScrollView>
      <Image
        source={require("../../assets/l.png")}
        style={{ width: 350, height: 350, alignSelf: "center" }}
      ></Image>
      {message ? <Text style={styles.msg}>{message}</Text> : null}
      <Text
        style={{
          color: "#8fbc8f",
          alignItems: "center",
          alignSelf: "center",
          fontFamily: "Futura-Medium",
          fontSize: 20,
        }}
      >
        Please enter Your E-mail, to reset your password:
      </Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="white"
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
      </KeyboardAwareScrollView>
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
    backgroundColor: "#8fbc8f",
    margin: 10,
    padding: 8,
    color: "black",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "center",
    fontFamily: "Futura-Medium",
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
    fontFamily: "Futura-Medium",
    color: "white",
    fontSize: 18,
    alignSelf: "center",
  },
});
