import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  History,
  Initial,
  Maps,
  Profile,
  QR,
  Referral,
  ActivityItems,
  ActivityPage
} from "../Screens/index";
import { Icon } from "react-native-elements";
let { width, height } = Dimensions.get("screen");
import { PaletteStyles } from "../Style/AppPalette";
import { Dimensions } from "react-native";
import StackNav from "./Stack";
import OTP from "../Screens/Auth/OTP";
import ActivityTab from "./ActivityTabSelector";
const BottomTab = createBottomTabNavigator();

const Stack = createStackNavigator();

const BottomTabs = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // tabBarShowLabel: false,
        headerShown: false,
        // tabBarStyle: {backgroundColor: PaletteStyles.bgColorScheme1.backgroundColor, position: "absolute", bottom: 20, borderRadius: PaletteStyles.border.borderRadius, marginHorizontal: 12, padding: 8}
        // tabBarStyle: {backgroundColor: "green"}
      }}
    >
      <Stack.Screen
        name="Home"
        component={Initial}
        options={
          {
            // tabBarIcon: () => (
            //   <Icon name="home-outline" size={45} type="ionicon" color={PaletteStyles.colorScheme1.color} />
            // ),
          }
        }
      />

      <Stack.Screen
        name="Map"
        component={OTP}
        options={
          {
            // tabBarIcon: () => (
            //   <Icon name="map-outline" size={30} type="ionicon" color={PaletteStyles.colorScheme1.color} />
            // ),
          }
        }
      />

      <Stack.Screen
        name="Stack"
        component={StackNav}
        options={
          {
            //  tabBarItemStyle: { height: 0, display: "none" }
          }
        }
      />

      <Stack.Screen name="Receipts" component={History} options={{}} />

      {/* <Stack.Screen name="UserActivity" component={History} options={{}} /> */}

      <Stack.Screen
        name="VendorActivity"
        component={ActivityTab}
        options={{}}
      />

      <Stack.Screen
        name="Activity"
        component={ActivityPage}
        options={{}}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={
          {
            
            // tabBarIcon: () => (
            //   <Icon name="user" size={45} type="feather" color={PaletteStyles.colorScheme1.color} />
            // ),
          }
        }
      />
    </Stack.Navigator>
  );
};

export default BottomTabs;
