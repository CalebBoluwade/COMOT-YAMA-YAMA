import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import PaletteStyles from "../../Style/AppPalette";

const RegisterUserRouting = () => {
  return (
    <View style={[PaletteStyles.container, styles.container]}>
      <View style={PaletteStyles.vSpacing}>
        <Text style={[PaletteStyles.lgTextBold, {}]}>Clean Effective</Text>
        <Text
          style={[
            PaletteStyles.lgTextLight,
            { textAlign: "left", justifyContent: "flex-start" },
          ]}
        >
          No hidden fees. No hassle
        </Text>
      </View>

      <View>
        <Text style={[PaletteStyles.lgTextLight, {textAlign: "center"}]}>SIGN UP</Text>
        <TouchableOpacity
          style={[PaletteStyles.button, { padding: 24, width: "100%" }]}
        >
          <Text style={PaletteStyles.smMain}>USER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[PaletteStyles.button, { padding: 24, width: "100%" }]}
        >
          <Text style={PaletteStyles.smMain}>VENDOR</Text>
        </TouchableOpacity>
      </View>

      <Text
        style={[
          PaletteStyles.colorScheme1,
          { position: "absolute", bottom: 20, alignSelf: "center" },
        ]}
      >
        Terms of Use
      </Text>
    </View>
  );
};

export default RegisterUserRouting;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // maxHeight: 500,
    justifyContent: "space-evenly",
  },
});
