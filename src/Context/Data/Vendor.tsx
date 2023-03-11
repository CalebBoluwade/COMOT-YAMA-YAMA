import { createSlice } from "@reduxjs/toolkit";
import { InitData } from "../../Utils/Schemas/Types";

const initialState = {
    selectedVendor: { id: "", vendor: "", vendorTel: "", vendorEmail: "" },
    location: {
      address: "",
      latitude: 0,
      longitude: 0
    }
};

const vendorSlice = createSlice({
  name: "Vendor",
  initialState,
  reducers: {
    SelectedVendor: (state, { payload }) => {
        state.selectedVendor = payload
    },
    UserAddress: (state, {payload}) => {
      state.location = payload
    },
    ClearAddress: (state = initialState) => {
      state.location = initialState.location
    }
  },
});

export const { SelectedVendor, UserAddress, ClearAddress } = vendorSlice.actions;
export default vendorSlice.reducer;
