import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import {PaletteStyles} from "../../Style/AppPalette";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Context/Store";

const Referral = ({openModal, setOpenModal}: any) => {
  const { initData } = useSelector((state: RootState) => state.Server);

  return (
    <View style={[PaletteStyles.container , styles.container]}>
           {/* {initData.showDisount ? ( */}
        <Text style={[PaletteStyles.lgTextBold, PaletteStyles.hPadding, PaletteStyles.vPadding]}>
        Reach the 100 Transaction milestone and get a {initData.discount}% on
        your next purchase
      </Text>
      {/* // ) : null} */}
      <Text style={[PaletteStyles.lgTextLight, PaletteStyles.hPadding, PaletteStyles.vPadding]}>Satisfied with our services. Recommend us to a friend</Text>

      <View>
        <Text style={[PaletteStyles.mediumText, {color: "#000"}]}>HERE'S YOUR CODE</Text>

        <Text selectable style={[{ backgroundColor: "#CCC", borderRadius: 24, padding: 25, margin: 10, textAlign: "center" }, PaletteStyles.lgTextBold]}>{"ZTQ8689PL"}</Text>
      </View>

      <View style={styles.sharePage}>
        <Icon name="copy" reverse size={25} type="ionicon" color="#517fa4" />

        <Icon name="share" reverse size={25} type="ionicon" color="#517fa4" />
      </View>

      <TouchableOpacity style={{position: "absolute", bottom: 0}}>
          <Text style={[PaletteStyles.mediumText, PaletteStyles.colorScheme1]}>
            Terms & Conditions
          </Text>
        </TouchableOpacity>
    </View>
  );
};

export default Referral;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#000",
    // padding: 15,
    // borderTopLeftRadius: 45,
    // elevation: 25,
    // position: "absolute",
    // bottom: 0,
    // left: 5,
    // right: 5,
  },
  sharePage: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
