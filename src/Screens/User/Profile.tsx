import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Context/Store";
import React, { useState } from "react";
import { PaletteStyles } from "../../Style/AppPalette";

import { Icon } from "react-native-elements";
import GoBack from "../../Components/GoBack";
import Label from "../../Components/Labels";
import { LogOutUser } from "../../Context/Data/Auth";
import { UserSet } from "../../Utils/Schemas/Types";

const Profile = ({ navigation }: any) => {
  const { userData } = useSelector((state: RootState) => state.UserData);

  const Dispatch = useDispatch();

  const LogOut = () => {
    Alert.alert("Logout", "Are you sure you want to logout this account?", [
      { text: "No", onPress: () => null },
      { text: "Yes", onPress: () => Dispatch(LogOutUser()) },
    ]);
  };

  const DeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete this account? action cannot be reversed.",
      [
        { text: "No", onPress: () => null },
        { text: "Yes", onPress: () => Dispatch(LogOutUser()) },
      ],
      {}
    );
  };

  return (
    <View
      style={[
        PaletteStyles.container,
        {
          backgroundColor: PaletteStyles.darkMode.backgroundColor,
          padding: 12,
          paddingTop: 48
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <GoBack navigation={navigation} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around"
          }}
        >
          <View>
            <Text style={[PaletteStyles.lgTextBold, PaletteStyles.darkMode]}>
              PROFILE
            </Text>

            {userData.userType === UserSet["VENDOR"] ? (
              <Text style={[PaletteStyles.smTextLight, PaletteStyles.darkMode]}>
                {userData.vendorStatus}
              </Text>
            ) : null}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "relative",
              left: PaletteStyles.Width.width - 265,
            }}
          >
            <Icon name="edit" size={25} color={PaletteStyles.darkMode.color} />

            <TouchableOpacity
              style={{
                marginLeft: 8
              }}
              onPress={() =>
                navigation.navigate("Stack", {
                  screen: "ProfileQR",
                })
              }
            >
              <Icon
                name="qrcode-scan"
                size={25}
                color={PaletteStyles.darkMode.color}
                type="material-community"
                // color={PaletteStyles.colorScheme1.color}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ margin: PaletteStyles.vSpacing.marginVertical }}>
        <Label title="Name" isRequired={false} showRequired={false} />
        <Text style={[PaletteStyles.smMain, { paddingLeft: 6 }]}>
          {userData.userType === UserSet["USER"]
            ? userData.fullName
            : userData.companyName.toUpperCase()}
        </Text>
      </View>

      <View style={{ margin: PaletteStyles.vSpacing.marginVertical }}>
        <Label title="Email" isRequired={false} showRequired={false} />
        <Text style={[PaletteStyles.smMain, { paddingLeft: 6 }]}>
          {userData?.email}
        </Text>
      </View>

      <View style={{ margin: PaletteStyles.vSpacing.marginVertical }}>
        <Label title="Phone Number" isRequired={false} showRequired={false} />
        <Text style={[PaletteStyles.smMain, { paddingLeft: 6 }]}>
          {userData?.phoneNumber}
        </Text>
      </View>

      <View style={{ margin: PaletteStyles.vSpacing.marginVertical }}>
        <Label title="Address" isRequired={false} showRequired={false} />
        {userData?.address != null ? (
          <Text style={[PaletteStyles.smMain, { paddingLeft: 6 }]}>
            {userData.address}
          </Text>
        ) : (
          <TouchableOpacity>
            <Text
              style={[
                PaletteStyles.smMain,
                PaletteStyles.colorScheme1,
                { paddingLeft: 6 },
              ]}
            >
              Add address
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ margin: PaletteStyles.vSpacing.marginVertical }}>
        <TouchableOpacity style={PaletteStyles.button}>
          <Text style={{ color: PaletteStyles.darkMode.color }}>
            Change Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={PaletteStyles.button}>
          <Text style={{ color: PaletteStyles.darkMode.color }}>
            Contact Us
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={PaletteStyles.button} onPress={() => LogOut()}>
          <Text style={{ color: PaletteStyles.darkMode.color }}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={PaletteStyles.button}
          onPress={() => DeleteAccount()}
        >
          <Text style={{ color: "red" }}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
