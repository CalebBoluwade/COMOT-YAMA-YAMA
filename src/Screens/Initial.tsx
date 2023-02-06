import { StyleSheet, Text, View, AppState, SafeAreaView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogOutUser } from "../Context/Auth";
import { RootState } from "../Context/Store";
import PaletteStyles from "../Style/AppPalette";
import { useServerStatusQuery } from "../Context/API/AUTH_API";
import { initData } from "../Context/Server";
import UserIcon from "../Components/UserIcon";

const Initial = () => {
  const appState = useRef(AppState.currentState);
  const [idleTime, setIdleTime] = useState(0);

  const { userData } = useSelector((state: RootState) => state.UserData);
  const { data, isLoading } = useServerStatusQuery();

  // const dispatch = useDispatch();
  // const { isLoading, data } = useServerStatusQuery();

  // useEffect(() => {
  //   const subscription = AppState.addEventListener("change", (nextAppState) => {
  //     // appState.current = nextAppState;
  //     console.log(appState.current, nextAppState);

  //     // if (appState.current === "active") {
  //     //   // The app has come back to the foreground, so we check how long it was in the background
  //     //   AsyncStorage.getItem("idleStartTime").then((idleStartTime) => {
  //     //     if (idleStartTime) {
  //     //       // Calculate the idle time
  //     //       const idleTime = Date.now() - parseInt(idleStartTime, 10);
  //     //       setIdleTime(idleTime);
  //     //       console.log(idleTime / 1000 / 60);

  //     //       if (idleStartTime / 1000 / 60 >= 5) {
  //     //         dispatch(LogOutUser());
  //     //       }
  //     //       AsyncStorage.removeItem("idleStartTime");
  //     //     }
  //     //   });
  //     // } else if (nextAppState === "background") {
  //     //   // The app has gone to the background, so we save the current time as the start of the idle period
  //     //   AsyncStorage.setItem("idleStartTime", String(Date.now()));
  //     // }
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // });

  return (
    <SafeAreaView style={PaletteStyles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
      <UserIcon />
        <View style={{paddingLeft: 5}}>
          <Text style={PaletteStyles.lgTextBold}>{userData?.fullName}</Text>
          <Text style={PaletteStyles.smTextLight}>{userData?.userType}</Text>
        </View>
      </View>

      <View style={PaletteStyles.viewBox}>
        <Text>Quick To Do's</Text>

        <Text>Dispose Waste</Text>

        
      </View>
    </SafeAreaView>
  );
};

export default Initial;

const styles = StyleSheet.create({});
