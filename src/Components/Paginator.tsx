import { StyleSheet, View, Dimensions, Animated } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const Paginator = ({ data, scrollX }: any) => {
  return (
    <View style={{ flexDirection: "row", height: 54 }}>
      {data?.map((_: any, i: number) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "lightskyblue",
    marginHorizontal: 10,
    // marginVertical: 15,
    alignSelf: "center",
  },
});
