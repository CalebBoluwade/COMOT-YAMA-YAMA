import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useRef, useState, useEffect } from 'react'
import {PaletteStyles} from '../../Style/AppPalette';

const OTP = ({navigation}: any) => {
  let textInput = useRef<TextInput>(null);
  const length = 6;
  const [intervalVal, setIntervalVal] = useState("");

  const onChangeText = (val: any) => {
    setIntervalVal(val)
  }

  useEffect(() => {
    textInput.current!.focus();
  }, [])
  
   
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <TextInput 
      ref={textInput}
      onChangeText={onChangeText}
      style={{ width: 0, height: 0 }}
      value={intervalVal}
      maxLength={length}
      returnKeyType="done"
      keyboardType='numeric'
      />

      <View style={styles.containerInput}>
        {
          Array(length).fill(1).map((data, index) => (
        <View key={index} style={styles.cellView}>
          <Text style={styles.cellText} onPress={() => textInput.current!.focus()}>
            {intervalVal && intervalVal.length > 0 ? intervalVal[index] : ""}
          </Text>
        </View>
          ))
        }
      </View>
    </View>
  )
}

export default OTP

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  cellView: {
    width: 40,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderColor: PaletteStyles.colorScheme1.color,
    borderWidth: 2
  },
  cellText: {
    textAlign: "center", 
    fontSize: 16
  }
})