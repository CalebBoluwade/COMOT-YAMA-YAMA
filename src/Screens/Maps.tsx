import {
  StyleSheet,
  View,
  Text,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState, useLayoutEffect, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Active, Inactive } from "../Context/Data/Server";
import { PaletteStyles } from "../Style/AppPalette";
import { useDispatch, useSelector } from "react-redux";
// import { Icon } from "react-native-elements";
import GoBack from "../Components/GoBack";
import { RootState } from "../Context/Store";
// import Env from "../Config/env";
import {
  GooglePlacesAutocomplete,
  Point,
} from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { UserAddress } from "../Context/Data/Vendor";
import { AddAddress } from "../Context/Data/Auth";

const Maps = () => {
  const navigation = useNavigation();
  const { userData } = useSelector((state: RootState) => state.UserData);
  const mapRef = useRef<any>(null);
  const [mapLocale, setLocale] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.0421,
  });

  const [mapLocation, setLocation] = useState<Point>();
  const [mapLocationDesc, setLocationDesc] = useState<string>("");

  const Dispatch = useDispatch();

  const setUserAddress = (): void => {
    // if (mapLocationDesc) {
    Dispatch(
      UserAddress({
        address: mapLocationDesc,
        latitude: mapLocation?.lat || mapLocale?.latitude,
        longitude: mapLocation?.lng || mapLocale?.longitude,
      })
    );

    if (!userData?.address) {
      Alert.alert(
        "Add address to account",
        "Would you like this your primary address?",
        [
          { text: "No", onPress: () => null },
          {
            text: "Yes",
            onPress: () => {
              Dispatch(
                AddAddress({
                  address: mapLocationDesc,
                  latitude: mapLocation?.lat || mapLocale.latitude,
                  longitude: mapLocation?.lng || mapLocale.longitude,
                })
              );
              Dispatch(Active({ message: "Address added to Profile" }));
              navigation.goBack();
            },
          },
        ],
        {}
      );
    } else {
      Dispatch(Active({ message: "Address added successfully" }));
      navigation.goBack();
    }
    // } else {
    //   Dispatch(Inactive({message: "use the search bar to find address"}))
    // }

    // Dispatch(Active({ message: "Address added successfully" }));
  };

  const getUserLocation = async () => {
    let location = await Location.getCurrentPositionAsync();

    setLocale({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.0421,
    });
  };

  useLayoutEffect(() => {
    // mapRef.current?.fitToSuppliedMarkers(["origin", "destination"]);
    getUserLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        region={mapLocale}
        // initialRegion={mapLocale}
        provider={PROVIDER_GOOGLE}
        mapType="mutedStandard"
        style={styles.map}
        showsUserLocation
      >
        <Marker
          coordinate={{
            latitude: mapLocation?.lat || mapLocale.latitude,
            longitude: mapLocation?.lng || mapLocale.longitude,
          }}
          title="Address"
          description={mapLocationDesc || ""}
          identifier="origin"
        />
      </MapView>

      <View style={styles.address}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <GoBack navigation={navigation} />

          <View style={{ width: "85%" }}>
            <Text style={[PaletteStyles.smTextBold, { margin: 8 }]}>
              ADDRESS
            </Text>
            <Text
              style={[
                PaletteStyles.smTextLight,
                { textAlign: "left", justifyContent: "flex-start" },
              ]}
            >
              {mapLocationDesc || "No address selected"}
            </Text>
          </View>
        </View>

        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        > */}
        {/* <GooglePlacesAutocomplete
            query={{
              key: "AIzaSyDia3qDtwTkXAyWLbJ45FR9NE4oafJE_RI",
              language: "en",
            }}
            styles={{
              textInput: {
                fontSize: 18,
                backgroundColor: PaletteStyles.darkMode.color,
                color: PaletteStyles.darkMode.backgroundColor,
                textAlign: "left",
              },
              textInputContainer: {
                marginVertical: 8,
                borderColor: PaletteStyles.colorScheme1.color,
                // borderBottomColor: PaletteStyles.colorScheme1.color,
                width: "95%",
                alignSelf: "center",
              },
            }}
            onPress={(data, details = null) => {
              // console.log(data, details)
              setLocation(details?.geometry.location);
              setLocationDesc(data.description);
            }}
            enableHighAccuracyLocation
            fetchDetails={true}
            enablePoweredByContainer
            minLength={3}
            placeholder="Address"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          /> */}
        {/* </View> */}

        <TouchableOpacity
          style={[
            PaletteStyles.button,
            { width: "90%", marginTop: 7, alignSelf: "center" },
          ]}
          onPress={setUserAddress}
        >
          <Text style={PaletteStyles.colorScheme1}>Use Current Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
    // height: "65%",
  },
  address: {
    width: "94%",
    alignSelf: "center",
    padding: PaletteStyles.vSpacing.marginVertical,
    backgroundColor: PaletteStyles.darkMode.backgroundColor,
    borderRadius: 25,
    position: "absolute",
    top: Platform.OS === "android" ? 50 : 21,
  },
});
