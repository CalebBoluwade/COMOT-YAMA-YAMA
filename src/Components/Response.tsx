import { Animated, StyleSheet, Text, Modal } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Context/Store";
import { Icon } from "react-native-elements";
import {PaletteStyles} from "../Style/AppPalette";
import { Inactive, _NULS } from "../Context/Data/Server";

const Response = () => {
  const { status, open } = useSelector((state: RootState) => state.Server);

  const Dispatch = useDispatch();

  // useEffect(() => {
    setTimeout(() => {
      Dispatch(_NULS());
    }, 7000);
  // }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => Dispatch(_NULS())}
      accessible
    >
      <Animated.View
        style={[
          styles.Modal,
          { flexDirection: "row" },
        ]}
      >
        <Icon
          name={status.isActive === true ? "check" : "close"}
          size={15}
          type="material"
          reverse
          color={ status.isActive === true ? "green" : "red"}
        />
        <Text style={[PaletteStyles.smTextBold, {color: PaletteStyles.darkMode.color, textAlign: "center"}]}>{status.message}</Text>
      </Animated.View>

    </Modal>
  );
};

export default Response;

const styles = StyleSheet.create({
  Modal: {
    width: "80%",
    // maxHeight: "10%",
    // height: 275,
    backgroundColor: PaletteStyles.darkMode.backgroundColor,
    padding: 8,
    position: "absolute",
    top: 21,
    alignSelf: "center",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 21,
    // elevation: 3,
    shadowColor: "#000",
    shadowRadius: 21,
    shadowOffset: {
      width: 4,
      height: 3,
    },
  },
});
