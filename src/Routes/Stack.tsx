// import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
import UserLocation from "../Components/UserLocation";
import {
  DisposeRecycle,
  Maps,
  ProfileQR,
  Referral,
  TranactionStatus,
  VendorList,
} from "../Screens/index";

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VendorList" component={VendorList} />

      <Stack.Group
        screenOptions={{
          presentation: "modal",
          animationTypeForReplace: "pop",
        }}
      >
        {/* <Stack.Screen
            name="Referral"
            component={Referral}
            options={{ presentation: "modal" }}
          /> */}
        <Stack.Screen name="Referral2" component={Referral} />

        <Stack.Screen
          name="DisposeRecycle"
          component={DisposeRecycle}
          options={{
            presentation: "modal",
          }}
        />

        <Stack.Screen
          name="UserLocation"
          component={Maps}
          // options={{
          //   presentation: "modal",
          // }}
        />

        <Stack.Screen
          name="TransHistory"
          component={TranactionStatus}
          options={{
            presentation: "modal",
            // cardStyle: {
            //   elevation: 3,
            //   // backgroundColor:
            //   //   Platform.OS === "ios" ? "transparent" : "rgba(0, 0, 0, 0)",
            // },
          }}
        />
        <Stack.Screen name="ProfileQR" component={ProfileQR} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNav;
