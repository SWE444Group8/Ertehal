import React, { useEffect, useState, useContext } from "react";
import * as firebase from "firebase";
import {
  Feather,
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import "@firebase/firestore";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";

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
  FlatList,
  TextInput,
  RefreshControl,
  RadioButtonGroup,
  Share,
} from "react-native";

import { Context } from "../components/PlacesContext";
import DialogInput from "react-native-dialog-input";

//import { Context } from '../context/PlacesContext'
import _ from "lodash";
import ResultComment from "../components/ResultComment";

import Hr from "../components/Hr";
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
const ShowPlaceScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [place, setPlace] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [Email, setUser] = useState();
  const [comment, setComment] = useState("");

  const [isDialogVisible2, isDialogVisible] = useState(true);

  const [likesNum, setNumLikes] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  const [err, setErr] = useState("");
  const [isFavState, setIsFavState] = useState(false);
  //set like
  // const [isLikedState, setIsLikedState] = useState(false);
  const [isLikedState, setIsLikedState] = useState(false);

  const { state, getComment } = useContext(Context);
  const [leng, setLeng] = useState("");

  const { comments } = state;
  const [rate, setRate] = useState("");
  //const [value, setValue] = React.useState('one');
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Downolad Ertehal now, and enjoy the beauty of K.S.A. https://expo.io/@ertehal/projects/Ertehal ",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //console.log(place)
  useEffect(() => {
    const email = firebase.auth().currentUser.email;
    setUser(email);

    firebase
      .firestore()
      .collection("places")
      .doc(id)
      .get()
      .then((data) => {
        setPlace(data.data());
        getImage(data.data().thumb);
      });

    getComment(id);
  }, []);
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

  const createTwoButtonAlert4 = () => {
    <DialogInput
      isDialogVisible={isDialogVisible}
      title={"DialogInput 1"}
      message={"Message for DialogInput #1"}
      hintInput={"HINT INPUT"}
      submitInput={(inputText) => {
        this.sendInput(inputText);
      }}
      closeDialog={() => {
        this.showDialog(false);
      }}
    ></DialogInput>;
  };

  const submitData = () => {
    if (!value) return setErr("Please Enter Your rating!");

    // save data to rdb
    const id = uid(15);
    //try
    firebase
      .firestore()
      .collection("rating")
      .doc(id)
      .set({
        id,
        desID: place.id,
        createdAt: new Date().toJSON().slice(0, 10),
        userEmail: Email,
        title: place.name,
        userId: firebase.auth().currentUser.uid,
        rating: value,
      });
  };

  const rating = async () => {
    // const res = await firebase.firestore().collection("rating").get();
    const res = await firebase
      .firestore()
      .collection("rating")
      .where("desID", "==", id)
      .get();

    const arr = [];
    res.forEach((doc) => {
      arr.push(doc.data().value);
    });
    console.log(arr);

    setLeng(arr.length);
    if (arr.length > 0) {
      setRate(Math.round(_.sum(arr) / arr.length));
    } else {
      setRate("Not rated yet..");
    }

    console.log(rate); // 2.5
  };

  const createTwoButtonAlert2 = () =>
    Alert.alert(
      "Are you sure?",
      "do you want to remove this destenation from Favorites?",
      [
        {
          text: "Yes",
          onPress: removeFav,
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );

  const createTwoButtonAlert3 = () =>
    Alert.alert(
      "Are you sure?",
      "do you want to remove this like?",
      [
        {
          text: "Yes",
          onPress: removeLike,
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );

  const isFav = async () => {
    const user = firebase.auth().currentUser.uid;

    const res = await firebase.firestore().collection("fav").get();
    //.find(data => data.name === name);
    //console.log(object)

    const arr = [];
    res.forEach((doc) => {
      arr.push(doc.data());
    });

    //res.forEach(doc => {
    //arr.push(doc.data())
    //})
    const arr2 = arr.filter((i) => i.id === id);
    // console.log("object")
    //console.log("hello" ,arr2.length)

    if (arr2.length < 1) {
      setIsFavState(false);
    } else {
      setIsFavState(true);
    }
  };
  //is liked
  const isLiked = async () => {
    const user = firebase.auth().currentUser.uid;

    const res = await firebase.firestore().collection("likes").get();
    //.find(data => data.name === name);
    //console.log(object)

    const arr = [];
    res.forEach((doc) => {
      arr.push(doc.data());
    });

    //res.forEach(doc => {
    //arr.push(doc.data())
    //})
    const arr2 = arr.filter((i) => i.id === id);
    // console.log("object")
    //console.log("hello" ,arr2.length)

    if (arr2.length < 1) {
      setIsLikedState(false);
    } else {
      setIsLikedState(true);
    }
  };

  const likesNumber = async () => {
    //const user = firebase.auth().currentUser.uid;

    const res = await firebase.firestore().collection("likes").get();
    //.find(data => data.name === name);
    //console.log(object)  const [, setNumLikes] = useState(0);

    const arr = [];
    res.forEach((doc) => {
      arr.push(doc.data());
    });
    const arr2 = arr.filter((i) => i.id === id);
    setNumLikes(arr2.length);
    //return arr.length
    // if (arr2.length < 1) {
    //   setIsLikedState(false);
    // } else {
    //   setIsLikedState(true);
    // }
  };

  const fav = () => {
    firebase.firestore().collection("fav").doc(id).set({
      id,
      userId: firebase.auth().currentUser.uid,
      userEmail: Email,
      name: place.name,
      description: place.description,
      thumb: place.thumb,
    });

    Alert.alert("Destantion Added In Your Favorites");
    navigation.pop();
  };
  //like firebase
  const Like = () => {
    firebase.firestore().collection("likes").doc(id).set({
      id,
      userId: firebase.auth().currentUser.uid,
      userEmail: Email,
      name: place.name,
      description: place.description,
      thumb: place.thumb,
    });

    Alert.alert("Destantion is liked");
    navigation.pop();
  };

  const deleteDes = async () => {
    firebase.firestore().collection("places").doc(place.id).delete();
    firebase.firestore().collection("fav").doc(place.id).delete();
    Alert.alert("Destintion Deleted!");
    navigation.navigate("Home");
  };

  const removeFav = async () => {
    firebase.firestore().collection("fav").doc(place.id).delete();
    Alert.alert("Destenation Removed From Favorites");
    navigation.pop();
    navigation.pop();
  };
  const removeLike = async () => {
    firebase.firestore().collection("likes").doc(place.id).delete();
    Alert.alert("like Removed From Destenation");
    navigation.pop();
    navigation.pop();
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


/*
const deleteDes = async () => {
    firebase.firestore().collection("places").doc(place.id).delete();
    firebase.firestore().collection("fav").doc(place.id).delete();
    Alert.alert("Destintion Deleted!");
    navigation.navigate("Home");
  };

  const removeFav = async () => {
    firebase.firestore().collection("fav").doc(place.id).delete();
    Alert.alert("Destenation Removed From Favorites");
    navigation.pop();
    navigation.pop();
  };
  const removeLike = async () => {
    firebase.firestore().collection("likes").doc(place.id).delete();
    Alert.alert("like Removed From Destenation");
    navigation.pop();
    navigation.pop();
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


*/



    Linking.openURL(url);
  };

  isFav();
  isLiked();
  likesNumber();
  rating();

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
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{place.name}</Text>
          <Image style={styles.image} source={{ uri: imgUrl }} />
          <Hr />
          <Text style={styles.des}>{place.description}</Text>
          <Hr />

          <Text>
            {""}
            {""}
            <Text style={styles.titlelike}>Liked By: </Text>
            <Text style={styles.likes}>{likesNum} users </Text>
          </Text>
          <Text>
            {""}
            {""}

            <Text style={styles.titlelike}>Rated: </Text>
            <Text style={styles.likes}>
              {rate} out of 5 by {leng} users
            </Text>
          </Text>

          <Hr />

          <View style={styles.iconsView}>
            <TouchableOpacity onPress={openMap}>
              <View style={styles.icon}>
                <Feather name="map-pin" size={30} color="white" />
              </View>
            </TouchableOpacity>

            {isFavState ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("ImageShow", { id })}
              >
                <View style={styles.icon}>
                  <AntDesign
                    name="star"
                    size={30}
                    color="white"
                    onPress={createTwoButtonAlert2}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate("ImageShow", { id })}
              >
                <View style={styles.icon}>
                  <Feather name="star" size={30} color="white" onPress={fav} />
                </View>
              </TouchableOpacity>
            )}

            {isLikedState ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("ImageShow", { id })}
              >
                <View style={styles.icon}>
                  <AntDesign
                    name="heart"
                    size={30}
                    color="white"
                    onPress={createTwoButtonAlert3}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={Like}>
                <View style={styles.icon}>
                  <Feather name="heart" size={30} color="white" />
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate("Rating", { place })}
            >
              <View style={styles.icon}>
                <MaterialIcons
                  name="rate-review"
                  size={30}
                  color="white"
                  // onPress={createTwoButtonAlert3}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.icon}>
                <Icon
                  name="share-outline"
                  color="white"
                  size={30}
                  onPress={onShare}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Hr />
          <View style={styles.commentsView}>
            <Text style={styles.commentTitle}>Comments</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("addComment", { place })}
              style={styles.commicon}
            >
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>Add Comment </Text>
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={comments}
            keyExtractor={(res) => res.id}
            renderItem={({ item }) => {
              return <ResultComment result={item} />;
            }}
          />
        </View>
      </ScrollView>
    );
    // } else {
    //   return (
    //     <ScrollView  contentContainerStyle={styles.scrollView}

    //     refreshControl={
    //       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //     }>

    //       <View>
    //         <View style={styles.container}>

    //           <View style={styles.iconsView}>
    //             <TouchableOpacity onPress={openMap}>
    //               <View style={styles.icon}>
    //                 <Feather name="map-pin" size={40} color="white" />
    //               </View>
    //             </TouchableOpacity>

    //           </View>
    //           <Hr />
    //           <Text style={styles.title}>{place.name}</Text>
    //           <Image style={styles.image} source={{ uri: imgUrl }} />
    //           <Hr />
    //           <Text style={styles.description}>About the destination: </Text>
    //           <Text style={styles.des}>{place.description}</Text>
    //           <Hr />

    //           <View style={styles.iconsView}>
    //             <Text style={styles.commentTitle}>
    //               Comments <Text>{""}</Text>
    //               <Text>{""}</Text>
    //             </Text>

    //             <TouchableOpacity
    //               onPress={() => navigation.navigate("addComment", { place })}
    //               style={styles.commicon}
    //             >
    //               <View style={styles.btn}>
    //                 <Text style={styles.btnTxt}>ADD COMMENT</Text>
    //               </View>
    //             </TouchableOpacity>
    //           </View>

    //           {/* <View>
    //           <TextInput
    //             placeholder="Comment"
    //             style={[styles.input, { textAlignVertical: "top" }]}
    //             value={comment}
    //             onChangeText={setComment}
    //             numberOfLines={8}
    //             multiline={true}
    //           />

    //         </View> */}
    //         </View>
    //         <FlatList
    //           showsHorizontalScrollIndicator={false}
    //           data={comments}
    //           keyExtractor={(res) => res.id}
    //           renderItem={({ item }) => {
    //             return <ResultComment result={item} />;
    //           }}
    //         />
    //       </View>
    // </ScrollView>
    // );
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
    fontSize: 20,
    color: "#3cb371",
    fontWeight: "bold",
    marginLeft: 15,
    marginVertical: 10,
    textAlign: "center",
  },
  commentTitle: {
    fontFamily: "Futura-Medium",
    fontSize: 24,
    color: "#3cb371",
    fontWeight: "bold",
    marginLeft: -100,
    marginVertical: 10,
    textAlign: "center",
  },
  des: {
    color: "grey",
    textAlign: "justify",
    marginHorizontal: 10,
    fontFamily: "Futura-Medium",
  },
  likes: {
    color: "grey",
    fontWeight: "bold",
    textAlign: "justify",
    marginHorizontal: 10,
    fontFamily: "Futura-Medium",
    marginVertical: 5,
    marginEnd: 20,
  },
  description: {
    color: "#3cb371",
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
    borderRadius: 20,
    margin: 10,
  },
  commicon: {
    backgroundColor: "#8fbc8f",
    padding: 5,
    borderRadius: 25,
    margin: 10,
  },
  iconsView: {
    flexDirection: "row",
    // justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  commentsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 100,
  },
  city: {
    fontFamily: "Futura-Medium",
    fontSize: 15,
    color: "grey",
    marginLeft: 15,
    marginVertical: 10,
  },
  btn: {
    backgroundColor: "#8fbc8f",
    borderRadius: 20,
    fontFamily: "Futura-Medium",
    fontSize: 26,
    color: "darkgreen",
    fontWeight: "bold",
    marginLeft: 15,
    marginRight: 15,
    marginVertical: 5,
    textAlign: "center",
  },
  btnTxt: {
    fontFamily: "Futura-Medium",
    fontSize: 12,
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
  scrollView: {
    // flex: 1,
    // backgroundColor: 'pink',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  titlelike: {
    color: "#3cb371",
    fontWeight: "bold",
    textAlign: "justify",
    marginHorizontal: 10,
    fontFamily: "Futura-Medium",
    marginVertical: 5,
    marginEnd: 20,
  },
});

export default ShowPlaceScreen;
