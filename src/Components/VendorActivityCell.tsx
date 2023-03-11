import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { wasteBinData } from "../utils/schemas/Types";
import {PaletteStyles} from "../Style/AppPalette";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { SelectedVendor } from "../Context/Data/Vendor";
import { RootState } from "../Context/Store";

const VActivity = ({
  item,
  index,
  navigation,
}: {
  item: wasteBinData;
  index: number;
  navigation: any
}) => {
  const Dispatch = useDispatch();
  const { selectedVendor } = useSelector((state: RootState) => state.Vendor);

  const selectVendor = ({ id, vendor }: { id: string; vendor: string }) => {
    Alert.alert(
      "Select Vendor",
      `You're about to select ${vendor.toLocaleUpperCase()} to fulfil this request. Confirm?`,
      [
        { text: "No", onPress: () => null },
        {
          text: "Yes",
          onPress: () =>
            Dispatch(SelectedVendor({ id: id, vendor: vendor.toUpperCase() })),
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      key={index}
      style={[
        PaletteStyles.viewBox,
        {
          backgroundColor: "#fff",
          padding: PaletteStyles.vSpacing.marginVertical,
        },
      ]}
      onPress={() => navigation.navigate("ActivityDetails",
        {
          screen: "ActivityDetails",
          params: item
        })}
      // selectVendor({ id: item?._id, vendor: item?.companyName })
    >
      <Text
        style={[
          PaletteStyles.lgTextBold,
          { color: PaletteStyles.darkMode.backgroundColor },
        ]}
      >
        {item?.address.toLocaleUpperCase()}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "space-around",
          marginVertical: 4,
        }}
      >
        <Icon
          name="office-building-marker"
          size={25}
          type="material-community"
          color={PaletteStyles.colorScheme1.color}
          style={{ marginRight: 10 }}
        />
        <Text
          style={{
            color: PaletteStyles.darkMode.backgroundColor,
            width: "80%",
          }}
        >
          {item?.address}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 4,
        }}
      >
        <Icon
          name="email"
          size={25}
          type="material"
          color={PaletteStyles.colorScheme1.color}
          style={{ marginRight: 10 }}
        />
        <Text
          style={{
            color: PaletteStyles.darkMode.backgroundColor,
            width: "80%",
          }}
        >
          {item?.email}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 4,
        }}
      >
        <Icon
          name="phone"
          size={25}
          type="material"
          color={PaletteStyles.colorScheme1.color}
          style={{ marginRight: 10 }}
        />
        <Text style={{ color: PaletteStyles.darkMode.backgroundColor }}>
          {item?.phoneNumber}
        </Text>
      </View>

      <Text>{item.CompletionStatus}</Text>
    </TouchableOpacity>
  );
};

export default VActivity;

const styles = StyleSheet.create({});
