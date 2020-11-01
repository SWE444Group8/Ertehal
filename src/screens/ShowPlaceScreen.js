import React, { useEffect, useState, useContext, PureComponent } from "react";
import * as firebase from "firebase";
import { Feather, FontAwesome } from "@expo/vector-icons";
import "@firebase/firestore";
import uid from "uid";
import { Context } from "../components/PlacesContext";
import ResultComment from "../components/ResultComment";

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Linking,
  Alert,
  TouchableHighlight,
  TextInput,
  FlatList,
} from "react-native";

//import { Context } from '../context/PlacesContext'

import Hr from "../components/Hr";

const ShowPlaceScreen = ({ route, navigation }) => {
  const { state, getComment } = useContext(Context);
  const { comments } = state;
  const { id } = route.params;
  const [place, setPlace] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [err, setErr] = useState("");
  const [Email, setUser] = useState();
  useEffect(() => {
    const email = firebase.auth().currentUser.email;
    setUser(email);
  }, []);

  const submitData = () => {
    if (!comment) return setErr("Please Enter Your Comment!");

    // save data to rdb
    const id = uid(15);
    //try
    firebase
      .firestore()
      .collection("comments")
      .doc(id)
      .set({
        id,
        desID: place.id,
        comment: comment,
        city: place.city,
        createdAt: new Date().toJSON().slice(0, 10),
        userId: firebase.auth().currentUser.uid,
        userEmail: Email,
      });
  };

  // const { state, getPlace } = useContext(Context)
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Are you sure?",
      "do you want to delete this destenation",
      [
        {
          text: "Yes",
          onPress: deleteDes,
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  useEffect(() => {
    // firebase.database().ref('places/' + id).on('value', data => {
    //     setPlace(data.val())
    //     getImage(data.val().thumb)
    // })

    firebase
      .firestore()
      .collection("places")
      .doc(id)
      .get()
      .then((data) => {
        setPlace(data.data());
        getImage(data.data().thumb);
      });
  }, []);
  useEffect(() => {
    firebase
      .firestore()
      .collection("comments")
      .doc(id)
      .get()
      .then((data) => {
        getComment(data.data());
      });
  }, []);
  useEffect(() => {
    getComment();
  }, []);

  const deleteDes = async () => {
    firebase.firestore().collection("places").doc(place.id).delete();
    Alert.alert("Destintion Deleted!");
    navigation.navigate("Home");
  };
  const getImage = async (name) => {
    try {
      var ref = firebase.storage().ref(name);
      const res = await ref.getDownloadURL();
      setImgUrl(res);
      setIsLoading(false);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const openMap = () => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${place.latitude},${place.longitude}`;
    const label = place.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  if (!place.hasOwnProperty("thumb") || isLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  if (firebase.auth().currentUser.email == "ertehaladmin@gmail.com") {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.iconsView}></View>
          <Hr />
          <Text style={styles.title}>{place.name}</Text>
          <Image style={styles.image} source={{ uri: imgUrl }} />
          <Hr />
          <Text style={styles.des}>{place.description}</Text>
          <Hr />
          <Text style={styles.city}>Destenation info:</Text>
          <Text style={styles.city}>City: {place.city}</Text>
          <Text style={styles.city}>Created By: {place.userEmail}</Text>
          <Text style={styles.city}>Created At: {place.createdAt}</Text>
          <TouchableOpacity onPress={createTwoButtonAlert}>
            <Text></Text>

            <View
              style={{
                padding: 7,
                paddingVertical: 12,
                backgroundColor: "red",
                paddingHorizontal: 70,
                alignSelf: "center",
                borderRadius: 40,
                marginTop: 2,
              }}
            >
              <Text
                style={{
                  color: "white",
                  alignItems: "center",
                  fontFamily: "Futura-Medium",
                }}
              >
                DELETE
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.iconsView}>
              <TouchableOpacity
                onPress={() => navigation.navigate("MyComments", { id })}
              >
                <View style={styles.icon}>
                  <FontAwesome name="comment" size={40} color="white" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={openMap}>
                <View style={styles.icon}>
                  <Feather name="map-pin" size={40} color="white" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("ImageShow", { id })}
              >
                <View style={styles.icon}>
                  <Feather name="heart" size={40} color="white" />
                </View>
              </TouchableOpacity>
            </View>
            <Hr />
            <Text style={styles.title}>{place.name}</Text>
            <Image style={styles.image} source={{ uri: imgUrl }} />
            <Hr />
            <Text style={styles.des}>{place.description}</Text>
            <Hr />
            <Text style={styles.title}>COMMENTS</Text>
          </View>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={comments}
              keyExtractor={(res) => res.id}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ShowPlaceScreen", { id: item.id })
                    }
                  >
                    <ResultComment result={item} />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View>
            <TextInput
              placeholder="Comment"
              style={[styles.input, { textAlignVertical: "top" }]}
              value={comment}
              onChangeText={setComment}
              numberOfLines={8}
              multiline={true}
            />
            <TouchableOpacity onPress={submitData}>
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>SUBMIT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "flex-start",
    flex: 1,
    padding: 10,
  },
  title: {
    fontFamily: "Futura-Medium",
    fontSize: 26,
    color: "darkgreen",
    fontWeight: "bold",
    marginLeft: 15,
    marginVertical: 10,
    textAlign: "center",
  },
  des: {
    color: "grey",
    textAlign: "justify",
    marginHorizontal: 10,
    fontFamily: "Futura-Medium",
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 4,
    marginBottom: 5,
    resizeMode: "cover",
    alignSelf: "center",
  },
  icon: {
    backgroundColor: "#8fbc8f",
    padding: 10,
    borderRadius: 25,
    margin: 10,
  },
  iconsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
  city: {
    fontFamily: "Futura-Medium",
    fontSize: 15,
    color: "grey",
    marginLeft: 15,
    marginVertical: 10,
  },
  container: {
    fontFamily: "Futura-Medium",

    alignContent: "center",
    justifyContent: "flex-start",
    flex: 1,
    padding: 10,
  },
  title: {
    fontFamily: "Futura-Medium",
    fontSize: 20,
    color: "#8fbc8f",
    fontWeight: "bold",
    marginLeft: 15,
    marginVertical: 10,
    textAlign: "center",
  },
  input: {
    fontFamily: "Futura-Medium",
    width: "90%",
    borderRadius: 10,
    backgroundColor: "white",
    margin: 10,
    fontSize: 15,
    padding: 10,
    alignSelf: "center",
    color: "black",
  },
  pickerStyle: {
    width: "90%",
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
  },
  btn: {
    backgroundColor: "#8fbc8f",
    padding: 5,
    borderRadius: 30,
    margin: 5,
  },
  btnTxt: {
    fontFamily: "Futura-Medium",

    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  err: {
    fontFamily: "Futura-Medium",
    color: "red",
    fontWeight: "bold",
  },
  little: {
    fontFamily: "Futura-Medium",

    fontSize: 8,
    color: "red",
  },
});

export default ShowPlaceScreen;
