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

const MyDestentions = ({ navigation }) => {

//     const { state, getPlacesByUser } = useContext(Context)

//     const { placesToShow } = state

//     //const [Name, setName] = useState("");
// //const searched = .toLowerCase();

    

//     useEffect(() => {
//       getPlacesByUser(userid)
//       const userid = firebase.auth().currentUser.uid;
//   }, [])

const { state, getPlacesByUser } = useContext(Context)
  const [term, setTerm] = useState('');

  const { placesToShow } = state
  const [Name, setName] = useState("");

  const [user, setUser] = useState();
  useEffect(() => {
      
    const user = firebase.auth().currentUser.uid;
    setUser(user);
    getPlacesByUser(user)
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

export default MyDestentions

const styles = StyleSheet.create({})

