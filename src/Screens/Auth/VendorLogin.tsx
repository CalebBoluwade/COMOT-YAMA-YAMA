import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { LoginUser as Loginn } from "../../Context/Data/Auth";
import { Active, Inactive } from "../../Context/Data/Server";
import { PaletteStyles } from "../../Style/AppPalette";
import { useDispatch } from "react-redux";
import { useVendorLoginMutation } from "../../Context/API/VENDOR_API";

const VendorLogin = ({ navigation }: any) => {
  const [LoginVendor, { isLoading }] = useVendorLoginMutation();
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const Dispatch = useDispatch();

  const UserLogin = () => {
    LoginVendor({
      user: user.toLowerCase(),
      password: password,
    })
      .unwrap()
      .then((data) => {
        Dispatch(Loginn({ data: data?.data, accessToken: data.accessToken }));
        Dispatch(Active({ message: data?.message }));
      })
      .catch((err) => {
        Dispatch(
          Inactive({
            message:
              err?.data[0]?.message ||
              err.data.message ||
              err.data ||
              "Server error",
          })
        );
      });
  };

  return (
    <View
      style={{
        backgroundColor: PaletteStyles.darkMode.backgroundColor,
        height: PaletteStyles.Height.height,
      }}
    >
      <Image
        source={require("../../../assets/bottles-anim.gif")}
        style={{
          width: PaletteStyles.Width.width,
          height: PaletteStyles.Height.height * 0.45,
        }}
        resizeMode="cover"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "padding"}
        enabled
        style={[
          {
            padding: 21,
            backgroundColor: PaletteStyles.darkMode.backgroundColor,
          },
        ]}
      >
        <View style={{ paddingTop: 5, padding: 12 }}>
          <Text style={[PaletteStyles.lgTextBoldx2]}>VENDOR LOGIN</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: 15,
            marginVertical: 7,
          }}
        >
          <Icon
            name="alternate-email"
            size={30}
            type="material"
            color={PaletteStyles.colorScheme1.color}
            style={{ marginLeft: 4 }}
          />
          <TextInput
            selectionColor={PaletteStyles.colorScheme1.color}
            // onFocus={}
            autoCorrect={false}
            keyboardType="email-address"
            style={PaletteStyles.inputField}
            placeholder="email address / phone number"
            placeholderTextColor={PaletteStyles.darkMode.backgroundColor}
            onChangeText={(text) => setUser(text)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: 15,
          }}
        >
          <Icon
            name="lastpass"
            size={30}
            type="material-community"
            color={PaletteStyles.colorScheme1.color}
            style={{ marginLeft: 4 }}
          />
          <TextInput
            keyboardType="default"
            style={PaletteStyles.inputField}
            secureTextEntry
            placeholder="password"
            onSubmitEditing={UserLogin}
            placeholderTextColor={PaletteStyles.darkMode.backgroundColor}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={[
            PaletteStyles.button,
            {
              width: "70%",
              alignSelf: "center",
              marginTop: PaletteStyles.vSpacing.marginVertical + 10,
            },
          ]}
          onPress={() => UserLogin()}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={[
                PaletteStyles.lgTextBold,
                {
                  color: PaletteStyles.colorScheme1.color,
                  textAlign: "center",
                },
              ]}
            >
              Login
            </Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <View style={{flexDirection: "row", alignSelf: "center", justifyContent: "center" }}>
      <Text style={[
          PaletteStyles.smTextBold,{ color: PaletteStyles.darkMode.color}]}>USER
      </Text>
      <Text
        style={[
          PaletteStyles.smTextBold,
          { color: PaletteStyles.colorScheme1.color },
        ]}
        onPress={() => navigation.navigate("Login")}
      > 
        Login here
      </Text>

      </View>
    </View>
  );
};

export default VendorLogin;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-evenly" },
});
