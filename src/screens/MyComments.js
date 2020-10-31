
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

import ResultComment from '../components/ResultComment'

import SearchBar from "../components/SearchBar";

const MyComments = ({ navigation}) => {

//     const { state, getPlacesByUser } = useContext(Context)

//     const { placesToShow } = state

//     //const [Name, setName] = useState("");
// //const searched = .toLowerCase();

    

//     useEffect(() => {
//       getPlacesByUser(userid)
//       const userid = firebase.auth().currentUser.uid;
//   }, [])

const { state, getComment } = useContext(Context)
  const [term, setTerm] = useState('');

  const { comments } = state
  const [Name, setName] = useState("");

  const [user, setUser] = useState();
  useEffect(() => {

    getComment("nvu0ja1q3fgay1n")


    
  }, []);
  
    const createList = () => {

    }

    
    return (
        <View>
            
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={comments}
                keyExtractor={res => res.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ShowPlaceScreen', { id: item.id })}
                        >
                            <ResultComment result={item} />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default MyComments

const styles = StyleSheet.create({})

