import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

// Define a type for the slice state
interface HospitalState {
  hospitalId: String;
  hospitalName: String;
}
const init = (key: string) => {
  const previous = localStorage.getItem('expired') ?? false
  if (previous == false) return ''
  const current = Date.now()
  if (parseInt(previous) > current) {
    return localStorage.getItem(key) ?? ''
  }
  else
    localStorage.clear()
  return ''
}
// Define the initial state using that type
const initialState: HospitalState = {
  hospitalId: init('hospitalId'),
  hospitalName: init('hospitalName'),
};

export const hospitalSlice = createSlice({
  name: "hospital",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setHospitalInfo(state, action) {
      state.hospitalName = action.payload.hospitalName;
      state.hospitalId = action.payload.hospitalId;
      const next = Date.now() + 3 * 24 * 60 * 60 * 1000
      localStorage.setItem('expired', next.toString())
      localStorage.setItem('hospitalName',action.payload.hospitalName)
      localStorage.setItem('hospitalId',action.payload.hospitalId)
    },
  },
});

export const { setHospitalInfo } = hospitalSlice.actions;

export default hospitalSlice.reducer;
