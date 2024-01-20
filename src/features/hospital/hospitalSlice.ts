import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

// Define a type for the slice state
interface HospitalState {
  hospitalId: String;
  hospitalName: String;
}

// Define the initial state using that type
const initialState: HospitalState = {
  hospitalId: "",
  hospitalName: "乐山市第一人民医院",
};

export const hospitalSlice = createSlice({
  name: "hospital",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setHospitalInfo(state, action) {
      state.hospitalName=action.payload.hospitalName
      state.hospitalId=action.payload.hospitalId
    },
  },
});

export const { setHospitalInfo } = hospitalSlice.actions;

export default hospitalSlice.reducer;
