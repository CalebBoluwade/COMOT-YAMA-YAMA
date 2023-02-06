import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Context/Store";
import React, { useState } from "react";
import PaletteStyles from "../Style/AppPalette";
import Referral from "./Referral";
import { Icon } from "react-native-elements";

const Profile = ({ navigation }: any) => {
  const { userData } = useSelector((state: RootState) => state.UserData);
  const [openModal, setOpenModal] = useState(false);

  return (
    <View style={PaletteStyles.container}>
      <View>
      <TouchableOpacity onPress={() => navigation.navigate("Stack", {
          screen: "ProfileQR"
        })}>
        <Icon
          name="qrcode-scan"
          size={20}
          type="material-community"
          // color={PaletteStyles.colorScheme1.color}
        />
        </TouchableOpacity>

        <View style={PaletteStyles.viewBox}>
        <Text style={[PaletteStyles.mediumText, PaletteStyles.colorScheme1]}>Add address</Text>
        </View>

        <TouchableOpacity style={PaletteStyles.button}>
        <Text>Account Info</Text>
        </TouchableOpacity>

        <TouchableOpacity style={PaletteStyles.button}>
        <Text>Bank Details</Text>
        </TouchableOpacity>

        <Text style={PaletteStyles.lgTextLight}>
          Enjoy various peeks when you refer someone,
        <Text style={PaletteStyles.colorScheme1}> Learn more</Text>.
        </Text>

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
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
