import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ActivityIndicator ,} from 'react-native'
import * as firebase from 'firebase'
import Hr from "../components/Hr";


const ResultDetail = ({ result }) => {

    const [imgUrl, setImgUrl] = useState('')
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        getImage()
        console.log(result)
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
        <View>
        <View style={styles.container}>
            
            <Image
                style={styles.image}
                source={{ uri: imgUrl }} 
                />
            <Text style={styles.name} numberOfLines={8} >{result.name} {'\n'}   
            <Text style={styles.description} numberOfLines={2}>{result.description}</Text>
             </Text>
        </View>

        <Hr />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
        flexDirection:'row',
        flex:1
    },
    loading: {
        margin: 60
    },
    image: {
        width: 200,
        height: 150,
        borderRadius: 4,
        marginBottom: 10,
        marginTop:10,
        resizeMode: 'cover',
    },
    name: {
        fontSize: 20,
        color: "#085C06",
        marginLeft:10,
        marginTop:20
        
    },
    description:{
        fontSize: 12,
        color: "#085C06",
        textAlign:'left'
        

    }
})


export default ResultDetail
