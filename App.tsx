import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Store } from "./src/Context/Store";
import { Provider } from "react-redux";
import CombinedRoutes from "./src/Routes/CombinedRoutes";
import { useFonts } from "expo-font";
import { AppTheme, PaletteStyles } from "./src/Style/AppPalette";
import PushNotification from "./src/Components/PushNotification";
import "react-native-gesture-handler";
import Updates from 'expo-updates';

// Check for updates on app start

export default function App() {
  Updates.checkForUpdateAsync().then(update => {
    if (update.isAvailable) {
      // Prompt the user to update
      Updates.fetchUpdateAsync().then(() => {
        // Reload the app
        Updates.reloadAsync();
      });
    }
  });
  
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
        {/* <PushNotification /> */}
      <NavigationContainer>
        <AppTheme />
          <StatusBar style="inverted" />
          <View style={styles.container}>
          <CombinedRoutes />
          </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
