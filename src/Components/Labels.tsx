import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PaletteStyles from "../Style/AppPalette";

const Label = ({
  title,
  isRequired,
  showRequired,
}: {
  title: string;
  isRequired: boolean;
  showRequired: boolean;
}) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", margin: 5 }}>
      <Text style={PaletteStyles.smTextLight}>{title}</Text>

      {showRequired ? (
        <View
          style={{
            backgroundColor: PaletteStyles.bgColorScheme1.backgroundColor,
            borderRadius: PaletteStyles.border.borderRadius,
            padding: 8,
            marginLeft: 8,
          }}
        >
          <Text style={{ color: PaletteStyles.colorScheme1.color }}>
            {isRequired ? "Required" : "Optional"}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({});
