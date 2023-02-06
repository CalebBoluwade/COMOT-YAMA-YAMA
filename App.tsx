import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { Store } from "./src/Context/Store";
import { Provider } from "react-redux";
import CombinedRoutes from "./src/Routes/CombinedRoutes";

export default function App() {
  return (
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
