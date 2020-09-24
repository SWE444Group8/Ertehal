import React, { useState } from "react";
import { firebase } from "../firebase/config";
// import Home from '../Home/Home';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Signup({ navigation }) {
  //const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_])(?=.{8,})"
  );

  const onRegisterPress = () => {
    if (
      !strongRegex.test(password) &&
      password.length != 0 &&
      confirmPassword.length != 0 &&
      email.length != 0 &&
      password == confirmPassword
    ) {
      alert(
        "Invalid password,Your password must be at least 8 characters long, contain at least one number , have a mixture of uppercase and lowercase letters and at least one special character."
      );
      return;
    } else if (
      password !== confirmPassword &&
      confirmPassword.length != 0 &&
      password.length != 0 &&
      email.length != 0
    ) {
      alert("Passwords don't match.");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate("Home", { user: data });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        if (
          email.length == 0 ||
          password.length == 0 ||
          confirmPassword.length == 0
        ) {
          alert("Error:Please fill up your information");
        } else if (email.length == 0) {
          alert("Error:Please enter your email");
        } else if (password.length == 0) {
          alert("Error:Please enter your password");
        } else if (confirmPassword.length == 0) {
        } else {
          alert(error);
        }
      });
  };

  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
          <View style={{ backgroundColor: "white", flex: 3 }}>
            <View>
              <Image
                source={require("../../assets/l.png")}
                style={{ width: 250, height: 290, alignSelf: "center" }}
              ></Image>
            </View>
          </View>
          <View style={{ backgroundColor: "#8fbc8f", flex: 4 }}>
            <Text></Text>
            <Text
              style={{
                color: "white",
                alignItems: "center",
                fontFamily: "Verdana-BoldItalic",
                fontSize: 17,
              }}
            >
              {" "}
              CREATE YOUR ACCOUNT
            </Text>
            <Text
              style={{
                color: "white",
                alignItems: "center",
                fontFamily: "Verdana-BoldItalic",
                fontSize: 15,
              }}
            >
              {" "}
              TO JOIN OUR ERTEHAL FAMILY{" "}
            </Text>

            <View style={styles.inner}>
              <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                placeholder="E-mail"
                onChangeText={(text) => setEmail(text)}
                value={email}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder="Confirm Password"
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              <Text></Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => onRegisterPress()}
              >
                <Text style={styles.buttonTitle}>SIGN UP</Text>
              </TouchableOpacity>
              <Text></Text>

              <View style={styles.footerView}>
                <Text style={styles.footerText}>
                  Already got an account?{" "}
                  <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                    LOG IN
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    color: "green",
    backgroundColor: "green",
  },
  input: {
    width: 350,
    height: 40,
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
    width: 100,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 18,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
    alignSelf: "center",
    borderRadius: 14,
  },
  inner: {
    padding: 60,
    flex: 1,
    justifyContent: "space-around",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 18,
  },
});
