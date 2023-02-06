import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import PaletteStyles from "../Style/AppPalette";
import { Icon } from "react-native-elements";

const ProfileQR = ({navigation}: any) => {
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
