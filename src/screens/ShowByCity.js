import React, { useContext, useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'

import { Context } from '../components/PlacesContext'

import ResultDetail from '../components/ResultDetail'



const ShowByCity = ({ navigation, route }) => {

    const { state, getPlacesByCity } = useContext(Context)

    const { placesToShow } = state

    useEffect(() => {
        getPlacesByCity(route.params.city)
    }, [])

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

export default ShowByCity

const styles = StyleSheet.create({})
