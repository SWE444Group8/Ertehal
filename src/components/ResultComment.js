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
  SafeAreaView,} from "react-native";
import * as firebase from "firebase";
import Hr from "../components/Hr";
import ScalableText from "react-native-text";

import _ from 'lodash'

const ResultComment = ({ result }) => {

  const email = result.userEmail.substring(0,result.userEmail.indexOf('@'));
  return (
    <View>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
        <Image style={styles.image}
              source={require("../../assets/ProfilePic1.png")}
              
            />
            
          <ScalableText style={styles.name} numberOfLines={20} >
            {email}: {"\n"}
            <ScalableText style={styles.comment} numberOfLines={2}>
              {result.comment}
            </ScalableText>
           
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
    flex:1,
    borderEndWidth:16
  },
  comment: {
    fontSize: 13,
    color: "grey",
    marginLeft: 10,
    marginTop: 20,
    fontFamily: "Futura-Medium",
    textAlign: "left",
  },
  description: {
    fontSize: 12,
    color: "grey",
    textAlign: "left",
    fontFamily: "Futura-Medium",
  },
});

export default ResultComment;
