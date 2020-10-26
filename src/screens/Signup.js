import React, { useState } from "react";

import * as firebase from "firebase";
import "@firebase/firestore";

import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  

  const [isLoading, setIsLoading] = useState(false);

  const onSignup = async () => {
   
    if (rePassword !== password) {
      setError("Passwords don't match. Please make reEnter your Password");
      return;
    }

    setIsLoading(true);

    const date = new Date();

    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password )
        .then(() => {
           firebase.firestore().collection('users')
                    .doc().set({
                        email: email.trim(),
                        createdAt: new Date().toJSON().slice(0, 10),
                    })
                setIsLoading(false)
          
          navigation.navigate("Main")
          
        })
      // const saveRes = await firebase.database().ref('users/' + res.user.uid).set({
      //     name: name.trim(),
      //     email: email.trim(),
      //     createdAt: new Date().toJSON().slice(0, 10),
      //     isActive: true,
      //     isBannd: false
      // });

            // navigation.navigate('Loading')
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
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
              {isLoading ? <ActivityIndicator size="large" /> : null}
            </View>
          </View>
          <View style={{ backgroundColor: "#8fbc8f", flex: 4 }}>
            <Text></Text>
            <Text
              style={{
                color: "white",
                alignItems: "center",
                fontFamily: "Futura-Medium",
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
                fontFamily: "Futura-Medium",
                fontSize: 15,
                alignSelf: "center",
              }}
            >
              TO JOIN OUR ERTEHAL FAMILY
            </Text>

            <View style={styles.inner}>
              {error ? <Text style={styles.err}>{error}</Text> : null}

              <TextInput
                editable={isLoading ? false : true}
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />

              <TextInput
                editable={isLoading ? false : true}
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />

                <TextInput
                editable={isLoading ? false : true}
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder="conform Password"
                value={rePassword}
                onChangeText={setRePassword}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              <Text></Text>

              <TouchableOpacity style={styles.button} onPress={onSignup}>
                <Text style={styles.buttonTitle}>SIGN UP</Text>
              </TouchableOpacity>
             

              <View style={styles.footerView}>
                <Text style={styles.footerText}>
                  Already got an account?{" "}
                  <Text
                    style={styles.footerLink}
                    onPress={() => navigation.navigate("Login")}
                  >
                    LOG IN
                  </Text>
                </Text>
                <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};
export default SignupScreen;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    color: "green",
    backgroundColor: "green",
  },
  input: {
    fontFamily: "Futura-Medium",
    width: 350,
    height: 40,
    backgroundColor: "white",
    margin: 10,
    padding: 8,
    color: "black",
    borderRadius: 14,
    fontSize: 24,
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
    fontFamily: "Futura-Medium",

    color: "white",
    fontSize: 13,
  },
  footerText: {
    fontFamily: "Futura-Medium",
    fontSize: 16,
    color: "#2e2e2d",
    alignSelf: "center",
    borderRadius: 12,
  },
  inner: {
    padding: 60,
    flex: 1,
    justifyContent: "space-around",
  },
  footerLink: {
    fontFamily: "Futura-Medium",
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 12,
  },
});

