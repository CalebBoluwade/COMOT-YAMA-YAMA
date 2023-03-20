import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Linking,
  Platform,
  Image,
  Alert
} from "react-native";
import React, { useState } from "react";
import { PaletteStyles } from "../Style/AppPalette";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Context/Store";
import { Icon } from "react-native-elements";
import { useUpdateBinMutation } from "../Context/API/SERVICES_API";
import { Active, Inactive } from "../Context/Data/Server";
import {
  CollectorStatus,
  CompletionStatus,
  WasteBinData,
} from "../Utils/Schemas/Types";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Label from "./Labels";

const OptionsModal = ({
  openModal,
  setOpenModal,
  activity,
}: {
  openModal: boolean;
  setOpenModal: any;
  activity: WasteBinData;
}) => {
  const { userData, accessToken } = useSelector(
    (state: RootState) => state.UserData
  );
  const [disabledDate, setDisabledDate] = useState(false);
  const [pickupDate, setPickupDate] = useState<number>(0);

  const setDate = (event: DateTimePickerEvent) => {
    const {
      type,
      nativeEvent: { timestamp },
    } = event;

    setPickupDate(Number(timestamp));
    Alert.alert(
      "Postpone",
      "Are you sure you want to postpone? action cannot be reversed.",
      [
        { text: "No", onPress: () => null },
        { text: "Yes", onPress: () => RequestBinUpdate("POSTPONED")},
      ],
      {}
    );
    RequestBinUpdate("POSTPONED")
    setDisabledDate(!disabledDate);
  };

  const navigation = useNavigation();

  const [updateBin] = useUpdateBinMutation();
  const Dispatch = useDispatch();

  const RequestBinUpdate = (action: string) => {
    updateBin({
      id: activity?._id,
      status: action,
      date: pickupDate,
      owner: activity.ownerId,
      token: accessToken,
    })
      .unwrap()
      .then((data) => {
        navigation.goBack();
        Dispatch(Active({ message: data?.message }));
      })
      .catch((error) => {
        Dispatch(Inactive({ message: error.message }));
      });
  };

  return (
    <Modal
      animationType="fade"
      // transparent={true}
      visible={openModal}
      onRequestClose={() => setOpenModal(!openModal)}
      //   presentationStyle="formSheet"
      style={styles.Modal}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 15,
          top: 16,
        }}
        onPress={() => setOpenModal(!openModal)}
      >
        <Text style={{ fontSize: 18, color: "#ccc" }}>Cancel</Text>
      </TouchableOpacity>

      <View style={styles.imgBkgd}>
        <Image
          source={require("../../assets/shake.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 5,
          alignContent: "center",
          alignSelf: "center",
        }}
      >
        {userData.userType === "USER" ? (
          <>
            {/* PROVIDE DATE AND REASON FOR POSTPONING */}
            <TouchableOpacity
              style={[
                PaletteStyles.button,
                styles.buttonExtra,
                { backgroundColor: "green" },
              ]}
              onPress={() =>
                setDisabledDate(!disabledDate)}
            
            >
              <Text>POSTPONE</Text>
            </TouchableOpacity>

            {/* DATE */}
            <View>
              {disabledDate ? (
                <View>
                  <Label
                    title="Select New Pickup Date"
                    isRequired={true}
                    showRequired={true}
                  />

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
              ) : null}
            </View>

            <TouchableOpacity
              style={[
                PaletteStyles.button,
                styles.buttonExtra,
                { backgroundColor: "red" },
              ]}
              onPress={() => RequestBinUpdate("CANCELED")}
            >
              <Text>CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                PaletteStyles.button,
                styles.buttonExtra,
                { backgroundColor: "#ff7f00" },
              ]}
            >
              <Text>RATE</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                if (Platform.OS === "android") {
                  Linking.openURL(`tel:${activity?.phoneNumber}`);
                } else {
                  Linking.openURL(`telprompt:${activity?.phoneNumber}`);
                }
              }}
              style={[
                PaletteStyles.button,
                styles.buttonExtra,
                {
                  flexDirection: "row",
                  borderWidth: 1,
                  // padding: 10,
                  // borderRadius: 10,
                  // height: 50,
                },
              ]}
            >
              <Icon
                name="phone-call"
                type="feather"
                size={25}
                color={PaletteStyles.darkMode.backgroundColor}
              />
              <Text style={{ color: PaletteStyles.darkMode.backgroundColor }}>
                Call Customer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                PaletteStyles.button,
                styles.buttonExtra,
                { backgroundColor: "yellow" },
              ]}
              onPress={() => RequestBinUpdate("INITIATED")}
            >
              <Text>START PICKUP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                PaletteStyles.button,
                styles.buttonExtra,
                { backgroundColor: "green" },
              ]}
              onPress={() => RequestBinUpdate("ACCEPTED")}
            >
              <Text>ACCEPT</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                PaletteStyles.button,
                styles.buttonExtra,
                { backgroundColor: "red" },
              ]}
              onPress={() => RequestBinUpdate("DECLINED")}
            >
              <Text>DECLINE</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  );
};

export default OptionsModal;

const styles = StyleSheet.create({
  Modal: {
    width: "75%",
    maxHeight: 300,
    height: 420,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: "20%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 21,
    elevation: 3,
    shadowColor: "#000",
    shadowRadius: 32,
    shadowOffset: {
      width: 4,
      height: 3,
    },
  },
  buttonExtra: {
    width: PaletteStyles.Width.width / 1.1,
    alignItems: "center",
  },
  image: {
    width: 285,
    height: 285,
    marginTop: 25,
    marginRight: 25,
  },
  imgBkgd: {
    // backgroundColor: darkMode ? "#FFF" : "#000",
    backgroundColor: "#FFF",
    borderRadius: 300,
    width: 200,
    aspectRatio: 1,
    overflow: "hidden",
    alignSelf: "center",
    // padding: 25
    alignItems: "center",
  },
});
