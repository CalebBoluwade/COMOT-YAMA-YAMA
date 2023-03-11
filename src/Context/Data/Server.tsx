import { createSlice } from "@reduxjs/toolkit";
import { InitData } from "../../Utils/Schemas/Types";

const initialState: InitData = {
  initData: {
    imageData: [],
    discount: 10,
    showDisount: false,
  },
  status: { isActive: false, message: "" },
  open: false
};

const serverSlice = createSlice({
  name: "Server",
  initialState,
  reducers: {
    Active: (state, { payload }) => {
      state.status.isActive = true;
      state.open = true;
      state.status.message = payload.message;
    },
    Inactive: (state, { payload }) => {
      state.status.isActive = false;
      state.open = true;
      state.status.message = payload.message;
    },
	_NULS: (state) => {
		state.status.isActive = false;
      state.open = false;
      state.status.message = "";
	  },
    initData: (state, { payload }) => {
      state.initData = payload.initData;
    },
  },
});

export const { Active, Inactive, initData, _NULS } = serverSlice.actions;
export default serverSlice.reducer;
