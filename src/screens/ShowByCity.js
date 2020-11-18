import React, { useContext, useState, useEffect } from 'react'
import { render } from 'react-dom';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { Value } from 'react-native-reanimated';

import { Context } from '../components/PlacesContext'

import ResultDetail from '../components/ResultDetail'

import SearchBar from "../components/SearchBar";

const ShowByCity = ({ navigation, route }) => {

    const { state, getPlacesByCity } = useContext(Context)
    const [term, setTerm] = useState('');

    const { placesToShow } = state
    const [Name, setName] = useState("");

    useEffect(() => {
        getPlacesByCity(route.params.city)
    }, [])

    const createList = () => {

    }

     
return( <View>

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
</View>);





}


export default ShowByCity

const styles = StyleSheet.create({})


