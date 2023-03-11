// import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  ProfileQR,
  Referral,
  TranactionStatus,
  RegisterUserRouting,
  UserRouting,
  VendorRegistration,
  VendorLogin,
} from "../Screens/index";
import { Onboarding, RegisterUser, Login } from "../Screens/index";

const Stack = createStackNavigator();

const UserNav = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="UserRouting"
        component={UserRouting}
        options={{
          presentation: "card",
        }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="VendorLogin" component={VendorLogin} />
      <Stack.Screen name="RegisterUser" component={RegisterUser} />
      <Stack.Screen name="RegisterVendor" component={VendorRegistration} />

      <Stack.Group
        screenOptions={{
          presentation: "card",
          animationTypeForReplace: "pop",
        }}
      >
      <Stack.Screen
        name="RegisterUserRouting"
        component={RegisterUserRouting}
        options={{
          presentation: "card",
          cardShadowEnabled: true,
          cardStyle: { height: 400 },
        }}
      />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: "modal",
          animationTypeForReplace: "pop",
        }}
      >
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ animationTypeForReplace: "push" }}
        />

        <Stack.Screen name="ProfileQR" component={ProfileQR} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default UserNav;
