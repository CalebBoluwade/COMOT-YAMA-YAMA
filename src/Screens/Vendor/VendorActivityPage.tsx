import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {PaletteStyles} from "../../Style/AppPalette";
import GoBack from "../../Components/GoBack";
import { FlashList } from "@shopify/flash-list";
import { WasteBinData } from "../../utils/schemas/Types";
import { useSelector } from "react-redux";
import { RootState } from "../../Context/Store";
import VActivity from "../../Components/VendorActivityCell";
import { useNavigation } from "@react-navigation/native";

const VendorActivityPage = ({ route }: any) => {
  const navigation = useNavigation();
    const activityData: WasteBinData[] = route.params?.data;
    const renderActivityList = ({
        item,
        index,
      }: {
        item: WasteBinData;
        index: number;
      }) => {
        return <VActivity item={item} index={index} navigation={navigation} />;
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
              <Text style={PaletteStyles.lgTextBold}>Activity</Text>
              <Text style={PaletteStyles.lgTextLight}>All your requests</Text>
            </View>
          </View>
    
          {/* <View style={{ padding: 12 }}>
            <FlashList
              renderItem={(item) => renderActivityList(item)}
              estimatedItemSize={35}
              data={activityData}
            />
          </View> */}
        </View>
  )
}

export default VendorActivityPage

const styles = StyleSheet.create({})