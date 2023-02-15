import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, {useState, useEffect} from "react";
import MapView, {Marker} from "react-native-maps";
import * as Location from 'expo-location';
import { Active, Inactive } from "../Context/Data/Server";
import PaletteStyles from "../Style/AppPalette";
import { useDispatch } from "react-redux";

const Maps = () => {
  const [mapLocation, setLocation] = useState({
      latitude: 0,
      longitude: 0, 
      latitudeDelta: 0,
      longitudeDelta: 0, 
  });

  const Dispatch = useDispatch();


  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Dispatch(Inactive({ message: 'Permission to access location was denied' }));
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude, 
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421, 
    });

    console.log(location)
  }

  useEffect(() => {
    getUserLocation()
  }, [])

  return (
    <View>
      <MapView region={mapLocation} style={styles.map} showsUserLocation  >
        <Marker coordinate={mapLocation} title='Marker' />
      </MapView>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
map: {
  width: '100%',
  height: '100%',
},
});
