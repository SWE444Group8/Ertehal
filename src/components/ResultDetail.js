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

import _ from "lodash";

const ResultDetail = ({ result }) => {
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
    "window"
  );
  const scale = SCREEN_WIDTH / 320;

  useEffect(() => {
    getImage();
    console.log(result);
  }, []);

  const getImage = async () => {
    const ref = firebase.storage().ref(result.thumb);
    const res = await ref.getDownloadURL();
    setImgUrl(res);
    setIsLoading(false);
  };

  if (isLoading)
    return <ActivityIndicator style={styles.loading} size="large" />;

  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: imgUrl }} />
        <SafeAreaView style={styles.container}>
          <ScalableText style={styles.name} numberOfLines={8}>
            {result.name} {"\n"}
            <ScalableText style={styles.description} numberOfLines={2}>
              {result.description}
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

export default ResultDetail;
