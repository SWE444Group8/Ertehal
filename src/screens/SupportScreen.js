import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

const SupportScreen = () => {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/l.png")}
          style={{ width: 350, height: 350, alignSelf: "center" }}
        ></Image>
        <Text style={styles.des}>
          Ertehal is an online Saudi app that helps you discover new
          destinations in our beautiful kingdom with recommendations from a
          community that you trust.
        </Text>
        <Text style={styles.des}>
          For more info contact us at: Ertehal@gmail.com
        </Text>
      </View>
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  des: {
    fontFamily: "Futura-Medium",

    color: "grey",
    textAlign: "justify",
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
