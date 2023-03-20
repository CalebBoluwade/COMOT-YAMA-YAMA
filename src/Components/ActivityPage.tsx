import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { PaletteStyles } from "../Style/AppPalette";
import GoBack from "./GoBack";
import { FlashList } from "@shopify/flash-list";
import { WasteBinData } from "../utils/schemas/Types";
import { useSelector } from "react-redux";
import { RootState } from "../Context/Store";
import { useFetchBinQuery } from "../Context/API/SERVICES_API";
import UserActivityDetails from "./ActivityDetails";
import UserActivityItem from "./ActivityItems";

const ActivityPage = ({ route, navigation }: any) => {
  const { userData } = useSelector((state: RootState) => state.UserData);

  const { data, isLoading, refetch } = useFetchBinQuery({
    id: userData._id,
    type: userData.userType,
  });

  const onRefresh = async () => {
    // const { isLoading } = useFetchBinQuery({ id: userData._id, type: userData.userType });
    refetch();
    return isLoading;
  };
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
    <SafeAreaView
      style={[
        PaletteStyles.darkMode,
        PaletteStyles.container,
        { paddingTop: 25 },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          padding: PaletteStyles.vSpacing.marginVertical,
        }}
      >
        <GoBack />

        <View>
          <Text style={PaletteStyles.lgTextBold}>Schedule List</Text>
          <Text style={PaletteStyles.lgTextLight}>All your requests</Text>
        </View>
      </View>

      {!isLoading ? (
        <View style={{ padding: 12 }}>
          <FlatList
            renderItem={(item: any) => renderActivityList(item)}
            // estimatedItemSize={5}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            style={{
              marginBottom: 80
            }}
            data={data?.data}
          />
        </View>
      ) : (
        <View
          style={{
            padding: 12,
            alignSelf: "center",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[PaletteStyles.lgTextLight, { textAlign: "center" }]}>
            {userData.userType === "USER"
              ? "YOU HAVEN'T MADE ANY REQUESTS"
              : "NO REQUSTS HAVE BEEN ASSIGNED"}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ActivityPage;

const styles = StyleSheet.create({});
