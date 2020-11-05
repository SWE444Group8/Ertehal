import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Context } from "../components/PlacesContext";

import ResultDetail from "../components/ResultDetail";

import SearchBar from "../components/SearchBar";

const ResultsScreen = ({ navigation, route }) => {
  const { state, getPlacesByName } = useContext(Context);

  const { placesToShow } = state;

  useEffect(() => {
    getPlacesByName(route.params.name);
  }, []);

  //const [Name, setName] = useState("");

  const createList = () => {};

  return (
    <View>
      <Text
        style={{
          color: "#3cb371",
          alignItems: "center",
          fontFamily: "Futura-Medium",
          fontSize: 17,
        }}
      >
        {" "}
        Matching results:{placesToShow.length}
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={placesToShow}
        keyExtractor={(res) => res.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ShowPlaceScreen", { id: item.id })
              }
            >
              <ResultDetail result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({});
