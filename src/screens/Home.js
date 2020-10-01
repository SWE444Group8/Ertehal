import React from "react";
import { View, Text, Button } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home</Text>
      <Button title="add dea" onPress={() => navigation.navigate("AddDestenation")} />
    </View>
  );
};

export default Home;
