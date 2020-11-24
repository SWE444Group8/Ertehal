import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SearchBar from "../components/SearchBar";
import * as firebase from "firebase";

import { useTheme } from "@react-navigation/native";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

import Swiper from "react-native-swiper";

const Home = ({ navigation }) => {
  const theme = useTheme();
  const [city, setCity] = useState("riyadh");
  const [term, setTerm] = useState("");

  if (firebase.auth().currentUser.email == "ertehaladmin@gmail.com") {
    const id = firebase.auth().currentUser.email;

    useEffect(() => {
      (() => registerForPushNotificationsAsync())();
    }, []);

    const registerForPushNotificationsAsync = async () => {
      let token;
      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
          );
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }

        let token = (await Notifications.getExpoPushTokenAsync()).data;

        firebase.firestore().collection("users").doc(id).update({
          token: token,
        });
        console.log(token);
      } else {
        Alert.alert("Must use physical device for Push Notifications");
      }

      //if (email=='adminertehal.gmail.com'){
      // }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      // console.log(tokens)

      return token;
    };

    const sendNotifications = async (token) => {
      const message = {
        to: token,
        sound: "default",
        title: "Request",
        body: "New requests awaits you !!",
        data: { data: "goes here" },
      };

      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
    };

    const sendNotificationsToAll = async () => {
      const users = await firebase.firestore().collection("users").get();
      users.docs.map((user) => sendNotifications(user.data().token));
    };
    return (
      <ScrollView style={styles.container}>
        <View style={styles.sliderContainer}>
          <Swiper
            autoplay
            horizontal={false}
            height={200}
            activeDotColor="#FF6347"
          >
            <View style={styles.slide}>
              <Image
                source={require("../../assets/t1.jpg")}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../../assets/t2.jpg")}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>

            <View style={styles.slide}>
              <Image
                source={require("../../assets/t3.jpg")}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../../assets/t5.jpg")}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../../assets/t6.jpg")}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
          </Swiper>
        </View>
        <View>
          <SearchBar
            term={term}
            onTermChange={setTerm}
            onTermSubmit={() =>
              navigation.navigate("ResultsScreen", { name: term })
            }
          />
        </View>

        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate("ShowByCity", { city: "alqassim" })
            }
            // onPress={() =>
            // navigation.navigate("CardListScreen", { title: "Restaurant" })
            //}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/qassimicon.png")}
                fadeDuration={0}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>AlQassim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate("ShowByCity", { city: "jeddah" })
            }
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/jedicon.png")}
                fadeDuration={0}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Jeddah</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate("ShowByCity", { city: "riyadh" })
            }
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/riyadhicon.png")}
                fadeDuration={0}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Riyadh</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.categoryContainer, { marginTop: 10 }]}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => navigation.navigate("ShowByCity", { city: "mecca" })}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/Mecca.png")}
                fadeDuration={0}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Mecca</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate("ShowByCity", { city: "alkobar" })
            }
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/khobaricon.png")}
                fadeDuration={0}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>AlKhobar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => navigation.navigate("ShowByCity", { city: "abha" })}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/abhaicon.png")}
                fadeDuration={0}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Abha</Text>
          </TouchableOpacity>
        </View>
        <Text></Text>
        <Text></Text>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "grey",
            fontFamily: "Futura-Medium",
          }}
        >
          Manage
        </Text>
        <View style={styles.categoryContainer}>
          <Text></Text>
          <View>
            <TouchableOpacity
              style={styles.categoryIcon2}
              //
              onPress={() => navigation.navigate("ManageRequests")}
              style={{
                padding: 15,
                paddingVertical: 12,
                backgroundColor: "#8fbc8f",
                paddingHorizontal: 40,
                alignSelf: "center",
                borderRadius: 40,
                marginTop: 2,
                marginLeft:100,

              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Futura-Medium",
                  fontWeight: "bold",
                }}
              >
                REQUESTS
              </Text>
            </TouchableOpacity>
          </View>

          <Text></Text>
        
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.sliderContainer}>
          <Swiper
            autoplay
            horizontal={false}
            height={200}
            activeDotColor="#FF6347"
          >
            <View style={styles.slide}>
              <Image
                source={require("../../assets/t1.jpg")}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../../assets/t2.jpg")}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>

            <View style={styles.slide}>
              <Image
                source={require("../../assets/t3.jpg")}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>

              <Image
                source={require("../../assets/t5.jpg")}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../../assets/t6.jpg")}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
          </Swiper>
        </View>

        <View>
          <SearchBar
            term={term}
            onTermChange={setTerm}
            onTermSubmit={() =>
              navigation.navigate("ResultsScreen", { name: term })
            }
          />
        </View>

        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate("ShowByCity", { city: "alqassim" })
            }
            // onPress={() =>
            // navigation.navigate("CardListScreen", { title: "Restaurant" })
            //}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/qassimicon.png")}
                fadeDuration={0}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>AlQassim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate("ShowByCity", { city: "jeddah" })
            }
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/jedicon.png")}
                fadeDuration={0}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Jeddah</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate("ShowByCity", { city: "riyadh" })
            }
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/riyadhicon.png")}
                fadeDuration={0}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Riyadh</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.categoryContainer, { marginTop: 10 }]}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => navigation.navigate("ShowByCity", { city: "mecca" })}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/Mecca.png")}
                fadeDuration={0}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Mecca</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate("ShowByCity", { city: "alkobar" })
            }
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/khobaricon.png")}
                fadeDuration={0}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>AlKhobar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => navigation.navigate("ShowByCity", { city: "abha" })}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/abhaicon.png")}
                fadeDuration={0}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>Abha</Text>
          </TouchableOpacity>
        </View>
        <Text></Text>
        <Text></Text>

        <Text
          style={{
            alignSelf: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "grey",
            fontFamily: "Futura-Medium",
          }}
        >
          Add a Destintion To Ertehal
        </Text>
        <Text></Text>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddDestenation")}
            style={{
              padding: 7,
              paddingVertical: 12,
              backgroundColor: "#8fbc8f",
              paddingHorizontal: 70,
              alignSelf: "center",
              borderRadius: 40,
              marginTop: 2,
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Futura-Medium",
                fontWeight: "bold",
              }}
            >
              ADD NOW
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
    width: "90%",
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
    backgroundColor: "#8fbc8f" /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryIcon2: {
    marginHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
    backgroundColor: "#8fbc8f" /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 5,
    color: "grey",
    fontFamily: "Futura-Medium",
  },
  cardsWrapper: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
  btn: {
    backgroundColor: "#8fbc8f",
    padding: 10,
    borderRadius: 60,
    margin: 80,
  },
  btnTxt: {
    fontFamily: "Futura-Medium",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});
