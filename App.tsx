import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Store } from "./src/Context/Store";
import { Provider } from "react-redux";
import CombinedRoutes from "./src/Routes/CombinedRoutes";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/Fonts/Poppins-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
        //  <View style={styles.container} onLayout={onLayoutRootView}>
    <Provider store={Store}>
      <NavigationContainer>
          <StatusBar style="auto" />
          <CombinedRoutes />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
