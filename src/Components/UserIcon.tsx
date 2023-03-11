import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import { RootState } from "../Context/Store";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserIcon = ({ navigation }: any) => {
  const { userData } = useSelector((state: RootState) => state.UserData);

  let letter = userData.userType === "USER" ? userData?.fullName.split(" ") : userData?.companyName.split(" ");
  let charsArray: Array<string> = []

  letter?.forEach(item => charsArray = [...charsArray, item.charAt(0)])
  const chars = charsArray[0] + charsArray[1];

  return (
    <>
      {/* { userData && type === 'image' ?
    <Image
        source={{ uri: userData. }}
        style={styles.profileImage}
        resizeMode="contain"
      />
    : */}
      <TouchableHighlight
        style={{
          borderRadius: 150,
          backgroundColor: "green",
          width: 38,
          marginLeft: 10,
          aspectRatio: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
          {chars.toUpperCase() || ""}
        </Text>
      </TouchableHighlight>
      {/* } */}
    </>
  );
};

export default UserIcon;

const styles = StyleSheet.create({
  profileImage: {
    width: 20,
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 100,
    elevation: 5,
  },
});
