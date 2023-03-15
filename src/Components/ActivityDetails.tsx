import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { WasteBinData } from "../utils/schemas/Types";
import { Icon } from "react-native-elements";
import { PaletteStyles } from "../Style/AppPalette";
import GoBack from "./GoBack";
import { useNavigation } from "@react-navigation/native";
import OptionsModal from "./OptionsModal";

const UserActivityDetails = ({ route }: any) => {
  const navigation = useNavigation();
  const activity: WasteBinData = route.params;

  const [openModal, setOpenModal] = useState<boolean>(false);

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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 12,
        }}
      >
        <GoBack navigation={navigation} />

        <TouchableOpacity onPress={() => setOpenModal(!openModal)}>
          <Icon
            name="options"
            type="ionicon"
            size={28}
            color={PaletteStyles.darkMode.color}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          padding: 12,
        }}
      >
        <View
          style={[
            styles.box,
            { width: "32%", alignItems: "center", padding: 12 },
          ]}
        >
          <View>
            <Text style={PaletteStyles.smTextLight}>No. of Bags</Text>
            <Text style={PaletteStyles.lgTextBold}>{activity?.wasteBags}</Text>
          </View>

          <View>
            <Text style={PaletteStyles.smTextLight}>Approx.</Text>
            <Text style={PaletteStyles.lgTextBold}>
              {activity?.wasteBags * 15}
              <Text style={PaletteStyles.smTextLight}>Kg</Text>
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.box,
            { width: "62%", alignItems: "center", padding: 12 },
          ]}
        >
          <View>
            <Text style={PaletteStyles.smTextLight}>Vendor Status</Text>
            <Text style={PaletteStyles.lgTextBold}>
              {activity?.CollectorStatus}
            </Text>
          </View>

          <View>
            <Text style={PaletteStyles.smTextLight}>Pickup Status</Text>
            <Text style={PaletteStyles.lgTextBold}>
              {activity?.CompletionStatus}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.box,
          {
            alignSelf: "center",
            margin: 12,
            padding: 12,
          },
        ]}
      >
        <Text style={PaletteStyles.smTextLight}>Address</Text>
        <Text style={[PaletteStyles.smTextBold, { paddingTop: 8 }]}>
          {activity?.address.address}
        </Text>
      </View>

      <View
        style={[
          styles.box,
          {
            alignSelf: "center",
            margin: 12,
            padding: 12,
          },
        ]}
      >
        <Text style={PaletteStyles.smTextLight}>Items to Dispose</Text>
        {activity.wasteMaterials.map((item, index) => (
          <Text
            key={index}
            style={[PaletteStyles.smTextBold, { paddingTop: 8 }]}
          >
            {item}
          </Text>
        ))}
      </View>

      {activity?.imageDescription ? (
        <Image
          source={{ uri: activity?.imageDescription }}
          style={styles.imageView}
          resizeMode="contain"
        />
      ) : (
        <View style={[styles.imageText, { height: 200 }]}>
          <Text>No Image Uploaded</Text>
        </View>
      )}

      <OptionsModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        actionId={activity._id}
        collectorStatus={activity!.CollectorStatus}
        completionStatus={activity!.CompletionStatus}
        phoneNumber={activity?.phoneNumber}
      />
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
    width: PaletteStyles.Width.width / 1.1,
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 21,
  },
  buttonExtra: {
    width: PaletteStyles.Width.width / 1.1,
    alignItems: "center",
  },
});
