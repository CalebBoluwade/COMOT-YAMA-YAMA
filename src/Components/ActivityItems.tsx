import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform,
  Image,
} from "react-native";
import React from "react";
import { WasteBinData } from "../utils/schemas/Types";
import { Icon } from "react-native-elements";
import { PaletteStyles } from "../Style/AppPalette";

const ActivityItem = ({ data, index, navigation }: any) => {
  const activity: WasteBinData = data;

  return (
    <TouchableOpacity style={[styles.container, PaletteStyles.viewBox, styles.TransactionView, {padding: 8}]} key={index} onPress={() => navigation.navigate("Stack", {
      screen: "ActivityDetails",
      params: data
    })}>
      {/* <View style={[]}> */}
      {/* <View style={styles.imageView}> */}
        {activity?.imageDescription ? (
          <Image
            source={{ uri: activity?.imageDescription }}
            style={styles.imageView}
            resizeMode="contain"
          />
        ) : (
          null
        )}
      {/* </View> */}

      <View>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text style={[PaletteStyles.lgTextBold, {color: PaletteStyles.darkMode.backgroundColor}]}>No. of Bags</Text>
          <Text style={[PaletteStyles.lgTextBoldx2, {color: PaletteStyles.darkMode.backgroundColor, marginRight: 18}]}>{activity?.wasteBags}</Text>
        </View>

        <Text style={[PaletteStyles.lgTextBold, {color: PaletteStyles.darkMode.backgroundColor}]}>{new Date(activity.pickupDate).toUTCString()}</Text>
      </View>

      {/* </View> */}
    </TouchableOpacity>
  );
};

export default ActivityItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  imageText: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  TransactionView: {
    // margin: PaletteStyles.vSpacing.marginVertical,
    // minHeight: 100,
    flexDirection: "row",
    backgroundColor: PaletteStyles.darkMode.color,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    // paddingVertical: PaletteStyles.vSpacing.paddingVertical,
    // paddingHorizontal: PaletteStyles.hSpacing.paddingHorizontal,
    // paddingBottom: 12
},
});
