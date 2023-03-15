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
import { LoginUser as Loginn } from "../../Context/Data/Auth";
import { Active, Inactive } from "../../Context/Data/Server";
import { PaletteStyles } from "../../Style/AppPalette";
import { useDispatch } from "react-redux";

const Login = ({ navigation }: any) => {
  const [LoginUser, { isLoading }] = useLoginMutation();
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const Dispatch = useDispatch();

  const UserLogin = () => {
    LoginUser({
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
        behavior={"position"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        enabled
        style={[
          {
            padding: 21,
            backgroundColor: PaletteStyles.darkMode.backgroundColor,
          },
        ]}
      >
        <View style={{ paddingTop: 5, padding: 12 }}>
          <Text style={[PaletteStyles.lgTextBoldx2]}>USER LOGIN</Text>
          {/* <Text
            style={[
              PaletteStyles.lgTextLight,
              { textAlign: "left", justifyContent: "flex-start" },
            ]}
          >
            No hidden fees. No hassles
          </Text> */}
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
            // onSubmitEditing={UserLogin}
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
              Log in
            </Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <View style={{flexDirection: "row", alignSelf: "center", justifyContent: "center" }}>
      <Text style={[
          PaletteStyles.smTextBold,{ color: PaletteStyles.darkMode.color}]}>VENDOR
      </Text>
      <Text
        style={[
          PaletteStyles.smTextBold,
          { color: PaletteStyles.colorScheme1.color },
        ]}
        onPress={() => navigation.navigate("VendorLogin")}
      > 
        Login here
      </Text>

      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-evenly" },
});
