import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {PaletteStyles} from "../../Style/AppPalette";
import GoBack from "../../Components/GoBack";
import { FlashList } from "@shopify/flash-list";
import VendorCell from "../../Components/VendorCell";
import { VendorListData } from "../../utils/schemas/Types";
import { SelectList } from "react-native-dropdown-select-list";

const VendorList = ({ route, navigation }: any) => {
  const vendorData: VendorListData[] = route.params.data;
  const isLoading: boolean = route.params.isLoading;

  const [selected, setSelected] = useState("");

  const renderVendorList = ({
    item,
    index,
  }: {
    item: VendorListData;
    index: number;
  }) => {
    return <VendorCell item={item} index={index} />;
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

      <SelectList
        setSelected={(val: any) => setSelected(val)}
        data={vendorData.map(vendor => vendor.companyName.toLocaleUpperCase())}
        save="value"
        search={true}
        onSelect={() => alert(selected)}
        boxStyles={{
          backgroundColor: PaletteStyles.darkMode.color,
          marginTop: PaletteStyles.vSpacing.marginVertical,
          borderWidth: 2,
          borderColor: PaletteStyles.colorScheme1.color,
        }}
        dropdownStyles={{ backgroundColor: PaletteStyles.darkMode.color }}
      />

      <View style={{ padding: 12 }}>
        <FlatList
          renderItem={(item) => renderVendorList(item)}
          // estimatedItemSize={20}
          data={vendorData}
        />
      </View>
    </View>
  );
};

export default VendorList;

const styles = StyleSheet.create({});
