import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
    return (
        <View style={styles.Style} >
            <Feather
                name="search"
                style={styles.iconStyle} />
            <TextInput
                placeholder="Search"
                style={styles.inputStyle}
                value={term}
                onChangeText={onTermChange}
                autoCapitalize='none'
                autoCorrect={false}
                onEndEditing={onTermSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    Style: {
        backgroundColor: 'white',
        height: 50,
        borderRadius: 25,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 10
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    }
})


export default SearchBar