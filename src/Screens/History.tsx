import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import {PaletteStyles} from "../Style/AppPalette";
import { TranactionStatus, TranactionType, Transaction } from "../Utils/Schemas/Types";
import GoBack from "../Components/GoBack";
import { RootState } from "../Context/Store";
import { useSelector } from "react-redux";
import { useFetchTransactionsQuery } from "../Context/API/TRANSACTIONS_API";

const History = ({navigation}: any) => {

    const { transaction } = useSelector((state: RootState) => state.Transactions);
    // const { data, isLoading } = useFetchTransactionsQuery({});

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
    <View
    style={[
      PaletteStyles.container,
      {
        backgroundColor: PaletteStyles.darkMode.backgroundColor,
        padding: 18,
      },
    ]}
  >
    <View
        style={{
          flexDirection: "row",
        //   padding: PaletteStyles.vSpacing.marginVertical,
        }}
      >
        <GoBack navigation={navigation} />

        <View>
          <Text style={PaletteStyles.lgTextBold}>Transactions</Text>
          <Text style={PaletteStyles.lgTextLight}>Find all recent transactions.</Text>
        </View>
      </View>

      <View style={PaletteStyles.viewBox}></View>

      <FlatList data={transaction} renderItem={renderTransactionItems} />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
    TransactionView: {
        // margin: PaletteStyles.vSpacing.marginVertical,
        backgroundColor: PaletteStyles.darkMode.color,
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
