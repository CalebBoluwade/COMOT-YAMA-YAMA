import { StyleSheet, Appearance, Dimensions } from "react-native";
const darkMode = Appearance.getColorScheme() === "dark";

let { width, height } = Dimensions.get("screen");

() =>
  Appearance.addChangeListener((listener) => {
    console.log(listener);
  })();

const PaletteStyles = StyleSheet.create({
  Width: {
    width: width,
  },
  Height: {
    height: height,
  },

  darkMode: {
    color: darkMode ? "#FFF" : "#000",
    backgroundColor: darkMode ? "#000" : "#FFF"
  },

  HeaderFont: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    paddingTop: 35,
    paddingHorizontal: 18,
  },
  styleContainer: {
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
    borderTopWidth: 2,
    borderColor: "green"
  },
  viewBox: {
    marginVertical: 12,
    borderRadius: 30,
    shadowOpacity: 0.21,
    shadowOffset: {
      width: 14,
      height: -13,
    },
    borderWidth: 2,
    marginBottom: 15
  },
  lgTextBoldx2: {
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 2,
    color: darkMode ? "#FFF" : "#000",
  },
  lgTextBold: {
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: 1,
    color: darkMode ? "#FFF" : "#000",
  },
  smTextBold: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 2,
    color: darkMode ? "#FFF" : "#000",
  },
  lgTextLight: {
    fontSize: 21,
    fontWeight: "400",
    color: "#777"
  },
  smTextLight: {
    fontSize: 14,
    fontWeight: "400",
    color: "#777"
  },
  main: {
    color: "#FFFFFF",
    fontSize: 21,
    // fontFamily: "Poppins-SemiBold",
    letterSpacing: 5,
    fontWeight: "700",
    marginVertical: 8,
    textAlign: "center",
  },
  smMain: {
    color: "#FFFFFF",
    fontSize: 18,
    // fontFamily: "Poppins-SemiBold",
    letterSpacing: 5,
    fontWeight: "700",
    textAlign: "center",
    textShadowColor: "#000"
  },
  mediumText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginVertical: 8,
    letterSpacing: 5,
    fontWeight: "500",
    textAlign: "center",
    width: width,
  },
  // spacing: 6 | 8,
  hSpacing: {
    paddingHorizontal: 12,
    marginHorizontal: 12
  },
  vSpacing: {
    paddingVertical: 45,
    marginVertical: 10
  },

  inputField: {
    borderBottomWidth: 1,
    padding: 12,
    paddingLeft: 18,
    marginVertical: 6,
    borderRadius: 24,
    width: "92%"
  },
  button: {
    borderRadius: 32, 
    padding: 18,
    backgroundColor: "#3f86cf4f",
    shadowOpacity: 0.21,
    shadowOffset: {
      width: 14,
      height: -13,
    },
    marginBottom: 15
  },

  border: {
    borderRadius: 12,
  },
  colorScheme1: {
    color: "#ff7f00",
  },
  bgColorScheme1: {
    backgroundColor: "#3f86cf4f",
  },
});

export default PaletteStyles;
