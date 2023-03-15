import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { PaletteStyles } from "../Style/AppPalette";
import GoBack from "./GoBack";
import { FlashList } from "@shopify/flash-list";
import { WasteBinData } from "../utils/schemas/Types";
import { useSelector } from "react-redux";
import { RootState } from "../Context/Store";
import {
  useFetchBinQuery
} from "../Context/API/SERVICES_API";
import UserActivityDetails from "./ActivityDetails";
import UserActivityItem from "./ActivityItems";

const ActivityPage = ({ route, navigation }: any) => {
  const { userData } = useSelector((state: RootState) => state.UserData);

    const { data, isLoading } = useFetchBinQuery({ id: userData._id, type: userData.userType });

  // const activityData: wasteBinData[] = route.params?.data;
  const renderActivityList = ({
    item,
    index,
  }: {
    item: WasteBinData;
    index: number;
  }) => {
    return (
      <UserActivityItem navigation={navigation} data={item} index={index} />
    );
  };

  return (
    <SafeAreaView style={[PaletteStyles.darkMode, PaletteStyles.container]}>
      <View
        style={{
          flexDirection: "row",
          padding: PaletteStyles.vSpacing.marginVertical,
        }}
      >
        <GoBack navigation={navigation} />

        <View>
          <Text style={PaletteStyles.smTextBold}>Schedule List</Text>
          <Text style={PaletteStyles.lgTextLight}>All your requests</Text>
        </View>
      </View>

      {!isLoading ? (
        <View style={{ padding: 12 }}>
          <FlatList
            renderItem={(item: any) => renderActivityList(item)}
            // estimatedItemSize={5}
            data={data?.data}
          />
        </View>
      ) : (
        <View style={{ padding: 12, alignSelf: "center" }}>
          <Text style={[PaletteStyles.lgTextLight, { textAlign: "center" }]}>
            No data available
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ActivityPage;

const styles = StyleSheet.create({});
