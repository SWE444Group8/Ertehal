import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

const CityIcon = ({ imgSrc, title, onIconPress }) => {
    return (
        <TouchableOpacity>
            <View style={styles.viewIcon}>
                <Image
                    style={styles.imageIcon}
                    source={imgSrc}
                />
                <Text style={styles.textIcon}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewIcon: {
        alignContent: 'center',
        flex: 1,
        margin: 5
    },
    imageIcon: {
        width: 100,
        height: 100
    },
    textIcon: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#085C06",
        marginVertical: 10,
        textAlign: 'center'
    }
})

export default CityIcon

