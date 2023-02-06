import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import PaletteStyles from "../Style/AppPalette";
import Checkbox from "expo-checkbox";

const DisposeRecycle = () => {
  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  return (
    <ScrollView style={PaletteStyles.container}>
      <Text style={[PaletteStyles.lgTextBold, PaletteStyles.darkMode]}>
        Get Started
      </Text>
      <Text style={[PaletteStyles.lgTextLight, PaletteStyles.darkMode]}>
        Dispose. Recycle
      </Text>

      <View style={styles.options}>
      <View style={styles.wasteOptions}>
        <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
          <Text>Plastic</Text>
          </View>
        </View>

        <View style={styles.wasteOptions}>
        <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
          <Text>Glass</Text>
          </View>
        </View>


        <View style={styles.wasteOptions}>
        <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
          <Text>Others</Text>
          </View>
        </View>

        </View>
    </ScrollView>
  );
};

export default DisposeRecycle;

const styles = StyleSheet.create({
  options: {
    flexDirection: "row",
  },
  wasteOptions: {
    width: PaletteStyles.Width.width * 0.3,
    borderWidth: 2,
    borderRadius: PaletteStyles.viewBox.borderRadius,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    margin: 8,
  },
});
