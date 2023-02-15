import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PaletteStyles from "../../Style/AppPalette";
import GoBack from "../../Components/GoBack";
import { FlashList } from "@shopify/flash-list";
import VendorCell from "../../Components/VendorCell";

const VendorList = ({ navigation }: any) => {
  const DATA = [
    {
      title: "First Item",
    },
    {
      title: "Second Item",
    },
  ];

  const renderVendorList = ({ item }: any) => {
    return <VendorCell item={item} />;
  };

  return (
    <View style={[PaletteStyles.darkMode, PaletteStyles.container]}>
      <View
        style={{
          flexDirection: "row",
          padding: PaletteStyles.vSpacing.marginVertical,
        }}
      >
        <GoBack navigation={navigation} />

        <View>
          <Text style={PaletteStyles.lgTextBold}>Vendors</Text>
          <Text style={PaletteStyles.lgTextLight}>List of available PSPs</Text>
        </View>
      </View>


      <FlashList
        renderItem={({ item }: any) => renderVendorList(item)}
        estimatedItemSize={5}
        data={DATA}
      />
    </View>
  );
};

export default VendorList;

const styles = StyleSheet.create({});
