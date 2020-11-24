import React, { useContext, useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";

import { Context } from "../components/PlacesContext";

import ResultCommentList from "../components/ResultCommentList";

import SearchBar from "../components/SearchBar";

const MyComments = ({ navigation }) => {
  const { state, getCommentByUser } = useContext(Context);
  const { comments } = state;
  const desid = "";
  const [place, setPlace] = useState({});

  useEffect(() => {
    const userid = firebase.auth().currentUser.uid;

    getCommentByUser(userid);
  }, []);

  const createList = () => {};

  return (
    <View>
      <FlatList
      
        showsHorizontalScrollIndicator={false}
        data={comments}
        keyExtractor={(res) => res.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity


              onPress={() =>
                navigation.navigate("ShowPlaceScreen", { id: item.desID})
              }
            >
              <ResultCommentList result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default MyComments;

const styles = StyleSheet.create({});
