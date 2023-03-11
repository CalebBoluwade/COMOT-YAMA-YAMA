import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React,{ useState} from "react";
import {PaletteStyles} from "../../Style/AppPalette";
import { Icon } from "react-native-elements";
import Referral from "./Referral";

const ProfileQR = ({navigation}: any) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <View style={PaletteStyles.container}>
      <Text style={PaletteStyles.lgTextLight}>
        Let friends instantly scan your QR Code and both parties get 5% off next
        purchase
      </Text>

      <Icon
        name="qrcode-scan"
        size={200}
        type="material-community"
        // color={PaletteStyles.colorScheme1.color}
      />

<TouchableOpacity
          onPress={() =>
            navigation.navigate("Stack", {
              screen: "Referral",
            })
          }
        >
          <Text style={[PaletteStyles.mediumText, PaletteStyles.colorScheme1]}>
            GET REFERRAL CODE
          </Text>
        </TouchableOpacity>

        
        <Text style={PaletteStyles.lgTextLight}>
          Enjoy various peeks when you refer someone,
          <Text style={PaletteStyles.colorScheme1}> Learn more</Text>.
        </Text>

        <Modal
          animationType="fade"
          transparent={true}
          visible={openModal}
          onRequestClose={() => setOpenModal(!openModal)}
        >
          <TouchableOpacity onPress={() => setOpenModal(!openModal)}>
            <Text
              style={[PaletteStyles.mediumText, PaletteStyles.colorScheme1]}
            >
              GET REFERRAL CODE
            </Text>
          </TouchableOpacity>

          {openModal ? (
            <Referral openModal={openModal} setOpenModal={setOpenModal} />
          ) : null}
        </Modal>

      <TouchableOpacity>
        <Text style={[PaletteStyles.colorScheme1, PaletteStyles.lgTextBold]}>
          GENERATE QR CODE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileQR;

const styles = StyleSheet.create({});
