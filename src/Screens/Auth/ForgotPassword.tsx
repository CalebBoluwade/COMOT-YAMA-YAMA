import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    Image,
    Button
  } from "react-native";
  import React, { useState } from "react";
  const { width } = Dimensions.get("screen");
//   import  from "../Components/Button";
  
  const ForgotPassword = () => {
    const [Email, setEmail] = useState<String | null>(null);
  
    const FP = () => {};
  
    return (
      <View style={styles.container}>
        {/* <Image
          style={styles.image}
          source={require("../assets/ForgotPassword.png")}
          resizeMode="contain"
        /> */}
        <Text>Forgot Password</Text>
        <View style={styles.InputField}>
          <TextInput
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <Button title="Forgot Password" onPress={() => FP()} />
      </View>
    );
  };
  
  export default ForgotPassword;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
      // backgroundColor: "#F7ECDE",
      justifyContent: "center",
      alignSelf: "center",
    },
    InputField: {
      alignSelf: "center",
      width: width / 1.2,
      padding: 15,
      marginVertical: 10,
      backgroundColor: "#e3e3e3",
      borderRadius: 5,
    },
    image: {
      width: 300,
      height: 300,
      position: "relative",
      top: -35,
      right: -50,
    },
  });