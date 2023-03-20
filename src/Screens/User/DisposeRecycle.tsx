import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { PaletteStyles } from "../../Style/AppPalette";
import { Icon, Tooltip } from "react-native-elements";
import Checkbox from "expo-checkbox";
import {
  GooglePlacesAutocomplete,
  Point,
} from "react-native-google-places-autocomplete";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import Label from "../../Components/Labels";
import GoBack from "../../Components/GoBack";
import { useGetAvailableVendorsQuery } from "../../Context/API/VENDOR_API";
import { Active, Inactive } from "../../Context/Data/Server";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Context/Store";
import {
  useDisposalBinMutation,
  useFetchBinMaterialsQuery,
} from "../../Context/API/SERVICES_API";

import DisposalModal from "../../Components/DisposalModal";
import DisposalResponse from "../../Components/DisposalResponse";
import { ClearAddress, UserAddress } from "../../Context/Data/Vendor";
import { AddAddress } from "../../Context/Data/Auth";

const DisposeRecycle = ({ navigation }: any) => {
  const [mapLocation, setMapLocation] = useState({
    address: "",
    latitude: 1,
    longitude: 1,
  });

  const [pickupDate, setPickupDate] = useState<number>(0);
  const [halfBag, setHalfBag] = useState(false);
  const [wasteBags, setWasteBags] = useState<number>(0);

  const [selected, setSelected] = React.useState<string[]>([]);
  const [imageDescription, setImageDescription] = useState<string | null>("");

  const [openModal, setOpenModal] = useState(true);
  const [disabledDate, setDisabledDate] = useState(false);

  // const setUserAddress = (): void => {
  //   // if (mapLocationDesc) {
  //   Dispatch(
  //     UserAddress({
  //       address: mapLocation.address,
  //       latitude: mapLocation.latitude,
  //       longitude: mapLocation.longitude,
  //     })
  //   );

  //   if (!userData?.address) {
  //     Alert.alert(
  //       "Add address to account",
  //       "Would you like this your primary address?",
  //       [
  //         { text: "No", onPress: () => null },
  //         {
  //           text: "Yes",
  //           onPress: () => {
  //             Dispatch(
  //               AddAddress({
  //                 address: mapLocation.address,
  //                 latitude: mapLocation.latitude,
  //                 longitude: mapLocation.longitude,
  //               })
  //             );
  //             Dispatch(Active({ message: "Address added to Profile" }));
  //             navigation.goBack();
  //           },
  //         },
  //       ],
  //       {}
  //     );
  //   } else {
  //     Dispatch(Active({ message: "Address added successfully" }));
  //     navigation.goBack();
  //   }
  //   // } else {
  //   //   Dispatch(Inactive({message: "use the search bar to find address"}))
  //   // }

  //   // Dispatch(Active({ message: "Address added successfully" }));
  // };

  const { data, isLoading, isError } = useGetAvailableVendorsQuery();
  const [DisposalBin] = useDisposalBinMutation();

  const [openDisposalResponse, setDisposalResponse] = useState(false);

  const Dispatch = useDispatch();

  const { userData, accessToken } = useSelector(
    (state: RootState) => state.UserData
  );
  const { selectedVendor } = useSelector((state: RootState) => state.Vendor);

  const materialsData = useFetchBinMaterialsQuery({
    token: accessToken,
  });

  // if (!materialsData.isLoading) {
  //   console.log(materialsData.data.data)
  // }

  const FetchVendors = () => {
    if (isError) {
      Dispatch(Inactive({ message: "Unable to fetch vendors" }));
    }

    if (!isLoading) {
      navigation.navigate("Stack", {
        screen: "VendorList",
        params: { data: data, isLoading: isLoading },
      });
    }
  };

  const setDate = (event: DateTimePickerEvent) => {
    const {
      type,
      nativeEvent: { timestamp },
    } = event;

    setPickupDate(Number(timestamp));
    setDisabledDate(!disabledDate)
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });

    if (!result.canceled) {
      setImageDescription(`data:image/jpeg;base64,${result.assets[0].base64}`);
    } else (
      setImageDescription(null)
    )
  };

  const SubmitBin = () => {
    // console.log(mapLocation, wasteBags, pickupDate, selected);
    if (
      mapLocation.latitude &&
      wasteBags &&
      selected.length >= 1 &&
      pickupDate
    ) {
      DisposalBin({
        payload: {
          address: mapLocation,
            ownerId: userData._id,
            imageDescription: imageDescription ? imageDescription : null,
            phoneNumber: userData.phoneNumber,
            wasteBags: halfBag ? wasteBags + 0.5 : wasteBags,
            wasteMaterials: selected,
            vendor: selectedVendor,
            // pickupDate: Number(pickupDate),
            pickupDate: Date.now(),
          },
          token: accessToken,
        })
          .unwrap()
          .then((data) => {
            // console.log(data);
            // setDisposalResponse(true);
            Dispatch(Active({ message: "Request successful" }));
          })
          .catch((err) => {
            console.log(err);
            Dispatch(
              Inactive({
                message:
                  err?.data[0]?.message ||
                  err.data.message ||
                  "Something went wrong",
              })
            );
          });
        } else if (selected.length < 1) {
          Dispatch(Inactive({ message: "Select at least one waste material" }));
        } else if (!pickupDate) {
          Dispatch(Inactive({ message: "Select a Date" }));
        } 
        else {
      Dispatch(Inactive({ message: "Fill all required fields" }));
    }
  };

  return (
    <View
      style={[
        PaletteStyles.container,
        {
          backgroundColor: PaletteStyles.darkMode.backgroundColor,
          padding: 18,
          // marginTop: 30,
          paddingTop: 30,
          // paddingBottom: 120,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <GoBack />

        <View>
          <Text style={[PaletteStyles.lgTextBold, PaletteStyles.darkMode]}>
            NEW REQUEST
          </Text>
          <Text
            style={[
              PaletteStyles.smTextLight,
              { textAlign: "left", justifyContent: "flex-start" },
            ]}
          >
            {mapLocation?.address || "No address selected"}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: -15, marginBottom: 15 }}>
        <Label
          title="Address (Pickup location)"
          isRequired={true}
          showRequired={true}
        />

        {/* <GooglePlacesAutocomplete
          placeholder="Address"
          query={{
            key: "AIzaSyDia3qDtwTkXAyWLbJ45FR9NE4oafJE_RI",
            language: "en",
            components: "country:ng",
          }}
          styles={{
            textInput: {
              fontSize: 16,
              borderWidth: 2,
              borderColor: PaletteStyles.colorScheme1.color,
              backgroundColor: "#FFF",
              color: "#000",
            },
            textInputContainer: {
              borderColor: PaletteStyles.colorScheme1.color,
              width: "98%",
              alignSelf: "center",
            },
          }}
          onPress={(data, details = null) => {
            console.log(data, details);
            // setMapLocation({
            //   address: data.description,
            //   latitude: Number(details?.geometry.location.lat),
            //   longitude: Number(details?.geometry.location.lng),
            // });
          }}
          timeout={500}
          onFail={(error) => {
            console.error(error);
          }}
          enableHighAccuracyLocation
          fetchDetails={true}
          enablePoweredByContainer
          minLength={3}
          nearbyPlacesAPI="GooglePlacesSearch"
          // currentLocation={true}
          // currentLocationLabel='Current location'
          debounce={400}
        /> */}

        <TextInput
          selectionColor={PaletteStyles.colorScheme1.color}
          // onFocus={}
          autoCorrect={false}
          keyboardType="default"
          placeholderTextColor={"#CCC"}
          style={[
            PaletteStyles.inputField,
            {
              width: "95%",
              fontSize: 16,
              borderWidth: 2,
              borderColor: PaletteStyles.colorScheme1.color,
              backgroundColor: "#FFF",
              borderRadius: 12,
              // width: "98%",
              alignSelf: "center",
              color: "#000",
            },
          ]}
          placeholder="address"
          onChangeText={(text) =>
            setMapLocation({
              address: text,
              latitude: 1,
              longitude: 1,
            })
          }
          // onSubmitEditing={() => {
          //   setMapLocation({
          //     address: text,
          //     latitude: 0,
          //     longitude: 0,
          //   })
          // }
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Label
            title="Number of Waste Bags(max. 10)"
            isRequired={true}
            showRequired={true}
          />

          <TextInput
            selectionColor={PaletteStyles.colorScheme1.color}
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            style={[
              PaletteStyles.inputField,
              {
                width: "40%",
                borderWidth: 2,
                borderColor: PaletteStyles.colorScheme1.color,
                backgroundColor: "#FFF",
                borderRadius: 12,
              },
            ]}
            placeholder="Waste Bags"
            placeholderTextColor={"#CCC"}
            onChangeText={(text) => setWasteBags(Number(text))}
          />

            <View style={{flexDirection: "row",  alignItems: "center"}}>
          <Checkbox
            style={styles.checkbox}
            value={halfBag}
            onValueChange={() => setHalfBag(!halfBag)}
          />
            <Text style={{color: PaletteStyles.darkMode.color}}>Add Half Disposal Bag</Text>
            </View>
        </View>

        <TouchableOpacity
          style={[PaletteStyles.button, { marginVertical: 15 }]}
          onPress={() => FetchVendors()}
        >
          {selectedVendor.id ? (
            <Text
              style={
                selectedVendor.id
                  ? PaletteStyles.colorScheme1
                  : PaletteStyles.smTextLight
              }
            >
              {selectedVendor.vendor.toString()}
            </Text>
          ) : (
            <Label
              title="Select Vendor"
              isRequired={true}
              showRequired={true}
            />
          )}
        </TouchableOpacity>

        {/* <DisposalModal openModal={openModal} setOpenModal={setOpenModal} /> */}

        {/* MATERIALS */}
        <View>
          <Label
            title="Select Waste material(s)"
            isRequired={true}
            showRequired={true}
          />

          {!materialsData.isLoading ? (
            <MultipleSelectList
              setSelected={(val: any) => setSelected(val)}
              data={materialsData.data?.data}
              save="value"
              search={false}
              // onSelect={() => handleSelection(selected)}
              placeholder={
                materialsData.isLoading
                  ? "loading..."
                  : "Select Waste Materials"
              }
              label="Waste Materials"
              boxStyles={{
                backgroundColor: "#FFF",
                borderWidth: 2,
                borderColor: PaletteStyles.colorScheme1.color,
                width: PaletteStyles.Width.width / 1.1,
                marginTop: 12,
              }}
              dropdownStyles={{ backgroundColor: "#fff" }}
            />
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Fetching Waste Materials</Text>
            </View>
          )}
        </View>

        {/* DATE */}
        <View
        // style={{
        //   padding: 12,
        // }}
        >
          <Label
            title="Select Pickup Date"
            isRequired={true}
            showRequired={true}
          />

          {disabledDate ? (
            <DateTimePicker
              mode="date"
              display="default"
              value={new Date(pickupDate)}
              minimumDate={new Date()}
              maximumDate={new Date(2030, 10, 20)}
              onChange={setDate}
              is24Hour
              // disabled={disabledDate}
            />
          ) : null}
          <TouchableOpacity
            style={PaletteStyles.button}
            onPress={() => setDisabledDate(!disabledDate)}
          >
            <Text style={PaletteStyles.smTextLight}>
              {pickupDate
                ? new Date(pickupDate).toUTCString()
                : "Select a Date"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* <DisposalResponse
          openModal={openDisposalResponse}
          setOpenModal={setDisposalResponse}
        /> */}

        <View>
          <TouchableOpacity style={[PaletteStyles.button]} onPress={pickImage}>
            {imageDescription ? (
              <Text
                style={
                  selectedVendor.id
                    ? PaletteStyles.colorScheme1
                    : PaletteStyles.smTextLight
                }
              >
                Image Selected
              </Text>
            ) : (
              <Label title="Add Image" isRequired={false} showRequired={true} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            PaletteStyles.button,
            // { position: "absolute", bottom: 0, left: 0, right: 0 },
          ]}
          onPress={() => SubmitBin()}
        >
          <Text style={PaletteStyles.colorScheme1}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DisposeRecycle;

const styles = StyleSheet.create({
  options: {
    flexDirection: "row",
  },
  wasteOptions: {
    width: PaletteStyles.Width.width * 0.3,
    borderWidth: 2,
    borderRadius: PaletteStyles.viewBox.borderRadius,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
});
