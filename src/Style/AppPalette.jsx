import { StyleSheet, Appearance, Dimensions } from "react-native";
export const darkMode = Appearance.getColorScheme() === "dark";

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
    backgroundColor: darkMode ? "#000" : "#FFF",
  },

  HeaderFont: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    paddingTop: 35,
    // paddingHorizontal: 18,
  },
  styleContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#FFF",
    padding: 18,
    flex: 3,
    shadowOffset: {
      width: 14,
      height: -13,
    },
    shadowColor: darkMode ? "#FFF" : "#000",
    marginTop: 15,
    overflow: "scroll"
  },

  gridLayout: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    // marginVertical: 8
  },
  gridBox: {
    width: "45%",
    borderRadius: 7,
    padding: 18,
    // backgroundColor: "#3f86cf4f",
    // shadowOpacity: 0.21,
    // shadowOffset: {
    //   width: 14,
    //   height: -13,
    // },
  },
  viewBox: {
    marginVertical: 8,
    borderRadius: 10,
    shadowOpacity: 0.21,
    alignItems: "center",
    shadowColor: darkMode ? "#FFF" : "#000",
    shadowOffset: {
      width: -14,
      height: 13,
    },
    borderWidth: 2,
    marginBottom: 15,
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
    fontFamily: "Poppins-Bold"
  },
  smTextBold: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 2,
    color: darkMode ? "#FFF" : "#000",
  },
  lgTextLight: {
    fontSize: 20,
    fontWeight: "400",
    color: "#777",
  },
  smTextLight: {
    fontSize: 14,
    fontWeight: "400",
    color: "#777",
  },
  main: {
    color: darkMode ? "#FFF" : "#000",
    fontSize: 21,
    // fontFamily: "Poppins-SemiBold",
    letterSpacing: 5,
    fontWeight: "700",
    marginVertical: 8,
    textAlign: "center",
  },
  smMain: {
    color: darkMode ? "#FFF" : "#000",
    fontSize: 18,
    // fontFamily: "Poppins-SemiBold",
    // letterSpacing: 5,
    fontWeight: "700",
    // textAlign: "center",
    textShadowColor: "#000",
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
    marginHorizontal: 12,
  },
  vSpacing: {
    paddingVertical: 45,
    marginVertical: 10,
  },

  inputField: {
    borderBottomWidth: 1,
    padding: 12,
    paddingLeft: 18,
    marginVertical: 6,
    borderRadius: 24,
    width: "92%",
  },
  button: {
    borderRadius: 32,
    padding: 18,
    backgroundColor: "#3f86cf4f",
    shadowOpacity: 0.21,
    alignItems: "center",
    shadowOffset: {
      width: 14,
      height: -13,
    },
    marginBottom: 15,
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
