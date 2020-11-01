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

const ManageAccounts = ({ navigation }) => {
  const { state, getAllUsers } = useContext(Context);

  const { users } = state;
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={users}
        keyExtractor={(res) => res.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Accounts", { id: item.id })}
            >
              <ResultDetail result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ManageAccounts;

const styles = StyleSheet.create({});
