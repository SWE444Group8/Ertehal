import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Platform,
  PixelRatio,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as firebase from "firebase";
import Hr from "../components/Hr";
import ScalableText from "react-native-text";

import _ from "lodash";

const ResultComment = ({ result ,navigation}) => {
  const email = result.userEmail.substring(0, result.userEmail.indexOf("@"));

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Are you sure?",
      "do you want to delete your comment",
      [
        {
          text: "Yes",
          onPress: deleteComm,
          
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  const deleteComm = async () => {
    firebase.firestore().collection("comments").doc(result.id).delete();
    Alert.alert("Comment Deleted!");
    navigation.pop();
  };
  return (
    <View>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../assets/ProfilePic1.png")}
          />

          <ScalableText style={styles.name} numberOfLines={8}>
            {email}: {"\n"}
            <Text style={styles.comment}> {result.comment} </Text>

           
          </ScalableText>
        </SafeAreaView>
      </View>

      <Hr />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    flexDirection: "row",
    flex: 1,
  },
  loading: {
    margin: 60,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 4,
    //marginBottom: 10,
    marginTop: 10,
    resizeMode: "cover",
  },
  name: {
    fontSize: 15,
    color: "#8fbc8f",
    marginLeft: 10,
    marginTop: 10,
    fontFamily: "Futura-Medium",
    flex: 1,
    borderEndWidth: 20,
  },
  comment: {
    fontSize: 15,
    color: "grey",
    marginLeft: 10,
    marginTop: 18,
    fontFamily: "Futura-Medium",
  },
  description: {
    fontSize: 12,
    color: "grey",
    textAlign: "left",
    fontFamily: "Futura-Medium",
  },
});

export default ResultComment;
