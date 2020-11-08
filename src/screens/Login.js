import React, { useContext, useState } from "react";

import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { firebase } from "../firebase/config";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const pattern = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);
export default class Login extends React.Component {
  state = { email: "", password: "", errorMessage: null };

  handleLogin = () => {
    const { email, password } = this.state;

    if (email.length == 0 && password.length == 0) {
      alert("Error:Please enter your email and password");
    } else if (email.length == 0) {
      alert("Error:Please enter your email");
    } else if (password.length == 0) {
      alert("Error:Please enter your password");
    } else if (
      !pattern.test(email) &&
      password.length != 0 &&
      email.length != 0
    ) {
      alert("Email is badly formatted.");
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate("Main"))
      .catch((error) => {
        this.setState({ errorMessage: error.message });
        alert("Your email and/or password do not match ");
      });
  };
  render() {
    return (
      <KeyboardAwareScrollView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{ backgroundColor: "#8fbc8f", flex: 1, borderRadius: 20 }}
          >
            <View style={{ backgroundColor: "white", flex: 2 }}>
              <View></View>
              <Image
                source={require("../../assets/l.png")}
                style={{ width: 300, height: 300, alignSelf: "center" }}
              ></Image>
            </View>
            <Text> </Text>
            <Text> </Text>
            <View
              style={{ backgroundColor: "#8fbc8f", flex: 0, borderRadius: 20 }}
            >
              <Text
                style={{
                  color: "white",
                  alignItems: "center",
                  fontFamily: "Futura-Medium",
                  fontSize: 17,
                }}
              >
                {"    "}Welcome Back to Ertehal, Login
              </Text>
              <View style={styles.inner}>
                <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(email) => this.setState({ email })}
                  value={this.state.email}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#aaaaaa"
                  secureTextEntry
                  placeholder="Password"
                  onChangeText={(password) => this.setState({ password })}
                  value={this.state.password}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />

                <Text></Text>

                <TouchableOpacity
                  style={styles.button}
                  onPress={this.handleLogin}
                >
                  <Text style={styles.buttonTitle}>LOG IN</Text>
                </TouchableOpacity>
                <Text></Text>

                <View style={styles.footerView}>
                  <Text style={styles.footerText}>
                    Don't have an account?{" "}
                    <Text
                      onPress={() => this.props.navigation.navigate("Signup")}
                      style={styles.footerLink}
                    >
                      SIGN UP{" "}
                    </Text>
                  </Text>

                  <TouchableOpacity
                    style={styles.footerLink}
                    onPress={() =>
                      this.props.navigation.navigate("ForgotPassword")
                    }
                  >
                    <Text style={styles.footerLink}>Forgot password?</Text>
                  </TouchableOpacity>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
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
  }
}

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
    fontFamily: "Futura-Medium",

    width: 350,
    height: 55,
    backgroundColor: "white",
    margin: 10,
    padding: 8,
    color: "black",
    borderRadius: 14,
    fontSize: 13,
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
    fontSize: 12,
    alignSelf: "center",
  },
  footerText: {
    fontFamily: "Futura-Medium",

    fontSize: 12,
    color: "#2e2e2d",
    alignSelf: "center",
    borderRadius: 14,
  },
  inner: {
    padding: 34,
    flex: 1,
    justifyContent: "space-around",
  },
  footerLink: {
    fontFamily: "Futura-Medium",
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 12,
    alignSelf: "center",
    margin: 5,
  },
});
