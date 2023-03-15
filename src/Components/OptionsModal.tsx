import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Linking,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { PaletteStyles } from "../Style/AppPalette";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Context/Store";
import { Icon } from "react-native-elements";
import { useUpdateBinMutation } from "../Context/API/SERVICES_API";
import { Active, Inactive } from "../Context/Data/Server";
import { CollectorStatus, CompletionStatus } from "../Utils/Schemas/Types";

const OptionsModal = ({
  openModal,
  setOpenModal,
  phoneNumber,
  actionId,
  collectorStatus,
  completionStatus
}: {
  openModal: boolean;
  setOpenModal: any;
  phoneNumber: string;
  collectorStatus: CollectorStatus | undefined;
  completionStatus: CompletionStatus | undefined;
  actionId: string | undefined;
}) => {
  const { userData, accessToken } = useSelector(
    (state: RootState) => state.UserData
  );

  const [updateBin] = useUpdateBinMutation();
  const Dispatch = useDispatch();

  const RequestBinUpdate = (action: string) => {
    updateBin({
      id: actionId,
      status: action,
      token: accessToken,
    })
      .unwrap()
      .then(({ message }) => {
        console.log(message)
        Dispatch(Active({ message: message }));
      })
      .catch(({ error, message }) => {
        console.error(error)
        Dispatch(Inactive({ message: message }))
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
            >
              <Text>POSTPONE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                PaletteStyles.button,
                styles.buttonExtra,
                { backgroundColor: "green" },
              ]}
            >
              <Text>CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                PaletteStyles.button,
                styles.buttonExtra,
                { backgroundColor: "red" },
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
                  Linking.openURL(`tel:${phoneNumber}`);
                } else {
                  Linking.openURL(`telprompt:${phoneNumber}`);
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
              onPress={() => 
                RequestBinUpdate("ACCEPTED")
              }
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
});
