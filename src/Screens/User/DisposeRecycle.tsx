import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
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
import { ClearAddress } from "../../Context/Data/Vendor";
import { AddAddress } from "../../Context/Data/Auth";

const DisposeRecycle = ({ navigation }: any) => {
  const [mapLocation, setLocation] = useState<Point>();
  const [mapLocationDesc, setLocationDesc] = useState<string>("");

  const [address, setAddress] = useState("");
  const [pickupDate, setPickupDate] = useState<number>(0);
  const [halfBag, setHalfBag] = useState(false);
  const [wasteBags, setWasteBags] = useState<number>(0);

  const [selected, setSelected] = React.useState<string[]>([]);
  const [imageDescription, setImageDescription] = useState<string | null>("");

  const [openModal, setOpenModal] = useState(true);
  const [disabledDate, setDisabledDate] = useState(true);

  const { data, isLoading, isError } = useGetAvailableVendorsQuery();
  const [DisposalBin] = useDisposalBinMutation();

  const [openDisposalResponse, setDisposalResponse] = useState(false);

  const Dispatch = useDispatch();

  const { userData, accessToken } = useSelector(
    (state: RootState) => state.UserData
  );
  const { selectedVendor, location } = useSelector(
    (state: RootState) => state.Vendor
  );

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

    if (!location.latitude || !wasteBags || selected.length < 1) {
      Dispatch(Inactive({ message: "Fill all required fields" }));
    } else {
      DisposalBin({
        address: address,
        ownerId: userData._id,
        imageDescription: imageDescription ? imageDescription : null,
        phoneNumber: userData.phoneNumber,
        wasteBags: halfBag ? wasteBags + 0.5 : wasteBags,
        wasteMaterials: selected,
        vendor: selectedVendor,
        // pickupDate: Number(pickupDate),
        pickupDate: Date.now(),
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
      showsVerticalScrollIndicator={false}
      style={[
        PaletteStyles.container,
        {
          backgroundColor: PaletteStyles.darkMode.backgroundColor,
          padding: 18,
          // marginTop: 30,
          paddingTop: 30,
          paddingBottom: 120,
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
        <Label
          title="Address (Waste pickup location)?"
          isRequired={true}
          showRequired={true}
        />

        <GooglePlacesAutocomplete
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
            Dispatch(
              AddAddress({
                address: data.description,
                latitude: details?.geometry.location.lat,
                longitude: details?.geometry.location.lng,
              })
            );
            Dispatch(Active({ message: "Address added to Profile" }));
          }}
          enableHighAccuracyLocation
          fetchDetails={true}
          enablePoweredByContainer
          minLength={3}
          placeholder="Address"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />

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

          {location.latitude ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
                width: PaletteStyles.Width.width / 1.1,
              }}
            >
              <Text
                style={[
                  PaletteStyles.smTextLight,
                  PaletteStyles.colorScheme1,
                  { marginLeft: 12 },
                ]}
              >
                LOCATION ADDED
              </Text>

              <TouchableOpacity onPress={() => Dispatch(ClearAddress())}>
                <Icon
                  name="close"
                  size={25}
                  color={PaletteStyles.darkMode.color}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate("UserLocation")}
            >
              <Text
                style={[
                  PaletteStyles.smTextLight,
                  PaletteStyles.colorScheme1,
                  { marginLeft: 12 },
                ]}
              >
                FIND LOCATION
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

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
              style={[
                PaletteStyles.inputField,
                {
                  width: "30%",
                  backgroundColor: PaletteStyles.darkMode.color,
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
                backgroundColor: PaletteStyles.darkMode.color,
                borderWidth: 2,
                borderColor: PaletteStyles.colorScheme1.color,
                width: PaletteStyles.Width.width / 1.1,
                marginTop: 8
              }}
              dropdownStyles={{ backgroundColor: PaletteStyles.darkMode.color }}
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
