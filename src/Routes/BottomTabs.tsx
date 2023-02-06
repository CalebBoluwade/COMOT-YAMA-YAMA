import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { History, Initial, Maps, Profile, QR, Referral } from "../Screens/index";
import { Icon } from "react-native-elements";
let { width, height } = Dimensions.get("screen");
import PaletteStyles from "../Style/AppPalette";
import { Dimensions } from "react-native";
import StackNav from "./Stack";
const BottomTab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {backgroundColor: PaletteStyles.bgColorScheme1.backgroundColor, position: "absolute", bottom: 20, borderRadius: PaletteStyles.border.borderRadius, marginHorizontal: 12, padding: 8,}
        // tabBarStyle: {backgroundColor: "green"}
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Initial}
        options={{
          tabBarIcon: () => (
            <Icon name="home-outline" size={25} type="ionicon" color={PaletteStyles.colorScheme1.color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Map"
        component={Maps}
        options={{
          tabBarIcon: () => (
            <Icon name="map-outline" size={30} type="ionicon" color={PaletteStyles.colorScheme1.color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Stack"
        component={StackNav}
        options={{ tabBarItemStyle: { height: 0, display: "none" } }}
      />

      <BottomTab.Screen
        name="Receipts"
        component={History}
        options={{
          tabBarIcon: () => (
            <Icon
              name="receipt-outline"
              size={28}
              type="ionicon"
              color={PaletteStyles.colorScheme1.color}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Icon name="user" size={30} type="feather" color={PaletteStyles.colorScheme1.color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabs;
