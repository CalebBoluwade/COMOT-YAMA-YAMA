import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import PaletteStyles from "../../Style/AppPalette";

const RegisterUser = () => {
  return (
    <View style={PaletteStyles.container}>
      <Text>Register</Text>

      <TouchableOpacity>
        <Text style={[PaletteStyles.colorScheme1, PaletteStyles.lgTextBold]}>
          SCAN CODE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterUser;

const styles = StyleSheet.create({});
