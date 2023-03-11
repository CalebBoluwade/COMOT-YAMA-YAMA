import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import {PaletteStyles} from "../../Style/AppPalette";
import { Active, Inactive } from "../../Context/Data/Server";
import { useDispatch } from "react-redux";
import { Icon } from "react-native-elements";
import Checkbox from "expo-checkbox";
import { useRegisterVendorMutation } from "../../Context/API/VENDOR_API";

const VendorRegistration = ({ navigation }: any) => {
  const [Name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState("");

  const [isChecked, setChecked] = useState(false);
  const [RegisterVendor, { isLoading }] = useRegisterVendorMutation();

  const Dispatch = useDispatch();
  let status: boolean = false;

  const Registration = () => {
    if (isChecked) {
      RegisterVendor({
        companyName: Name,
        email: email.toLowerCase(),
        password,
        address,
        phoneNumber: phoneNumber,
      })
        .unwrap()
        .then((data) => {
          // Dispatch(Loginn(data?.existingUser));
          navigation.navigate("Login");
          Dispatch(Active({ message: "Sucessful" }));
        })
        .catch((err) => {
            console.log(err)
          Dispatch(
            Inactive({
              message: err?.data[0]?.message || err.data || "Server error",
            })
          );
        });
    } else {
        Dispatch(
            Inactive({
              message: "Accept T & C's",
            })
          );
    }
  };

  return (
    <View style={[PaletteStyles.container, { backgroundColor: "#000" }]}>
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "position" : "padding"}
        enabled
        style={[
          PaletteStyles.styleBottomContainer,
          { paddingTop: 10, overflow: "scroll" },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            borderRadius: 15,
            marginVertical: 8,
          }}
        >
          <Icon
            name="person-outline"
            size={30}
            type="material"
            color={PaletteStyles.colorScheme1.color}
            // style={{ marginLeft: 4 }}
          />
          <TextInput
            selectionColor={PaletteStyles.colorScheme1.color}
            // onFocus={}
            autoCorrect={false}
            keyboardType="name-phone-pad"
            placeholderTextColor={"#CCC"}
            style={[PaletteStyles.inputField, { width: "90%" }]}
            placeholder="company short name"
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            borderRadius: 15,
            marginVertical: 8,
          }}
        >
          <Icon
            name="office-building-marker"
            size={30}
            type="material-community"
            color={PaletteStyles.colorScheme1.color}
            // style={{ marginLeft: 4 }}
          />
          <TextInput
            selectionColor={PaletteStyles.colorScheme1.color}
            // onFocus={}
            autoCorrect={false}
            keyboardType="name-phone-pad"
            placeholderTextColor={"#CCC"}
            style={[PaletteStyles.inputField, { width: "90%" }]}
            placeholder="address"
            onChangeText={(text) => setAddress(text)}
          />
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
            placeholderTextColor={"#CCC"}
            style={PaletteStyles.inputField}
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
            marginVertical: 12,
          }}
        >
          <Icon
            name="phone"
            size={30}
            type="material"
            color={PaletteStyles.colorScheme1.color}
            style={{ marginLeft: 4 }}
          />
          <TextInput
            selectionColor={PaletteStyles.colorScheme1.color}
            autoCorrect={false}
            keyboardType="phone-pad"
            placeholderTextColor={"#CCC"}
            style={PaletteStyles.inputField}
            placeholder="phone-number"
            onChangeText={(text) => setPhoneNumber(text)}
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
            placeholder="password"
            placeholderTextColor={"#CCC"}
            onChangeText={(text) => setPassword(text)}
          />
          <Icon
            name="eye"
            size={30}
            type="font-awesome"
            color={PaletteStyles.colorScheme1.color}
            style={{ position: "relative", right: 45 }}
          />
        </View>

        <TouchableOpacity
          style={[
            PaletteStyles.button,
            {
              width: "70%",
              alignSelf: "center",
              marginTop: PaletteStyles.vSpacing.marginVertical + 5,
            },
          ]}
          onPress={() => Registration()}
        >
          <Text
            style={[
              PaletteStyles.lgTextBold,
              { color: PaletteStyles.colorScheme1.color, textAlign: "center" },
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>

        <View
          style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
        >
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
          />

          <Text>
            By checking this box, you consent to our:{" "}
            <TouchableOpacity>
              <Text
                style={{
                  color: PaletteStyles.colorScheme1.color,
                  textDecorationLine: "underline",
                }}
              >
                Terms of Use
              </Text>
            </TouchableOpacity>{" "}
            and{" "}
            <TouchableOpacity>
              <Text
                style={{
                  color: PaletteStyles.colorScheme1.color,
                  textDecorationLine: "underline",
                }}
              >
                Privacy Policy
              </Text>
            </TouchableOpacity>
            , as well as acknowledge receipt of our{" "}
            <TouchableOpacity>
              <Text
                style={{
                  color: PaletteStyles.colorScheme1.color,
                  textDecorationLine: "underline",
                }}
              >
                Privacy Notice
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </KeyboardAvoidingView>

      <View style={{ paddingTop: 15, padding: 12 }}>
        <Text style={[PaletteStyles.lgTextBold, { color: "#FFF" }]}>
          JOIN US
        </Text>
        <Text
          style={[
            PaletteStyles.lgTextLight,
            { textAlign: "left", justifyContent: "flex-start" },
          ]}
        >
          No hidden fees. No hassles
        </Text>
      </View>
    </View>
  );
};

export default VendorRegistration;

const styles = StyleSheet.create({
  checkbox: {
    margin: 8,
  },
});
