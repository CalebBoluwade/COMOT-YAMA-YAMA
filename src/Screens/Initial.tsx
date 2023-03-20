import {
  StyleSheet,
  Text,
  View,
  AppState,
  TouchableOpacity,
  // Animated,
  // FlatList,
  Image,
  ScrollView,TouchableWithoutFeedback
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Context/Store";
import { PaletteStyles } from "../Style/AppPalette";
// import { useServerStatusQuery } from "../Context/API/AUTH_API";
// import { initData } from "../Context/Data/Server";
import { Active, Inactive } from "../Context/Data/Server";
import UserIcon from "../Components/UserIcon";
import { Icon } from "react-native-elements";
import * as Location from "expo-location";

const Initial = ({ navigation }: any) => {
  const Dispatch = useDispatch();
  useEffect(() => {
    const GetUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Dispatch(
          Inactive({ message: "Permission to access location was denied" })
        );
      }
    }
    GetUserLocation()
      // return GetUserLocation
    }, [])
  const appState = useRef(AppState.currentState);
  const [idleTime, setIdleTime] = useState(0);

  const { userData } = useSelector((state: RootState) => state.UserData);
  // const { data, isLoading } = useServerStatusQuery();

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
  const imageArray = [
    {
      id: 1,
      img: require("../../assets/shake.png"),
    },
    {
      id: 2,
      img: require("../../assets/Hello.png"),
    },
  ];

  const renderBoardSlides = ({ item, index }: any) => {
    return (
      <View style={styles.slides}>
        <Image source={item.img} style={styles.image} resizeMode="contain" />
      </View>
    );
  };

  // const completedOnboarding = async () => {
  //   await AsyncStorage.setItem("onboarded", JSON.stringify(true)).then(() => {
  //     setOpenModal(false);

  //     if (Platform.OS === "android") {
  //       showToast("Completed");
  //     } else {
  //       alert("Completed");
  //     }
  //   });
  // };

  return (
    <View
      style={[
        PaletteStyles.container,
        { backgroundColor: PaletteStyles.darkMode.color },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: PaletteStyles.hSpacing.paddingHorizontal,
        }}
      >
        {/* <UserIcon /> */}
        <View style={{ paddingLeft: 5 }}>
          <Text style={PaletteStyles.colorScheme1}>Welcome Back</Text>
          <Text
            style={[
              PaletteStyles.smMain,
              { color: PaletteStyles.darkMode.backgroundColor },
            ]}
          >
            {userData.userType === "USER"
              ? userData?.fullName.toLocaleUpperCase()
              : userData?.companyName.toLocaleUpperCase()}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: PaletteStyles.hSpacing.paddingHorizontal,
          }}
        >
          <Icon
            name="notifications-outline"
            type="ionicon"
            size={25}
            style={{ marginLeft: 25 }}
          />
          <UserIcon navigation={navigation} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          PaletteStyles.styleContainer,
          { backgroundColor: PaletteStyles.darkMode.backgroundColor },
        ]}
      >
        {/* <Animated.View style={{ height: 265 }}>
          <FlatList
            data={imageArray}
            renderItem={(item) => renderBoardSlides(item)}
            horizontal
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            // bounces={true}
            // onEndReached={() => {}}
            // onScroll={Animated.event(
            //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            //   { useNativeDriver: false }
            // )}
            // keyExtractor={(item) => item.id}
            scrollEventThrottle={32}
            // onViewableItemsChanged={viewItemsChanged}
            // viewabilityConfig={viewConfig}
            // ref={slidesRef}
          />
        </Animated.View> */}

        <Text style={[PaletteStyles.smTextBold, { padding: 8 }]}>
          Quick Actions
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[PaletteStyles.gridLayout]}
        >
          <TouchableOpacity
            style={[
              PaletteStyles.viewBox,
              PaletteStyles.button,
              PaletteStyles.gridBox,
            ]}
            onPress={
              userData.userType === "USER"
                ? () =>
                    navigation.navigate("Stack", {
                      screen: "DisposeRecycle",
                    })
                : () => {}
            }
          >
            <Icon
              name={
                userData.userType === "USER"
                  ? "delete-empty-outline"
                  : "truck-delivery-outline"
              }
              size={21}
              raised
              type="material-community"
              color={PaletteStyles.colorScheme1.color}
            />
            <Text style={{ color: PaletteStyles.darkMode.color }}>
              {userData.userType === "USER"
                ? "DISPOSE & RECYCLE"
                : "PENDING PICKUPS"}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={[
              PaletteStyles.viewBox,
              PaletteStyles.button,
              PaletteStyles.gridBox,
            ]}
          >
            <Icon
              name="recycle"
              raised
              size={25}
              type="font-awesome"
              color={PaletteStyles.colorScheme1.color}
              // style={{ marginLeft: 4 }}
            />
            <Text style={{ color: PaletteStyles.darkMode.color }}>RECYCLE</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={[
              PaletteStyles.viewBox,
              PaletteStyles.button,
              PaletteStyles.gridBox,
            ]}
            onPress={() => navigation.navigate("Activity")
            }
          >
            <Icon
              name="calendar-outline"
              size={21}
              raised
              type="ionicon"
              color={PaletteStyles.colorScheme1.color}
            />
            <Text style={{ color: PaletteStyles.darkMode.color }}>
              VIEW REQUESTS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              PaletteStyles.viewBox,
              PaletteStyles.button,
              PaletteStyles.gridBox,
            ]}
            onPress={() => navigation.navigate("Receipts")}
          >
            <Icon
              name="receipt-outline"
              size={21}
              raised
              type="ionicon"
              color={PaletteStyles.colorScheme1.color}
            />
            <Text style={{ color: PaletteStyles.darkMode.color }}>
              PAYMENT HISTORY
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "space-between",
            // paddingHorizontal: PaletteStyles.hSpacing.paddingHorizontal,
          }}
        >
          <Text style={[PaletteStyles.smTextBold, { padding: 8 }]}>
            Upcoming Schedule
          </Text>
          <Icon
            name="bell"
            size={15}
            type="entypo"
            color={PaletteStyles.darkMode.color}
          />
        </View>

        <View
          style={[
            PaletteStyles.gridLayout,
            PaletteStyles.button,
            { height: 200, margin: 8 },
          ]}
        >
          <Text style={[PaletteStyles.lgTextBold, {width: "90%"}]}>17 MARCH</Text>
          <Text style={PaletteStyles.smTextLight}>2 Days</Text>

          <Image source={require("../../assets/Logistics.png")} style={styles.image} resizeMode="contain" />
        </View>

        <Text style={[PaletteStyles.smTextBold, { padding: 8 }]}>
          Activity
          </Text>
        <View style={PaletteStyles.gridLayout}>
          <View
            style={[
              PaletteStyles.viewBox,
              PaletteStyles.button,
              PaletteStyles.gridBox,
              {width: "45%", height: 75}
            ]}
          >
            <Text style={{ color: PaletteStyles.darkMode.color }}>Total</Text>
            <Text style={{ color: PaletteStyles.darkMode.color }}>6</Text>
          </View>

          <View
            style={[
              PaletteStyles.viewBox,
              PaletteStyles.button,
              PaletteStyles.gridBox, {width: "45%", height: 75}
            ]}
          >
            <Text style={{ color: PaletteStyles.darkMode.color }}>Pending</Text>
            <Text style={{ color: PaletteStyles.darkMode.color }}>6</Text>
          </View>

           <View
            style={[
              PaletteStyles.viewBox,
              PaletteStyles.button,
              PaletteStyles.gridBox, {width: "45%", height: 75}
            ]}
          >
            <Text style={{ color: PaletteStyles.darkMode.color }}>Completed</Text>
            <Text style={{ color: PaletteStyles.darkMode.color }}>6</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Initial;

const styles = StyleSheet.create({
  image: {
    width: "90%",
    height: 225,
    alignSelf: "center",
    position: "relative",
    left: 105
  },

  slides: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: PaletteStyles.Width.width,
    height: 235,
  },
});
