import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import React from "react";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import { PaletteStyles } from "../Style/AppPalette";
import Label from "./Labels";
import { AddAddress } from "../Context/Data/Auth";
import { useDispatch } from "react-redux";

const DisposalModal = ({ openModal, setOpenModal }: any) => {
  const Dispatch = useDispatch();
  // const completedOnboarding = async () => {
  //   // await AsyncStorage.setItem("onboarded", JSON.stringify(true)).then(() => {
  //   //   setOpenModal(false);

  //   //   if (Platform.OS === "android") {
  //   //     showToast("Completed");
  //   //   } else {
  //   //     alert("Completed");
  //   //   }
  //   // });
  // };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={openModal}
      onRequestClose={() => setOpenModal(!openModal)}
    >
      <KeyboardAvoidingView
        style={styles.WelcomeModal}
        //   onPress={() => setOpenModal(!openModal)}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 15,
            top: 16,
          }}
          onPress={() => setOpenModal(!openModal)}
        >
          {/* <EvilIcons name="close" size={40} color="#ccc" /> */}
          <Text style={{ fontSize: 18, color: "#ccc" }}>Skip</Text>
        </TouchableOpacity>
        {/* <View style={customStyles.modalLine} /> */}
        <View>
          <Text
            style={[
              PaletteStyles.lgTextBold,
              {
                color: PaletteStyles.darkMode.backgroundColor,
                textAlign: "center",
              },
            ]}
          >
            GET STARTED
          </Text>
          <Text style={[PaletteStyles.smTextLight, { textAlign: "center" }]}>
            Dispose. Recycle. Earn
          </Text>
        </View>

        <Image
          source={require("../../assets/Recycling-p.png")}
          style={styles.image}
          resizeMode="contain"
          resizeMethod="auto"
        />

        {/* <TouchableOpacity style={[PaletteStyles.button, styles.extraBtn]} >
          <Text style={{ color: "#fff" }}>Continue</Text>
        </TouchableOpacity> */}
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default DisposalModal;

const styles = StyleSheet.create({
  image: {
    height: 245,
    width: "100%",
    alignItems: "center",
    marginTop: 25
  },
  WelcomeModal: {
    width: "95%",
    maxWidth: 300,
    height: 420,
    backgroundColor: "#fff",
    position: "absolute",
    top: "20%",
    padding: 15,
    // alignItems: "center",
    // justifyContent: "center",
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
  extraBtn: {
    position: "relative",
    top: 75,
    borderRadius: 21,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    shadowOffset: {
      width: 4,
      height: -3,
    },
  },
});
