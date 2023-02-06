import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import PaletteStyles from "../Style/AppPalette";
import { TranactionStatus, TranactionType, Transaction } from "../Utils/Schemas/Types";
import { color } from "react-native-elements/dist/helpers";

const History = ({navigation}: any) => {
    const TransactionTestData: Transaction[] = [{
        id: "daadcfs-14kcwerd-scjow",
        amount: 3600,
        description: "PAYMENT FOR FEBUARY WASTE DISPOSAL",
        status: TranactionStatus.SUCCESSFUL,
        type: TranactionType.DEBIT,
        transDate: Date.now().toLocaleString(),
        CRacctName: "GROOVE TECH LTD.",
        CRacctNo: "6002215686"
    }, {
        id: "zpagifs-gefwr63-scjow",
        amount: 950,
        description: "PAYMENT FOR RECYCLING PLASTC BOTTLES x 25 @ N40",
        status: TranactionStatus.SUCCESSFUL,
        type: TranactionType.CREDIT,
        transDate: Date.now().toLocaleString(),
        CRacctName: "JOHN DOE",
        CRacctNo: "XXXXXXXXX"
    }]

    const renderTransactionItems = ({item}: any) => {
        return (
            <TouchableOpacity style={[PaletteStyles.viewBox, styles.TransactionView]} onPress={() => navigation.navigate("Stack", {
                screen: "TransHistory",
                params: item
            })}>
            <Text>{item?.description}</Text>
            <Text style={[styles.statusTag, {backgroundColor: item?.status === TranactionStatus.SUCCESSFUL ? "green" : item?.status === TranactionStatus.FAILED ? "red" : "#ff7f00" }]}>{item?.status}</Text>
            <Text style={[styles.priceTag, {color: item?.type === TranactionType.CREDIT ? "green" : "red"}]}><Text>{item?.type === TranactionType.DEBIT ? "-" : "+"}</Text>{item?.amount}</Text>
            </TouchableOpacity>
        );
    };

  return (
    <View style={PaletteStyles.container}>
      <Text style={PaletteStyles.lgTextBold}>Transactions</Text>

      <Text style={PaletteStyles.lgTextLight}>Find all recent transactions done within the last 6 months</Text>
      <View style={PaletteStyles.viewBox}></View>

      <FlatList data={TransactionTestData} renderItem={renderTransactionItems} />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
    TransactionView: {
        // margin: PaletteStyles.vSpacing.marginVertical,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: PaletteStyles.vSpacing.paddingVertical,
        paddingHorizontal: PaletteStyles.hSpacing.paddingHorizontal,
        paddingBottom: 12
    },
    priceTag: {
        position: "absolute",
        right: 8,
        top: 8,
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 2,
    },
    statusTag: {
        position: "absolute",
        left: 8,
        top: 8,
        borderRadius: 20,
        padding: 5,
        color: "#FFF"
    }
});
