import React,{useState} from "react";
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

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Forget pass</Text>
      <TextInput
                style={styles.input}
                placeholder="E-Mail"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setEmail(text)}
                value={email}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />

      <Button title="Log out" onPress={() => navigation.navigate("ProfileScreen")} />
    </View>
  );
};

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
    }})