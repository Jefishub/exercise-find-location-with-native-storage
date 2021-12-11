import React, { useState } from 'react';
import { StyleSheet, StatusBar, View, TextInput, FlatList, Dimensions, Alert} from 'react-native';
import { Button, ListItem, CheckBox } from 'react-native-elements';
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'

const API_URL = "http://www.mapquestapi.com/geocoding/v1/address";
const API_KEY = "nk4AOXVkJGl4bHJ7ycsAQdTN2JRd4YW1";
const INITIAL_REGION = { latitude: 60.200692, longitude: 24.934302, latitudeDelta: 0.003, longitudeDelta: 0.002, };
const INITIAL_MARKER = { latitude: 60.200692, longitude: 24.934302 }
const INITIAL_ADDRESS = "Helsinki"

export default function FindAddress({ navigation }) {
  const [locationAddress, setLocationAddress] = useState(INITIAL_ADDRESS);
  const [locations, setLocations] = useState([{
    marker: INITIAL_MARKER,
    region: INITIAL_REGION,
    address: INITIAL_ADDRESS,
    id: uuid(),
    saveLocation: saveLocation
  }]);

  const fetchData = () => {
    fetch(API_URL + "?key=" + API_KEY + "&location=" + locationAddress, { method: 'GET' })
      .then(res => res.json())
      .then((resJson) => {
        const newLocation = {
          marker: {
            latitude: resJson.results[0].locations[0].latLng.lat,
            longitude: resJson.results[0].locations[0].latLng.lng
          },
          region: {
            latitude: resJson.results[0].locations[0].latLng.lat,
            longitude: resJson.results[0].locations[0].latLng.lng,
            latitudeDelta: 0.003,
            longitudeDelta: 0.002,
          },
          address: locationAddress,
          id: uuid(),
          saveLocation: saveLocation
        }
        showLocation(newLocation);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const showLocation = (item) => {
    navigation.navigate('Map', { item })
  }

  const saveLocation = (location) => {
    const newList = locations.concat(location);
    setLocations(newList);
    alert('Location saved');
  }

  const deleteLocation = (id) => {
    var newItems = locations.filter((item) => item.id !== id);
    setLocations(newItems);
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setLocationAddress}
        value={locationAddress}
      />
      <Button
        onPress={fetchData}
        title="Show location"
      />
      <FlatList
        renderItem={({ item }) =>
          <View style={styles.listcontainer} >
            <View onStartShouldSetResponder={
              (item) => showLocation(item)
            }>
              <ListItem bottomDivider>
                <ListItem.Content style={{ backgroundColor: "#eee", height: 50 }}>
                  <ListItem.Title>
                    {item.address}
                  </ListItem.Title>
                </ListItem.Content>
                <CheckBox
                  iconType='material'
                  checkedIcon='clear'
                  checkedColor='red'
                  checked="true"
                  onPress={() => deleteLocation(item.id)}
                />
              </ListItem>
            </View>
          </View>}
        data={locations}
      />
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
  listcontainer: {
    backgroundColor: "black",
    width: Dimensions.get('window').width,
    height: 90,
    flexDirection: 'column',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});