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
export default class SignUp extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.email,
        this.state.password,
        this.state.confirmPassword
      )
      .then(() => this.props.navigation.navigate("Mais"))
      .catch((error) => this.setState({ errorMessage: error.message }));
  };
  render() {
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
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#aaaaaa"
                  secureTextEntry
                  placeholder="Confirm Password"
                  onChangeText={(confirmPassword) =>
                    this.setState({ confirmPassword })
                  }
                  value={this.state.confirmPassword}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
                <Text></Text>

                <TouchableOpacity
                  style={styles.button}
                  onPress={this.handleSignUp}
                >
                  <Text style={styles.buttonTitle}>SIGN UP</Text>
                </TouchableOpacity>
                <Text></Text>

                <View style={styles.footerView}>
                  <Text style={styles.footerText}>
                    Already got an account?{" "}
                    <Text
                      onPress={() => this.props.navigation.navigate("Login")}
                    >
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
