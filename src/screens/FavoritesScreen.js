// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const FavoritesScreen = () => {
//     return (
//       <View style={styles.container}>
//       </View>
//     );
// };

// export default FavoritesScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     alignItems: 'center', 
//     justifyContent: 'center'
//   },
// });

// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const FavoritesScreen = () => {
//     return (
//       <View style={styles.container}>
//       </View>
//     );
// };

// export default FavoritesScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     alignItems: 'center', 
//     justifyContent: 'center'
//   },
// });

import React, { useContext, useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import * as firebase from "firebase";

import { Context } from '../components/PlacesContext'

import ResultDetail from '../components/ResultDetail'

import SearchBar from "../components/SearchBar";

const FavoritesScreen = ({ navigation ,route}) => {

  const { state, getAllFav } = useContext(Context)
  const [term, setTerm] = useState('');

  const { placesToShow } = state
  const [Name, setName] = useState("");

  const [user, setUser] = useState();
  useEffect(() => {
    const user = firebase.auth().currentUser.uid;
    setUser(user);
    getAllFav(user)
  }, []);


  const createList = () => {

  }

    
    return (
        <View>
            
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={placesToShow}
                keyExtractor={res => res.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ShowPlaceScreen', { id: item.id })}
                        >
                            <ResultDetail result={item} />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default FavoritesScreen

const styles = StyleSheet.create({})
