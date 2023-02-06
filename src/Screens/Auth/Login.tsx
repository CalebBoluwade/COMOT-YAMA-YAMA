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
import { useLoginMutation } from "../../Context/API/AUTH_API";
import { LoginUser as Loginn } from "../../Context/Auth";
import { Active, Inactive } from "../../Context/Server";
import PaletteStyles from "../../Style/AppPalette";
import { useDispatch } from "react-redux";
import Response from "../../Components/Response";

const Login = () => {
  const [LoginUser, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const Dispatch = useDispatch();

  const UserLogin = () => {
    LoginUser({
      email: email,
      password: password,
    })
      .unwrap()
      .then((data) => {
        Dispatch(Loginn(data?.existingUser));
        Dispatch(Active({ message: "Login Sucessful" }));
      })
      .catch((err) => {
        Dispatch(Inactive({ message: err?.data?.message }));
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
            // flexDirection: "row",
            paddingTop: 35,
            padding: 21,
            backgroundColor: PaletteStyles.darkMode.backgroundColor,

            // alignItems: "center",
            // justifyContent: "space-around",
          },
        ]}
      >
        <View style={{ paddingTop: 15, padding: 12 }}>
          <Text style={[PaletteStyles.lgTextBoldx2]}>Login</Text>
          <Text
            style={[
              PaletteStyles.lgTextLight,
              { textAlign: "left", justifyContent: "flex-start" },
            ]}
          >
            No hidden fees. No hassles
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            borderRadius: 15,
            marginVertical: 12,
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
            defaultValue="x@y"
            placeholder="email-address"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
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
            keyboardType="visible-password"
            style={PaletteStyles.inputField}
            secureTextEntry
            defaultValue="TestPass!3"
            placeholder="password"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={[PaletteStyles.button, { marginTop: 25, minWidth: "80%" }]}
          onPress={() => UserLogin()}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={PaletteStyles.smMain}>Log in</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { justifyContent: "space-evenly" },
});
