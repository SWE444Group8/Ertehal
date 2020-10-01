import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const MapScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center', fontSize: 26 }}>Map Will be Here Soon..</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 10,
    },
})

export default MapScreen

