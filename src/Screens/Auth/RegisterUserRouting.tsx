import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import PaletteStyles from "../../Style/AppPalette";

const RegisterUserRouting = ({ navigation }: any) => {
  return (
    <View style={[PaletteStyles.container, styles.container]}>
      {/* <View style={PaletteStyles.vSpacing}>
        <Text style={[PaletteStyles.lgTextBold, {}]}>Clean Effective</Text>
        <Text
          style={[
            PaletteStyles.lgTextLight,
            { textAlign: "left", justifyContent: "flex-start" },
          ]}
        >
          No hidden fees. No hassle
        </Text>
      </View> */}
        <Text style={[PaletteStyles.lgTextBold, { textAlign: "center", marginBottom: 40 }]}>
          REGISTER
        </Text>

      <View style={styles.imgBkgd}>
        <Image
          source={require("../../../assets/shake.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <Text style={[PaletteStyles.lgTextBold, { marginTop: 10 }]}>
        SELECT ACCOUNT TYPE
      </Text>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[PaletteStyles.button, { padding: 24, width: "40%" }]}
          onPress={() => navigation.navigate("RegisterUser")}
        >
          <Text style={[PaletteStyles.smMain, {color: PaletteStyles.colorScheme1.color}]}>USER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[PaletteStyles.button, { padding: 24, width: "40%" }]}
        >
          <Text style={[PaletteStyles.smMain, {color: PaletteStyles.colorScheme1.color}]}>VENDOR</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={{ position: "absolute", bottom: 20, alignSelf: "center" }}>
        <Text
          style={[
            PaletteStyles.colorScheme1,
            { position: "absolute", bottom: 20, alignSelf: "center" },
          ]}
        >
          Terms of Use
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterUserRouting;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 21,
    backgroundColor: PaletteStyles.darkMode.backgroundColor,
  },
  buttons: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 65,
    justifyContent: "space-evenly",
  },
  image: {
    width: 265,
    height: 265,
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
    // padding: 25
  },
});
