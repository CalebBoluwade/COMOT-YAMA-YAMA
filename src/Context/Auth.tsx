import { createSlice } from "@reduxjs/toolkit";
import {} from "../Utils/Schemas/Types";

enum userSet {
  "CLIENT" = "CLIENT",
  "VENDOR" = "VENDOR",
  "ADMIN" = "ADMIN",
}

type userState = {
  isUserAuth: boolean;
  userData: {
    __v: 0;
    _id: string;
    email: string;
    fullName: string;
    password: "";
    userType: string;
  };
  user_type: userSet;
};

const initialState: userState = {
  isUserAuth: false,
  userData: {
    __v: 0,
    _id: "",
    email: "",
    fullName: "",
    password: "",
    userType: "",
  },
  user_type: userSet["CLIENT"],
};

const AuthSlice = createSlice({
  name: "AuthUser",
  initialState,
  reducers: {
    LoginUser: (state, { payload }) => {
      state.userData = payload;
      state.user_type = payload?.userType;
      state.isUserAuth = true;
    },
    LogOutUser: (state = initialState) => {
      return initialState;
    },
  },
});

export const { LoginUser, LogOutUser } = AuthSlice.actions;
export default AuthSlice.reducer;
