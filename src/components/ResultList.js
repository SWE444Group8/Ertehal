import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
// import { withNavigation } from 'react-navigation'
import Hr from "../components/Hr";
import SearchBar from "../components/SearchBar";

import ResultDetail from './ResultDetail'

const ResultList = ({ title, results, navigate }) => {

    if (!results.length) return null


    return (
        <View>
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            
            <FlatList
            
                horizontal
               // numColumns={2}
                showsHorizontalScrollIndicator={false}
                data={results}
                keyExtractor={result => result.id}
                renderItem={({ item }) => {
                    return (
                        
                        <TouchableOpacity
                            onPress={() => navigate('ShowPlace', { id: item.id })}
                        >
                            <ResultDetail result={item} />
                        </TouchableOpacity>
                    )
                }}
            />
            <Hr />
           
        </View>
        </View>

    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 100,
        fontWeight: 'bold',
        color: "#085C06",
        marginLeft: 15,
        marginVertical: 10,
    },
    container: {
        marginBottom: 10
    }
})


export default ResultList