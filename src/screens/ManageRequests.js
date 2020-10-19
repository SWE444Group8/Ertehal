import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Context } from "../components/PlacesContext";

import ResultDetail from "../components/ResultDetail";

const ManageRequests = ({ navigation }) => {
  const { state, getAllPlaces } = useContext(Context);

  const { places } = state;
  useEffect(() => {
    getAllPlaces();
  }, []);

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={places}
        keyExtractor={(res) => res.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ShowPlaceAdmin", { id: item.id })
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

export default ManageRequests;

const styles = StyleSheet.create({});
