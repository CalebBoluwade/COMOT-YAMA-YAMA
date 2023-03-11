import {
  Dimensions,
  StyleSheet,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import {PaletteStyles} from "../../Style/AppPalette";
import Paginator from "../../Components/Paginator";
import { is } from "immer/dist/internal";
// import e

let { width, height } = Dimensions.get("screen");

const Onboarding = ({navigation}: any) => {
  const [isVisible, setIsVible] = useState(false);

  const imageArray = [
    {
      id: 1,
      text: "COMOT YAMA YAMA from your Domot without hassle.",
      img: require("../../../assets/WasteMgmt.png"),
    },
    {
      id: 2,
      text: "Quick and Automated Payments.",
      img: require("../../../assets/WasteMgmt.png"),
    },
    {
      id: 3,
      text: "Easy Access To Transaction History at any time",
      img: require("../../../assets/WasteMgmt.png"),
    },
  ];

  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const slidesRef = useRef(null);

  const viewItemsChanged = useRef(({ viewableItems }: any) => {
    setIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderBoardSlides = ({ item, index }: any) => {
    return (
      <View style={styles.onBoard}>
        {/* <Image source={item.img} resizeMode="contain" style={{ height: "70%"}} /> */}

        <Text style={PaletteStyles.main}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View>
        <FlatList
          data={imageArray}
          renderItem={(item) => renderBoardSlides(item)}
          horizontal
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onEndReached={() => setIsVible(true)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          // keyExtractor={(item) => item.id}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </Animated.View>

      { isVisible && index === imageArray.length - 1 ?
      <TouchableOpacity style={{ position: "absolute", bottom: 18, marginBottom: 10 }} onPress={() => navigation.navigate("UserRouting")}>
      <Text style={[PaletteStyles.lgTextBold, PaletteStyles.colorScheme1]}>Continue</Text>
      </TouchableOpacity> : null
      }
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3724ad",
    alignItems: "center",
    justifyContent: "center",
  },
  onBoard: {
    padding: 21,
    backgroundColor: "#3f86cf4f",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    alignContent: "center",
    width: width / 1.12,
    height: Platform.OS === "ios" ? height - 145 : height - 165,
    alignSelf: "center",
    shadowOpacity: 0.21,
    shadowOffset: {
      width: 18,
      height: -13,
    },
  }
});
