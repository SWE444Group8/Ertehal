import React, { useEffect, useState, useContext } from "react";
import * as firebase from "firebase";
import { Feather ,AntDesign,FontAwesome} from "@expo/vector-icons";
import "@firebase/firestore";

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
} from "react-native";

//import { Context } from '../context/PlacesContext'
import _ from 'lodash'

import Hr from "../components/Hr";

const ShowPlaceScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [place, setPlace] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [Email, setUser] = useState();

  const [isFavState, setIsFavState] = useState(false)

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
  }, []);
  // const { state, getPlace } = useContext(Context)
  const createTwoButtonAlert = () =>
  Alert.alert(
    'Are you sure?',
    'do you want to delete this destenation',
    [
      {
        text: 'Yes',
        onPress: deleteDes
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
    ],
    { cancelable: false }
  );

  const createTwoButtonAlert2 = () =>
  Alert.alert(
    'Are you sure?',
    'do you want to remove this destenation',
    [
      {
        text: 'Yes',
        onPress: removeFav
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
    ],
    { cancelable: false }
  );


  const isFav = async () => 
  {

    const user=firebase.auth().currentUser.uid

    const res= await firebase
      .firestore()
      .collection("fav")
      .get();
      //.find(data => data.name === name);
      //console.log(object)
      
      const arr = [];
    res.forEach((doc) => {
      arr.push(doc.data());
      });
     
      //res.forEach(doc => {
       //arr.push(doc.data())
   //})
   const arr2= arr.filter(i=> i.id===id)
      console.log("object")
   console.log("hello" ,arr2.length)
   
   if (arr2.length < 1){
   setIsFavState(false) 
  }else{
    setIsFavState(true)
  }

  }

const fav = () => {
    firebase
      .firestore()
      .collection("fav")
      .doc(id)
      .set({
        id,
        userId: firebase.auth().currentUser.uid,
        userEmail: Email,
        name: place.name,
        description: place.description,
        thumb: place.thumb,
      });

      Alert.alert("added to fav");
      navigation.pop();
    }

  const deleteDes = async () => {
    firebase.firestore().collection("places").doc(place.id).delete();
    firebase.firestore().collection("fav").doc(place.id).delete();
    Alert.alert("Destintion Deleted!");
    navigation.navigate("Home");
  };
  
  const removeFav = async () => {
    firebase.firestore().collection("fav").doc(place.id).delete();
    Alert.alert("destenation removed from fav!");
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

    Linking.openURL(url);
  };

  isFav()

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
  } else 

  if (isFavState) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.iconsView}>

          <TouchableOpacity
              onPress={() => navigation.navigate("ImageShow", { id })}
            >
              <View style={styles.icon}>
                <Feather name="image" size={40} color="white" />
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
                <AntDesign name="heart" size={40} color="white" onPress={createTwoButtonAlert2}/>
              </View>
            </TouchableOpacity>

          </View>
         
          <Hr />
          <Text style={styles.title}>{place.name}</Text>
          <Image style={styles.image} source={{ uri: imgUrl }} />
          <Hr />
          <Text style={styles.des}>{place.description}</Text>
          <Hr />
          
        </View>
      </ScrollView>
    );
  } else {

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.iconsView}>
            <TouchableOpacity   onPress={() => navigation.navigate("MyComments", { id })}

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
                <Feather name="heart" size={40} color="white" onPress={fav}/>
              </View>
            </TouchableOpacity>
          </View>
          <Hr />
          <Text style={styles.title}>{place.name}</Text>
          <Image style={styles.image} source={{ uri: imgUrl }} />
          <Hr />
          <Text style={styles.des}>{place.description}</Text>
          <Hr />

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
    borderRadius: 20,
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
});

export default ShowPlaceScreen;
