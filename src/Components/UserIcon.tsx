import { StyleSheet, Text, View, Image } from "react-native";
import { RootState } from "../Context/Store";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserIcon = ({ type }: any) => {
  const { userData } = useSelector((state: RootState) => state.UserData);

  let letter = userData?.fullName.split(" ");

  letter?.forEach(item => letter = [...letter, item.charAt(0)])
  const chars = letter[2] + letter[3];

  return (
    <>
      {/* { userData && type === 'image' ?
    <Image
        source={{ uri: userData. }}
        style={styles.profileImage}
        resizeMode="contain"
      />
    : */}
      <View
        style={{
          borderRadius: 150,
          backgroundColor: "green",
          width: 38,
          marginLeft: 10,
          aspectRatio: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
          {chars || ""}
        </Text>
      </View>
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
