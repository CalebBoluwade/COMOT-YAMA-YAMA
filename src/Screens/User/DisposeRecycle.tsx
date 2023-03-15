import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { PaletteStyles } from "../../Style/AppPalette";
import { Icon, Tooltip } from "react-native-elements";
import Checkbox from "expo-checkbox";
import DateTimePicker, {
  DateTimePickerEvent,
  DateTimePickerAndroid,
  AndroidNativeProps,
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
import {
  GooglePlacesAutocomplete,
  Point,
} from "react-native-google-places-autocomplete";
import DisposalModal from "../../Components/DisposalModal";
import DisposalResponse from "../../Components/DisposalResponse";
import { ClearAddress, UserAddress } from "../../Context/Data/Vendor";
import { AddAddress } from "../../Context/Data/Auth";

const DisposeRecycle = ({ navigation }: any) => {
  const [mapLocation, setMapLocation] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });

  const [pickupDate, setPickupDate] = useState<number>(0);
  const [halfBag, setHalfBag] = useState(false);
  const [wasteBags, setWasteBags] = useState<number>(0);

  const [selected, setSelected] = React.useState<string[]>([]);
  const [imageDescription, setImageDescription] = useState<string | null>("");

  const [openModal, setOpenModal] = useState(true);
  const [disabledDate, setDisabledDate] = useState(true);

  const setUserAddress = (): void => {
    // if (mapLocationDesc) {
    Dispatch(
      UserAddress({
        address: mapLocation.address,
        latitude: mapLocation.latitude,
        longitude: mapLocation.longitude,
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
                  address: mapLocation.address,
                  latitude: mapLocation.latitude,
                  longitude: mapLocation.longitude,
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

    console.log(pickupDate);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.4,
    });

    if (!result.canceled) {
      setImageDescription(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const SubmitBin = () => {
    // console.log(address, wasteBags, pickupDate, selected);

    if (!mapLocation.latitude || !wasteBags || selected.length < 1) {
      Dispatch(Inactive({ message: "Fill all required fields" }));
    } else {
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
    }
  };

  return (
    <ScrollView
      // behavior={"position"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
      // enabled
      style={[
        PaletteStyles.container,
        {
          backgroundColor: PaletteStyles.darkMode.backgroundColor,
          padding: 18,
          // marginTop: 30,
          overflow: "scroll",
          marginTop: 30,
          // marginBottom: 320,
          height: "100%",
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <GoBack navigation={navigation} />

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
            Easy Disposal in no time.
          </Text>
        </View>
      </View>

      {/* <DisposalModal openModal={openModal} setOpenModal={setOpenModal} /> */}

      <View
        style={{
          marginTop: PaletteStyles.vSpacing.marginVertical + 10,
        }}
      >
        <View
          style={{
            margin: 8,
            marginBottom: 15,
            width: PaletteStyles.Width.width / 1.1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              PaletteStyles.smTextLight,
              { textAlign: "left", justifyContent: "flex-start" },
            ]}
          >
            {mapLocation?.address || "No address selected"}
          </Text>
          {/* 
          {mapLocation.address ? (
            <TouchableOpacity onPress={() => Dispatch(ClearAddress())}>
              <Icon
                name="close"
                size={25}
                color={PaletteStyles.darkMode.color}
              />
            </TouchableOpacity>
          ) : null} */}
        </View>

        <Label
          title="Address (Waste pickup location)?"
          isRequired={true}
          showRequired={true}
        />

        <GooglePlacesAutocomplete
          query={{
            key: "AIzaSyARwk8fNFtc3D-qHecQamjUBMeI0pI5itU",
            language: "en",
          }}
          styles={{
            textInput: {
              fontSize: 16,
              padding: 8,
              borderWidth: 2,
              borderColor: PaletteStyles.colorScheme1.color,
              backgroundColor: "#FFF",
              // backgroundColor: PaletteStyles.darkMode.backgroundColor,
              color: "#000",
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
            // console.log(data);
            setMapLocation({
              address: data.description,
              latitude: Number(details?.geometry.location.lat),
              longitude: Number(details?.geometry.location.lng),
            });
          }}
          enableHighAccuracyLocation
          fetchDetails={true}
          enablePoweredByContainer
          minLength={3}
          placeholder="Address"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />

        {/* <TouchableOpacity
          style={[
            PaletteStyles.button,
            { width: "90%", marginTop: 7, alignSelf: "center" },
          ]}
          onPress={setUserAddress}
        >
          <Text style={PaletteStyles.colorScheme1}>Use Current Address</Text>
        </TouchableOpacity> */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* <Icon
            name="map"
            size={21}
            reverse
            type="entypo"
            color={PaletteStyles.colorScheme1.color}
          /> */}
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={"position"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        enabled
      >
        <View
          style={{
            marginTop: PaletteStyles.vSpacing.marginVertical,
          }}
        >
          <Label
            title="Specify No. of Waste Bag(s)"
            isRequired={true}
            showRequired={true}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* <Icon
            name="shopping-bag"
            size={25}
            reverse
            type="entypo"
            color={PaletteStyles.colorScheme1.color}
          /> */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "flex-end",
                paddingLeft: 5,
                width: "90%",
              }}
            >
              <TextInput
                selectionColor={PaletteStyles.colorScheme1.color}
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                style={[
                  PaletteStyles.inputField,
                  {
                    width: "30%",
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

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={halfBag}
                  onValueChange={() => setHalfBag(!halfBag)}
                />

                <Text style={PaletteStyles.smTextLight}>Half</Text>
              </View>

              {/* <View
              style={{
                position: "relative",
                left: PaletteStyles.Width.width - 250,
              }}
            >
              <Icon
                name="info"
                size={20}
                type="material"
                color={PaletteStyles.colorScheme1.color}
              />
            </View> */}
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: PaletteStyles.vSpacing.marginVertical,
          }}
        >
          <Label
            title="Select Waste material(s)"
            isRequired={true}
            showRequired={true}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Icon
            name="cart-arrow-down"
            size={25}
            reverse
            type="font-awesome"
            color={PaletteStyles.colorScheme1.color}
          /> */}

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
                  marginTop: 8,
                }}
                dropdownStyles={{ backgroundColor: "#fff" }}
              />
            ) : (
              <Text>Fetching Waste Materials</Text>
            )}
          </View>
        </View>

        <View
          style={{
            padding: 12,
          }}
        >
          {/* <Label
          title="Select Pickup Date"
          isRequired={true}
          showRequired={true}
        />

        <TouchableOpacity
          style={PaletteStyles.button}
          onPress={() => setDisabledDate(!disabledDate)}
        >
          <Text style={PaletteStyles.smTextLight}>{"Select Date"}</Text>
          <DateTimePicker
            style={{ flex: 1 }}
            mode="date"
            display="default"
            value={new Date(pickupDate)}
            minimumDate={new Date()}
            maximumDate={new Date(2030, 10, 20)}
            onChange={setDate}
            is24Hour
            disabled={disabledDate}
          />
        </TouchableOpacity> */}
        </View>

        <View
          style={{
            padding: 12,
            // marginTop: PaletteStyles.vSpacing.marginVertical,
          }}
        >
          <Label
            title="Add Image Description"
            isRequired={false}
            showRequired={true}
          />

          <TouchableOpacity style={PaletteStyles.button} onPress={pickImage}>
            <Text
              style={
                imageDescription
                  ? PaletteStyles.colorScheme1
                  : PaletteStyles.smTextLight
              }
            >
              {imageDescription ? "Image Selected" : "Select Image"}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            padding: 12,
            // marginTop: PaletteStyles.vSpacing.marginVertical,
          }}
        >
          <Label title="Select Vendor" isRequired={true} showRequired={true} />

          <TouchableOpacity
            style={PaletteStyles.button}
            onPress={() => FetchVendors()}
          >
            <Text
              style={
                selectedVendor.id
                  ? PaletteStyles.colorScheme1
                  : PaletteStyles.smTextLight
              }
            >
              {selectedVendor.vendor.toString() || "Select Vendor"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={PaletteStyles.button}
          onPress={() => SubmitBin()}
        >
          <Text style={PaletteStyles.colorScheme1}>Submit Request</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* <DisposalResponse
        openModal={openDisposalResponse}
        setOpenModal={setDisposalResponse}
      /> */}
    </ScrollView>
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
