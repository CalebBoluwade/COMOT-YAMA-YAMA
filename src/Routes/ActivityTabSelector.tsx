import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { Initial, VendorActivityPage } from "../Screens/index";
import { Icon } from "react-native-elements";
let { width, height } = Dimensions.get("screen");
import { PaletteStyles } from "../Style/AppPalette";
import { Dimensions } from "react-native";
import StackNav from "./Stack";
import OTP from "../Screens/Auth/OTP";
const BottomTab = createBottomTabNavigator();

const ActivityTab = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#CCC",
          position: "absolute",
          bottom: 0,
          borderRadius: 12,
          margin: 30
          // borderTopRightRadius: 12,
        },
        tabBarItemStyle: {
          borderRadius: 12,
        },
        // tabBarActiveBackgroundColor: PaletteStyles.colorScheme1.color,
        tabBarActiveBackgroundColor: PaletteStyles.darkMode.backgroundColor,
        tabBarInactiveTintColor: PaletteStyles.darkMode.backgroundColor,
        // tabBarInActiveTintColor: PaletteStyles.darkMode.color
      }}
    >
      <BottomTab.Screen
        name="VendorCompleted"
        component={VendorActivityPage}
        options={{
          title: "Upcoming",
          tabBarIcon: () => <Text>Upcoming</Text>,
        }}
      />

      <BottomTab.Screen
        name="Completed"
        component={Initial}
        options={{
          tabBarIcon: () => <Text>Completed</Text>,
          // tabBarBadge: 5,
        }}
      />

      <BottomTab.Screen
        name="Canceled"
        component={Initial}
        options={{
          tabBarIcon: () => <Text>Canceled</Text>,
          // tabBarBadge: 5,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default ActivityTab;
