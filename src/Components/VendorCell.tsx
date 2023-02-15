import { StyleSheet, Text, View } from "react-native";
import React from "react";

const VendorCell = ({item}: any) => {
  return (
    <View>
      <Text>{item?.name}</Text>
    </View>
  );
};

export default VendorCell;

const styles = StyleSheet.create({});
