import React from 'react';
import { MapView, Marker } from 'react-native-maps';
import { View, StyleSheet, StatusBar, Text, Button } from 'react-native';

export default function Map({ route }) {
    const { marker, region, address, saveLocation } = route.params.item;
    return (
        <View style={styles.container}>
            <Text>{address}</Text>
            <MapView
                style={styles.map}
                region={region}>
                <Marker coordinate={marker} title={address} />
            </MapView>
            <Button title='Save location' onPress={() => saveLocation(route.params.item)}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
});