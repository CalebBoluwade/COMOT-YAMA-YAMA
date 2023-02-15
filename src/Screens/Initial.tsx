import {
  StyleSheet,
  Text,
  View,
  AppState,
  TouchableOpacity,
  Animated,
  FlatList,
  Image,
  ScrollView
} from "react-native";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogOutUser } from "../Context/Data/Auth";
import { RootState } from "../Context/Store";
import PaletteStyles from "../Style/AppPalette";
import { useServerStatusQuery } from "../Context/API/AUTH_API";
import { initData } from "../Context/Data/Server";
import UserIcon from "../Components/UserIcon";
import { Icon } from "react-native-elements";

const Initial = ({ navigation }: any) => {
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
    <View style={[PaletteStyles.container, { backgroundColor: "#3f86cf4f" }]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: PaletteStyles.hSpacing.paddingHorizontal,
        }}
      >
        {/* <UserIcon /> */}
        <View style={{ paddingLeft: 5 }}>
          <Text style={[PaletteStyles.lgTextBold, { color: "#FFF" }]}>
            {userData?.fullName}
          </Text>
          <Text style={PaletteStyles.colorScheme1}>{userData?.userType}</Text>
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
          <UserIcon />
        </View>
      </View>

      <ScrollView
      showsVerticalScrollIndicator={false}
        style={[
          PaletteStyles.styleContainer,
          { backgroundColor: PaletteStyles.darkMode.backgroundColor },
        ]}
      >
        <Animated.View style={{ height: 265 }}>
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
        </Animated.View>

        <Text style={[PaletteStyles.lgTextBold, { padding: 10 }]}>
          Quick To Do's
        </Text>

        <View style={PaletteStyles.gridLayout}>
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
              size={25}
              raised
              type="material-community"
              color={PaletteStyles.colorScheme1.color}
            />
            <Text style={{ color: PaletteStyles.darkMode.color }}>
              {userData.userType === "USER"
                ? "DISPOSE"
                : "VIEW PENDING PICKUPS"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
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
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              PaletteStyles.viewBox,
              PaletteStyles.button,
              PaletteStyles.gridBox,
            ]}
          >
            <Icon
              name="calendar-outline"
              size={25}
              raised
              type="ionicon"
              color={PaletteStyles.colorScheme1.color}
            />
            <Text style={{ color: PaletteStyles.darkMode.color }}>
              VIEW SCHEDULE
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
              size={25}
              raised
              type="ionicon"
              color={PaletteStyles.colorScheme1.color}
            />
            <Text style={{ color: PaletteStyles.darkMode.color }}>
              TRANSACTION HISTORY
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Initial;

const styles = StyleSheet.create({
  image: {
    width: "90%",
    height: 265,
    alignSelf: "center",
  },

  slides: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: PaletteStyles.Width.width,
    height: 265,
  },
});
