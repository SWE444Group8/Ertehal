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
} from "react-native";
import * as firebase from "firebase";
import Hr from "../components/Hr";
import ScalableText from "react-native-text";

import _ from 'lodash'

const ResultComment = ({ result }) => {

  return (
    <View>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScalableText style={styles.name} numberOfLines={8}>
            {result.comment} {"\n"}
          </ScalableText>
        </SafeAreaView>
      </View>

      <Hr />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    flexDirection: "row",
    flex: 1,
  },
  loading: {
    margin: 60,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 4,
    marginBottom: 10,
    marginTop: 10,
    resizeMode: "cover",
  },
  name: {
    fontSize: 20,
    color: "#8fbc8f",
    marginLeft: 10,
    marginTop: 20,
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
