import { createSlice } from "@reduxjs/toolkit";
import {customerStatus, UserSet} from "../../Utils/Schemas/Types";

type userState = {
  isUserAuth: boolean;
  userData: {
    __v: 0;
    _id: string;
    companyName: string;
    email: string;
    fullName: string;
    userType: UserSet;
    phoneNumber: string;
    status: customerStatus;
    vendorStatus: customerStatus;
    address: string | null;
  },
  accessToken: string;
};

const initialState: userState = {
  isUserAuth: false,
  userData: {
    __v: 0,
    _id: "",
    companyName: "",
    email: "",
    fullName: "",
    userType: UserSet["USER"],
    phoneNumber: "",
    status: customerStatus["PENDING"],
    vendorStatus: customerStatus["PENDING"],
    address: null
  },
  accessToken: ""
};

const AuthSlice = createSlice({
  name: "AuthUser",
  initialState,
  reducers: {
    LoginUser: (state, { payload }) => {
      state.userData = payload.data;
      state.isUserAuth = true;
      state.accessToken = payload.accessToken;
    },
    LogOutUser: (state = initialState) => {
      return initialState;
    },
    AddAddress: (state, {payload}) => {
      state.userData.address = payload
    }
  },
});

export const { LoginUser, LogOutUser,AddAddress } = AuthSlice.actions;
export default AuthSlice.reducer;
