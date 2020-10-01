import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import MapView, { Circle } from 'react-native-maps'
import * as Location from 'expo-location';


const Map = ({ onPressLocation }) => {

    const [coordinate, setCoordinate] = useState({
    })
    const [isMapClicked, setIsMapClicked] = useState(false)
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setLocation({
                    accuracy: 15.031999588012695,
                    altitude: 635,
                    heading: 0,
                    latitude: 24.8008837,
                    longitude: 48.7139143,
                    speed: 0,
                });
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();
    }, []);

    return (
        <View style={styles.MapView}>
            {!location ? <ActivityIndicator size='large' /> : (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        ...location,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }}
                    onPress={e => {
                        setCoordinate(e.nativeEvent.coordinate)
                        onPressLocation(e.nativeEvent.coordinate)
                        setIsMapClicked(true)
                    }}
                >
                    {isMapClicked && <Circle
                        center={coordinate}
                        radius={30}
                        strokeColor='#085C06'
                        fillColor='#085C06'
                    />}
                </MapView>
            )}
        </View>
    )
}



const styles = StyleSheet.create({
    map: {
        height: 300,
    },
    MapView: {
        borderColor: '#085C06',
        borderWidth: 1
    },

})


export default Map
