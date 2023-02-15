import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import PaletteStyles from "../Style/AppPalette";
import { Icon } from "react-native-elements";
import Checkbox from "expo-checkbox";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import Label from "../Components/Labels";
import GoBack from "../Components/GoBack";

const DisposeRecycle = ({ navigation }: any) => {
  const [address, setAddress] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [dateOpener, setDateOpener] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [others, setOthers] = useState(false);

  const [selected, setSelected] = React.useState("");

  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | string>("");

  const setDate = (event: DateTimePickerEvent, date: Date) => {
    const {
      type,
      nativeEvent: { timestamp },
    } = event;

    // console.log(new Date(timestamp));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      style={[
        PaletteStyles.container,
        {
          backgroundColor: PaletteStyles.darkMode.backgroundColor,
          padding: 18,
        },
      ]}
    >
      <GoBack navigation={navigation} />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 12,
          marginTop: PaletteStyles.vSpacing.marginVertical,
        }}
      >
        <View>
          <Text style={[PaletteStyles.lgTextBold, PaletteStyles.darkMode]}>
            GET STARTED
          </Text>
          <Text style={[PaletteStyles.lgTextLight, PaletteStyles.darkMode]}>
            Dispose. Recycle
          </Text>
        </View>
        <Image
          source={require("../../assets/Recycling-p.png")}
          style={{
            width: PaletteStyles.Width.width * 0.38,
            height: PaletteStyles.Height.height * 0.25,
          }}
          resizeMode="cover"
        />
      </View>

      <View
        style={{
          padding: 12,
          marginTop: PaletteStyles.vSpacing.marginVertical,
        }}
      >
        <Label
          title="Address (Waste pickup location)?"
          isRequired={true}
          showRequired={true}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // backgroundColor: "rgba(255, 255, 255, 0.4)",
            backgroundColor: PaletteStyles.darkMode.color,
            borderRadius: 15,
            marginVertical: 12,
          }}
        >
          <Icon
            name="pin"
            size={30}
            type="ionicon"
            color={PaletteStyles.colorScheme1.color}
            style={{ marginLeft: 4 }}
          />
          <TextInput
            selectionColor={PaletteStyles.colorScheme1.color}
            // onFocus={}
            autoCorrect={false}
            keyboardType="default"
            // numberOfLines={3}
            style={[PaletteStyles.inputField, { width: "90%" }]}
            placeholder="address"
            onChangeText={(text) => setAddress(text)}
          />

          {/* <Icon
          name="pin"
          size={30}
          type="ionicon"
          color={PaletteStyles.colorScheme1.color}
          style={{ position: "relative", right: 20, bottom: 10 }}
        /> */}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("UserLocation")}>
          <Text
            style={[
              PaletteStyles.smTextLight,
              PaletteStyles.colorScheme1,
              { textAlign: "center" },
            ]}
          >
            FIND LOCATION
          </Text>
        </TouchableOpacity>
      </View>

      <Label
        title="Select Waste material(s)"
        isRequired={true}
        showRequired={true}
      />

      <View style={styles.options}>
        <View style={styles.wasteOptions}>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
            />
            <Text style={{ color: PaletteStyles.darkMode.color }}>Plastic</Text>
          </View>
        </View>

        <View style={styles.wasteOptions}>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked2}
            />
            <Text style={{ color: PaletteStyles.darkMode.color }}>Glass</Text>
          </View>
        </View>

        <View style={styles.wasteOptions}>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={() => setOthers(!others)}
            />
            <Text style={{ color: PaletteStyles.darkMode.color }}>Others</Text>
          </View>
        </View>
      </View>

      {others ? (
        <MultipleSelectList
          setSelected={(val: any) => setSelected(val)}
          data={data}
          save="value"
          search={false}
          onSelect={() => alert(selected)}
          label="Others"
          boxStyles={{
            backgroundColor: PaletteStyles.darkMode.color,
            marginTop: PaletteStyles.vSpacing.marginVertical,
            borderWidth: 2,
            borderColor: PaletteStyles.colorScheme1.color,
          }}
          dropdownStyles={{ backgroundColor: PaletteStyles.darkMode.color }}
        />
      ) : null}

      <Label
        title="Specify No. of Waste Bag(s)"
        isRequired={true}
        showRequired={true}
      />

      <TextInput
        selectionColor={PaletteStyles.colorScheme1.color}
        // onFocus={}
        autoCorrect={false}
        keyboardType="numeric"
        // numberOfLines={3}
        style={[PaletteStyles.inputField, { width: "35%", backgroundColor: "#fff"}]}
        placeholder="Bags"
        onChangeText={(text) => setAddress(text)}
      />

      <View
        style={{
          padding: 12,
          // marginTop: PaletteStyles.vSpacing.marginVertical,
        }}
      >
        <Label
          title="Add Image Description"
          isRequired={false}
          showRequired={true}
        />

        <TouchableOpacity style={PaletteStyles.button} onPress={pickImage}>
          <Text style={PaletteStyles.smTextLight}>Select Image</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          padding: 12,
        }}
      >
        <Label
          title="Select Pickup Date"
          isRequired={true}
          showRequired={true}
        />

        <TouchableOpacity
          style={PaletteStyles.button}
          onPress={() => setDateOpener(!dateOpener)}
        >
          <Text style={PaletteStyles.smTextLight}>{"Select Date"}</Text>
          {dateOpener && (
            <DateTimePicker
              mode="date"
              display="default"
              value={new Date()}
              minimumDate={new Date()}
              onChange={(event) => setDate(event, new Date())}
            />
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          padding: 12,
          // marginTop: PaletteStyles.vSpacing.marginVertical,
        }}
      >
        <Label title="Select Vendor" isRequired={true} showRequired={true} />

        <TouchableOpacity
          style={PaletteStyles.button}
          onPress={() =>
            navigation.navigate("Stack", {
              screen: "VendorList",
            })
          }
        >
          <Text style={PaletteStyles.smTextLight}>Select Vendor</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={PaletteStyles.button}>
        <Text style={PaletteStyles.colorScheme1}>Submit Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DisposeRecycle;

const styles = StyleSheet.create({
  options: {
    flexDirection: "row",
  },
  wasteOptions: {
    width: PaletteStyles.Width.width * 0.3,
    borderWidth: 2,
    borderRadius: PaletteStyles.viewBox.borderRadius,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
});
