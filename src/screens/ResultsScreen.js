import React, { useContext, useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native'

import { Context } from '../components/PlacesContext'

import ResultDetail from '../components/ResultDetail'

import SearchBar from "../components/SearchBar";

const ResultsScreen = ({ navigation, route }) => {

    const { state, getPlacesByName } = useContext(Context)

    const { placesToShow } = state
    
    
    useEffect(  () => {
        getPlacesByName(route.params.name)
    }, [])

    //const [Name, setName] = useState("");

    const createList = (

    ) => { 

    }


 

    //if (placesToShow.length==0){
       // Alert.alert("no mathcing results");
     //}



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



export default ResultsScreen

const styles = StyleSheet.create({})

