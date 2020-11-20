import React, { useEffect, useState, useContext } from "react";
import * as firebase from "firebase";
import { Feather, AntDesign, FontAwesome } from "@expo/vector-icons";
import "@firebase/firestore";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
//import Share from "react-native-share";

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
  TouchableRipple,
  Share,
} from "react-native";

import { Context } from "../components/PlacesContext";

//import { Context } from '../context/PlacesContext'
import _ from "lodash";
import ResultComment from "../components/ResultComment";
import Hr from "../components/Hr";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const ShowPlaceScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [place, setPlace] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [Email, setUser] = useState();
  const [comment, setComment] = useState("");

  const [err, setErr] = useState("");
  const [isFavState, setIsFavState] = useState(false);

  const { state, getComment } = useContext(Context);
  const [term, setTerm] = useState("");

  const { comments } = state;
  const [Name, setName] = useState("");
  const optionsPost = ["Share"];

  //Share post of thread

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
        userEmail: Email,
        title: place.name,
        userId: firebase.auth().currentUser.uid,
      });
  };

  const createTwoButtonAlert2 = () =>
    Alert.alert(
      "Are you sure?",
      "do you want to remove this destenation",
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

  const openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    try {
      const downloadPath = FileSystem.cacheDirectory + { uri: imgUrl };
      // 1 - download the file to a local cache directory
      const localUrl = await FileSystem.downloadAsync(url, downloadPath);
      console.log(localUrl.uri);
      // 2 - share it from  local storage
      let msg = place.description ? place.description + "" : "";
      // share
      const result = await Share.share(
        {
          message: msg,
          url: localUrl.uri,
          saveToFiles: false,
        },
        {
          excludedActivityTypes: [
            //'com.apple.UIKit.activity.PostToTwitter',
            "com.apple.UIKit.activity.MessagetToWhatsApp",
          ],
        }
      );

      //await Sharing.shareAsync(uri);
    } catch (err) {
      console.log(err);
    }
  };

  // on share pressed
  //const onPopupEvent = async (eventName, index, delet, item, threaID, userID, filePaths) => {
  //const onPopupEvent = async (eventName, index, delet, item, threaID, userID, file,{ cancelable: false } )

  const share = async () => {
    // optionName = optionsPost[index];

    openShareDialogAsync({ uri: imgUrl }, place.name);
  };

  // const myCustomShare = async () => {
  // / const shareOptions = {
  // message: "Check out this destination, on Ertehal",
  // url: files.appLogo,
  // urls: [files.image1, files.image2]
  // };

  // try {
  ///  const ShareResponse = await Share.open(shareOptions);
  //   console.log(JSON.stringify(ShareResponse));
  // } catch (error) {
  //  //  console.log("Error => ", error);
  // }
  // };

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

  isFav();

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
  } else if (isFavState) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.iconsView}>
            <TouchableOpacity onPress={openMap}>
              <View style={styles.icon}>
                <Feather name="map-pin" size={40} color="white" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("ImageShow", { id })}
            >
              <View style={styles.icon}>
                <AntDesign
                  name="heart"
                  size={40}
                  color="white"
                  onPress={createTwoButtonAlert2}
                />
              </View>
            </TouchableOpacity>
          </View>

          <Hr />
          <Text style={styles.title}>{place.name}</Text>
          <Image style={styles.image} source={{ uri: imgUrl }} />
          <Hr />
          <Text style={styles.des}>{place.description}</Text>
          <Hr />

          <View style={styles.iconsView}>
            <Text style={styles.commentTitle}>Comments</Text>
            <TouchableOpacity
              o
              onPress={() => navigation.navigate("addComment", { place })}
              style={styles.commicon}
            >
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>Add Comment</Text>
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
  } else {
    return (
      <ScrollView>
        <View>
          <View style={styles.container}>
            <View style={styles.iconsView}>
              <TouchableOpacity onPress={openMap}>
                <View style={styles.icon}>
                  <Feather name="map-pin" size={40} color="white" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("ImageShow", { id })}
              >
                <View style={styles.icon}>
                  <Feather name="heart" size={40} color="white" onPress={fav} />
                </View>
              </TouchableOpacity>

              <View style={styles.icon}>
                <Icon
                  name="share-outline"
                  color="white"
                  size={44}
                  onPress={onShare}
                />
              </View>
            </View>
            <Hr />
            <Text style={styles.title}>{place.name}</Text>
            <Image style={styles.image} source={{ uri: imgUrl }} />
            <Hr />
            <Text style={styles.description}>About the destination: </Text>
            <Text style={styles.des}>{place.description}</Text>
            <Hr />

            <View style={styles.iconsView}>
              <Text style={styles.commentTitle}>
                Comments <Text>{""}</Text>
                <Text>{""}</Text>
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("addComment", { place })}
                style={styles.commicon}
              >
                <View style={styles.btn}>
                  <Text style={styles.btnTxt}>ADD COMMENT</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* <View>
            <TextInput
              placeholder="Comment"
              style={[styles.input, { textAlignVertical: "top" }]}
              value={comment}
              onChangeText={setComment}
              numberOfLines={8}
              multiline={true}
            />
           
          </View> */}
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
});

export default ShowPlaceScreen;
