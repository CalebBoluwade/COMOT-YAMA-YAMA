import { createSlice } from "@reduxjs/toolkit";
import { TranactionStatus, TranactionType, Transaction } from "../../Utils/Schemas/Types";

const initialState = {
  transaction:[
    {
        id: "daadcfs-14kcwerd-scjow",
        amount: 3600,
        email: "",
        description: "PAYMENT FOR FEBUARY WASTE DISPOSAL",
        status: TranactionStatus.SUCCESSFUL,
        type: TranactionType.DEBIT,
        transDate: Date.now().toLocaleString(),
        CRacctName: "GROOVE TECH LTD.",
        CRacctNo: "6002215686"
    }, {
        id: "zpagifs-gefwr63-scjow",
        amount: 950,
        email: "",
        description: "PAYMENT FOR RECYCLING PLASTC BOTTLES x 25 @ N40",
        status: TranactionStatus.SUCCESSFUL,
        type: TranactionType.CREDIT,
        transDate: Date.now().toLocaleString(),
        CRacctName: "JOHN DOE",
        CRacctNo: "XXXXXXXXX"
    }
  ],
};

const TransactionSlice = createSlice({
  name: "Transaction",
  initialState,
  reducers: {
    AllTransactions: (state, { payload }) => {
      state.transaction = payload;
    },
  },
});

export const { AllTransactions } = TransactionSlice.actions;
export default TransactionSlice.reducer;
