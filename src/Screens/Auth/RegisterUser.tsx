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
import PaletteStyles from "../../Style/AppPalette";
import { Active, Inactive } from "../../Context/Data/Server";
import { useDispatch } from "react-redux";
import { Icon } from "react-native-elements";
import {
  useRegisterMutation,
  useValidateRefCodeMutation,
} from "../../Context/API/AUTH_API";
import Label from "../../Components/Labels";

const RegisterUser = ({ navigation }: any) => {
  const [first, setFirst] = useState<string>("");
  const [last, setLast] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [refCode, setRefCode] = useState<string>("NA");

  const [isChecked, setChecked] = useState(false);
  const [validateRef] = useValidateRefCodeMutation();
  const [Register, {isLoading}] = useRegisterMutation();

  const Dispatch = useDispatch();
  let status: boolean = false;

  const validateRefCode = () => {
    if (refCode !== "NA"){
      validateRef({
        ref: refCode,
      })
        .unwrap()
        .then((data) => {
          Dispatch(Active({ message: "🤩 Successful" }));
        })
        .catch((err) => {
          Dispatch(Inactive({ message: err?.data?.message || err.data || "Server error" }));
        });
    } else {
      Dispatch(Inactive({ message: "Enter a valid code" }));
    }
  };

  const Registration = () => {
    Register({
      fullName: first + " " + last,
      email: email.toLowerCase(),
      password: password,
      userType: "USER",
      refCode: refCode,
      phoneNumber: phoneNumber,
    })
      .unwrap()
      .then((data) => {
        // Dispatch(Loginn(data?.existingUser));
        navigation.navigate("Login")
        Dispatch(Active({ message: "Sucessful" }));
      })
      .catch((err) => {
        Dispatch(Inactive({ message: err?.data?.message || err.data || "Server error" }));
      });
  };

  return (
    <View style={[PaletteStyles.container, { backgroundColor: "#000" }]}>
      <View style={{ paddingTop: 15, padding: 12 }}>
        <Text style={[PaletteStyles.lgTextBoldx2, { color: "#FFF" }]}>
          REGISTER
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

      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "position" : "padding"}
        enabled
        style={[PaletteStyles.styleContainer, {paddingTop: 10, overflow: "scroll"}]}
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
            style={[PaletteStyles.inputField, { width: "47%" }]}
            placeholder="first-name"
            onChangeText={(text) => setFirst(text)}
          />

          <TextInput
            selectionColor={PaletteStyles.colorScheme1.color}
            // onFocus={}
            autoCorrect={false}
            keyboardType="name-phone-pad"
            placeholderTextColor={"#CCC"}
            style={[PaletteStyles.inputField, { width: "47%" }]}
            placeholder="last-name"
            onChangeText={(text) => setLast(text)}
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
            marginVertical: 12,
          }}
        >
          <Icon
            name="ios-people"
            size={30}
            type="ionicon"
            color={PaletteStyles.colorScheme1.color}
            style={{ marginLeft: 4 }}
          />
          <TextInput
            selectionColor={PaletteStyles.colorScheme1.color}
            autoCorrect={false}
            keyboardType="default"
            placeholderTextColor={"#CCC"}
            style={PaletteStyles.inputField}
            placeholder="Ref Code (Optional)"
            onChangeText={(text) => setRefCode(text)}
          />
          <TouchableOpacity
            onPress={() => validateRefCode()}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderRadius: 15,
              padding: 15,
              alignSelf: "flex-end",
              position: "absolute",
              left: PaletteStyles.Width.width - 120,
              bottom: 21,
            }}
          >
            <Text>VERIFY</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            PaletteStyles.button,
            {
              width: "70%",
              alignSelf: "center",
              marginTop: PaletteStyles.vSpacing.marginVertical,
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

        {/* <View>
          <Text>By checking this box, you consent to our:</Text>

          <View style={{flexDirection: "row", alignItems:"center", width: "100%"}}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
            />

            <Text style={{paddingTop: 7, flexWrap: "wrap", textAlignVertical: "center", alignItems: "center"}}>
            <TouchableOpacity><Text style={{color: PaletteStyles.colorScheme1.color, textDecorationLine: "underline"}}>Terms of Use</Text></TouchableOpacity> and
            <TouchableOpacity><Text style={{color: PaletteStyles.colorScheme1.color, textDecorationLine: "underline"}}>Privacy Policy</Text></TouchableOpacity>, as well as acknowledge receipt of our <TouchableOpacity><Text style={{color: PaletteStyles.colorScheme1.color, textDecorationLine: "underline"}}>Privacy Notice</Text></TouchableOpacity>
            
            </Text>
          </View>
        </View> */}
      </KeyboardAvoidingView>

      {/* <TouchableOpacity>
        <Text style={[PaletteStyles.colorScheme1, PaletteStyles.lgTextBold]}>
          SCAN CODE
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default RegisterUser;

const styles = StyleSheet.create({
  checkbox: {
    margin: 8,
  },
});
