import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { VendorListData } from "../../utils/schemas/Types";
import { PaletteStyles } from "../../Style/AppPalette";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { SelectedVendor } from "../../Context/Data/Vendor";
import { RootState } from "../../Context/Store";
import { useNavigation } from "@react-navigation/native";

const VendorCell = ({
  item,
  index,
}: {
  item: VendorListData;
  index: number;
}) => {
  const navigation = useNavigation();
  const Dispatch = useDispatch();
  const { selectedVendor } = useSelector((state: RootState) => state.Vendor);

  const selectVendor = ({
    id,
    vendor,
    vendorTel,
    vendorEmail,
  }: {
    id: string;
    vendor: string;
    vendorTel: string;
    vendorEmail: string;
  }) => {
    Alert.alert(
      "Select Vendor",
      `You're about to select ${vendor.toLocaleUpperCase()} to fulfil this request. Confirm?`,
      [
        { text: "No", onPress: () => null },
        {
          text: "Yes",
          onPress: () => {
            Dispatch(
              SelectedVendor({
                id: id,
                vendor: vendor.toUpperCase(),
                vendorTel: vendorTel,
                vendorEmail: vendorEmail,
              })
            );
            setTimeout(() => {
              navigation.goBack();
            }, 2000);
          },
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
          backgroundColor: PaletteStyles.darkMode.color,
          borderWidth: selectedVendor.id == item?._id ? 2 : 0,
          borderColor: PaletteStyles.colorScheme1.color,
          padding: PaletteStyles.vSpacing.marginVertical,
          width: PaletteStyles.Width.width / 1.1,
          alignSelf: "center",
        },
      ]}
      onPress={() =>
        selectVendor({
          id: item?._id,
          vendor: item?.companyName,
          vendorTel: item?.phoneNumber,
          vendorEmail: item?.email,
        })
      }
    >
      <Text
        style={[
          PaletteStyles.lgTextBold,
          { color: PaletteStyles.darkMode.backgroundColor },
        ]}
      >
        {item?.companyName.toLocaleUpperCase()}
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
    </TouchableOpacity>
  );
};

export default VendorCell;

const styles = StyleSheet.create({});
