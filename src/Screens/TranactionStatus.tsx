import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import {PaletteStyles} from "../Style/AppPalette";
import {
  TranactionStatus as TransStatus,
  TranactionType,
  Transaction,
} from "../Utils/Schemas/Types";

const TranactionStatus = ({ route, navigation }: any) => {
  const transaction = route.params;

  let x = 1;
  return (
    <View style={PaletteStyles.container}>
      <Text style={PaletteStyles.lgTextBold}>Transaction Receipt</Text>

      <View style={{ alignSelf: "center", margin: 25 }}>
        <Icon
          name={
            transaction?.status === TransStatus.SUCCESSFUL
              ? "check"
              : transaction?.status === TransStatus.FAILED
              ? "cancel"
              : "clock-outline"
          }
          reverse
          size={65}
          type="material-community"
          color={
            transaction?.status === TransStatus.SUCCESSFUL
              ? "green"
              : transaction?.status === TransStatus.FAILED
              ? "red"
              : "#ff7f00"
          }
        />
      </View>

      <Text
        style={[
          {
            color:
              transaction?.status === TransStatus.SUCCESSFUL
                ? "green"
                : transaction?.status === TransStatus.FAILED
                ? "red"
                : "#ff7f00",
            textAlign: "center",
            fontSize: 21,
          },
        ]}
      >
        {transaction?.status}
      </Text>
      <View style={PaletteStyles.viewBox}>
        <View style={styles.ReceiptItems}>
          <Text>Name (To): </Text>
          <Text style={PaletteStyles.smTextBold}>
            {transaction?.CRacctName}
          </Text>
        </View>

        <View style={styles.ReceiptItems}>
          <Text>Account No: </Text>
          <Text style={PaletteStyles.smTextBold}>{transaction?.CRacctNo}</Text>
        </View>

        <View style={styles.ReceiptItems}>
          <Text>Amount: </Text>

          <View style={{ flexWrap: "wrap", alignItems: "center" }}>
            <Text
              style={[
                PaletteStyles.smTextBold,
                {
                  color:
                    transaction?.type === TranactionType.CREDIT
                      ? "green"
                      : "red",
                  fontSize: 28,
                },
              ]}
            >
              {transaction?.type === TranactionType.DEBIT ? "-" : "+"}

              {new Intl.NumberFormat("en-ng", {
                style: 'currency',
                currency: 'NGN'
                }).format(transaction?.amount)}
            </Text>

            <Text style={PaletteStyles.smTextLight}>{transaction?.type === TranactionType.DEBIT ? "plus" : "minus"} charges</Text>
          </View>
        </View>

        <View style={styles.ReceiptItems}>
          <Text>Description: </Text>
          <Text style={PaletteStyles.smTextBold}>
            {transaction?.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TranactionStatus;

const styles = StyleSheet.create({
  ReceiptItems: {
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: PaletteStyles.vSpacing.marginVertical - 5,
    padding: 12,
    borderBottomWidth: 1,
    alignItems: "center",
    // lineHeight: 30
  },
});
