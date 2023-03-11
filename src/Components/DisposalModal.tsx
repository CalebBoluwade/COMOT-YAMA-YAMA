import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal
} from "react-native";
import React from "react";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { PaletteStyles } from "../Style/AppPalette";

const DisposalModal = ({ openModal, setOpenModal }: any) => {

  const completedOnboarding = async () => {
    // await AsyncStorage.setItem("onboarded", JSON.stringify(true)).then(() => {
    //   setOpenModal(false);

    //   if (Platform.OS === "android") {
    //     showToast("Completed");
    //   } else {
    //     alert("Completed");
    //   }
    // });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={openModal}
      onRequestClose={() => setOpenModal(!openModal)}
    >
      <View
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

        <Image
          source={require("../../assets/Recycling-p.png")}
          style={styles.image}
          resizeMode="cover"
        />

        <View>
          <Text style={[PaletteStyles.lgTextBold, {color: PaletteStyles.darkMode.backgroundColor, textAlign: "center"}]}>
            GET STARTED
          </Text>
          <Text style={[PaletteStyles.smTextLight, {textAlign: "center"}]}>
            Dispose. Recycle. Earn
          </Text>
        </View>

        {/* <TouchableOpacity style={[PaletteStyles.button, styles.extraBtn]} >
          <Text style={{ color: "#fff" }}>Continue</Text>
        </TouchableOpacity> */}
      </View>
    </Modal>
  );
};

export default DisposalModal;

const styles = StyleSheet.create({
  image: {
    height: 275,
    width: "100%",
  },
  WelcomeModal: {
    width: "75%",
    maxWidth: 300,
    height: 420,
    backgroundColor: "#fff",
    position: "absolute",
    top: "20%",
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
  extraBtn: {position: "relative", top: 75, borderRadius: 21,borderTopLeftRadius: 0, borderTopRightRadius: 0, shadowOffset: {
    width: 4,
    height: -3,
  },}
});
