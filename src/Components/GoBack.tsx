import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import {PaletteStyles} from "../Style/AppPalette";
import { useNavigation } from "@react-navigation/native";

const GoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ alignSelf: "flex-start", marginRight: 8 }}
      onPress={() => navigation.goBack()}
    >
      <Icon
        name="chevron-back"
        size={20}
        reverse
        type="ionicon"
        color={PaletteStyles.colorScheme1.color}
      />
    </TouchableOpacity>
  );
};

export default GoBack;

const styles = StyleSheet.create({});
