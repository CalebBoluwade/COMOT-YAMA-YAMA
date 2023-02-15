import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Context/Store";
import { Icon } from "react-native-elements";
import PaletteStyles from "../Style/AppPalette";
import { _NULS } from "../Context/Data/Server";

const Response = () => {
  const { status } = useSelector((state: RootState) => state.Server);

  const Dispatch = useDispatch();

  // useEffect(() => {
    setTimeout(() => {
      Dispatch(_NULS());
    }, 3000);
  // }, []);

  // console.log(status)

  return (
    <>
    {status.isActive !== null ? 
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: status.isActive === true ? "green" : "red" },
        ]}
      >
        <Icon
          name={status.isActive === true ? "check" : "close"}
          size={45}
          type="material"
          // color={PaletteStyles.colorScheme1.color}
        />
        <Text style={PaletteStyles.smTextBold}>{status.message}</Text>
      </Animated.View>

    : null }
    </>
  );
};

export default Response;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 15,
    left: 10,
    right: 10,
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
