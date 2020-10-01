import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'

const ResultDetail = ({ result }) => {

    const [imgUrl, setImgUrl] = useState('')
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        getImage()
    }, [])

    const getImage = async () => {
        const ref = firebase.storage().ref(result.thumb)
        const res = await ref.getDownloadURL()
        setImgUrl(res)
        setIsLoading(false)
    }

    if (isLoading) return (
        <ActivityIndicator style={styles.loading} size='large' />
    )

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: imgUrl }} />
            <Text style={styles.name} >{result.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 15
    },
    loading: {
        margin: 60
    },
    image: {
        width: 200,
        height: 120,
        borderRadius: 4,
        marginBottom: 5,
        resizeMode: 'cover'
    },
    name: {
        fontSize: 20,
        color: "#085C06",
    }
})


export default ResultDetail
