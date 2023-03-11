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
import { wasteBinData } from "../../utils/schemas/Types";
import { Icon } from "react-native-elements";
import { PaletteStyles } from "../../Style/AppPalette";

const UserActivityDetails = ({ route, navigation }: any) => {
  const activity: wasteBinData = route.params;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: PaletteStyles.darkMode.backgroundColor,
          // padding: 18,
          // paddingBottom: 100
        },
      ]}
    >
      {activity?.imageDescription ? (
        <Image
          source={{ uri: activity?.imageDescription }}
          style={styles.imageView}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.imageText}>
          <Text>No Image Uploaded</Text>
        </View>
      )}

      <View style={{ flexDirection: "row",
    justifyContent: "space-evenly", padding: 12 }}>
        <View style={[styles.box, {width: "32%", alignItems: "center", padding: 12}]}>
          <View>
          <Text style={PaletteStyles.smTextLight}>No. of Bags</Text>
          <Text style={PaletteStyles.lgTextBold}>{activity?.wasteBags}</Text>
          </View>

          <View>
          <Text style={PaletteStyles.smTextLight}>Approx.</Text>
          <Text style={PaletteStyles.lgTextBold}>{activity?.wasteBags * 15}<Text style={PaletteStyles.smTextLight}>Kg</Text></Text>
          </View>
        </View>

        <View style={[styles.box, {width: "62%", alignItems: "center", padding: 12}]}>
        <View>
          <Text style={PaletteStyles.smTextLight}>Vendor Status</Text>
          <Text style={PaletteStyles.lgTextBold}>{activity?.CollectorStatus}</Text>
          </View>

          <View>
          <Text style={PaletteStyles.smTextLight}>Pickup Status</Text>
          <Text style={PaletteStyles.lgTextBold}>{activity?.CompletionStatus}</Text>
          </View>
        </View>
      </View>

      <Text>Call Vendor</Text>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === "android") {
                Linking.openURL(`tel:${activity.phoneNumber}`);
              } else {
                Linking.openURL(`telprompt:${activity.phoneNumber}`);
              }
            }}
            style={{
              borderWidth: 1,
              
              padding: 10,
              borderRadius: 10,
              height: 50,
            }}
          >
            <Icon
              name="phone-call"
              type="feather"
              size={25}
              color="rgba(255, 255, 255, 0.2)"
            />
          </TouchableOpacity>
    </View>
  );
};

export default UserActivityDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    width: PaletteStyles.Width.width,
    height: 250,
    resizeMode: "contain",
  },
  imageText: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  box: {
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 21
  },
});
