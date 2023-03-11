import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import {PaletteStyles} from '../../Style/AppPalette'

const UserRouting = ({navigation}:any) => {
  return (
    <View style={[
      styles.container,{ paddingTop: 35,
      padding: 21,
      backgroundColor: PaletteStyles.darkMode.backgroundColor}]}>

      <View style={styles.imgBkgd}>
      <Image source={require("../../../assets/Hello.png")} resizeMode='contain' style={styles.image} />
      </View>
        <Text style={[PaletteStyles.lgTextBold, {marginTop: 10}]}>WELCOME</Text>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[PaletteStyles.button, {width: "40%"}]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[PaletteStyles.smMain, {color: PaletteStyles.colorScheme1.color}]}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[PaletteStyles.button, {width: "40%"}]}
          onPress={() => navigation.navigate("RegisterUserRouting")}
        >
          <Text style={[PaletteStyles.smMain, {color: PaletteStyles.colorScheme1.color}]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Text style={[PaletteStyles.colorScheme1, {position: "absolute", bottom: 20, alignSelf: "center"}]}>Terms of Use</Text>
    </View>
  );
}

export default UserRouting

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 65,
    justifyContent: "space-evenly",
  },
  image: {
    width: 265,
    height: 265,
    marginTop: 25,
    marginRight: 25,
  },
  imgBkgd: {
    // backgroundColor: darkMode ? "#FFF" : "#000",
    backgroundColor: "#FFF",
    borderRadius: 300,
    width: 200,
    aspectRatio: 1,
    overflow: "hidden"
    // padding: 25
  }
})