import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import React from 'react'
import PaletteStyles from '../../Style/AppPalette'

const UserRouting = ({navigation}:any) => {
  return (
    <ImageBackground source={require("../../../assets/Recycling-amico.png")} resizeMode='contain' style={[PaletteStyles.container, styles.container,{ width: PaletteStyles.Width.width,
      height: PaletteStyles.Height.height}]}>

      <View>
        <Text>...Clean Effectively</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[PaletteStyles.button, {width: "40%"}]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={PaletteStyles.smMain}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[PaletteStyles.button, {width: "40%"}]}
          onPress={() => navigation.navigate("RegisterUserRouting")}
        >
          <Text style={PaletteStyles.smMain}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Text style={[PaletteStyles.colorScheme1, {position: "absolute", bottom: 20, alignSelf: "center"}]}>Terms of Use</Text>
    </ImageBackground>
  );
}

export default UserRouting

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // maxHeight: 500,
    justifyContent: "space-evenly",
  },
  buttons: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 75,
    justifyContent: "space-evenly",
    
  }
})